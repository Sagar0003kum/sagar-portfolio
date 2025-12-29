'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef(function Card({
  className,
  hover = true,
  padding = 'md',
  children,
  ...props
}, ref) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-2xl shadow-soft-md',
        'transition-all duration-300',
        hover && 'hover:shadow-soft-lg hover:-translate-y-1',
        paddingSizes[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = forwardRef(function CardHeader({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
});

const CardTitle = forwardRef(function CardTitle({ className, children, as: Component = 'h3', ...props }, ref) {
  return (
    <Component
      ref={ref}
      className={cn('font-semibold text-primary-900 text-xl lg:text-2xl', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

const CardDescription = forwardRef(function CardDescription({ className, children, ...props }, ref) {
  return (
    <p ref={ref} className={cn('text-primary-600', className)} {...props}>
      {children}
    </p>
  );
});

const CardContent = forwardRef(function CardContent({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  );
});

const CardFooter = forwardRef(function CardFooter({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-primary-100', className)} {...props}>
      {children}
    </div>
  );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
