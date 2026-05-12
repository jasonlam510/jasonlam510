import { useEffect, useRef } from "react";
import { STARFIELD_CANVAS_CONFIG, getStarfieldRenderPixelRatio } from "../config/starfield";

type StarfieldCanvasProps = {
  scrollElement: HTMLElement | null;
};

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uStarFocus;

out vec4 fragColor;

#define time uTime

mat2 mm2(in float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}

mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

float tri(in float x) {
  return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
}

vec2 tri2(in vec2 p) {
  return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
}

float triNoise2d(in vec2 p, float spd) {
  float z = 1.8;
  float z2 = 2.5;
  float rz = 0.0;
  p *= mm2(p.x * 0.06);
  vec2 bp = p;
  mat2 noiseSpin = mm2(time * spd);

  for (float i = 0.0; i < 4.0; i++) {
    vec2 dg = tri2(bp * 1.85) * 0.75;
    dg *= noiseSpin;
    p -= dg / z2;

    bp *= 1.3;
    z2 *= 0.45;
    z *= 0.42;
    p *= 1.21 + (rz - 1.0) * 0.02;

    rz += tri(p.x + tri(p.y)) * z;
    p *= -m2;
  }

  return clamp(1.0 / pow(rz * 29.0, 1.3), 0.0, 0.55);
}

float hash21(in vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec4 aurora(vec3 ro, vec3 rd, vec2 fragCoord) {
  vec4 col = vec4(0.0);
  vec4 avgCol = vec4(0.0);

  for (float i = 0.0; i < 34.0; i++) {
    float of = 0.006 * hash21(fragCoord.xy) * smoothstep(0.0, 15.0, i);
    float pt = ((0.8 + pow(i, 1.4) * 0.002) - ro.y) / (rd.y * 2.0 + 0.4);
    pt -= of;
    vec3 bpos = ro + pt * rd;
    vec2 p = bpos.zx;
    float rzt = triNoise2d(p, 0.12);
    vec4 col2 = vec4(0.0, 0.0, 0.0, rzt);
    col2.rgb = (sin(1.0 - vec3(2.15, -0.5, 1.2) + i * 0.043) * 0.5 + 0.5) * rzt;
    avgCol = mix(avgCol, col2, 0.5);
    col += avgCol * exp2(-i * 0.065 - 2.5) * smoothstep(0.0, 5.0, i);
  }

  col *= clamp(rd.y * 15.0 + 0.4, 0.0, 1.0);
  return col * 1.8;
}

vec3 nmzHash33(vec3 q) {
  uvec3 p = uvec3(ivec3(q));
  p = p * uvec3(374761393U, 1103515245U, 668265263U) + p.zxy + p.yzx;
  p = p.yzx * (p.zxy ^ (p >> 3U));
  return vec3(p ^ (p >> 16U)) * (1.0 / vec3(0xffffffffU));
}

vec3 stars(in vec3 p, float starFocus) {
  vec3 c = vec3(0.0);
  float res = uResolution.x;
  float starRadius = mix(0.72, 0.22, starFocus);

  for (float i = 0.0; i < 4.0; i++) {
    vec3 q = fract(p * (0.15 * res)) - 0.5;
    vec3 id = floor(p * (0.15 * res));
    vec2 rn = nmzHash33(id).xy;
    float c2 = 1.0 - smoothstep(0.0, starRadius, length(q));
    c2 *= step(rn.x, 0.003 + i * i * 0.0025);
    c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.0), rn.y) * 0.1 + 0.9);
    p *= 1.3;
  }

  float sharpenBoost = mix(1.15, 2.0, starFocus);
  return c * c * sharpenBoost;
}

