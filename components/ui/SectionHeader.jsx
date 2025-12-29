'use client';

import { cn } from '@/lib/utils';

export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = 'left',
  className,
}) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('mb-12 lg:mb-16 max-w-3xl', alignmentClasses[alignment], className)}>
      <div 
        className={cn(
          'decorative-line mb-6',
          alignment === 'center' && 'mx-auto',
          alignment === 'right' && 'ml-auto'
        )} 
      />
      
      {subtitle && (
        <p className="text-accent-500 font-medium text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      
      <h2 className="font-bold text-primary-900 text-3xl lg:text-4xl text-balance">
        {title}
      </h2>
      
      {description && (
        <p className="mt-4 text-primary-600 text-lg max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  description,
  className,
}) {
  return (
    <header className={cn('pt-8 pb-12 lg:pt-12 lg:pb-16', className)}>
      <div className="max-w-3xl">
        <div className="decorative-line mb-6" />
        
        {subtitle && (
          <p className="text-accent-500 font-medium text-sm uppercase tracking-wider mb-3">
            {subtitle}
          </p>
        )}
        
        <h1 className="font-bold text-primary-900 text-4xl lg:text-5xl text-balance">
          {title}
        </h1>
        
        {description && (
          <p className="mt-4 text-primary-600 text-lg lg:text-xl max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
