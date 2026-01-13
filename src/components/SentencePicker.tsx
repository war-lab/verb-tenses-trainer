import React from "react";
import { SentenceTemplate } from "../lib/types";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SentencePickerProps {
  sentences: SentenceTemplate[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const SentencePicker: React.FC<SentencePickerProps> = ({
  sentences,
  currentIndex,
  onSelect,
}) => {
  const current = sentences[currentIndex];

  const next = () => onSelect((currentIndex + 1) % sentences.length);
  const prev = () => onSelect((currentIndex - 1 + sentences.length) % sentences.length);

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white border-b sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={prev}>
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex-1 text-center">
        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Topic {currentIndex + 1} / {sentences.length}
        </div>
        <div className="text-lg font-bold truncate">
          {current.titleJa}
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={next}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
