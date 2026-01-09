import { ConjugatedResult } from '../domain/types';
import { cn } from '../lib/cn';
import { Card } from './ui/Card';

type Props = {
  result: ConjugatedResult;
};

export function GeneratedSentence({ result }: Props) {
  const { tokens, warning } = result;

  return (
    <div className="space-y-6">
      <Card className="min-h-[160px] flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50 border-dashed border-2">
        <div key={tokens.map(t => t.text).join('')} className="text-2xl md:text-4xl text-center leading-relaxed animate-fade-in font-serif">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={cn(
                "inline-block mx-[0.15em] px-[0.3em] py-[0.1em] rounded-md transition-all duration-300",
                token.highlight ? "font-bold shadow-sm ring-1 ring-inset" : "text-slate-800 dark:text-slate-200",

                // Specific highlight colors based on kind
                token.kind === 'aux' && "bg-pink-100 text-pink-700 ring-pink-500/20 dark:bg-pink-900/30 dark:text-pink-300",
                token.kind === 'verb' && "bg-blue-100 text-blue-700 ring-blue-500/20 dark:bg-blue-900/30 dark:text-blue-300",
                (token.kind === 'have' || token.kind === 'be') && "bg-amber-100 text-amber-700 ring-amber-500/20 dark:bg-amber-900/30 dark:text-amber-300",

                token.kind === 'normal' && "bg-transparent ring-0"
              )}
            >
              {token.text}
            </span>
          ))}
        </div>
      </Card>

      {warning && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 shadow-sm dark:bg-orange-950/30 dark:text-orange-200 dark:border-orange-900 animate-fade-in">
          <span className="text-xl">⚠️</span>
          <div>
            <div className="font-bold text-sm">Advice Check</div>
            <div className="text-sm opacity-90">{warning.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
