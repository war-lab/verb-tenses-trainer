import classNames from 'classnames';
import { sentences } from '../data/sentences';
import { SentenceTemplate } from '../domain/types';

type Props = {
  selectedId: string;
  onSelect: (sentence: SentenceTemplate) => void;
};

export function SentencePicker({ selectedId, onSelect }: Props) {
  const selected = sentences.find((s) => s.id === selectedId);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        例文を選択
      </label>
      <div className="flex gap-2 items-center flex-wrap">
        <select
          className="border border-gray-300 rounded-md p-2 w-full max-w-md text-base"
          value={selectedId}
          onChange={(e) => {
            const s = sentences.find((item) => item.id === e.target.value);
            if (s) onSelect(s);
          }}
        >
          {sentences.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id}. {s.titleJa} ({s.tags.join(', ')})
            </option>
          ))}
        </select>

        {/* Simple Next/Prev buttons could go here if needed */}
      </div>
      {selected && (
        <div className="text-sm text-gray-500 mt-1">
          Tags: {selected.tags.join(', ')} / Base: {selected.subject} + {selected.verbKey}
        </div>
      )}
    </div>
  );
}
