"use client";
import dynamic from "next/dynamic";
import {
  Component,
  ComponentProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type SpatialScene from "./SpatialScene";
import PrismFallback from "./PrismFallback";
const Spatial = dynamic(() => import("./SpatialScene"), {
  ssr: false,
  loading: () => (
    <div className="av-spatial-loading">
      <span />
      Preparing the spatial view
    </div>
  ),
});
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function NetworkFallback() {
  return (
    <div
      className="av-network-fallback"
      aria-label="Blue brands and violet rightsholders connected through opportunities"
    >
      <i />
      <svg viewBox="0 0 600 200" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M80 100 Q300 ${i * 25 - 15} 520 100`}
            fill="none"
            stroke={i % 2 ? "#9b80db" : "#78a6e6"}
            opacity=".45"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <circle
            key={i}
            cx={180 + i * 30}
            cy={80 + Math.sin(i * 2) * 35}
            r="4"
            fill={i % 2 ? "#6439cf" : "#2369e8"}
          />
        ))}
      </svg>
      <i />
    </div>
  );
}
export default function Scene(props: ComponentProps<typeof SpatialScene>) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries.some((e) => e.isIntersecting));
      },
      { rootMargin: "180px" },
    );
    if (host.current) observer.observe(host.current);
    try {
      const c = document.createElement("canvas");
      const context = c.getContext("webgl2") || c.getContext("webgl");
      setSupported(Boolean(context));
      if (context)
        (context as WebGLRenderingContext)
          .getExtension("WEBGL_lose_context")
          ?.loseContext();
    } catch {
      setSupported(false);
    }
    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div
      ref={host}
      className="av-spatial"
      role={props.variant === "prism" ? "group" : "img"}
      aria-label={
        props.variant === "prism"
          ? "Interactive effort, value and evidence prism. The opportunity list and sliders provide equivalent keyboard controls."
          : "Conceptual marketplace network, not Anvara’s matching algorithm."
      }
    >
      {supported && visible ? (
        <SceneBoundary
          fallback={
            props.variant === "prism" ? (
              <PrismFallback
                key={props.resetKey}
                focus={props.focus}
                data={props.data || []}
                selected={props.selected || ""}
                onSelect={props.onSelect || (() => {})}
                flat={props.flat}
              />
            ) : (
              <NetworkFallback />
            )
          }
        >
          <Spatial {...props} reduced={reduced} />
        </SceneBoundary>
      ) : props.variant === "prism" ? (
        <PrismFallback
          key={props.resetKey}
          focus={props.focus}
          data={props.data || []}
          selected={props.selected || ""}
          onSelect={props.onSelect || (() => {})}
          flat={props.flat}
        />
      ) : (
        <NetworkFallback />
      )}
    </div>
  );
}
