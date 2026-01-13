import React, { useState } from "react";
import { LessonMeta } from "../lib/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/Sheet";
import { Badge } from "./ui/Badge";
import { ChevronDown, ChevronUp, Info, ArrowLeftRight, AlertTriangle } from "lucide-react";
import { cn } from "../lib/cn";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showLiteral, setShowLiteral] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[70vh] flex flex-col p-0">
        <SheetHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            {meta.usageLabel && (
              <Badge variant="default" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                {meta.usageLabel}
              </Badge>
            )}
          </div>
          <SheetTitle className="text-2xl font-bold leading-tight">
            {meta.jpNatural}
          </SheetTitle>
          <button
            onClick={() => setShowLiteral(!showLiteral)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            {showLiteral ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            直訳（構造の確認）
          </button>
          <AnimatePresence>
            {showLiteral && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-sm text-slate-500 italic mt-1 overflow-hidden"
              >
                {meta.jpLiteral}
              </motion.p>
            )}
          </AnimatePresence>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-8 pb-12">
          {/* Situation */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info className="w-3 h-3" /> Situation / 場面
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              {meta.situationJa}
            </p>
          </section>

          {/* Explanation (Why) */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Why / なぜこの形？</h3>
            <ul className="space-y-2">
              {meta.whyJa.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </section>

          {/* Pitfall */}
          {meta.pitfallJa && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-800">留意点 (Pitfall)</div>
                <div className="text-sm text-amber-900 leading-snug">{meta.pitfallJa}</div>
              </div>
            </div>
          )}

          {/* Split Compare (The Core Learning Feature) */}
          {meta.contrast && (
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <ArrowLeftRight className="w-3 h-3" /> Comparison / 対比して覚える
              </h3>
              <div className="p-4 bg-white border border-indigo-100 rounded-2xl shadow-sm space-y-4">
                <div className="text-sm font-bold border-b pb-2 mb-2">{meta.contrast.titleJa}</div>
                <div className="flex flex-wrap gap-1 text-lg">
                  {meta.contrast.tokens.map((token, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        token.highlight && "text-indigo-600 font-bold bg-indigo-50 px-0.5 rounded"
                      )}
                    >
                      {token.text}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
                  {meta.contrast.noteJa}
                </div>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
