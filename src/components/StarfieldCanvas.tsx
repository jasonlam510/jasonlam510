import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ZODIAC_CONSTELLATIONS } from "../data/zodiac";

const CONFIG = {
  activeOpacity: 1,
  ambientOpacity: 0.2,
  baseVelocity: 0.18,
  damping: 0.95,
  desktopStars: 200,
  glowBlur: 15,
  interactionRadius: 150,
  mobileStars: 110,
  opacityLerp: 0.05,
  parallaxStrength: 18,
  zodiacRadius: 200,
} as const;

type StarfieldCanvasProps = {
  scrollElement: HTMLElement | null;
};

type AmbientStar = {
  alpha: number;
  driftX: number;
  driftY: number;
  originX: number;
  originY: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type ConstellationPoint = {
  brightness: number;
  currentOpacity: number;
  radius: number;
  targetOpacity: number;
  x: number;
  y: number;
};

type ConstellationInstance = {
  brightAnchor: ConstellationPoint;
  center: { x: number; y: number };
  connections: Array<[number, number]>;
  currentOpacity: number;
  label: string;
  stars: ConstellationPoint[];
  targetOpacity: number;
};

export function StarfieldCanvas({ scrollElement }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !scrollElement) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const canvasElement = canvas;
    const drawingContext = context;
    const scroller = scrollElement;

    let animationFrame = 0;
    let viewport = { width: window.innerWidth, height: window.innerHeight };
    let ambientStars: AmbientStar[] = [];
    let constellations: ConstellationInstance[] = [];
    let pointer = {
      active: false,
      x: viewport.width / 2,
      y: viewport.height / 2,
    };
    let parallaxTarget = { x: 0, y: 0 };
    let parallaxCurrent = { x: 0, y: 0 };
    const constellationLabels = {
      gemini: t("constellations.gemini"),
      leo: t("constellations.leo"),
      taurus: t("constellations.taurus"),
    };

    function getStarCount() {
      return viewport.width <= 768 ? CONFIG.mobileStars : CONFIG.desktopStars;
    }

    function createAmbientStars() {
      ambientStars = Array.from({ length: getStarCount() }, () => {
        const x = Math.random() * viewport.width;
        const y = Math.random() * viewport.height;

        return {
          alpha: Math.random() * 0.42 + 0.24,
          driftX: (Math.random() - 0.5) * 0.12,
          driftY: (Math.random() - 0.5) * 0.12,
          originX: x,
          originY: y,
          radius: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * CONFIG.baseVelocity,
          vy: (Math.random() - 0.5) * CONFIG.baseVelocity,
          x,
          y,
        };
      });
    }

    function buildConstellations() {
      constellations = Object.values(ZODIAC_CONSTELLATIONS).map((definition) => {
        const stars = definition.stars.map((star) => ({
          brightness: star.brightness,
          currentOpacity: CONFIG.ambientOpacity,
          radius: 1.7 + star.brightness * 1.9,
          targetOpacity: CONFIG.ambientOpacity,
          x: (definition.anchor.x + star.x * definition.scale.x) * viewport.width,
          y: (definition.anchor.y + star.y * definition.scale.y) * viewport.height,
        }));

        const center = stars.reduce(
          (accumulator, star) => ({
            x: accumulator.x + star.x,
            y: accumulator.y + star.y,
          }),
          { x: 0, y: 0 },
        );

        center.x /= stars.length;
        center.y /= stars.length;

        const brightAnchor = stars.reduce((brightest, star) =>
          star.brightness > brightest.brightness ? star : brightest,
        );

        return {
          brightAnchor,
          center,
          connections: definition.connections,
          currentOpacity: CONFIG.ambientOpacity,
          label: constellationLabels[definition.id],
          stars,
          targetOpacity: CONFIG.ambientOpacity,
        };
      });
    }

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      viewport = { width: window.innerWidth, height: window.innerHeight };

      canvasElement.width = viewport.width * ratio;
      canvasElement.height = viewport.height * ratio;
      canvasElement.style.width = `${viewport.width}px`;
      canvasElement.style.height = `${viewport.height}px`;

      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      createAmbientStars();
      buildConstellations();
      updateHeroFade();
    }

    function updateHeroFade() {
      const aboutSection = document.getElementById("about");

      if (!aboutSection) {
        return;
      }

      const fadeDistance = aboutSection.offsetTop * 0.65;
      const progress = Math.min(scroller.scrollTop / Math.max(fadeDistance, 1), 1);
      canvasElement.style.opacity = `${1 - progress}`;
    }

    function updateParallaxFromScroll() {
      const maxScroll = Math.max(scroller.scrollHeight - viewport.height, 1);
      const scrollProgress = scroller.scrollTop / maxScroll;
      parallaxTarget.y = (scrollProgress - 0.5) * CONFIG.parallaxStrength * 1.4;
    }

    function updateAmbientStars() {
      ambientStars.forEach((star) => {
        const dx = star.x - pointer.x;
        const dy = star.y - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (pointer.active && distance < CONFIG.interactionRadius && distance > 0) {
          const force = (CONFIG.interactionRadius - distance) / CONFIG.interactionRadius;
          star.vx += (dx / distance) * force * 1.8;
          star.vy += (dy / distance) * force * 1.8;
        }

        const homeX = (star.originX - star.x) * 0.004;
        const homeY = (star.originY - star.y) * 0.004;

        star.vx = (star.vx + homeX + star.driftX * 0.015) * CONFIG.damping;
        star.vy = (star.vy + homeY + star.driftY * 0.015) * CONFIG.damping;
        star.x += star.vx;
        star.y += star.vy;

        drawingContext.beginPath();
        drawingContext.arc(
          star.x + parallaxCurrent.x,
          star.y + parallaxCurrent.y,
          star.radius,
          0,
          Math.PI * 2,
        );
        drawingContext.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        drawingContext.fill();
      });
    }

    function updateConstellationStates() {
      constellations.forEach((constellation) => {
        const distance = Math.hypot(
          pointer.x - constellation.center.x,
          pointer.y - constellation.center.y,
        );
        const isActive = pointer.active && distance <= CONFIG.zodiacRadius;
        constellation.targetOpacity = isActive ? CONFIG.activeOpacity : CONFIG.ambientOpacity;
        constellation.currentOpacity +=
          (constellation.targetOpacity - constellation.currentOpacity) * CONFIG.opacityLerp;

        constellation.stars.forEach((star) => {
          star.targetOpacity = constellation.targetOpacity;
          star.currentOpacity += (star.targetOpacity - star.currentOpacity) * CONFIG.opacityLerp;
        });
      });
    }

    function drawConstellations() {
      drawingContext.save();
      drawingContext.font = '500 12px "Inter", system-ui, sans-serif';
      drawingContext.textBaseline = "middle";

      constellations.forEach((constellation) => {
        drawingContext.save();

        if (constellation.currentOpacity > 0.45) {
          drawingContext.shadowBlur = CONFIG.glowBlur;
          drawingContext.shadowColor = "rgba(154, 206, 255, 0.8)";
        }

        drawingContext.lineWidth = 1.15;
        drawingContext.strokeStyle = `rgba(186, 223, 255, ${constellation.currentOpacity})`;

        constellation.connections.forEach(([fromIndex, toIndex]) => {
          const from = constellation.stars[fromIndex];
          const to = constellation.stars[toIndex];

          drawingContext.beginPath();
          drawingContext.moveTo(from.x + parallaxCurrent.x, from.y + parallaxCurrent.y);
          drawingContext.lineTo(to.x + parallaxCurrent.x, to.y + parallaxCurrent.y);
          drawingContext.stroke();
        });

        constellation.stars.forEach((star) => {
          drawingContext.beginPath();
          drawingContext.arc(
            star.x + parallaxCurrent.x,
            star.y + parallaxCurrent.y,
            star.radius,
            0,
            Math.PI * 2,
          );
          drawingContext.fillStyle = `rgba(255, 255, 255, ${star.currentOpacity})`;
          drawingContext.fill();
        });

        if (constellation.currentOpacity > 0.8) {
          const labelOpacity = (constellation.currentOpacity - 0.8) / 0.2;
          drawingContext.fillStyle = `rgba(227, 236, 255, ${labelOpacity})`;
          drawingContext.fillText(
            constellation.label,
            constellation.brightAnchor.x + parallaxCurrent.x + 14,
            constellation.brightAnchor.y + parallaxCurrent.y - 14,
          );
        }

        drawingContext.restore();
      });

      drawingContext.restore();
    }

    function renderFrame() {
      parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * 0.06;
      parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * 0.06;

      drawingContext.clearRect(0, 0, viewport.width, viewport.height);
      updateAmbientStars();
      updateConstellationStates();
      drawConstellations();

      animationFrame = window.requestAnimationFrame(renderFrame);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer = {
        active: true,
        x: event.clientX,
        y: event.clientY,
      };
    }

    function handlePointerLeave() {
      pointer = {
        ...pointer,
        active: false,
      };
    }

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
      const gamma = event.gamma || 0;
      const beta = event.beta || 0;
      parallaxTarget.x = (gamma / 45) * CONFIG.parallaxStrength;
      parallaxTarget.y = (beta / 45) * (CONFIG.parallaxStrength * 0.7);
    }

    function handleScroll() {
      updateParallaxFromScroll();
      updateHeroFade();
    }

    resizeCanvas();
    updateParallaxFromScroll();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

    renderFrame();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [i18n.resolvedLanguage, scrollElement, t]);

  return <canvas aria-hidden="true" className="starfield" ref={canvasRef} />;
}
