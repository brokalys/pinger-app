import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] rounded-lg',
                accent: 'bg-[#16a34a] text-white hover:bg-[#15803d] rounded-lg',
                destructive: 'bg-red-600 text-white hover:bg-red-700 rounded-lg',
                outline: 'border border-[#e4e4e7] bg-white text-[#0a0a0a] hover:bg-[#f4f4f5] rounded-lg',
                ghost: 'text-[#0a0a0a] hover:bg-[#f4f4f5] rounded-lg',
                link: 'text-[#0a0a0a] underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-5 py-2',
                sm: 'h-9 rounded-lg px-3',
                lg: 'h-12 rounded-lg px-8 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
