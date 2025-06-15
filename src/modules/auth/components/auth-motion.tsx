import { motion } from "framer-motion";

export const AuthMotion = () => {
  return (
    <div className="relative h-full w-full bg-yellow-300 overflow-hidden flex items-center justify-center p-4">
      <motion.div
        className="absolute w-32 h-32 bg-pink-400 border-4 border-black rounded-none"
        style={{ top: "10%", left: "10%" }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 bg-cyan-400 border-4 border-black"
        style={{ top: "20%", right: "15%" }}
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-40 h-20 bg-lime-400 border-4 border-black"
        style={{ bottom: "20%", left: "5%" }}
        animate={{
          rotate: [0, -3, 3, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-28 h-28 bg-orange-400 border-4 border-black rounded-full"
        style={{ bottom: "10%", right: "20%" }}
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-36 h-16 bg-purple-400 border-4 border-black transform rotate-12"
        style={{ top: "60%", right: "5%" }}
        animate={{
          rotate: [12, 18, 6, 12],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-20 h-32 bg-red-400 border-4 border-black"
        style={{ top: "40%", left: "2%" }}
        animate={{
          x: [0, 8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute w-12 h-12 bg-yellow-500 border-2 border-black"
        style={{ top: "30%", left: "25%" }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute w-16 h-8 bg-pink-500 border-2 border-black"
        style={{ top: "70%", left: "70%" }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Main Animated Icon - Person with Phone */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <svg
          width="400"
          height="500"
          viewBox="0 0 400 500"
          className="drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
        >
          {/* Person's Body */}
          <motion.rect
            x="120"
            y="200"
            width="160"
            height="220"
            fill="#FF6B6B"
            stroke="#000"
            strokeWidth="6"
            animate={{
              y: [200, 195, 200],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Person's Head */}
          <motion.circle
            cx="200"
            cy="120"
            r="60"
            fill="#FFE66D"
            stroke="#000"
            strokeWidth="6"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Eyes */}
          <motion.circle
            cx="180"
            cy="110"
            r="8"
            fill="#000"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="220"
            cy="110"
            r="8"
            fill="#000"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Smile */}
          <motion.path
            d="M 180 130 Q 200 145 220 130"
            stroke="#000"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M 180 130 Q 200 145 220 130",
                "M 180 135 Q 200 150 220 135",
                "M 180 130 Q 200 145 220 130",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Left Arm */}
          <motion.rect
            x="60"
            y="220"
            width="80"
            height="30"
            fill="#FF6B6B"
            stroke="#000"
            strokeWidth="6"
            animate={{
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Right Arm holding phone */}
          <motion.rect
            x="260"
            y="220"
            width="80"
            height="30"
            fill="#FF6B6B"
            stroke="#000"
            strokeWidth="6"
            animate={{
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Phone */}
          <motion.rect
            x="320"
            y="180"
            width="60"
            height="100"
            rx="8"
            fill="#4ECDC4"
            stroke="#000"
            strokeWidth="6"
            animate={{
              y: [180, 175, 180],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Phone Screen */}
          <motion.rect
            x="330"
            y="195"
            width="40"
            height="70"
            rx="4"
            fill="#A8E6CF"
            stroke="#000"
            strokeWidth="3"
            animate={{
              fill: ["#A8E6CF", "#FFE66D", "#FF6B6B", "#A8E6CF"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Login Icon on Phone */}
          <motion.circle
            cx="350"
            cy="220"
            r="8"
            fill="#000"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Lock Icon */}
          <motion.rect
            x="346"
            y="235"
            width="8"
            height="6"
            fill="#000"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Legs */}
          <motion.rect
            x="140"
            y="400"
            width="40"
            height="80"
            fill="#4ECDC4"
            stroke="#000"
            strokeWidth="6"
            animate={{
              y: [400, 405, 400],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.rect
            x="220"
            y="400"
            width="40"
            height="80"
            fill="#4ECDC4"
            stroke="#000"
            strokeWidth="6"
            animate={{
              y: [400, 405, 400],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* WiFi/Signal Lines around phone */}
          <motion.path
            d="M 290 160 Q 300 150 310 160"
            stroke="#000"
            strokeWidth="4"
            fill="none"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 285 165 Q 300 150 315 165"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          <motion.path
            d="M 280 170 Q 300 150 320 170"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
        </svg>

        {/* Floating Security Icons */}
        <motion.div
          className="absolute -top-10 -left-10 w-16 h-16 bg-green-400 border-4 border-black flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <span className="text-2xl">🔒</span>
        </motion.div>

        <motion.div
          className="absolute -top-5 -right-15 w-12 h-12 bg-blue-400 border-4 border-black flex items-center justify-center"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="text-lg">✓</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