vec3 bg(in vec3 rd) {
  float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd) * 0.5 + 0.5;
  sd = pow(sd, 5.0);
  vec3 col = mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.05, 0.2), sd);
  return col * 0.63;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 q = fragCoord / uResolution.xy;
  vec2 p = q - 0.5;
  p.x *= uResolution.x / uResolution.y;
  float localStarFocus = uStarFocus;

  vec3 ro = vec3(0.0, 0.0, -6.7);
  vec3 rd = normalize(vec3(p, 1.3));

  rd.yz *= mm2(0.1);
  rd.xz *= mm2(-0.1);

  vec3 col = vec3(0.0);
  vec3 brd = rd;
  float fade = smoothstep(0.0, 0.01, abs(brd.y)) * 0.1 + 0.9;

  col = bg(rd) * fade;

  if (rd.y > 0.0) {
    vec4 aur = smoothstep(0.0, 1.5, aurora(ro, rd, fragCoord)) * fade;
    vec3 starCol = stars(rd, localStarFocus);
    col = col * (1.0 - aur.a) + aur.rgb;
    col += starCol * (0.45 + 0.95 * localStarFocus);
  } else {
    rd.y = abs(rd.y);
    col = bg(rd) * fade * 0.6;
    vec4 aur = smoothstep(0.0, 2.5, aurora(ro, rd, fragCoord));
    vec3 starCol = stars(rd, localStarFocus);
    col = col * (1.0 - aur.a) + aur.rgb;
    col += starCol * (0.1 + 0.16 * localStarFocus);
    vec3 pos = ro + ((0.5 - ro.y) / rd.y) * rd;
    float nz2 = triNoise2d(pos.xz * vec2(0.5, 0.7), 0.0);
    col += mix(vec3(0.2, 0.25, 0.5) * 0.08, vec3(0.3, 0.3, 0.5) * 0.7, nz2 * 0.4);
  }

  fragColor = vec4(col, 1.0);
}
`;

const FRAME_INTERVAL_TOLERANCE_MS = 1;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) {
      gl.deleteShader(vertexShader);
    }

    if (fragmentShader) {
      gl.deleteShader(fragmentShader);
    }

    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  gl.deleteProgram(program);
  return null;
}

export function StarfieldCanvas({ scrollElement }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !scrollElement) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      stencil: false,
    }) as WebGL2RenderingContext | null;

    if (!gl) {
      return;
    }

    const webgl = gl;
    const program = createProgram(webgl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

    if (!program) {
      return;
    }

    const positionLocation = webgl.getAttribLocation(program, "aPosition");
    const resolutionLocation = webgl.getUniformLocation(program, "uResolution");
    const timeLocation = webgl.getUniformLocation(program, "uTime");
    const starFocusLocation = webgl.getUniformLocation(program, "uStarFocus");
    const buffer = webgl.createBuffer();

    if (
      positionLocation === -1 ||
      !resolutionLocation ||
      !timeLocation ||
      !starFocusLocation ||
      !buffer
    ) {
      webgl.deleteProgram(program);
      if (buffer) {
        webgl.deleteBuffer(buffer);
      }
      return;
    }

    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(
      webgl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      webgl.STATIC_DRAW,
    );

    webgl.useProgram(program);
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
    webgl.uniform1f(starFocusLocation, 0.18);

    const canvasElement = canvas;
    const scroller = scrollElement;
    let animationFrame: number | null = null;
    let scrollFadeFrame: number | null = null;
    let documentVisible = document.visibilityState === "visible";
    let fadeDistance = 1;
    const frameInterval = STARFIELD_CANVAS_CONFIG.targetFrameIntervalMs;
    let isCanvasVisible = true;
    let lastOpacity = -1;
    let lastRenderTime = 0;
    let viewport = { height: window.innerHeight, width: window.innerWidth };

    function resizeCanvas() {
      viewport = { height: window.innerHeight, width: window.innerWidth };
      const ratio = getStarfieldRenderPixelRatio();
      const displayWidth = Math.max(1, Math.round(viewport.width));
      const displayHeight = Math.max(1, Math.round(viewport.height));
      const renderWidth = Math.max(1, Math.round(displayWidth * ratio));
      const renderHeight = Math.max(1, Math.round(displayHeight * ratio));
      const styleWidth = `${displayWidth}px`;
      const styleHeight = `${displayHeight}px`;

      if (canvasElement.width !== renderWidth || canvasElement.height !== renderHeight) {
        canvasElement.width = renderWidth;
        canvasElement.height = renderHeight;
        webgl.viewport(0, 0, renderWidth, renderHeight);
        webgl.uniform2f(resolutionLocation, renderWidth, renderHeight);
      }

      if (canvasElement.style.width !== styleWidth) {
        canvasElement.style.width = styleWidth;
      }

      if (canvasElement.style.height !== styleHeight) {
        canvasElement.style.height = styleHeight;
      }

      updateFadeDistance();
      updateHeroFade();
      lastRenderTime = 0;
      scheduleRender();
    }

    function updateFadeDistance() {
      const aboutSection = document.getElementById("about");
      fadeDistance = Math.max(
        ((aboutSection && aboutSection.offsetTop) || viewport.height) * 0.65,
        1,
      );
    }

    function updateHeroFade() {
      const progress = Math.min(scroller.scrollTop / fadeDistance, 1);
      const opacity = Math.max(0, 1 - progress);
      const wasCanvasVisible = isCanvasVisible;

      if (Math.abs(opacity - lastOpacity) > 0.005) {
        canvasElement.style.opacity = opacity.toFixed(3);
        lastOpacity = opacity;
      }

      isCanvasVisible = opacity > STARFIELD_CANVAS_CONFIG.minRenderOpacity;

      if (wasCanvasVisible && !isCanvasVisible && animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      if (!wasCanvasVisible && isCanvasVisible) {
        lastRenderTime = 0;
        scheduleRender();
      }
    }

    function scheduleRender() {
      if (animationFrame !== null || !documentVisible || !isCanvasVisible) {
        return;
      }

      animationFrame = window.requestAnimationFrame(renderFrame);
    }

    function renderFrame(timestamp: number) {
      animationFrame = null;

      if (!documentVisible || !isCanvasVisible) {
        return;
      }

      if (
        lastRenderTime === 0 ||
        timestamp - lastRenderTime >= frameInterval - FRAME_INTERVAL_TOLERANCE_MS
      ) {
        lastRenderTime = timestamp;
        webgl.uniform1f(timeLocation, timestamp * 0.001);
        webgl.drawArrays(webgl.TRIANGLES, 0, 6);
      }

      scheduleRender();
    }

    function handleScroll() {
      if (scrollFadeFrame !== null) {
        return;
      }

      scrollFadeFrame = window.requestAnimationFrame(() => {
        scrollFadeFrame = null;
        updateHeroFade();
      });
    }

    function handleVisibilityChange() {
      documentVisible = document.visibilityState === "visible";

      if (!documentVisible && animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
        return;
      }

      if (documentVisible) {
        lastRenderTime = 0;
        scheduleRender();
      }
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    scheduleRender();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (scrollFadeFrame !== null) {
        window.cancelAnimationFrame(scrollFadeFrame);
      }

      window.removeEventListener("resize", resizeCanvas);
      scroller.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      webgl.deleteBuffer(buffer);
      webgl.deleteProgram(program);
    };
  }, [scrollElement]);

  return <canvas aria-hidden="true" className="starfield" ref={canvasRef} />;
}
