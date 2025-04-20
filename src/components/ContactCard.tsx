
import React from "react";
import { PhoneCall, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContactCardProps {
  name: string;
  phoneNumber: string;
  relation?: string;
  onCall: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactCard = ({
  name,
  phoneNumber,
  relation,
  onCall,
  onEdit,
  onDelete,
}: ContactCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{phoneNumber}</p>
            {relation && <p className="text-xs text-muted-foreground">{relation}</p>}
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={onCall}>
              <PhoneCall className="h-4 w-4 text-info" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onDelete}>
              <Trash className="h-4 w-4 text-emergency" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
