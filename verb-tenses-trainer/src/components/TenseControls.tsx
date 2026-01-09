import { Aspect, FutureMode, Tense } from '../domain/types';

import { Clock, Calendar, Rocket, Sparkles, Repeat, AlertCircle } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

import { cn } from '../lib/cn';

type Props = {
  tense: Tense;
  aspect: Aspect;
  futureMode: FutureMode;
  onChangeTense: (t: Tense) => void;
  onChangeAspect: (a: Aspect) => void;
  onChangeFutureMode: (m: FutureMode) => void;
  allowedFutureModes?: FutureMode[];
};

export function TenseControls({
  tense,
  aspect,
  futureMode,
  onChangeTense,
  onChangeAspect,
  onChangeFutureMode,
  allowedFutureModes,
}: Props) {

  const isFuture = tense === 'Future';
  const isProgFuture = isFuture && futureMode === 'progFuture';

  return (
    <div className="space-y-8">

      {/* Tense Controls */}
      <div>
        <SectionHeader
          title="Time Frame"
          description="いつの話ですか？"
          icon={Clock}
        />
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'Past', label: 'Past', sub: '過去', icon: Clock },
            { id: 'Present', label: 'Present', sub: '現在', icon: Calendar },
            { id: 'Future', label: 'Future', sub: '未来', icon: Rocket }
          ].map((t) => {
            const isSelected = tense === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onChangeTense(t.id as Tense)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isSelected
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm ring-2 ring-indigo-500/30 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-500 hover:border-indigo-100 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
                )}
              >
                <Icon className={cn("mb-2 h-6 w-6", isSelected && "animate-pulse")} />
                <span className="text-sm font-bold">{t.label}</span>
                <span className="text-[10px] opacity-70">{t.sub}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Aspect Controls */}
      <div>
        <SectionHeader
          title="Aspect"
          description="動作の状態はどうですか？"
          icon={Sparkles}
        />

        <div className="grid gap-4">
          {/* Perfect */}
          <div
            onClick={() => !isProgFuture && onChangeAspect({ ...aspect, perfect: !aspect.perfect })}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all",
              isProgFuture ? "cursor-not-allowed opacity-50 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800" :
                aspect.perfect
                  ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/30 dark:bg-indigo-950/20 dark:border-indigo-900"
                  : "bg-white border-slate-200 hover:border-indigo-200 dark:bg-slate-950 dark:border-slate-800"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", aspect.perfect ? "bg-indigo-200/50 text-indigo-700" : "bg-slate-100 text-slate-500 dark:bg-slate-800")}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Perfect (完了)</div>
                <div className="text-xs text-slate-500">もう終わった / 経験した</div>
              </div>
            </div>
            <div className={cn("h-5 w-5 rounded-full border flex items-center justify-center", aspect.perfect ? "bg-indigo-600 border-indigo-600" : "border-slate-300")}>
              {aspect.perfect && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>

          {/* Progressive */}
          <div
            onClick={() => !isProgFuture && onChangeAspect({ ...aspect, progressive: !aspect.progressive })}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all",
              isProgFuture ? "cursor-not-allowed opacity-50 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800" :
                aspect.progressive
                  ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/30 dark:bg-indigo-950/20 dark:border-indigo-900"
                  : "bg-white border-slate-200 hover:border-indigo-200 dark:bg-slate-950 dark:border-slate-800"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", aspect.progressive ? "bg-indigo-200/50 text-indigo-700" : "bg-slate-100 text-slate-500 dark:bg-slate-800")}>
                <Repeat className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Progressive (進行)</div>
                <div className="text-xs text-slate-500">最中である / 動作の継続</div>
              </div>
            </div>
            <div className={cn("h-5 w-5 rounded-full border flex items-center justify-center", aspect.progressive ? "bg-indigo-600 border-indigo-600" : "border-slate-300")}>
              {aspect.progressive && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
        </div>

        {isProgFuture && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>未来の進行形モード選択中は、アスペクト操作が無効化されます</span>
          </div>
        )}
      </div>

      {/* Future Mode (Visual Fix) */}
      {isFuture && (
        <div className="animate-fade-in space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold uppercase text-slate-400">Future Expression Mode</label>
          <div className="flex flex-col gap-2">
            {[
              { id: 'will', label: 'will', desc: '意思/予測' },
              { id: 'goingTo', label: 'be going to', desc: '計画/前兆' },
              { id: 'progFuture', label: 'Progressive', desc: '確定した予定' },
              { id: 'aboutTo', label: 'be about to', desc: '直前' }
            ].map((m) => {
              if (allowedFutureModes && !allowedFutureModes.includes(m.id as FutureMode)) return null;
              const isSelected = futureMode === m.id;
              return (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-900",
                    isSelected ? "border-indigo-300 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/20" : "border-transparent"
                  )}
                >
                  <input
                    type="radio"
                    name="futureMode"
                    value={m.id}
                    checked={isSelected}
                    onChange={() => onChangeFutureMode(m.id as FutureMode)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="text-sm">
                    <span className="font-bold text-slate-900 dark:text-slate-100 mr-2">{m.label}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">{m.desc}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
