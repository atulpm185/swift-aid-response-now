
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmergencyTipProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const EmergencyTip = ({
  title,
  description,
  icon,
  className,
}: EmergencyTipProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-2">
        <div className="text-emergency">{icon}</div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmergencyTip;
