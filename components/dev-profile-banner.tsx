import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const profiles = [
  {
    name: "Sarthak Mohanty",
    title: "Software Engineer",
    image: "https://picsum.photos/id/1/200/300?blur",
  },
  {
    name: "Jane Doe",
    title: "Frontend Developer",
    image: "https://picsum.photos/id/1/200/300?blur",
  },
  {
    name: "John Smith",
    title: "Backend Developer",
    image: "https://picsum.photos/id/1/200/300?blur",
  },
  // Add more profiles as needed
];

export function DevProfileBanner() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [position, setPosition] = useState({ top: "0%", left: "0%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      setPosition({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      });
    }, 5000); // Change profile every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed z-50 flex flex-row items-center justify-center gap-2 rounded-lg bg-black/80 p-4"
      style={{ top: position.top, left: position.left }}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 5 }} // Increased duration for slower transition
    >
      <Image
        src={profiles[profileIndex].image}
        alt="Profile Image"
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-white">
          {profiles[profileIndex].name}
        </p>
        <p className="text-xs text-gray-400">{profiles[profileIndex].title}</p>
      </div>
    </motion.div>
  );
}
