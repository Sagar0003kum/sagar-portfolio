'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Heart, Award, ChevronRight } from 'lucide-react';
import { Section, PageHeader, Card, Badge, TechBadge } from '@/components/ui';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { workExperience, volunteerExperience } from '@/data/portfolio';

export default function ExperiencePage() {
  return (
    <>
      {/* Header */}
      <Section background="gradient" padding="lg" className="pt-32">
        <PageHeader
          subtitle="Career Journey"
          title="Work Experience"
          description="My professional journey through various roles and organizations."
        />
      </Section>

      {/* Work Experience */}
      <Section background="white">
        <div className="max-w-4xl mx-auto space-y-8">
          {workExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg" className="relative">
                {exp.isCurrent && (
                  <Badge variant="success" size="sm" className="absolute top-4 right-4">Current</Badge>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-xl text-primary-900">{exp.role}</h3>
                    <p className="text-accent-600 font-medium text-lg">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-body-sm text-primary-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-primary-600 mb-6">{exp.description}</p>

                <div className="mb-6">
                  <h4 className="text-body-sm font-semibold text-primary-700 mb-3">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-body-md text-primary-600">
                        <ChevronRight className="w-4 h-4 text-accent-500 flex-shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-gold-50 border border-gold-100">
                    <h4 className="text-body-sm font-semibold text-gold-700 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="text-body-sm text-gold-800">• {ach}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary-100">
                  {exp.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Volunteer Experience */}
      <Section background="surface">
        <div className="text-center mb-12">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="font-display font-bold text-display-md text-primary-900 flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-accent-500" />
            Volunteer Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {volunteerExperience.map((vol, index) => (
            <motion.div
              key={vol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-primary-900">{vol.role}</h3>
                    <p className="text-accent-600">{vol.organization}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-body-sm text-primary-500">
                  <Calendar className="w-4 h-4" />
                  <span>{vol.startDate} - {vol.endDate}</span>
                  {vol.isCurrent && <Badge variant="success" size="sm">Active</Badge>}
                </div>

                <p className="text-primary-600 mb-4">{vol.description}</p>

                <ul className="space-y-2 mb-4">
                  {vol.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-primary-600">
                      <ChevronRight className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {vol.impact && (
                  <div className="p-3 rounded-lg bg-accent-50 border border-accent-100">
                    <p className="text-body-sm text-accent-700">
                      <strong>Impact:</strong> {vol.impact}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <PortfolioChatbot />
    </>
  );
}