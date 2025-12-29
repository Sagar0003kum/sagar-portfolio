'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
  default: 'bg-primary-100 text-primary-700',
  accent: 'bg-accent-100 text-accent-700',
  gold: 'bg-gold-100 text-gold-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  outline: 'bg-transparent border border-primary-300 text-primary-600',
};

const Badge = forwardRef(function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}, ref) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        badgeVariants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

const StatusBadge = forwardRef(function StatusBadge({ status, className, ...props }, ref) {
  const statusConfig = {
    completed: { variant: 'success', label: 'Completed', dot: 'bg-green-500' },
    'in-progress': { variant: 'warning', label: 'In Progress', dot: 'bg-yellow-500' },
    planned: { variant: 'default', label: 'Planned', dot: 'bg-primary-400' },
  };

  const config = statusConfig[status] || statusConfig.completed;

  return (
    <Badge ref={ref} variant={config.variant} className={className} {...props}>
      <span className={cn('w-2 h-2 rounded-full', config.dot)} />
      {config.label}
    </Badge>
  );
});

const TechBadge = forwardRef(function TechBadge({ tech, selected = false, onClick, className, ...props }, ref) {
  const techColors = {
    react: 'bg-blue-100 text-blue-700',
    'next.js': 'bg-black text-white',
    'node.js': 'bg-green-100 text-green-700',
    javascript: 'bg-yellow-100 text-yellow-800',
    python: 'bg-blue-100 text-blue-700',
    mongodb: 'bg-green-100 text-green-700',
    postgresql: 'bg-blue-100 text-blue-700',
    docker: 'bg-blue-100 text-blue-700',
    'tailwind css': 'bg-cyan-100 text-cyan-700',
  };

  const techLower = tech.toLowerCase();
  const colorClass = techColors[techLower] || 'bg-primary-100 text-primary-700';

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full',
        'text-sm font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
        selected ? 'ring-2 ring-accent-500 ring-offset-1' : '',
        colorClass,
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
      {...props}
    >
      {tech}
    </button>
  );
});

export { Badge, StatusBadge, TechBadge, badgeVariants };
