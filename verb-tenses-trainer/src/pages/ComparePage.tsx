import { useState } from 'react';
import { sentences } from '../data/sentences';
import { verbs } from '../data/verbs';
import { conjugate } from '../lib/conjugator';
import { SentencePicker } from '../components/SentencePicker';
import { GeneratedSentence } from '../components/GeneratedSentence';
import { Aspect, FutureMode, Tense } from '../domain/types';

export function ComparePage() {
  const [sentenceId, setSentenceId] = useState(sentences[0].id);
  const sentenceTemplate = sentences.find(s => s.id === sentenceId) || sentences[0];

  // Fixed Comparison for Future forms (as per requirements)
  // "will vs going to vs progFuture"

  const forms: Array<{ label: string, tense: Tense, mode: FutureMode, aspect: Aspect }> = [
    { label: 'will (意思/予測)', tense: 'Future', mode: 'will', aspect: { perfect: false, progressive: false } },
    { label: 'be going to (計画)', tense: 'Future', mode: 'goingTo', aspect: { perfect: false, progressive: false } },
    { label: 'Present Progressive (確定予定)', tense: 'Future', mode: 'progFuture', aspect: { perfect: false, progressive: false } },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Compare Future Forms</h2>

      <div className="card mb-8">
        <SentencePicker
          selectedId={sentenceId}
          onSelect={(s) => setSentenceId(s.id)}
        />
      </div>

      <div className="grid gap-6">
        {forms.map((form) => {
          // Filter out if restricted
          if (sentenceTemplate.allowedFutureModes && !sentenceTemplate.allowedFutureModes.includes(form.mode)) {
            return null;
          }

          const result = conjugate(sentenceTemplate, verbs, form.tense, form.aspect, form.mode);
          return (
            <div key={form.label} className="card border-l-8 border-l-blue-500">
              <div className="text-xs font-bold text-gray-500 uppercase mb-2">{form.label}</div>
              <GeneratedSentence result={result} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
