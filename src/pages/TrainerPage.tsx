import React, { useState, useMemo } from "react";
import { sentences } from "../data/sentences";
import { verbs } from "../data/verbs";
import { politePastPhrases } from "../data/politePastPhrases";
import { Tense, Aspect, FutureMode, FutureNuance, ConjugationResult } from "../lib/types";
import { conjugate } from "../lib/conjugator";
import { getEffectiveLessonMeta } from "../lib/lessonHelper";

import { SentencePicker } from "../components/SentencePicker";
import { GeneratedSentence } from "../components/GeneratedSentence";
import { TenseControls } from "../components/TenseControls";
import { AspectControls } from "../components/AspectControls";
import { FutureControls } from "../components/FutureControls";
import { ResultBar } from "../components/ResultBar";
import { LessonCard } from "../components/LessonCard";
import { Button } from "../components/ui/Button";
import { AlertCircle } from "lucide-react";

const TrainerPage: React.FC = () => {
  // Navigation State
  const [templateIndex, setTemplateIndex] = useState(0);

  // Grammar State
  const [tense, setTense] = useState<Tense>("Present");
  const [aspect, setAspect] = useState<Aspect>({ perfect: false, progressive: false });
  const [futureMode, setFutureMode] = useState<FutureMode>("will");
  const [futureNuance, setFutureNuance] = useState<FutureNuance>("prediction");
  const [pastUse, setPastUse] = useState<"time" | "polite">("time");
  const [politePhraseIndex, setPolitePhraseIndex] = useState(0);

  // UI State
  const [isLessonOpen, setIsLessonOpen] = useState(false);

  const currentTemplate = sentences[templateIndex];
  const currentVerb = verbs.find(v => v.id === currentTemplate.verbId) || verbs[0];

  // Logic: Conjugation or Polite Phrase
  const result: ConjugationResult = useMemo(() => {
    if (tense === "Past" && pastUse === "polite") {
      const phrase = politePastPhrases[politePhraseIndex];
      return {
        tokens: phrase.tokens,
        breakdown: ["Distance Past", "Polite"],
      };
    }

    return conjugate({
      template: currentTemplate,
      verb: currentVerb,
      tense,
      aspect,
      futureMode,
      futureNuance,
    });
  }, [currentTemplate, currentVerb, tense, aspect, futureMode, futureNuance, pastUse, politePhraseIndex]);

  const effectiveMeta = useMemo(() => {
    if (tense === "Past" && pastUse === "polite") {
      const phrase = politePastPhrases[politePhraseIndex];
      return {
        situationJa: phrase.situationJa,
        jpLiteral: phrase.titleJa, // For polite phrases, literal is less important
        jpNatural: phrase.titleJa,
        usageLabel: "Polite:Distance" as const,
        whyJa: ["今の意向をあえて過去形で言うことで、心理的な距離を置き、丁寧さを表現します。"],
      };
    }
    return getEffectiveLessonMeta(currentTemplate, tense, futureMode, futureNuance);
  }, [currentTemplate, tense, futureMode, futureNuance, pastUse, politePhraseIndex]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <SentencePicker
        sentences={sentences}
        currentIndex={templateIndex}
        onSelect={(idx) => {
          setTemplateIndex(idx);
          // Reset aspects if switching to a restricted template
          const newTemplate = sentences[idx];
          if (!newTemplate.allowedFutureModes?.includes(futureMode)) {
            setFutureMode(newTemplate.allowedFutureModes?.[0] || "will");
          }
        }}
      />

      <main className="max-w-md mx-auto p-4 space-y-8">
        {/* Output Section */}
        <section className="animate-in fade-in duration-500">
          <GeneratedSentence
            tokens={result.tokens}
            breakdown={result.breakdown}
          />
          {result.warning && (
            <div className="mt-4 flex gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{result.warning.messageJa}</p>
            </div>
          )}
        </section>

        {/* Controls Section */}
        <div className="space-y-10">
          <TenseControls
            selectedTense={tense}
            onChange={(t) => {
              setTense(t);
              if (t === "Future" && futureMode === "progFuture") {
                setAspect({ perfect: false, progressive: true });
              }
            }}
            pastUse={pastUse}
            onPastUseChange={setPastUse}
          />

          {tense === "Past" && pastUse === "polite" ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Polite Phrasing (Selection)</div>
              <div className="flex flex-col gap-2">
                {politePastPhrases.map((phrase, idx) => (
                  <Button
                    key={phrase.id}
                    variant={politePhraseIndex === idx ? "premium" : "outline"}
                    onClick={() => setPolitePhraseIndex(idx)}
                    className="justify-start text-left h-auto py-3 px-4"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold">{phrase.titleJa}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <AspectControls
                tense={tense}
                futureMode={futureMode}
                aspect={aspect}
                onChange={setAspect}
              />

              {tense === "Future" && (
                <FutureControls
                  template={currentTemplate}
                  selectedMode={futureMode}
                  onModeChange={(m) => {
                    setFutureMode(m);
                    if (m === "progFuture") {
                      setAspect({ perfect: false, progressive: true });
                    } else if (m === "aboutTo") {
                      setAspect({ perfect: false, progressive: false });
                    }
                  }}
                  selectedNuance={futureNuance}
                  onNuanceChange={setFutureNuance}
                />
              )}
            </>
          )}
        </div>
      </main>

      <ResultBar
        onShowLesson={() => setIsLessonOpen(true)}
        hasWarning={!!result.warning}
      />

      <LessonCard
        isOpen={isLessonOpen}
        onOpenChange={setIsLessonOpen}
        meta={effectiveMeta}
      />
    </div>
  );
};

export default TrainerPage;
