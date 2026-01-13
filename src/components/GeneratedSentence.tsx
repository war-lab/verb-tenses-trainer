import React from "react";
import { Token } from "../lib/types";
import { Badge } from "./ui/Badge";
import { cn } from "../lib/cn";

interface GeneratedSentenceProps {
  tokens: Token[];
  breakdown?: string[];
}

export const GeneratedSentence: React.FC<GeneratedSentenceProps> = ({
  tokens,
  breakdown,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-3 p-4 bg-muted/30 rounded-2xl min-h-[4rem] text-2xl md:text-3xl font-medium tracking-tight">
        {tokens.map((token, idx) => (
          <span
            key={idx}
            className={cn(
              "transition-all duration-300",
              token.highlight && "text-indigo-600 font-bold underline decoration-indigo-300 decoration-4 underline-offset-8 bg-indigo-50/50 px-1 rounded",
              token.kind === "subject" && "text-slate-900",
              token.kind === "be" && "text-amber-600",
              token.kind === "have" && "text-emerald-600",
              token.kind === "aux" && "text-indigo-600",
              token.kind === "verb" && token.highlight ? "" : token.kind === "verb" ? "text-slate-800" : ""
            )}
          >
            {token.text}
          </span>
        ))}
      </div>

      {breakdown && breakdown.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {breakdown.map((item, idx) => (
            <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs px-2 py-0.5">
              {item}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
