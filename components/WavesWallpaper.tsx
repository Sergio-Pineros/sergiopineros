"use client";

import { useEffect, useRef, useState } from "react";
import { WAVES_FRAGMENT_SHADER } from "@/lib/waves-shader";

const VERTEX_SHADER = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const COLORS = new Float32Array([
  0.102, 0.078, 0.137,
  0.718, 0.365, 0.412,
  0.918, 0.804, 0.761,
  1.0, 0.961, 0.922,
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
]);

const SHAPE = [1.32, 0.49, 0.84, 0.01] as const;
const FINISH = [2.27, 0.0, 0.04, 0.35] as const;
const TRANSFORM = [4984.0, 3.37, 0.4, 1.0] as const;
const SPACE = [-0.13, 0.05, 0, 0] as const;
const CURSOR = [0, 3.0, 0.54, 0.56] as const;

type Props = {
  running: boolean;
  reducedMotion: boolean;
  brightness: number;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Waves shader compile failed", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function WavesWallpaper({ running, reducedMotion, brightness }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brightnessRef = useRef(brightness);
  const [failed, setFailed] = useState(false);

  brightnessRef.current = brightness;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, WAVES_FRAGMENT_SHADER);
    if (!vertex || !fragment) {
      setFailed(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Waves shader link failed", gl.getProgramInfoLog(program));
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uColors = gl.getUniformLocation(program, "u_colors");
    const uScene = gl.getUniformLocation(program, "u_scene");
    const uShape = gl.getUniformLocation(program, "u_shape");
    const uSurface = gl.getUniformLocation(program, "u_surface");
    const uFinish = gl.getUniformLocation(program, "u_finish");
    const uTransform = gl.getUniformLocation(program, "u_transform");
    const uSpace = gl.getUniformLocation(program, "u_space");
    const uCursor = gl.getUniformLocation(program, "u_cursor");

    gl.uniform3fv(uColors, COLORS);
    gl.uniform4f(uShape, ...SHAPE);
    gl.uniform4f(uFinish, ...FINISH);
    gl.uniform4f(uTransform, ...TRANSFORM);
    gl.uniform4f(uSpace, ...SPACE);
    gl.uniform4f(uCursor, ...CURSOR);

    const started = performance.now();
    let frame = 0;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      if (disposed) return;
      resize();
      const seconds = (now - started) / 1000;
      gl.uniform4f(uScene, canvas.width, canvas.height, seconds * -0.67, 4.0);
      gl.uniform4f(uSurface, 1.73, 1.08, brightnessRef.current, 2.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || !running || document.hidden) return;
      draw(now);
      if (!reducedMotion) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (disposed || !running || document.hidden) return;
      if (reducedMotion) {
        draw(performance.now());
        return;
      }
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const observer = new ResizeObserver(() => {
      if (!running || document.hidden) return;
      if (reducedMotion || !frame) draw(performance.now());
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    startLoop();

    return () => {
      disposed = true;
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [running, reducedMotion]);

  return (
    <div className="os-wallpaper" aria-hidden="true">
      <div className="os-wallpaper__fallback" />
      {failed ? null : <canvas ref={canvasRef} className="os-wallpaper__canvas" />}
    </div>
  );
}
