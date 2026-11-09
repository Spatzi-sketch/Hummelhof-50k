"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/config/event";

// Freihändig nach der gelieferten Vorlage gezeichnet, nicht GPS-genau.
// Der erste und letzte Punkt sind zugleich Start und Ziel.
const route = "M470 1293 C540 1305 620 1333 677 1332 C741 1330 761 1304 761 1247 L761 1035 C760 945 759 859 751 807 C744 755 731 744 694 730 L637 710 C605 700 593 684 593 647 L593 231 C593 141 575 103 543 95 C514 86 477 83 436 83 L411 83 C371 82 362 99 357 141 L341 253 C336 288 326 315 309 331 C281 354 240 369 200 391 C161 412 151 431 159 466 C168 517 186 567 199 600 C214 644 197 668 172 700 L109 775 C82 810 82 828 96 854 C115 889 166 918 196 942 C235 971 243 985 220 1024 L190 1074 C171 1104 169 1124 180 1154 C190 1188 214 1220 235 1237 C276 1273 322 1279 370 1284 C405 1289 438 1290 470 1293 Z";

// Die vorgegebenen Zwischenstände werden in jeweils einer Sekunde erreicht.
export function countAtTime(milliseconds: number) {
  const stops = [1, 27, 42, event.distance];
  const time = Math.max(0, Math.min(milliseconds, 3000));
  const segment = Math.min(Math.floor(time / 1000), stops.length - 2);
  const fraction = (time - segment * 1000) / 1000;
  return Math.round(stops[segment] + (stops[segment + 1] - stops[segment]) * fraction);
}

export default function AnimatedLoopGraphic() {
  const container = useRef<HTMLDivElement>(null);
  const motion = useRef<SVGAnimateMotionElement>(null);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // SMIL muss explizit beim Sichtbarwerden starten: begin="0s" würde sich
  // sonst auf den Ladezeitpunkt der Seite beziehen und mitten auf der Runde beginnen.
  useEffect(() => {
    if (started && !reducedMotion) motion.current?.beginElement();
  }, [started, reducedMotion]);

  useEffect(() => {
    if (!started) return;
    if (reducedMotion) {
      setCount(event.distance);
      return;
    }
    let frame = 0;
    const startTime = performance.now();
    setCount(1);
    const update = (now: number) => {
      const elapsed = now - startTime;
      setCount(countAtTime(elapsed));
      if (elapsed < 3000) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [started, reducedMotion]);

  return (
    <div
      ref={container}
      className="loop-graphic animated-loop"
      role="img"
      aria-label={`${event.distance} Kilometer, ${event.loops} Runden zu je ${event.loopKm} Kilometer. Eventdauer ${event.durationLong}. Die Streckenform ist schematisch nach einer Vorlage dargestellt.`}
    >
      <span className="loop-top">DIE IDEE IST EINFACH.</span>
      <svg className="animated-loop-svg" viewBox="0 0 926 1404" aria-hidden="true">
        <path className="animated-loop-track-shadow" d={route} />
        <path className="animated-loop-track" d={route} />

        <text className="animated-loop-number" x="438" y="790" textAnchor="middle">{count}</text>
        <text className="animated-loop-unit" x="438" y="862" textAnchor="middle">KILOMETER</text>
        <text className="animated-loop-total" x="438" y="915" textAnchor="middle">VON {event.distance}</text>

        {/* Der Mast endet genau am gemeinsamen Start-/Zielpunkt. */}
        <g className="animated-loop-flag" transform="translate(470 1293)">
          <path d="M0 0 V-68 M2 -65 H42 L33 -49 L42 -33 H2" />
          <path d="M8 -61 H18 V-52 H8 Z M18 -52 H28 V-43 H18 Z" />
        </g>
        <text className="animated-loop-start" x="470" y="1383" textAnchor="middle">START / ZIEL</text>
        {started && !reducedMotion ? (
          <circle className="animated-loop-dot" r="17">
            <animateMotion ref={motion} path={route} begin="indefinite" dur="15s" repeatCount="indefinite" calcMode="paced" />
          </circle>
        ) : (
          <circle className="animated-loop-dot" cx="470" cy="1293" r="17" />
        )}
      </svg>
      <div className="loop-bottom">
        <span>× {event.loops} RUNDEN</span>
        <span>{event.distance} KM GEMEINSAM ↗</span>
      </div>
      <small>Eine Runde · {event.loopKm} km &nbsp; / &nbsp; Eventdauer · {event.durationLong}</small>
      <small>Streckenform nach Vorlage · schematische Darstellung</small>
    </div>
  );
}
