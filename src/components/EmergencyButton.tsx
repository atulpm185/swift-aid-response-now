
import React from "react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  isPulsing?: boolean;
  variant?: "emergency" | "info" | "warning";
}

const EmergencyButton = ({
  title,
  icon,
  onClick,
  className,
  isPulsing = false,
  variant = "emergency",
}: EmergencyButtonProps) => {
  const baseClass = 
    variant === "emergency" 
      ? "emergency-button" 
      : variant === "info" 
        ? "info-button" 
        : "warning-button";
  
  return (
    <button
      onClick={onClick}
      className={cn(
        baseClass,
        isPulsing && 
          (variant === "emergency" 
            ? "animate-pulse-emergency" 
            : variant === "info" 
              ? "animate-pulse" 
              : "animate-pulse"), 
        className
      )}
    >
      <div className="text-3xl">{icon}</div>
      <span className="font-medium text-sm">{title}</span>
    </button>
  );
};

export default EmergencyButton;
