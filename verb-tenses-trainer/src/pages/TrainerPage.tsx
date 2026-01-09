import { useState, useMemo } from 'react';
import { sentences } from '../data/sentences';
import { verbs } from '../data/verbs';
import { Aspect, FutureMode, Tense } from '../domain/types';
import { conjugate } from '../lib/conjugator';
import { SentencePicker } from '../components/SentencePicker';
import { TenseControls } from '../components/TenseControls';
import { GeneratedSentence } from '../components/GeneratedSentence';
import { NuanceNote } from '../components/NuanceNote';

export function TrainerPage() {
  const [sentenceId, setSentenceId] = useState(sentences[0].id);
  const [tense, setTense] = useState<Tense>('Present');
  const [aspect, setAspect] = useState<Aspect>({ perfect: false, progressive: false });
  const [futureMode, setFutureMode] = useState<FutureMode>('will');

  const sentenceTemplate = useMemo(() =>
    sentences.find(s => s.id === sentenceId) || sentences[0]
    , [sentenceId]);

  const result = useMemo(() => {
    return conjugate(sentenceTemplate, verbs, tense, aspect, futureMode);
  }, [sentenceTemplate, tense, aspect, futureMode]);

  const currentNuance = useMemo(() => {
    // Basic nuance selection logic
    const n = sentenceTemplate.nuance;
    if (tense === 'Past') return n.simplePast; // Simplified: Past Perfect etc not fully mapped in template nuances, falling back might be needed or extending template
    if (tense === 'Future') return n.simpleFuture;

    // Present logic (and general Aspect logic which might override)
    // The nuance object structure in data is: { simplePresent, simplePast, simpleFuture, progressive, perfect, perfectProgressive }
    // This structure is a bit simplified compared to the full matrix (3 tenses x 4 aspects).
    // Let's try to map best fit.

    if (aspect.perfect && aspect.progressive) return n.perfectProgressive;
    if (aspect.perfect) return n.perfect;
    if (aspect.progressive) return n.progressive;

    // Simple tenses
    if (tense === 'Past') return n.simplePast;
    if (tense === 'Future') return n.simpleFuture;
    return n.simplePresent;
  }, [sentenceTemplate, tense, aspect]);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Training Mode for {sentenceTemplate.subject}</h2>

      <div className="card mb-6">
        <SentencePicker
          selectedId={sentenceId}
          onSelect={(s) => setSentenceId(s.id)}
        />

        <hr className="my-6 border-gray-100" />

        <TenseControls
          tense={tense}
          aspect={aspect}
          futureMode={futureMode}
          onChangeTense={setTense}
          onChangeAspect={setAspect}
          onChangeFutureMode={setFutureMode}
          allowedFutureModes={sentenceTemplate.allowedFutureModes}
        />
      </div>

      <div className="card bg-white shadow-lg border-blue-100">
        <div className="text-center mb-2 text-sm text-gray-400 font-bold uppercase tracking-widest">
          Output
        </div>
        <GeneratedSentence result={result} />
        <NuanceNote nuance={currentNuance} />
      </div>
    </div>
  );
}
