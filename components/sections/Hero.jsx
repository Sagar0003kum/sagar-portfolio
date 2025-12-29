'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/data/portfolio';
import { Button, Container } from '@/components/ui';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-warm" />
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute -top-20 -right-20 w-96 h-96',
          'bg-gradient-to-br from-accent-200/30 to-gold-200/30',
          'rounded-full blur-3xl animate-float'
        )} />
        <div className={cn(
          'absolute -bottom-32 -left-32 w-[500px] h-[500px]',
          'bg-gradient-to-tr from-accent-100/40 to-transparent',
          'rounded-full blur-3xl animate-float-delayed'
        )} />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <Container className="relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Availability Badge */}
          {personalInfo.availability?.isAvailable && (
            <motion.div variants={itemVariants} className="mb-6">
              <span className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-green-100 text-green-700 text-body-sm font-medium'
              )}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {personalInfo.availability.status}
              </span>
            </motion.div>
          )}

          {/* Name */}
          <motion.div variants={itemVariants}>
            <p className="text-accent-500 font-medium text-body-lg mb-4">
              Hi, I'm
            </p>
            <h1 className="font-display font-bold text-primary-900 text-display-lg sm:text-display-xl mb-4">
              {personalInfo.name}<span className="text-accent-500">.</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.p 
            variants={itemVariants}
            className="font-display text-primary-600 text-display-sm sm:text-display-md mb-6"
          >
            {personalInfo.title}
          </motion.p>

          {/* Bio */}
          <motion.p 
            variants={itemVariants}
            className="text-primary-600 text-body-xl max-w-2xl mb-8"
          >
            {personalInfo.shortBio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Button
              as={Link}
              href="/projects"
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              View My Work
            </Button>
            
            <Button as={Link} href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>

            {personalInfo.resumeUrl && (
              <Button
                as="a"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Resume
              </Button>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-primary-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <p className="font-display text-display-sm text-accent-500 font-bold">5+</p>
                <p className="text-primary-600 text-body-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="font-display text-display-sm text-accent-500 font-bold">20+</p>
                <p className="text-primary-600 text-body-sm mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="font-display text-display-sm text-accent-500 font-bold">10+</p>
                <p className="text-primary-600 text-body-sm mt-1">Technologies</p>
              </div>
              <div>
                <p className="font-display text-display-sm text-accent-500 font-bold">100%</p>
                <p className="text-primary-600 text-body-sm mt-1">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-primary-400"
          >
            <span className="text-body-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;