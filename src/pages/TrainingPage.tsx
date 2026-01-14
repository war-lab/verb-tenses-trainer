import React, { useState, useEffect, useMemo } from "react";
import { generateQuestions } from "../training/generator";
import { gradeAnswer } from "../training/grader";
import { getNextQuestion, updateState } from "../training/scheduler";
import { loadProgress, saveProgress } from "../training/storage";
import { TrainingQuestion, TrainingAnswer, TrainingResult } from "../training/types";
import { verbs } from "../data/verbs";
import { sentences } from "../data/sentences";
import { conjugate } from "../lib/conjugator";

import { TenseControls } from "../components/TenseControls";
import { AspectControls } from "../components/AspectControls";
import { FutureControls } from "../components/FutureControls";
import { GeneratedSentence } from "../components/GeneratedSentence";
import { Button } from "../components/ui/Button";
import { ChevronDown, CheckCircle, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { LessonCard } from "../components/LessonCard";

const TrainingPage: React.FC = () => {
  // Data
  const [questions, setQuestions] = useState<TrainingQuestion[]>([]);
  const [progress, setProgress] = useState(loadProgress());

  // State
  const [currentQuestion, setCurrentQuestion] = useState<TrainingQuestion | null>(null);
  const [answer, setAnswer] = useState<TrainingAnswer>({
    tense: "Present",
    aspect: { perfect: false, progressive: false },
    futureMode: "will",
    willNuance: "prediction",
  });
  const [result, setResult] = useState<TrainingResult | null>(null);

  // Init
  useEffect(() => {
    const qs = generateQuestions();
    setQuestions(qs);
    const next = getNextQuestion(qs, progress);
    setCurrentQuestion(next);
  }, []); // Run once

  // Reset answer when question changes
  useEffect(() => {
    if (currentQuestion) {
      // Default to Present Simple or keep previous? Better reset to neutral for unbiased training.
      // Or maybe keep "Present Simple" as baseline.
      setAnswer({
        tense: "Present",
        aspect: { perfect: false, progressive: false },
        futureMode: "will",
        willNuance: "prediction",
      });
      setResult(null);
    }
  }, [currentQuestion]);

  const handleSubmit = () => {
    if (!currentQuestion) return;
    const res = gradeAnswer(currentQuestion, answer);
    setResult(res);

    // Update Scheduler
    const oldState = progress.states[currentQuestion.id];
    const newState = updateState(oldState, currentQuestion.id, res.grade);
    const newProgress = {
      ...progress,
      states: { ...progress.states, [currentQuestion.id]: newState }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleNext = () => {
    const next = getNextQuestion(questions, progress);
    setCurrentQuestion(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper to get correct sentence tokens
  const correctSentenceData = useMemo(() => {
    if (!currentQuestion || !result) return null;
    const template = sentences.find(s => s.id === currentQuestion.templateId);
    if (!template) return null;
    const verb = verbs.find(v => v.id === template.verbId);
    if (!verb) return null;

    return conjugate({
      template,
      verb,
      tense: result.target.tense,
      aspect: result.target.aspect,
      futureMode: result.target.futureMode!,
      futureNuance: result.target.willNuance
    });
  }, [currentQuestion, result]);

  if (!currentQuestion) {
    return <div className="p-8 text-center">Loading or No Questions...</div>;
  }

  // Derived Template for constraints
  const currentTemplate = sentences.find(s => s.id === currentQuestion.templateId)!;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* 1. Header: Situation */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Situation</div>
          <div className="text-lg font-bold text-slate-900 mb-2">{currentQuestion.prompt.situationJa}</div>

          <div className="flex flex-col gap-1 items-start">
            {/* Natural JP (Primary) */}
            <div className="text-base text-indigo-700 font-medium">
              {currentQuestion.prompt.jpNatural}
            </div>

            {/* Literal JP (Collapsed/Small) */}
            {currentQuestion.prompt.jpLiteral && (
              <details className="text-slate-400 text-xs">
                <summary className="cursor-pointer hover:text-slate-600 transition-colors list-none flex items-center gap-1">
                  <ChevronDown className="w-3 h-3" /> 直訳を見る
                </summary>
                <div className="mt-1 pl-4 border-l-2 border-slate-100 italic">
                  {currentQuestion.prompt.jpLiteral}
                </div>
              </details>
            )}
          </div>
        </div>
      </header>

      {/* 2. Controls */}
      <main className="max-w-2xl mx-auto p-4 space-y-8 mt-4">
        <div className={`space-y-6 transition-opacity duration-300 ${result ? "opacity-50 pointer-events-none grayscale-[0.5]" : ""}`}>
          <TenseControls
            selectedTense={answer.tense}
            onChange={(t) => setAnswer({ ...answer, tense: t })}
            pastUse="time" // Always time for training? No, maybe future expansion.
            onPastUseChange={() => { }} // Disabled for now -> Training MVP doesn't test polite Past
          />

          <AspectControls
            tense={answer.tense}
            aspect={answer.aspect}
            futureMode={answer.futureMode}
            onChange={(a) => setAnswer({ ...answer, aspect: a })}
          />

          {answer.tense === "Future" && (
            <FutureControls
              template={currentTemplate}
              selectedMode={(answer.futureMode || "will") as any}
              onModeChange={(m) => setAnswer({ ...answer, futureMode: m })}
              selectedNuance={(answer.willNuance || "prediction") as any}
              onNuanceChange={(n) => setAnswer({ ...answer, willNuance: n })}
            />
          )}

          {/* Validation Feedback / Constraints */}
          {/* Note: We could show "Disabled" logic here if we wanted strict constraints enforcement. 
              The reuse of Controls handles some, but Training mode might want to be freer or stricter.
              For now keeping reuse. 
          */}
        </div>
      </main>

      {/* 3. Feedback Overlay / Bottom Sheet */}
      {result && correctSentenceData && (
        <div className="fixed inset-x-0 bottom-0 z-20 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-slate-200 animate-in slide-in-from-bottom-10 duration-300 max-h-[85vh] overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6">

            {/* Headline & Grade */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full shrink-0 ${result.grade === "correct" ? "bg-green-100 text-green-600" :
                result.grade === "acceptable" ? "bg-amber-100 text-amber-600" :
                  "bg-red-100 text-red-600"
                }`}>
                {result.grade === "correct" && <CheckCircle className="w-8 h-8" />}
                {result.grade === "acceptable" && <HelpCircle className="w-8 h-8" />}
                {result.grade === "wrong" && <XCircle className="w-8 h-8" />}
              </div>
              <div className="space-y-1">
                <h2 className={`text-xl font-bold ${result.grade === "correct" ? "text-green-700" :
                  result.grade === "acceptable" ? "text-amber-700" :
                    "text-red-700"
                  }`}>
                  {result.headline}
                </h2>
                <div className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block">
                  💡 {result.ruleOfThumbJa}
                </div>
              </div>
            </div>

            {/* Diff Badges */}
            {result.diffBadges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.diffBadges.map((diff, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                    <span className="line-through opacity-60">{diff.got}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-bold">{diff.expected}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Correct Sentence Display */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <div className="text-xs text-indigo-400 font-bold uppercase mb-2">Correct Answer</div>
              <GeneratedSentence
                tokens={correctSentenceData.tokens}
                breakdown={correctSentenceData.breakdown}
              />
            </div>

            {/* Acceptable Explanation */}
            {result.grade === "acceptable" && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm space-y-2 text-amber-900">
                <p><strong>なぜOK？</strong> {result.whyAcceptableJa}</p>
                <p className="opacity-80"><strong>ベストではない理由：</strong> {result.whyNotBestJa}</p>
              </div>
            )}

            {/* Detailed Lesson Card */}
            <LessonCard
              isOpen={true}
              onOpenChange={() => { }}
              meta={{
                situationJa: result.grade === "wrong" ? "あなたの選択" : currentQuestion.prompt.situationJa, // Use prompt situation usually
                // Use Target details
                jpNatural: currentQuestion.prompt.jpNatural,
                jpLiteral: currentQuestion.prompt.jpLiteral || "",
                whyJa: result.why || [],
                pitfallJa: result.pitfall,
                contrast: undefined, // Retrieve if needed, but lessonHelper logic provides it
              }}
            // We might need to fetch the FULL lesson meta including contrast from helper again if `result` doesn't carry it
            // Actually TrainerPage does this via `getEffectiveLessonMeta`.
            // But `result` in Training Mode carries specialized feedback. 
            // Let's rely on `result.why` and generic explanation. 
            // Wait, LessonCard expects `LessonMeta`. 
            // Construct a temporary meta object for the card
            />
            {/* Note: LessonCard is designed to take a full Meta object. 
                Our result only has parts. 
                Ideally, we should fetch the full meta for the TARGET cell.
            */}

            <Button onClick={handleNext} variant="premium" size="lg" className="w-full">
              Next Question <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="h-4" />
          </div>
        </div>
      )}

      {/* 4. Footer Action */}
      {!result && (
        <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t z-10">
          <div className="max-w-2xl mx-auto">
            <Button onClick={handleSubmit} variant="premium" size="lg" className="w-full shadow-lg">
              Check Answer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
