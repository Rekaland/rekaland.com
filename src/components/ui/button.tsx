
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-rekaland-orange text-white hover:bg-orange-600 shadow-sm hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "outline-orange": "border border-rekaland-orange text-rekaland-orange hover:bg-orange-50 hover:text-orange-600",
        "glass": "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        "outline-white": "border border-white text-white hover:bg-white/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-12 text-base rounded-md px-10",
      },
      animation: {
        none: "",
        subtle: "transition-all duration-200 ease-in-out hover:translate-y-[-2px]",
        scale: "transition-all duration-200 ease-in-out hover:scale-105",
        glow: "transition-all duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]",
        "3d": "transform-gpu transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "3d",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
