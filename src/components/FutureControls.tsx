import React from "react";
import { FutureMode, FutureNuance, SentenceTemplate } from "../lib/types";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";
import { cn } from "../lib/cn";
import { Info } from "lucide-react";

interface FutureControlsProps {
  template: SentenceTemplate;
  selectedMode: FutureMode;
  onModeChange: (mode: FutureMode) => void;
  selectedNuance: FutureNuance;
  onNuanceChange: (nuance: FutureNuance) => void;
}

const FUTURE_MODES: { value: FutureMode; label: string }[] = [
  { value: "will", label: "will" },
  { value: "goingTo", label: "be going to" },
  { value: "progFuture", label: "進行形 (予定)" },
  { value: "aboutTo", label: "be about to" },
];

const NUANCES: { value: FutureNuance; label: string }[] = [
  { value: "decision", label: "決意" },
  { value: "offer", label: "申し出" },
  { value: "promise", label: "約束" },
  { value: "prediction", label: "予測" },
];

export const FutureControls: React.FC<FutureControlsProps> = ({
  template,
  selectedMode,
  onModeChange,
  selectedNuance,
  onNuanceChange,
}) => {
  const allowedModes = template.allowedFutureModes || ["will", "goingTo"];
  const allowedNuances = template.allowedWillNuances || [];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <SectionHeader title="未来の表現 (Future Mode)" />
        <div className="grid grid-cols-2 gap-2">
          {FUTURE_MODES.map((mode) => {
            const isAllowed = allowedModes.includes(mode.value);
            return (
              <Button
                key={mode.value}
                variant={selectedMode === mode.value ? "premium" : "outline"}
                onClick={() => onModeChange(mode.value)}
                disabled={!isAllowed}
                className={cn(
                  "flex-col h-auto py-3 gap-0.5",
                  !isAllowed && "opacity-40 grayscale"
                )}
              >
                <span className="text-sm font-bold">{mode.label}</span>
                {!isAllowed && <span className="text-[10px] font-normal opacity-70">選択不可</span>}
              </Button>
            );
          })}
        </div>
      </div>

      {selectedMode === "will" && (
        <div className="space-y-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
          <SectionHeader title="will の用法 (Nuance)" />
          <div className="grid grid-cols-2 gap-2">
            {NUANCES.map((nuance) => {
              const isAllowed = allowedNuances.includes(nuance.value);
              return (
                <Button
                  key={nuance.value}
                  variant={selectedNuance === nuance.value ? "premium" : "outline"}
                  onClick={() => onNuanceChange(nuance.value)}
                  disabled={!isAllowed}
                  size="sm"
                  className={cn(
                    "h-10",
                    !isAllowed && "opacity-40"
                  )}
                >
                  {nuance.label}
                </Button>
              );
            })}
          </div>
          {allowedNuances.length === 1 && (
            <div className="flex items-center gap-2 text-[10px] text-indigo-600 font-medium">
              <Info className="w-3 h-3" />
              <span>この文脈では「{NUANCES.find(n => n.value === allowedNuances[0])?.label}」が最も自然です。</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
