'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation, personalInfo } from '@/data/portfolio';
import { Container } from '@/components/ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white" role="contentinfo">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-500 text-white font-bold text-xl">
                {personalInfo.firstName[0]}
              </span>
              <span className="font-semibold text-2xl">{personalInfo.name}</span>
            </Link>
            
            <p className="text-primary-300 max-w-md mb-6">{personalInfo.tagline}</p>
            
            <div className="flex items-center gap-2 text-primary-400 mb-8">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {personalInfo.social.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-primary-800 text-primary-300 hover:bg-accent-500 hover:text-white transition-all"
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
                  className="p-3 rounded-xl bg-primary-800 text-primary-300 hover:bg-accent-500 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {personalInfo.social.twitter && (
                <a
                  href={personalInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-primary-800 text-primary-300 hover:bg-accent-500 hover:text-white transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-xl bg-primary-800 text-primary-300 hover:bg-accent-500 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-primary-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Get in Touch</h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-primary-300 hover:text-white transition-colors flex items-start gap-3"
            >
              <Mail className="w-5 h-5 mt-0.5" />
              <span className="break-all">{personalInfo.email}</span>
            </a>

            {personalInfo.availability && (
              <div className="mt-6 pt-6 border-t border-primary-800">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    personalInfo.availability.isAvailable ? 'bg-green-400' : 'bg-yellow-400'
                  )} />
                  <span className="text-primary-300 text-sm">
                    {personalInfo.availability.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-800">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-primary-500 text-sm">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
