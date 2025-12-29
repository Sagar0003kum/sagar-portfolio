'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Folder } from 'lucide-react';
import { Section, PageHeader, Button } from '@/components/ui';
import { ProjectFinder } from '@/components/features/ProjectFinder';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { PortfolioChatbot } from '@/components/features/PortfolioChatbot';
import { projects } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [viewMode, setViewMode] = useState('grid');

  return (
    <>
      {/* Header */}
      <Section background="gradient" padding="lg" className="pt-32">
        <PageHeader
          subtitle="My Work"
          title="Projects"
          description="A collection of projects I've worked on. Use search and filters to explore."
        />
      </Section>

      {/* Projects */}
      <Section background="white" padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ProjectFinder onFilter={setFilteredProjects} showFilters={true} />
            </div>
          </aside>

          {/* Projects Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-primary-600">
                Showing <span className="font-medium text-primary-900">{filteredProjects.length}</span> of {projects.length} projects
              </p>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-primary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'grid' ? "bg-white shadow-sm text-primary-900" : "text-primary-500 hover:text-primary-700"
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'list' ? "bg-white shadow-sm text-primary-900" : "text-primary-500 hover:text-primary-700"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Projects List */}
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  )}
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-primary-600 mb-6">Try adjusting your search or filters.</p>
                  <Button variant="outline" onClick={() => setFilteredProjects(projects)}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <PortfolioChatbot />
    </>
  );
}