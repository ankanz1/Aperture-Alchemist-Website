import React from 'react';
import { motion } from 'framer-motion';

const LogoTicker: React.FC = () => {
  // Photography and production related brand logos (placeholder)
  const logos = [
    { name: "Canon", url: "https://logos-world.net/wp-content/uploads/2020/04/Canon-Logo.png" },
    { name: "Sony", url: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" },
    { name: "Adobe", url: "https://logos-world.net/wp-content/uploads/2020/03/Adobe-Logo.png" },
    { name: "Netflix", url: "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png" },
    { name: "Disney", url: "https://logos-world.net/wp-content/uploads/2020/04/Disney-Logo.png" },
    { name: "Apple", url: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png" },
    { name: "Microsoft", url: "https://logos-world.net/wp-content/uploads/2020/04/Microsoft-Logo.png" },
    { name: "Google", url: "https://logos-world.net/wp-content/uploads/2020/04/Google-Logo.png" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We're proud to work with amazing brands and organizations that value quality storytelling
          </p>
        </motion.div>

        <div className="relative">
          {/* Logo Carousel */}
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1920] // Adjust based on total width
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              width: "fit-content"
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;