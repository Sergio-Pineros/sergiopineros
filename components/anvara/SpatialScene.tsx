"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { Opportunity } from "@/lib/anvara/data";
function StudioLight() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    scene.environment = env.texture;
    return () => {
      scene.environment = null;
      env.dispose();
      room.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 6, 5]} intensity={3} />
      <pointLight position={[-4, 0, 3]} color="#4389ff" intensity={25} />
      <pointLight position={[4, 1, 2]} color="#9d68ff" intensity={25} />
    </>
  );
}
const network = Array.from(
  { length: 27 },
  (_, i) =>
    new THREE.Vector3(
      Math.sin(i * 2.4) * 1.45,
      Math.cos(i * 1.7) * 0.7,
      Math.sin(i * 3.1) * 0.7,
    ),
);
function Marketplace({
  coherent = false,
  reduced = false,
}: {
  coherent?: boolean;
  reduced?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const scroll = useRef(0);
  useEffect(() => {
    const track = () => {
      scroll.current = Math.min(1, window.scrollY / 900);
    };
    track();
    window.addEventListener("scroll", track, { passive: true });
    return () => window.removeEventListener("scroll", track);
  }, []);
  useFrame(({ clock, pointer }) => {
    const gap = coherent ? 1.75 : 2.05 - scroll.current * 0.3;
    if (left.current)
      left.current.position.x = THREE.MathUtils.lerp(
        left.current.position.x,
        -gap,
        0.05,
      );
    if (right.current)
      right.current.position.x = THREE.MathUtils.lerp(
        right.current.position.x,
        gap,
        0.05,
      );
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        reduced ? 0 : pointer.x * 0.12,
        0.035,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        reduced ? 0 : pointer.y * 0.04,
        0.035,
      );
      group.current.position.y = reduced
        ? 0
        : Math.sin(clock.elapsedTime * 0.5) * 0.07;
    }
  });
  const scale = Math.min(1, viewport.width / 7.5);
  const separation = coherent ? 1.75 : 2.05 - scroll.current * 0.25;
  return (
    <group ref={group} scale={scale}>
      <mesh
        ref={left}
        position={[-separation, 0, 0]}
        rotation={[0.48, 0.5, -0.47]}
      >
        <torusGeometry args={[1.12, 0.29, 40, 120]} />
        <meshPhysicalMaterial
          color="#4d92ff"
          metalness={0.16}
          roughness={0.12}
          transmission={0.78}
          thickness={1.2}
          ior={1.4}
          clearcoat={1}
        />
      </mesh>
      <mesh
        ref={right}
        position={[separation, 0, -0.3]}
        rotation={[-0.43, -0.7, 0.5]}
      >
        <torusGeometry args={[1.12, 0.29, 40, 120]} />
        <meshPhysicalMaterial
          color="#9566ed"
          metalness={0.15}
          roughness={0.1}
          transmission={0.78}
          thickness={1.2}
          ior={1.4}
          clearcoat={1}
        />
      </mesh>
      {network.map((p, i) => (
        <group key={i}>
          <mesh position={p} scale={i % 6 === 0 ? 0.075 : 0.035}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 ? "#7547db" : "#2979f2"}
              emissive={i % 2 ? "#7547db" : "#2979f2"}
              emissiveIntensity={0.3}
            />
          </mesh>
          {(i % 3 === 0 || coherent) && (
            <Line
              points={[
                new THREE.Vector3(-separation + 0.8, 0, 0),
                p,
                new THREE.Vector3(separation - 0.8, 0, -0.3),
              ]}
              color={i % 2 ? "#9673dc" : "#689cde"}
              transparent
              opacity={0.2}
              lineWidth={0.8}
            />
          )}
        </group>
      ))}
      {!coherent && <>
        <Html position={[-separation, -1.65, 0]} center>
          <span className="av-scene-label"><span className="av-blue-dot" /> BRAND HOLDERS</span>
        </Html>
        <Html position={[separation, -1.65, 0]} center>
          <span className="av-scene-label"><span className="av-violet-dot" /> RIGHTSHOLDERS</span>
        </Html>
      </>}
    </group>
  );
}
function position(o: Opportunity, flat: boolean): [number, number, number] {
  return [
    (o.effort - 5.5) * 0.54,
    (o.impact - 5.5) * 0.38,
    flat ? 0 : (o.confidence - 5.5) * 0.35,
  ];
}
function PrismPoint({
  o,
  flat,
  selected,
  onSelect,
  reduced,
}: {
  o: Opportunity;
  flat: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      const target = new THREE.Vector3(...position(o, flat));
      mesh.current.position.lerp(
        target,
        reduced ? 1 : 1 - Math.exp(-delta * 6),
      );
    }
  });
  return (
    <mesh
      ref={mesh}
      position={position(o, true)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(o.id);
      }}
    >
      <sphereGeometry args={[selected ? 0.12 : 0.078, 20, 20]} />
      <meshStandardMaterial
        color={
          o.side === "brand"
            ? "#2369e8"
            : o.side === "rightsholder"
              ? "#8c5aea"
              : "#5367cf"
        }
        emissive={selected ? "#7a7be2" : "#222b60"}
        emissiveIntensity={selected ? 0.5 : 0.1}
      />
      {selected && (
        <Html
          center
          position={[0, 0.23, 0]}
          zIndexRange={[12, 1]}
          calculatePosition={(el, camera, size) => {
            const v = el.getWorldPosition(new THREE.Vector3()).project(camera);
            return [
              THREE.MathUtils.clamp((v.x * 0.5 + 0.5) * size.width, 75, size.width - 75),
              THREE.MathUtils.clamp((-v.y * 0.5 + 0.5) * size.height, 20, size.height - 35),
            ];
          }}
        >
          <button
            className="av-prism-label is-selected"
            onClick={() => onSelect(o.id)}
            aria-label={`Inspect ${o.title}`}
          >
            {o.short}
          </button>
        </Html>
      )}
    </mesh>
  );
}
function Prism({
  data,
  flat,
  selected,
  onSelect,
  reduced,
  focus,
  resetKey,
}: {
  data: Opportunity[];
  flat: boolean;
  selected: string;
  onSelect: (id: string) => void;
  reduced: boolean;
  focus: boolean;
  resetKey: number;
}) {
  const frame = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [moving, setMoving] = useState(true);
  const start = useRef(0);
  useEffect(() => {
    start.current = performance.now();
    setMoving(true);
    const timer = setTimeout(() => setMoving(false), reduced ? 30 : 1150);
    return () => clearTimeout(timer);
  }, [flat, reduced, resetKey, focus]);
  const segments = useMemo(() => {
    const result: [number, number, number][][] = [];
    [-1.57, 0, 1.57].forEach((z) => {
      for (let i = -1; i <= 1; i++)
        result.push(
          [
            [-2.7, i * 0.85, z],
            [2.7, i * 0.85, z],
          ],
          [
            [i * 1.35, -1.9, z],
            [i * 1.35, 1.9, z],
          ],
        );
    });
    return result;
  }, []);
  useFrame((_, delta) => {
    if (frame.current)
      frame.current.scale.z = THREE.MathUtils.lerp(
        frame.current.scale.z,
        flat ? 0.001 : 1,
        reduced ? 1 : 1 - Math.exp(-delta * 6),
      );
    if (moving) {
      const o = data.find((d) => d.id === selected);
      const target =
        focus && o
          ? new THREE.Vector3(...position(o, flat)).multiplyScalar(0.4)
          : new THREE.Vector3();
      const destination = flat
        ? new THREE.Vector3(0, 0, 10)
        : new THREE.Vector3(6, 3.5, 8);
      camera.position.lerp(destination, reduced ? 1 : 1 - Math.exp(-delta * 5));
      camera.lookAt(target);
    }
  });
  return (
    <>
      <group ref={frame}>
        <mesh>
          <boxGeometry args={[5.4, 3.8, 3.15]} />
          <meshPhysicalMaterial
            color="#b9c7fa"
            transmission={0.85}
            roughness={0.15}
            thickness={0.2}
            transparent
            opacity={0.14}
            depthWrite={false}
          />
          <Edges color="#768cc7" threshold={15} />
        </mesh>
        {segments.map((p, i) => (
          <Line
            key={i}
            points={p as [number, number, number][]}
            color="#7e8fbd"
            transparent
            opacity={0.13}
            lineWidth={0.6}
          />
        ))}
        {[1, 10].map((n) => (
          <group key={n}>
            <Html position={[(n - 5.5) * 0.54, -2.05, -1.6]} center>
              <span className="av-axis-3d">{n}</span>
            </Html>
            <Html position={[-2.9, (n - 5.5) * 0.38, -1.6]} center>
              <span className="av-axis-3d">{n}</span>
            </Html>
            <Html position={[2.9, -2.05, (n - 5.5) * 0.35]} center>
              <span className="av-axis-3d">{n}</span>
            </Html>
          </group>
        ))}
        <Html position={[0, -2.3, 0]} center>
          <span className="av-axis-3d">EFFORT →</span>
        </Html>
        <Html position={[-3.15, 0, 0]} center>
          <span className="av-axis-3d">VALUE ↑</span>
        </Html>
        <Html position={[2.8, 2, 1.8]} center>
          <span className="av-axis-3d">EVIDENCE ↗</span>
        </Html>
      </group>
      {data.map((o) => (
        <PrismPoint
          key={o.id}
          o={o}
          flat={flat}
          selected={o.id === selected}
          onSelect={onSelect}
          reduced={reduced}
        />
      ))}
      {!flat &&
        data.flatMap((o) =>
          o.dependencies
            .filter((id) => data.some((d) => d.id === id))
            .map((id) => (
              <Line
                key={`${o.id}-${id}`}
                points={[
                  position(data.find((d) => d.id === id)!, false),
                  position(o, false),
                ]}
                color="#a5a6dc"
                transparent
                opacity={0.28}
                dashed
                dashSize={0.07}
                gapSize={0.07}
                lineWidth={0.7}
              />
            )),
        )}
      <OrbitControls
        key={`${flat}-${resetKey}-${focus}`}
        enabled={!flat && !moving}
        enablePan={false}
        minDistance={5}
        maxDistance={17}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
      />
    </>
  );
}
export default function SpatialScene({
  variant = "hero",
  data = [],
  flat = false,
  selected = "",
  onSelect = () => {},
  reduced = false,
  focus = false,
  resetKey = 0,
}: {
  variant?: "hero" | "prism" | "closing";
  data?: Opportunity[];
  flat?: boolean;
  selected?: string;
  onSelect?: (id: string) => void;
  reduced?: boolean;
  focus?: boolean;
  resetKey?: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      camera={{
        position: variant === "prism" ? [0, 0, 10] : [0, 0.2, 7.5],
        fov: variant === "prism" ? 40 : 32,
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <StudioLight />
      {variant === "prism" ? (
        <Prism
          data={data}
          flat={flat}
          selected={selected}
          onSelect={onSelect}
          reduced={reduced}
          focus={focus}
          resetKey={resetKey}
        />
      ) : (
        <Marketplace coherent={variant === "closing"} reduced={reduced} />
      )}
    </Canvas>
  );
}
