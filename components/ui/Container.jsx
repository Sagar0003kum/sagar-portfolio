'use client';

import { cn } from '@/lib/utils';

export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}) {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Section({
  as: Component = 'section',
  size = 'default',
  padding = 'default',
  background = 'transparent',
  className,
  children,
  ...props
}) {
  const paddingSizes = {
    none: '',
    sm: 'py-8 sm:py-12',
    default: 'py-16 sm:py-20 lg:py-24',
    lg: 'py-20 sm:py-28 lg:py-32',
  };

  const backgrounds = {
    transparent: '',
    light: 'bg-surface-light',
    surface: 'bg-surface',
    dark: 'bg-surface-dark',
    gradient: 'bg-gradient-warm',
    white: 'bg-white',
  };

  return (
    <Component
      className={cn(paddingSizes[padding], backgrounds[background], className)}
      {...props}
    >
      <Container size={size}>
        {children}
      </Container>
    </Component>
  );
}
