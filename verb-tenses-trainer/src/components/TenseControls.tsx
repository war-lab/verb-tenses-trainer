import classNames from 'classnames';
import { Aspect, FutureMode, Tense } from '../domain/types';

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

  // Logic: if futureMode is progFuture, disable progressive toggle
  // However, usually we might want to force it to OFF or just show it as disabled.
  // The user requirement: "progFuture のとき perfect も無効化（UIで理由表示）"
  const isProgFuture = futureMode === 'progFuture';

  const handleToggleAspect = (key: keyof Aspect) => {
    if (isFuture && isProgFuture) return; // Locked
    onChangeAspect({ ...aspect, [key]: !aspect[key] });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tense Tabs */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
          時制 (Time Frame)
        </label>
        <div className="flex bg-slate-100 p-1 rounded-xl inline-flex shadow-inner">
          {[
            { id: 'Past', label: 'Past', sub: '過去' },
            { id: 'Present', label: 'Present', sub: '現在' },
            { id: 'Future', label: 'Future', sub: '未来' }
          ].map((t) => (
            <button
              key={t.id}
              className={classNames(
                'px-6 py-3 rounded-lg transition-all text-sm flex flex-col items-center min-w-[100px]',
                tense === t.id
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5 font-bold'
                  : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-slate-200'
              )}
              onClick={() => onChangeTense(t.id as Tense)}
            >
              <span className="text-base">{t.label}</span>
              <span className="text-xs opacity-80 font-normal">{t.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Future Mode Selector (Only visible if Future) */}
      {isFuture && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">
            Future Expression
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { val: 'will', label: 'will', note: '意思/予測' },
              { val: 'goingTo', label: 'be going to', note: '計画/根拠' },
              { val: 'progFuture', label: 'Progressive (Plan)', note: '確定的な予定' },
              { val: 'aboutTo', label: 'be about to', note: '直前' },
            ].map((mode) => {
              // Filter if allowedFutureModes is set
              if (allowedFutureModes && !allowedFutureModes.includes(mode.val as FutureMode)) {
                return null;
              }

              return (
                <label
                  key={mode.val}
                  className={classNames(
                    'cursor-pointer border px-3 py-2 rounded-md flex flex-col items-start bg-white hover:bg-gray-50',
                    futureMode === mode.val ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="futureMode"
                      value={mode.val}
                      checked={futureMode === mode.val}
                      onChange={(e) => onChangeFutureMode(e.target.value as FutureMode)}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="font-bold text-sm">{mode.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-6">{mode.note}</span>
                </label>
              );
            })}
          </div>
          {isProgFuture && (
            <div className="mt-2 text-xs text-blue-700">
              ※ 進行形で未来を表す場合、Aspect（完了/進行）の追加は一般的ではありません。
            </div>
          )}
        </div>
      )}

      {/* Aspect Toggles */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
          Aspect (Viewpoint)
        </label>
        <div className="flex gap-4">
          <button
            className={classNames(
              'flex-1 border p-3 rounded-lg flex items-center justify-between transition-colors',
              aspect.perfect && !isProgFuture ? 'border-primary-color bg-blue-50 text-blue-800' : 'border-gray-200 hover:bg-gray-50',
              isProgFuture && 'opacity-50 cursor-not-allowed bg-gray-100'
            )}
            onClick={() => handleToggleAspect('perfect')}
            disabled={isFuture && isProgFuture}
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-bold">Perfect (完了)</span>
              <span className="text-xs opacity-75">have + p.p.</span>
            </div>
            <div className={classNames("w-5 h-5 rounded-full border flex items-center justify-center", aspect.perfect && !isProgFuture ? "bg-blue-600 border-blue-600" : "border-gray-300")}>
              {aspect.perfect && !isProgFuture && <span className="text-white text-xs">✓</span>}
            </div>
          </button>

          <button
            className={classNames(
              'flex-1 border p-3 rounded-lg flex items-center justify-between transition-colors',
              aspect.progressive && !isProgFuture ? 'border-primary-color bg-blue-50 text-blue-800' : 'border-gray-200 hover:bg-gray-50',
              isProgFuture && 'opacity-50 cursor-not-allowed bg-gray-100'
            )}
            onClick={() => handleToggleAspect('progressive')}
            disabled={isFuture && isProgFuture}
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-bold">Progressive (進行)</span>
              <span className="text-xs opacity-75">be + -ing</span>
            </div>
            <div className={classNames("w-5 h-5 rounded-full border flex items-center justify-center", aspect.progressive && !isProgFuture ? "bg-blue-600 border-blue-600" : "border-gray-300")}>
              {aspect.progressive && !isProgFuture && <span className="text-white text-xs">✓</span>}
            </div>
          </button>
        </div>

        {isFuture && isProgFuture && (
          <div className="text-xs text-orange-600 mt-2">
            ※ Future Modeが "Progressive (Plan)" のため、Aspect操作は無効化されています。
          </div>
        )}
      </div>
    </div>
  );
}
