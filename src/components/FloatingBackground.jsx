import React from 'react';
import { motion } from 'framer-motion';

const emojis = ['🎓', '📚', '✏️', '✨', '🌟', '🏫', '🍎', '🔬', '🎨', '🎵'];

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: 0.12 }}>
      {emojis.map((emoji, index) => {
        // Randomize initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDuration = 15 + Math.random() * 20;
        const randomDelay = Math.random() * -20;

        return (
          <motion.div
            key={index}
            className="absolute text-4xl sm:text-6xl"
            initial={{
              x: `${randomX}vw`,
              y: `${randomY}vh`,
            }}
            animate={{
              y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`],
              x: [`${randomX}vw`, `${randomX + 10}vw`, `${randomX}vw`],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: randomDuration,
              ease: "linear",
              repeat: Infinity,
              delay: randomDelay,
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingBackground;
