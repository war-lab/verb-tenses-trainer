import { ChevronDown, Type } from 'lucide-react';
import { sentences } from '../data/sentences';
import { SentenceTemplate } from '../domain/types';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

type Props = {
  selectedId: string;
  onSelect: (sentence: SentenceTemplate) => void;
};

// Re-implementing as a proper Select trigger style based on the prompt's request for "Custom Select UI"
export function SentencePicker({ selectedId, onSelect }: Props) {
  const selected = sentences.find(s => s.id === selectedId);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Target Sentence"
        description="練習する例文を選択してください"
        icon={Type}
      />

      <Card className="relative overflow-hidden p-0 transition-all hover:border-indigo-300 dark:hover:border-slate-600">
        <select
          className="peer h-full w-full appearance-none bg-transparent py-4 pl-4 pr-10 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/20 dark:text-slate-100 cursor-pointer text-lg"
          value={selectedId}
          onChange={(e) => {
            const s = sentences.find((item) => item.id === e.target.value);
            if (s) onSelect(s);
          }}
        >
          {sentences.map((s) => (
            <option key={s.id} value={s.id} className="dark:bg-slate-900">
              {s.id}. {s.titleJa}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 peer-focus:text-indigo-500">
          <ChevronDown className="h-5 w-5" />
        </div>
      </Card>

      {selected && (
        <div className="flex gap-2 px-1">
          {selected.tags.map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
