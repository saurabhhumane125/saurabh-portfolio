import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/50 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:scale-105 active:scale-100",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/50 hover:scale-105 active:scale-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 hover:shadow-secondary/50 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100",
        ghost: 
          "text-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-100",
        link: 
          "text-primary underline-offset-4 hover:underline",
        // Custom AI/ML themed variants with enhanced animations
        hero: 
          "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-100 border border-primary/30 animate-gradient-x before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        "hero-outline":
          "bg-transparent border-2 border-primary/60 text-foreground font-semibold hover:bg-primary/15 hover:border-primary hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-100 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/30 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/0 before:via-primary/10 before:to-primary/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        glow:
          "bg-card/80 text-foreground border border-primary/40 backdrop-blur-sm shadow-lg hover:border-primary hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-100 hover:shadow-primary/30 hover:shadow-xl",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
