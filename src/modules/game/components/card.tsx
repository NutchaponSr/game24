import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  target?: boolean;
}

export const Card = ({ 
  className, 
  children,
  target 
}: CardProps) => {
  return (
    <div className={cn("h-48 w-32 border-2 rounded-xl p-4 cursor-pointer flex items-center justify-center", className)}>
      <p className={cn("text-neutral-600 text-2xl lg:text-4xl font-bold", target && "text-primary-foreground")}>
        {children}
      </p>
    </div>
  );
}