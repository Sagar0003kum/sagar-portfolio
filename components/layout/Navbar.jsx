'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation, personalInfo } from '@/data/portfolio';
import { Button } from '@/components/ui';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'py-3 bg-white/90 backdrop-blur-lg shadow-soft-sm'
            : 'py-5 bg-transparent'
        )}
      >
        <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-500 to-accent-600 text-white font-bold text-lg">
              {personalInfo.firstName[0]}
            </span>
            <span className="font-semibold text-lg text-primary-900">
              {personalInfo.firstName}<span className="text-accent-500">.</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-lg font-medium',
                    'transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-accent-600'
                      : 'text-primary-600 hover:text-primary-900 hover:bg-primary-50'
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-500 rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {personalInfo.social.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary-500 hover:text-primary-900 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {personalInfo.social.linkedin && (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary-500 hover:text-primary-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
            <Button as={Link} href="/contact" variant="accent" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 rounded-lg text-primary-700 hover:bg-primary-100"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-white"
            >
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="h-full flex flex-col pt-24 px-6 pb-8"
              >
                <ul className="flex-1 space-y-2">
                  {navigation.main.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block py-3 px-4 rounded-xl font-medium text-xl',
                          isActive(item.href)
                            ? 'text-accent-600 bg-accent-50'
                            : 'text-primary-700 hover:bg-primary-50'
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-primary-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {personalInfo.social.github && (
                      <a
                        href={personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-primary-50 text-primary-600"
                        aria-label="GitHub"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                    {personalInfo.social.linkedin && (
                      <a
                        href={personalInfo.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-primary-50 text-primary-600"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                  <Button as={Link} href="/contact" variant="accent" size="lg" className="w-full">
                    Get in Touch
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar;
