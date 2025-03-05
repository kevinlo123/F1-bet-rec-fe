import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useColorMode } from '../../../contexts/ColorModeContext'; // Import the custom hook

const ColorSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Use context to get the color mode and toggle function

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y
    }
  };

  return (
    <>
      <motion.div variants={variants} animate="default" className="mouse-cursor cursor-outer" />
      <motion.div variants={variants} animate="default" className="mouse-cursor cursor-inner" />

      <div className="my_switcher">
        <ul>
          <li>
            <Link href="#/">
              <a
                className={`setColor ${colorMode === "light" ? "active" : ""}`}
                onClick={toggleColorMode} // Use the toggleColorMode function from context
              >
                <span title="Light Mode">Light</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#/">
              <a
                className={`setColor ${colorMode === "dark" ? "active" : ""}`}
                onClick={toggleColorMode} // Use the toggleColorMode function from context
              >
                <span title="Dark Mode">Dark</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ColorSwitcher;
