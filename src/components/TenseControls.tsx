import React from "react";
import { Tense } from "../lib/types";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";
import { cn } from "../lib/cn";

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
    <div className="space-y-3">
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
        <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1.5 border border-slate-200 shadow-inner">
          <Button
            variant={pastUse === "time" ? "premium" : "ghost"}
            size="sm"
            onClick={() => onPastUseChange("time")}
            className={cn(
              "flex-1 text-xs font-bold transition-all h-9 rounded-lg",
              pastUse === "time" ? "shadow-md" : "text-slate-500"
            )}
          >
            時間軸の過去
          </Button>
          <Button
            variant={pastUse === "polite" ? "premium" : "ghost"}
            size="sm"
            onClick={() => onPastUseChange("polite")}
            className={cn(
              "flex-1 text-xs font-bold transition-all h-9 rounded-lg",
              pastUse === "polite" ? "shadow-md" : "text-slate-500"
            )}
          >
            丁寧な距離感
          </Button>
        </div>
      )}
    </div>
  );
};
