"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Banner() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error loading brands:", err));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="mt-14 flex justify-center px-4 sm:px-6 lg:px-8 cursor-default">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {brands.map((brand) => (
          <motion.div
            key={brand.id}
            variants={itemVariants}
            whileHover={{}}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="outline-1 outline-gray-300 group relative w-full aspect-square overflow-hidden bg-white transition-all hover:shadow-md duration-300 hover:-translate-y-[2px] cursor-pointer"
          >
            <Link href={`/products/${brand.slug}`}>
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="relative w-full h-[70%] flex items-center justify-center">
                  <img
                    src={brand.image}
                    alt={brand.slug}
                    className="max-h-full max-w-full object-contain transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="block sm:hidden text-md font-semibold text-gray-900 mb-1">
                    {brand.name}
                  </h3>
                  <h3 className="hidden sm:block text-md font-semibold text-gray-900 mb-1">
                    Підкрилки для {brand.name}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
