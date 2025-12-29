'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, Users, ExternalLink } from 'lucide-react';
import { Section, PageHeader, Card, Badge } from '@/components/ui';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { education, certifications } from '@/data/portfolio';

export default function EducationPage() {
  return (
    <>
      {/* Header */}
      <Section background="gradient" padding="lg" className="pt-32">
        <PageHeader
          subtitle="Academic Background"
          title="Education"
          description="My educational journey and continuous learning path."
        />
      </Section>

      {/* Education */}
      <Section background="white">
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-xl text-primary-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-accent-600 font-medium text-lg">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-body-sm text-primary-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </span>
                      {edu.gpa && (
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Honors */}
                {edu.honors && edu.honors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-body-sm font-semibold text-primary-700 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold-500" />
                      Honors & Awards
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor) => (
                        <Badge key={honor} variant="gold" size="md">{honor}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses */}
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-body-sm font-semibold text-primary-700 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent-500" />
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course) => (
                        <span key={course} className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-body-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {edu.activities && edu.activities.length > 0 && (
                  <div>
                    <h4 className="text-body-sm font-semibold text-primary-700 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent-500" />
                      Activities
                    </h4>
                    <ul className="space-y-2">
                      {edu.activities.map((activity, i) => (
                        <li key={i} className="text-body-md text-primary-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <Section background="surface">
          <div className="text-center mb-12">
            <div className="decorative-line mx-auto mb-6" />
            <h2 className="font-display font-bold text-display-md text-primary-900">
              Professional Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card padding="md" className="h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gold-100">
                      <Award className="w-5 h-5 text-gold-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-primary-900 leading-tight">{cert.name}</h4>
                      <p className="text-body-sm text-primary-500 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-body-sm text-primary-400 mt-auto">
                    <Calendar className="w-4 h-4" />
                    <span>Issued {cert.date}</span>
                  </div>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-body-sm text-accent-600 hover:text-accent-700"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      <PortfolioChatbot />
    </>
  );
}