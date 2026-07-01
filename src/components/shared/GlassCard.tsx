"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "purple" | "gold" | "indigo" | "none";
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  ...props
}: GlassCardProps) {
  const glowStyles = {
    purple: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    gold: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    indigo: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl",
        hover && "transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-500/30",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedContainer({ children, className, delay = 0 }: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
