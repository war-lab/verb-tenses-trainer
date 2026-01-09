import { useState, useMemo } from 'react';
import { sentences } from '../data/sentences';
import { verbs } from '../data/verbs';
import { Aspect, FutureMode, Tense } from '../domain/types';
import { conjugate } from '../lib/conjugator';
import { SentencePicker } from '../components/SentencePicker';
import { TenseControls } from '../components/TenseControls';
import { GeneratedSentence } from '../components/GeneratedSentence';
import { NuanceNote } from '../components/NuanceNote';

import { StateSummary } from '../components/StateSummary';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Lightbulb } from 'lucide-react';

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
    const n = sentenceTemplate.nuance;
    // Aspect takes precedence over Simple Tense nuances in this MVP mapping
    if (aspect.perfect && aspect.progressive) return n.perfectProgressive;
    if (aspect.perfect) return n.perfect;
    if (aspect.progressive) return n.progressive;

    // Simple tenses
    if (tense === 'Past') return n.simplePast;
    if (tense === 'Future') return n.simpleFuture;
    return n.simplePresent;
  }, [sentenceTemplate, tense, aspect]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">


      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Left Column: Inputs */}
        <div className="md:col-span-7 space-y-8">
          <SentencePicker
            selectedId={sentenceId}
            onSelect={(s) => setSentenceId(s.id)}
          />

          <hr className="border-slate-200 dark:border-slate-800" />

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

        {/* Right Column: Outputs (Sticky) */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24 space-y-6">
            <div className="hidden md:block">
              <SectionHeader title="Output Preview" description="生成結果" />
            </div>

            <StateSummary tense={tense} aspect={aspect} />

            <GeneratedSentence result={result} />

            <div className="mt-8">
              <SectionHeader title="Nuance Note" icon={Lightbulb} className="mb-4" />
              <NuanceNote nuance={currentNuance} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
