'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, TrendingUp, Award, Code, RefreshCw, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateSmartHighlights } from '@/lib/ai';
import { Button, Card } from '@/components/ui';

const iconMap = {
  briefcase: Briefcase,
  'trending-up': TrendingUp,
  award: Award,
  code: Code,
};

export function ResumeHighlights({ className }) {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const loadHighlights = () => {
    setIsLoading(true);
    setTimeout(() => {
      const generated = generateSmartHighlights();
      setHighlights(generated);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadHighlights();
  }, []);

  const copyAllHighlights = async () => {
    const text = highlights.map(h => `• ${h.text}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={className} padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent-100">
            <Sparkles className="w-5 h-5 text-accent-600" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-primary-900">Smart Resume Highlights</h3>
            <p className="text-body-sm text-primary-500">Auto-generated from your experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={loadHighlights}
            leftIcon={<RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAllHighlights}
            leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied!' : 'Copy All'}
          </Button>
        </div>
      </div>

      {/* Highlights */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-primary-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-primary-100 rounded w-3/4" />
                <div className="h-3 bg-primary-50 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.icon] || Briefcase;
            
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className={cn(
                  "p-2.5 rounded-lg flex-shrink-0",
                  "bg-primary-100 text-primary-600",
                  "group-hover:bg-accent-100 group-hover:text-accent-600",
                  "transition-colors duration-200"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-primary-700 text-body-md">{highlight.text}</p>
                  {highlight.company && (
                    <p className="text-body-sm text-primary-400 mt-1">at {highlight.company}</p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      {/* Tip */}
      <div className="mt-6 pt-6 border-t border-primary-100">
        <p className="text-body-sm text-primary-500">
          💡 <strong>Tip:</strong> Use these highlights in your resume or LinkedIn.
        </p>
      </div>
    </Card>
  );
}

export default ResumeHighlights;