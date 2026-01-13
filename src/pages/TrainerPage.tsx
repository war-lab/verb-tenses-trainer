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
import { LessonContent } from "../components/LessonContent";
import { Button } from "../components/ui/Button";
import { AlertCircle, BookOpen } from "lucide-react";

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
        jpLiteral: phrase.titleJa,
        jpNatural: phrase.titleJa,
        usageLabel: "Polite:Distance" as const,
        whyJa: ["今の意向をあえて過去形で言うことで、心理的な距離を置き、丁寧さを表現します。"],
      };
    }
    return getEffectiveLessonMeta(currentTemplate, tense, aspect, futureMode, futureNuance);
  }, [currentTemplate, tense, aspect, futureMode, futureNuance, pastUse, politePhraseIndex]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-8">
      <SentencePicker
        sentences={sentences}
        currentIndex={templateIndex}
        onSelect={(idx) => {
          setTemplateIndex(idx);
          const newTemplate = sentences[idx];
          if (!newTemplate.allowedFutureModes?.includes(futureMode)) {
            setFutureMode(newTemplate.allowedFutureModes?.[0] || "will");
          }
        }}
      />

      <main className="max-w-7xl mx-auto p-4 lg:p-6 text-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Controls & Output */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl mx-auto w-full">
            {/* Output Section */}
            <section className="animate-in fade-in duration-500 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <GeneratedSentence
                tokens={result.tokens}
                breakdown={result.breakdown}
              />
              {result.warning && (
                <div className="mt-3 flex gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{result.warning.messageJa}</p>
                </div>
              )}
            </section>

            {/* Controls Section */}
            <div className="space-y-8 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
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
                <div className="space-y-3 animate-in zoom-in-95 duration-200">
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

                  {(tense === "Future" || (tense === "Past" && pastUse === "time")) && (
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
          </div>

          {/* Right Column: Desktop Lesson Content */}
          <div className="hidden lg:block lg:col-span-5 bg-white rounded-3xl shadow-sm border border-slate-100 sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b shrink-0">
              <h3 className="font-bold flex items-center gap-2 text-indigo-600">
                <BookOpen className="w-5 h-5" /> 活用とニュアンスの解説
              </h3>
            </div>
            <LessonContent meta={effectiveMeta} className="max-h-full overflow-y-auto" />
          </div>
        </div>
      </main>

      {/* Mobile-only components */}
      <div className="lg:hidden">
        <ResultBar
          onShowLesson={() => setIsLessonOpen(true)}
        />
        <LessonCard
          isOpen={isLessonOpen}
          onOpenChange={setIsLessonOpen}
          meta={effectiveMeta}
        />
      </div>
    </div>
  );
};

export default TrainerPage;
