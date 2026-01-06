const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const isSafari = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua) && !/Android/.test(ua);
};

const supportsNativeSmoothScroll = () => {
  if (typeof document === "undefined") {
    return false;
  }
  return "scrollBehavior" in document.documentElement.style;
};

const easeInOutSine = (t) => 0.5 * (1 - Math.cos(Math.PI * t));

const smoothScrollTo = (targetY, { duration } = {}) => {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const resolvedDuration =
    duration ?? Math.min(1600, Math.max(700, Math.abs(distance) * 1.05));
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / resolvedDuration, 1);
    const eased = easeInOutSine(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

export const scrollToTop = () => {
  if (typeof window === "undefined") return;

  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
    return;
  }

  if (supportsNativeSmoothScroll() && !isSafari()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  smoothScrollTo(0);
};

export const scrollToId = (id) => {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.pageYOffset;

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    return;
  }

  if (supportsNativeSmoothScroll() && !isSafari()) {
    window.scrollTo({ top: targetY, behavior: "smooth" });
    return;
  }

  smoothScrollTo(targetY);
};
