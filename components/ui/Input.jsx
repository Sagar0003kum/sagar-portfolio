'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(function Input({
  className,
  type = 'text',
  error,
  label,
  leftIcon,
  rightIcon,
  ...props
}, ref) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-primary-700 mb-2"
        >
          {label}
          {props.required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2',
            'bg-white text-primary-900 placeholder-primary-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-0',
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            error 
              ? 'border-red-400 focus:border-red-500' 
              : 'border-primary-200 focus:border-accent-500',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

const Textarea = forwardRef(function Textarea({
  className,
  error,
  label,
  rows = 4,
  ...props
}, ref) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-primary-700 mb-2"
        >
          {label}
          {props.required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 rounded-xl border-2',
          'bg-white text-primary-900 placeholder-primary-400',
          'transition-all duration-200 resize-y min-h-[120px]',
          'focus:outline-none focus:ring-0',
          error 
            ? 'border-red-400 focus:border-red-500' 
            : 'border-primary-200 focus:border-accent-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

export { Input, Textarea };
