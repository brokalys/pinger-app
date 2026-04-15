import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-11 w-full rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-sm text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
