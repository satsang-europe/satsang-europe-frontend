import { vanisToDisplay } from "@/data/vanis";
import { useEffect, useState } from "react";

const VaniComponent = () => {
  const thakurVani = vanisToDisplay;

  const [currentVaniIndex, setCurrentVaniIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentVaniIndex((prevIndex) => (prevIndex + 1) % thakurVani.length);
        setIsVisible(true);
      }, 500); // Wait 500ms for fade out before changing text
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [thakurVani.length]);
  return (
    <h2
      className={`font-bold text-sm md:text-xl text-gray-200 text-center transition-opacity duration-500 min-h-24 md:min-h-20 flex items-center justify-center px-2 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {thakurVani[currentVaniIndex]}
    </h2>
  );
};

export default VaniComponent;
