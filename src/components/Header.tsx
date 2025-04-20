
import React from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <NavMenu />
            </SheetContent>
          </Sheet>
          <div className="font-bold text-lg flex items-center gap-2">
            <span className="text-emergency">Swift</span>
            <span>Aid</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
