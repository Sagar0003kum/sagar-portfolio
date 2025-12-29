'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, MapPin, Mail, Award, Code } from 'lucide-react';
import { Section, PageHeader, Card, Button, Badge } from '@/components/ui';
import { ResumeHighlights } from '@/components/features/ResumeHighlights';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { personalInfo, skills, certifications } from '@/data/portfolio';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section background="gradient" padding="lg" className="pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageHeader
              subtitle="About Me"
              title={`I'm ${personalInfo.name}`}
              description={personalInfo.tagline}
            />
            
            <div className="text-primary-600 mt-6 space-y-4">
              {personalInfo.fullBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-primary-600">
                <MapPin className="w-4 h-4 text-accent-500" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <Mail className="w-4 h-4 text-accent-500" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-accent-600">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button as={Link} href="/contact" variant="accent">Get in Touch</Button>
              <Button
                as="a"
                href={personalInfo.resumeUrl}
                target="_blank"
                variant="outline"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>
            </div>
          </motion.div>

          {/* Profile Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/sagar.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-500" />
                  <span className="font-medium text-primary-900">2+ Years Exp</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-soft-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-accent-500" />
                  <span className="font-medium text-primary-900">5+ Projects</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills */}
      <Section background="white" id="skills">
        <div className="text-center mb-12">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="font-display font-bold text-display-md text-primary-900">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-primary-600 text-body-lg max-w-2xl mx-auto">
            Technologies and tools I work with daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.technical.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg">
                <h3 className="font-display font-semibold text-lg text-primary-900 mb-6">
                  {category.category}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-primary-700 font-medium">{skill.name}</span>
                        <span className="text-body-sm text-primary-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="mt-12">
          <h3 className="font-display font-semibold text-lg text-primary-900 mb-6 text-center">
            Soft Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.soft.map((skill) => (
              <Badge key={skill} variant="accent" size="lg">{skill}</Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Resume Highlights */}
      <Section background="surface">
        <div className="max-w-3xl mx-auto">
          <ResumeHighlights />
        </div>
      </Section>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <Section background="white">
          <div className="text-center mb-12">
            <div className="decorative-line mx-auto mb-6" />
            <h2 className="font-display font-bold text-display-md text-primary-900">
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <Card key={cert.name} padding="md">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gold-100">
                    <Award className="w-6 h-6 text-gold-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-900">{cert.name}</h4>
                    <p className="text-body-sm text-primary-500 mt-1">{cert.issuer}</p>
                    <p className="text-body-sm text-primary-400 mt-1">{cert.date}</p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-body-sm text-accent-600 hover:underline"
                      >
                        Verify →
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <PortfolioChatbot />
    </>
  );
}
