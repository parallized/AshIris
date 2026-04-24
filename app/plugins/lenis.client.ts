import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  // 1. 注册插件
  gsap.registerPlugin(ScrollTrigger);

  // 2. 初始化 Lenis
  const lenis = new Lenis({
    duration: 0.68,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    lerp: 0.22,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    syncTouch: true,
    syncTouchLerp: 0.16,
    wheelMultiplier: 1.14,
    touchMultiplier: 1.04,
  });

  // 3. 独立 RAF 循环，解耦与 GSAP Ticker 的强绑定
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 4. 当 Lenis 滚动时，同步通知 ScrollTrigger 更新
  lenis.on("scroll", ScrollTrigger.update);

  return {
    provide: {
      lenis,
      gsap,
      ScrollTrigger,
    },
  };
});
