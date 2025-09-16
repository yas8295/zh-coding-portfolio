import React from "react";
import { motion } from "framer-motion";

interface AnimatedCursorProps {
  isVisible: boolean;
  position: { x: number; y: number };
  isClicking: boolean;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  isVisible,
  position,
  isClicking,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999999] mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-75"></div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
        animate={{
          scale: isClicking ? 2 : 1,
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
};

export default AnimatedCursor;
