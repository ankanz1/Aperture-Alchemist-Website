import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'glass' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  to?: string;
  href?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  disabled = false,
  to,
  href
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'glass':
        return 'btn-glass';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary-hover';
      default:
        return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'shadow-lg shadow-primary/10',
    'bg-gradient-to-tr from-primary/90 to-secondary/80',
    'hover:from-primary/80 hover:to-secondary/60 hover:shadow-xl hover:scale-105',
    'active:scale-95',
    'text-base',
    getVariantClass(),
    getSizeClass(),
    className
  );

  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link to={to} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
