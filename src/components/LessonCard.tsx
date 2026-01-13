import React from "react";
import { LessonMeta } from "../lib/types";
import { Sheet, SheetContent } from "./ui/Sheet";
import { LessonContent } from "./LessonContent";

interface LessonCardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  meta: LessonMeta;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  isOpen,
  onOpenChange,
  meta,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[70vh] flex flex-col p-0">
        <LessonContent meta={meta} />
      </SheetContent>
    </Sheet>
  );
};
