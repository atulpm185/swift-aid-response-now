
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmergencyTipProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  variant?: "emergency" | "info" | "warning";
}

const EmergencyTip = ({
  title,
  description,
  icon,
  className,
  variant = "emergency",
}: EmergencyTipProps) => {
  const iconClass = 
    variant === "emergency" 
      ? "text-emergency" 
      : variant === "info" 
        ? "text-info" 
        : "text-warning";
  
  const cardClass =
    variant === "emergency"
      ? "border-l-4 border-l-emergency"
      : variant === "info"
        ? "border-l-4 border-l-info"
        : "border-l-4 border-l-warning";
  
  return (
    <Card className={cn("overflow-hidden", cardClass, className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-2">
        <div className={iconClass}>{icon}</div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmergencyTip;
