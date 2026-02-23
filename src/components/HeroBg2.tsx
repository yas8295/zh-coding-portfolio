import { useEffect, useRef } from "react";

interface HeroBg2Props {
  speed?: number;
  backgroundColor?: string;
  translateX?: number;
  translateY?: number;
  zoom?: number;
  intensity?: number;
  roadWidth?: number;
  waveFrequency?: number;
  glowColor?: string;
  rotation?: number;
}

const hexToVec3 = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

const HeroBg2 = ({
  speed = 1.0,
  backgroundColor = "#000000",
  translateX = 0,
  translateY = 0,
  zoom = 0.1,
  intensity = 0.25,
  roadWidth = 0.3,
  waveFrequency = 0.6,
  // Default to project primary color #1becac
  glowColor = "#1becac",
  rotation = 0,
}: HeroBg2Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const vsSource = `#version 300 es
      in vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_bgColor;
      uniform vec2 u_translate;
      uniform float u_zoom;
      uniform float u_intensity;
      uniform float u_roadWidth;
      uniform float u_waveFreq;
      uniform vec3 u_color;
      uniform float u_rotation;
      out vec4 fragColor;

      #define FC gl_FragCoord

      mat2 rotate2d(float a){ return mat2(cos(a), -sin(a), sin(a), cos(a)); }

      void main() {
        vec2 r = u_resolution;
        float t = u_time;
        vec2 p = (FC.xy * 2.0 - r) / r.y / u_zoom;
        p += u_translate;
        p = rotate2d(u_rotation) * p;

        float wave = cos(p.x * u_waveFreq - t);
        float line = u_roadWidth * sin(p.x * 0.5 + t * 0.5);
        float glow = u_intensity / abs(p.y + wave * 0.5 + line);
        float gi = tanh(glow);

        // Create subtle green variations based on horizontal position and time
        float variation = 0.9 + 0.2 * (0.5 + 0.5 * sin(p.x * 3.0 + t * 0.8));
        vec3 tint = u_color * variation;
        vec3 finalGlow = tint * gi;

        // Decide if background is light by luminance and blend accordingly
        float luminance = dot(u_bgColor, vec3(0.2126, 0.7152, 0.0722));
        vec3 darkFinal = clamp(u_bgColor + finalGlow, 0.0, 1.0);
        // For light backgrounds, interpolate toward the glow color so it becomes visible
        vec3 lightFinal = mix(u_bgColor, finalGlow, clamp(glow, 0.0, 1.0));

        vec3 final = luminance < 0.5 ? darkFinal : lightFinal;

        fragColor = vec4(final, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const bgColorLocation = gl.getUniformLocation(program, "u_bgColor");
    const translateLocation = gl.getUniformLocation(program, "u_translate");
    const zoomLocation = gl.getUniformLocation(program, "u_zoom");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    const roadWidthLocation = gl.getUniformLocation(program, "u_roadWidth");
    const waveFreqLocation = gl.getUniformLocation(program, "u_waveFreq");
    const colorLocation = gl.getUniformLocation(program, "u_color");
    const rotationLocation = gl.getUniformLocation(program, "u_rotation");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const bg = hexToVec3(backgroundColor);

    const render = (time: number) => {
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001 * speed);
      gl.uniform3f(bgColorLocation, bg[0], bg[1], bg[2]);
      gl.uniform2f(translateLocation, translateX, translateY);
      gl.uniform1f(zoomLocation, zoom);
      gl.uniform1f(intensityLocation, intensity);
      gl.uniform1f(roadWidthLocation, roadWidth);
      gl.uniform1f(waveFreqLocation, waveFrequency);
      const colorVec = hexToVec3(glowColor);
      gl.uniform3f(colorLocation, colorVec[0], colorVec[1], colorVec[2]);
      gl.uniform1f(rotationLocation, rotation);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    speed,
    backgroundColor,
    translateX,
    translateY,
    zoom,
    intensity,
    roadWidth,
    waveFrequency,
    glowColor,
    rotation,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.15,
      }}
    />
  );
};

export default HeroBg2;
