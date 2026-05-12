export const STARFIELD_CANVAS_CONFIG = {
  pixelRatioCap: 3,
  targetFrameIntervalMs: 1000 / 60,
  minRenderOpacity: 0.02,
} as const;

export function getStarfieldRenderPixelRatio(devicePixelRatio = window.devicePixelRatio || 1) {
  return Math.max(1, Math.min(devicePixelRatio, STARFIELD_CANVAS_CONFIG.pixelRatioCap));
}
