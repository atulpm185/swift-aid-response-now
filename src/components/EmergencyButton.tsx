
import React from "react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  isPulsing?: boolean;
}

const EmergencyButton = ({
  title,
  icon,
  onClick,
  className,
  isPulsing = false,
}: EmergencyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "emergency-button",
        isPulsing && "animate-pulse-emergency",
        className
      )}
    >
      <div className="text-3xl">{icon}</div>
      <span className="font-medium text-sm">{title}</span>
    </button>
  );
};

export default EmergencyButton;
