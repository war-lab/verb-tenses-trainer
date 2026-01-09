import { Aspect, Tense } from '../domain/types';
import { Badge } from './ui/Badge';

type Props = {
  tense: Tense;
  aspect: Aspect;
};

export function StateSummary({ tense, aspect }: Props) {
  // Translate to Japanese for display
  const tenseLabel = {
    Past: '過去',
    Present: '現在',
    Future: '未来'
  }[tense];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">STATE</div>

      <Badge variant="default" className="text-sm px-3 py-1">
        {tenseLabel} ({tense})
      </Badge>

      {aspect.perfect && (
        <>
          <span className="text-slate-300 dark:text-slate-600">+</span>
          <Badge variant="muted" className="text-sm px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            Perfect (完了)
          </Badge>
        </>
      )}

      {aspect.progressive && (
        <>
          <span className="text-slate-300 dark:text-slate-600">+</span>
          <Badge variant="muted" className="text-sm px-3 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
            Progressive (進行)
          </Badge>
        </>
      )}

      {/* Simple Tense Case */}
      {!aspect.perfect && !aspect.progressive && (
        <>
          <span className="text-slate-300 dark:text-slate-600">+</span>
          <span className="text-sm text-slate-500 font-medium px-2">Simple</span>
        </>
      )}
    </div>
  );
}
