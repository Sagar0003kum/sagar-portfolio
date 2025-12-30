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
        <p className="text-accent-500 font-medium text-body-sm uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      
      <h2 className="font-display font-bold text-primary-900 text-display-md lg:text-display-lg text-balance">
        {title}
      </h2>
      
      {description && (
        <p className="mt-4 text-primary-600 text-body-lg max-w-2xl">
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
          <p className="text-accent-500 font-medium text-body-sm uppercase tracking-wider mb-3">
            {subtitle}
          </p>
        )}
        
        <h1 className="font-display font-bold text-primary-900 text-display-lg lg:text-display-xl text-balance">
          {title}
        </h1>
        
        {description && (
          <p className="mt-4 text-primary-600 text-body-lg lg:text-body-xl max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}