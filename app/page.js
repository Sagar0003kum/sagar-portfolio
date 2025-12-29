'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { Hero } from '@/components/sections/Hero';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { Section, SectionHeader, Button, Card } from '@/components/ui';
import { projects, getFeaturedProjects, workExperience, skills, personalInfo } from '@/data/portfolio';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const latestExperience = workExperience[0];
  const topSkills = skills.technical
    .flatMap(cat => cat.items)
    .sort((a, b) => b.level - a.level)
    .slice(0, 6);

  return (
    <>
      <Hero />

      {/* Featured Projects */}
      <Section background="white" id="featured-projects">
        <SectionHeader
          subtitle="Featured Work"
          title="Projects I'm Proud Of"
          description="A selection of my best work showcasing my skills and passion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            as={Link}
            href="/projects"
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            View All Projects
          </Button>
        </div>
      </Section>

      {/* Skills Preview */}
      <Section background="surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              subtitle="What I Do"
              title="Skills & Expertise"
              description="Technologies and tools I work with on a daily basis."
              className="mb-8"
            />

            <div className="grid grid-cols-2 gap-4">
              {topSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card padding="sm" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                      <Code className="w-5 h-5 text-accent-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary-900 truncate">{skill.name}</p>
                      <div className="w-full h-1.5 bg-primary-100 rounded-full mt-1">
                        <div 
                          className="h-full bg-accent-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button as={Link} href="/about" variant="ghost" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View All Skills
              </Button>
            </div>
          </div>

          {/* Current Role Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card padding="lg" className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-accent-100 flex items-center justify-center">
                  <Code className="w-8 h-8 text-accent-600" />
                </div>
                <div>
                  <p className="text-body-sm text-accent-600 font-medium">Currently</p>
                  <h3 className="font-display font-semibold text-xl text-primary-900">
                    {latestExperience?.role}
                  </h3>
                  <p className="text-primary-600">at {latestExperience?.company}</p>
                </div>
              </div>
              <p className="text-primary-600 mb-4">{latestExperience?.description}</p>
              <div className="flex flex-wrap gap-2">
                {latestExperience?.technologies?.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-body-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
            <div className="absolute -top-4 -right-4 w-full h-full bg-accent-200/50 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display font-bold text-display-md lg:text-display-lg text-primary-900 mb-4">
            Let's Work Together
          </h2>
          <p className="text-primary-600 text-body-lg mb-8">
            I'm always open to discussing new projects and opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as={Link} href="/contact" variant="accent" size="lg">Get in Touch</Button>
            <Button as="a" href={personalInfo.resumeUrl} target="_blank" variant="outline" size="lg">
              Download Resume
            </Button>
          </div>
        </motion.div>
      </Section>

      <PortfolioChatbot />
    </>
  );
}