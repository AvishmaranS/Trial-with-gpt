export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.3, ease: 'easeInOut' as const } }
};
