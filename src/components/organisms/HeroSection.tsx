import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedButton from '../atoms/AnimatedButton';
import GradientText from '../atoms/GradientText';

const HeroSection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Cinematic background images - movie production/cinema related
  const heroImages = [
    "https://images.unsplash.com/photo-1489599038968-2d3e4b57c0b5?w=800&q=80", // Film production
    "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&q=80", // Cinema lighting
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80", // Movie theater
    "https://images.unsplash.com/photo-1489599038968-2d3e4b57c0b5?w=800&q=80", // Film equipment
    "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&q=80", // Director's chair
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", // Camera setup
  ];

  return (
  <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images - Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-2 p-4">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ 
                opacity: 0.4, 
                scale: 1, 
                rotateY: 0,
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 2, 
                delay: index * 0.2,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }
              }}
              className="aspect-[4/5] rounded-xl overflow-hidden transform-gpu"
              style={{
                transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '15deg' : '-15deg'})`
              }}
            >
              <img 
                src={image}
                alt="Cinematography"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: textY }}
        className="container mx-auto px-4 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            Turning <GradientText variant="primary">Vision</GradientText> into
            <br />
            <span className="text-white">Cinematic</span>{" "}
            <GradientText variant="fade">Reality</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We're your creative storytellers, transforming ideas into captivating visual experiences 
            that engage audiences and drive results through the power of cinema.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <AnimatedButton variant="glass" size="lg" to="/projects">
              View Our Work
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;