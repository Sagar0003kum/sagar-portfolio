'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Sparkles, Tag, Calendar, Folder, ChevronDown } from 'lucide-react';
import { cn, debounce } from '@/lib/utils';
import { findProjects, getSearchSuggestions } from '@/lib/ai';
import { getAllTechStacks, getAllYears, getAllCategories } from '@/data/portfolio';
import { Input, Button, Badge, TechBadge, Card } from '@/components/ui';

export function ProjectFinder({ onFilter, showFilters = true }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    techStack: [],
    year: '',
    status: 'all',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const techStacks = useMemo(() => getAllTechStacks(), []);
  const years = useMemo(() => getAllYears(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const debouncedSearch = useCallback(
    debounce((query, currentFilters) => {
      const results = findProjects(query, currentFilters);
      onFilter?.(results);
    }, 300),
    [onFilter]
  );

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const newSuggestions = getSearchSuggestions(searchQuery);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    debouncedSearch(searchQuery, filters);
  }, [searchQuery, filters, debouncedSearch]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'tech') {
      toggleTech(suggestion.value);
    } else {
      setSearchQuery(suggestion.value);
    }
    setShowSuggestions(false);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleTech = (tech) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ category: 'all', techStack: [], year: '', status: 'all' });
  };

  const hasActiveFilters = 
    searchQuery !== '' ||
    filters.category !== 'all' ||
    filters.techStack.length > 0 ||
    filters.year !== '' ||
    filters.status !== 'all';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            leftIcon={<Search className="w-5 h-5" />}
            className="pr-20"
          />
          
          <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-1 text-accent-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Smart</span>
          </div>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-soft-lg border border-primary-100 overflow-hidden"
            >
              <div className="p-2">
                <p className="text-xs text-primary-400 px-3 py-1">Suggestions</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.value}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-50 text-left"
                  >
                    {suggestion.type === 'tech' && <Tag className="w-4 h-4 text-accent-500" />}
                    {suggestion.type === 'project' && <Folder className="w-4 h-4 text-primary-400" />}
                    <span className="text-primary-700">{suggestion.value}</span>
                    <span className="text-xs text-primary-400 ml-auto capitalize">{suggestion.type}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Toggle (Mobile) */}
      {showFilters && (
        <div className="lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            leftIcon={<Filter className="w-4 h-4" />}
            rightIcon={<ChevronDown className={cn("w-4 h-4 transition-transform", isFiltersOpen && "rotate-180")} />}
            className="w-full justify-between"
          >
            Filters
            {hasActiveFilters && <Badge variant="accent" size="sm" className="ml-2">Active</Badge>}
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className={cn(!isFiltersOpen && "hidden lg:block")}>
          <Card padding="md" className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-body-sm font-medium text-primary-700 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {['all', ...categories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                      filters.category === cat
                        ? "bg-primary-900 text-white"
                        : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-body-sm font-medium text-primary-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />Year
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter('year', '')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    filters.year === '' ? "bg-primary-900 text-white" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                  )}
                >
                  Any
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => updateFilter('year', year.toString())}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      filters.year === year.toString()
                        ? "bg-primary-900 text-white"
                        : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-body-sm font-medium text-primary-700 mb-3">
                <Tag className="w-4 h-4 inline mr-2" />Tech Stack
              </label>
              <div className="flex flex-wrap gap-2">
                {techStacks.slice(0, 10).map((tech) => (
                  <TechBadge
                    key={tech}
                    tech={tech}
                    selected={filters.techStack.includes(tech)}
                    onClick={() => toggleTech(tech)}
                  />
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end pt-4 border-t border-primary-100">
                <Button variant="ghost" size="sm" onClick={clearFilters} leftIcon={<X className="w-4 h-4" />}>
                  Clear All
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default ProjectFinder;