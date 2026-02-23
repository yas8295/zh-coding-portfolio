import { useEffect, useRef } from "react";

interface HeroBgProps {
  speed?: number;
  frequency?: number;
  amplitude?: number;
  intensity?: number;
  rotation?: number;
  translateX?: number;
  translateY?: number;
  backgroundColor?: string;
  glowColor?: string;
  isDark?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
};

const HeroBg = ({
  speed = 1.0,
  frequency = 1.0,
  amplitude = 0.3,
  intensity = 0.2,
  rotation = 0,
  translateX = 0,
  translateY = 0,
  backgroundColor = "#000000",
  glowColor = "#1becac",
  isDark = true,
}: HeroBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const configRef = useRef({
    speed,
    frequency,
    amplitude,
    intensity,
    rotation,
    translateX,
    translateY,
    backgroundColor,
    glowColor,
    isDark,
  });

  useEffect(() => {
    configRef.current = {
      speed,
      frequency,
      amplitude,
      intensity,
      rotation,
      translateX,
      translateY,
      backgroundColor,
      glowColor,
      isDark,
    };
  }, [
    speed,
    frequency,
    amplitude,
    intensity,
    rotation,
    translateX,
    translateY,
    backgroundColor,
    glowColor,
    isDark,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL 2 not supported");
      return;
    }

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
      
      // Control Uniforms
      uniform float u_freq;
      uniform float u_amp;
      uniform float u_intensity;
      uniform float u_rot;
      uniform vec2 u_trans;
      uniform vec3 u_bg_color;
      uniform vec3 u_glow_color;
      uniform float u_isLight;

      out vec4 outColor;

      #define FC gl_FragCoord

      // 2D Rotation Matrix
      mat2 rotate2d(float _angle){
          return mat2(cos(_angle),-sin(_angle),
                      sin(_angle),cos(_angle));
      }

      void main() {
        // Normalize coordinates to -1.0 to 1.0, correcting for aspect ratio
        vec2 p = (FC.xy * 2. - u_resolution) / u_resolution.y;

        // Apply Translation
        p -= u_trans;

        // Apply Rotation
        p = rotate2d(radians(u_rot)) * p;

        // Calculate the Wave
        float wave = u_amp * cos(u_time + p.x * u_freq);

        // Calculate Glow
        float glow = u_intensity / abs(p.y + wave);

        // Compress high values to avoid artifacts
        float glowIntensity = tanh(glow);

        vec3 finalGlow = u_glow_color * glowIntensity;

        // For light backgrounds we subtract a toned glow so it becomes visible;
        // for dark backgrounds we add the glow additively.
        vec3 add = u_bg_color + finalGlow;
        vec3 sub = clamp(u_bg_color - finalGlow * 0.8, 0.0, 1.0);
        vec3 finalColor = mix(add, sub, u_isLight);

        outColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (
      gl: WebGL2RenderingContext,
      type: number,
      source: string,
    ) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link failed:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uFreqLoc = gl.getUniformLocation(program, "u_freq");
    const uAmpLoc = gl.getUniformLocation(program, "u_amp");
    const uIntLoc = gl.getUniformLocation(program, "u_intensity");
    const uRotLoc = gl.getUniformLocation(program, "u_rot");
    const uTransLoc = gl.getUniformLocation(program, "u_trans");
    const uBgColorLoc = gl.getUniformLocation(program, "u_bg_color");
    const uGlowColorLoc = gl.getUniformLocation(program, "u_glow_color");
    const uIsLightLoc = gl.getUniformLocation(program, "u_isLight");

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

    const startTime = performance.now();

    const render = () => {
      if (!gl) return;

      const {
        speed,
        frequency,
        amplitude,
        intensity,
        rotation,
        translateX,
        translateY,
        backgroundColor,
        glowColor,
        isDark,
      } = configRef.current;

      gl.uniform2f(uResLoc, canvas.width, canvas.height);

      const currentTime = ((performance.now() - startTime) / 1000) * speed;
      gl.uniform1f(uTimeLoc, currentTime);

      gl.uniform1f(uFreqLoc, frequency);
      gl.uniform1f(uAmpLoc, amplitude);
      gl.uniform1f(uIntLoc, intensity);
      gl.uniform1f(uRotLoc, rotation);
      gl.uniform2f(uTransLoc, translateX, translateY);

      const rgb = hexToRgb(backgroundColor);
      gl.uniform3f(uBgColorLoc, rgb[0], rgb[1], rgb[2]);

      const glowRgb = hexToRgb(glowColor);
      gl.uniform3f(uGlowColorLoc, glowRgb[0], glowRgb[1], glowRgb[2]);
      // Pass 1.0 if light background, 0.0 if dark background
      const isLight = !isDark;
      gl.uniform1f(uIsLightLoc, isLight ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

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
  }, []);

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
      }}
    />
  );
};

export default HeroBg;
