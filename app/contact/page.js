'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Clock, MessageCircle } from 'lucide-react';
import { Section, PageHeader, Card } from '@/components/ui';
import { SmartContactForm } from '@/components/features/SmartContactForm';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { personalInfo } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'GitHub', href: personalInfo.social.github, icon: Github, color: 'hover:bg-gray-800 hover:text-white' },
  { name: 'LinkedIn', href: personalInfo.social.linkedin, icon: Linkedin, color: 'hover:bg-blue-600 hover:text-white' },
  { name: 'Twitter', href: personalInfo.social.twitter, icon: Twitter, color: 'hover:bg-sky-500 hover:text-white' },
].filter(link => link.href);

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <Section background="gradient" padding="lg" className="pt-32">
        <PageHeader
          subtitle="Get in Touch"
          title="Let's Work Together"
          description="Have a project in mind or just want to say hello? I'd love to hear from you."
        />
      </Section>

      {/* Contact Content */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Availability */}
            <Card padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-100">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-primary-900">Availability</p>
                  <p className="text-body-sm text-primary-500">{personalInfo.availability.status}</p>
                </div>
              </div>
              <p className="text-body-sm text-primary-600">
                I typically respond within 10-24 hours.
              </p>
            </Card>

            {/* Contact Details */}
            <Card padding="lg">
              <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">Contact Info</h3>
              
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${personalInfo.email}`} className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-accent-100 group-hover:bg-accent-200 transition-colors">
                      <Mail className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-body-sm text-primary-500">Email</p>
                      <p className="text-primary-900 group-hover:text-accent-600 transition-colors">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>
                </li>

                {personalInfo.phone && (
                  <li>
                    <a href={`tel:${personalInfo.phone}`} className="flex items-start gap-3 group">
                      <div className="p-2 rounded-lg bg-accent-100 group-hover:bg-accent-200 transition-colors">
                        <Phone className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <p className="text-body-sm text-primary-500">Phone</p>
                        <p className="text-primary-900 group-hover:text-accent-600 transition-colors">
                          {personalInfo.phone}
                        </p>
                      </div>
                    </a>
                  </li>
                )}

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent-100">
                    <MapPin className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-body-sm text-primary-500">Location</p>
                    <p className="text-primary-900">{personalInfo.location}</p>
                  </div>
                </li>
              </ul>
            </Card>

            {/* Social Links */}
            <Card padding="lg">
              <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                    <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-xl bg-primary-100 text-primary-600 transition-all duration-200",
                      social.color
                    )}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </Card>

            {/* Chatbot Hint */}
            <Card padding="lg" className="bg-gradient-to-br from-accent-50 to-gold-50 border-accent-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent-100">
                  <MessageCircle className="w-5 h-5 text-accent-600" />
                </div>
                <h3 className="font-display font-semibold text-lg text-primary-900">Quick Questions?</h3>
              </div>
              <p className="text-body-sm text-primary-600">
                Try my portfolio chatbot! Click the chat bubble in the bottom right corner.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <div className="mb-8">
                <h2 className="font-display font-semibold text-2xl text-primary-900 mb-2">
                  Send Me a Message
                </h2>
                <p className="text-primary-600">
                  Fill out the form and I'll get back to you as soon as possible.
                </p>
              </div>
              <SmartContactForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer CTA */}
      <Section background="surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display font-bold text-display-sm text-primary-900 mb-4">
            Looking Forward to Connecting
          </h2>
          <p className="text-primary-600 text-body-lg mb-6">
            Whether you have a project, job opportunity, or just want to chat about tech, I'm excited to hear from you.
          </p>
          <div className="flex items-center justify-center gap-2 text-accent-600">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500" />
            </span>
            <span className="font-medium">Usually responds within 24 hours</span>
          </div>
        </motion.div>
      </Section>

      <PortfolioChatbot />
    </>
  );
}