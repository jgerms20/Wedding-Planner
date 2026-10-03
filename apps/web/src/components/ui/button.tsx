import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_20px_-10px_var(--coral)] hover:bg-coral-deep hover:shadow-[0_10px_24px_-10px_var(--coral)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-line-strong bg-card/70 backdrop-blur-sm hover:border-gold hover:bg-gold-soft/60 hover:text-accent-foreground",
        secondary: "bg-ink text-rail-foreground hover:bg-ink-700",
        ghost: "hover:bg-paper-deep hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4.5 py-2 has-[>svg]:px-3.5",
        sm: "h-8 gap-1.5 px-3.5 has-[>svg]:px-3",
        lg: "h-11 px-7 text-[15px] has-[>svg]:px-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
