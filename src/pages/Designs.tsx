import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientText from '../components/atoms/GradientText';
import FilterTab from '../components/atoms/FilterTab';
import AnimatedButton from '../components/atoms/AnimatedButton';
import DesignCard from '../components/atoms/DesignCard';

const Designs: React.FC = () => {
  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All', 'Poster', 'Banner', 'Brochure', 'Invitation Card', 'Logo', 'Social Media Post'
  ];

  // Helper to get thumbnail (only local/public URLs now)
  const getThumbnail = (image?: string) => {
    if (image) return image;
    return '/placeholder.svg';
  };
  // Using a local static dataset now (database removed)
  useEffect(() => {
    const sample = [
      { id: 1, title: 'Modern Poster', categories: ['Poster'], image: '/placeholder.svg' },
      { id: 2, title: 'Event Banner', categories: ['Banner'], image: '/placeholder.svg' },
      { id: 3, title: 'Product Brochure', categories: ['Brochure'], image: '/placeholder.svg' },
      { id: 4, title: 'Wedding Invite', categories: ['Invitation Card'], image: '/placeholder.svg' },
      { id: 5, title: 'Logo Suite', categories: ['Logo'], image: '/placeholder.svg' },
      { id: 6, title: 'Social Post Pack', categories: ['Social Media Post'], image: '/placeholder.svg' }
    ];
    setDesigns(sample);
  }, []);

  // 🔹 Filter designs based on active filter
  const filteredDesigns = useMemo(() => {
    if (activeFilter === 'All') return designs;
    return designs.filter(design => {
      const categories = Array.isArray(design.categories)
        ? design.categories
        : typeof design.category === 'string'
        ? design.category.split(',').map(c => c.trim())
        : [];
      return categories.some(cat => cat.toLowerCase() === activeFilter.toLowerCase());
    });
  }, [designs, activeFilter]);

  return (
    <div className="min-h-screen pt-32">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <GradientText variant="fade">Our</GradientText>
              <br />
              <span className="text-white">Designs</span>
            </h1>
            <p className="text-white text-xl md:text-2xl font-light max-w-4xl">
              Explore our diverse collection of graphic designs — from posters and banners to brochures and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center overflow-x-auto"
          >
            {filters.map(filter => (
              <FilterTab
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-white">Loading designs...</p>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredDesigns.map((design, index) => (
                    <DesignCard
                      key={`${design.id}-${activeFilter}`}
                      title={design.title}
                      category={design.categories || design.category}
                      image={getThumbnail(design.image)}
                      delay={index * 0.1}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* No Results */}
              {filteredDesigns.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    No designs found for "{activeFilter}"
                  </h3>
                  <p className="text-white/70 mb-8">
                    Try selecting a different category or view all designs.
                  </p>
                  <AnimatedButton onClick={() => setActiveFilter('All')}>
                    View All Designs
                  </AnimatedButton>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Designs;
