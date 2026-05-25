import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the repeating GSAP boilerplate used across pages:
 *  - Creates a scoped gsap.context tied to the ref
 *  - Skips animations when `prefers-reduced-motion: reduce` is active
 *  - Refreshes ScrollTrigger after fonts and assets load
 *  - Cleans up everything on unmount
 *
 * @param ref  – React ref attached to the section/page root element
 * @param animations – Callback containing the page-specific GSAP animations
 * @param deps – Optional dependency array (defaults to [])
 */
export function useGsapContext(
  ref: RefObject<HTMLElement | null>,
  animations: (reducedMotion: boolean) => void,
  deps: React.DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      animations(reduce);
    }, ref);

    const doRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", doRefresh);
    if (document.fonts?.ready) document.fonts.ready.then(doRefresh);

    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      window.removeEventListener("load", doRefresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
