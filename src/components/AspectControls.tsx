import React from "react";
import { Aspect, FutureMode, Tense } from "../lib/types";
import { SectionHeader } from "./ui/SectionHeader";
import { Check, Info } from "lucide-react";
import { cn } from "../lib/cn";

interface AspectControlsProps {
  tense: Tense;
  futureMode: FutureMode;
  aspect: Aspect;
  onChange: (aspect: Aspect) => void;
}

export const AspectControls: React.FC<AspectControlsProps> = ({
  tense,
  futureMode,
  aspect,
  onChange,
}) => {
  const isProgFuture = tense === "Future" && futureMode === "progFuture";
  const isAboutTo = tense === "Future" && futureMode === "aboutTo";

  // Force rules
  const perfectDisabled = isProgFuture || isAboutTo;
  const progressiveDisabled = isProgFuture || isAboutTo;

  const togglePerfect = () => {
    if (perfectDisabled) return;
    onChange({ ...aspect, perfect: !aspect.perfect });
  };

  const toggleProgressive = () => {
    if (progressiveDisabled) return;
    onChange({ ...aspect, progressive: !aspect.progressive });
  };

  return (
    <div className="space-y-3">
      <SectionHeader title="アスペクト (Aspect)" />
      <div className="flex gap-3">
        <button
          onClick={togglePerfect}
          disabled={perfectDisabled}
          className={cn(
            "flex flex-1 items-center justify-between p-3 rounded-xl border-2 transition-all",
            aspect.perfect
              ? "bg-indigo-50 border-indigo-600 outline-none"
              : "bg-white border-slate-200 hover:border-slate-300",
            perfectDisabled && "opacity-50 cursor-not-allowed bg-slate-50"
          )}
        >
          <div className="text-left">
            <div className="font-bold text-sm">完了形</div>
            <div className="text-[10px] text-slate-500">Perfect</div>
          </div>
          <div className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            aspect.perfect ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"
          )}>
            {aspect.perfect && <Check className="w-4 h-4 text-white" />}
          </div>
        </button>

        <button
          onClick={toggleProgressive}
          disabled={progressiveDisabled}
          className={cn(
            "flex flex-1 items-center justify-between p-3 rounded-xl border-2 transition-all",
            aspect.progressive
              ? "bg-indigo-50 border-indigo-600 outline-none"
              : "bg-white border-slate-200 hover:border-slate-300",
            progressiveDisabled && "opacity-50 cursor-not-allowed bg-slate-50"
          )}
        >
          <div className="text-left">
            <div className="font-bold text-sm">進行形</div>
            <div className="text-[10px] text-slate-500">Progressive</div>
          </div>
          <div className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            aspect.progressive ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"
          )}>
            {aspect.progressive && <Check className="w-4 h-4 text-white" />}
          </div>
        </button>
      </div>

      {(isProgFuture || isAboutTo) && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-lg text-xs leading-relaxed">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            {isProgFuture
              ? "「予定」を表す現在進行形は、常に進行形であり完了形は使われません。"
              : "be about to は通常、単純な動作（Simple）に使われます。"}
          </p>
        </div>
      )}
    </div>
  );
};
