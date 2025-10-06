import { Variants, Transition } from "framer-motion";

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Ball-like bounce: fall → squash → rebound → apex → loop */
export const bounceBall = {
  y: [0, 120, 140, 40, 0], // px (positive is downward)
  scaleY: [1, 1, 0.85, 1.02, 1], // squash at impact
  scaleX: [1, 1, 1.1, 0.98, 1], // stretch sideways at impact
};

export const bounceBallTransition: Transition = {
  duration: 2.4,
  times: [0, 0.5, 0.6, 0.85, 1],
  ease: [
    [0.12, 0, 0.39, 0], // accelerate down
    [0.12, 0, 0.39, 0], // into squash
    [0.61, 1, 0.88, 1], // rebound up
    [0.61, 1, 0.88, 1], // to apex
  ],
  repeat: Infinity,
};

/** Floor shadow under the ball (bigger/darker at impact) */
export const bounceShadow = {
  scale: [0.6, 0.9, 1.25, 0.8, 0.6],
  opacity: [0.2, 0.28, 0.48, 0.25, 0.2],
};

export const bounceShadowTransition: Transition = {
  duration: 2.4,
  times: [0, 0.5, 0.6, 0.85, 1],
  ease: [
    [0.12, 0, 0.39, 0],
    [0.12, 0, 0.39, 0],
    [0.61, 1, 0.88, 1],
    [0.61, 1, 0.88, 1],
  ],
  repeat: Infinity,
};
