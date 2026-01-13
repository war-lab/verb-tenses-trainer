import React from "react";
import { Button } from "./ui/Button";
import { BookOpen, Sparkles } from "lucide-react";

interface ResultBarProps {
  onShowLesson: () => void;
  hasWarning: boolean;
}

export const ResultBar: React.FC<ResultBarProps> = ({
  onShowLesson,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-indigo-100 flex items-center justify-between gap-4 z-40">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
          Learning Ready
        </span>
      </div>

      <Button
        onClick={onShowLesson}
        className="flex-1 max-w-[200px] h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        解説を見る
      </Button>
    </div>
  );
};
