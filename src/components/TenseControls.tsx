import React from "react";
import { Tense } from "../lib/types";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";

interface TenseControlsProps {
  selectedTense: Tense;
  onChange: (tense: Tense) => void;
  pastUse: "time" | "polite";
  onPastUseChange: (use: "time" | "polite") => void;
}

export const TenseControls: React.FC<TenseControlsProps> = ({
  selectedTense,
  onChange,
  pastUse,
  onPastUseChange,
}) => {
  return (
    <div className="space-y-4">
      <SectionHeader title="時制 (Tense)" />
      <div className="grid grid-cols-3 gap-2">
        {(["Past", "Present", "Future"] as Tense[]).map((tense) => (
          <Button
            key={tense}
            variant={selectedTense === tense ? "premium" : "outline"}
            onClick={() => onChange(tense)}
            className="w-full"
          >
            {tense === "Past" ? "過去" : tense === "Present" ? "現在" : "未来"}
          </Button>
        ))}
      </div>

      {selectedTense === "Past" && (
        <div className="flex bg-muted p-1 rounded-lg gap-1 border">
          <Button
            variant={pastUse === "time" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onPastUseChange("time")}
            className="flex-1 text-xs"
          >
            時間軸の過去
          </Button>
          <Button
            variant={pastUse === "polite" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onPastUseChange("polite")}
            className="flex-1 text-xs"
          >
            丁寧な距離感
          </Button>
        </div>
      )}
    </div>
  );
};
