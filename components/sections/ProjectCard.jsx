'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, Badge, StatusBadge } from '@/components/ui';

export function ProjectCard({ project, index = 0 }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      },
    },
  };

  const githubLink = project.links?.github;
  const liveLink = project.links?.live;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card hover={true} padding="none" className="h-full flex flex-col overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-primary-100">
          {project.images?.thumbnail && !imageError ? (
            <Image
              src={project.images.thumbnail}
              alt={`Screenshot of ${project.title}`}
              fill
              className={cn(
                "object-cover transition-transform duration-500",
                isHovered && "scale-105"
              )}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
              <span className="font-bold text-5xl text-primary-300">
                {project.title[0]}
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <StatusBadge status={project.status} />
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="gold" size="sm">Featured</Badge>
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col p-5">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" size="sm">
              {project.category === 'personal' ? 'Personal' : 'School'}
            </Badge>
            <span className="text-xs text-primary-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.year}
            </span>
          </div>

          <h3 className="font-semibold text-lg text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-primary-600 text-sm line-clamp-2 mb-4 flex-1">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-1 text-primary-400">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-primary-100">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-primary-500 hover:text-primary-900 hover:bg-primary-100 transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-primary-500 hover:text-primary-900 hover:bg-primary-100 transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <span className="ml-auto text-sm text-accent-600 font-medium inline-flex items-center gap-1">
              View Details
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

export default ProjectCard;
