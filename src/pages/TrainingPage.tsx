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
import { ChevronDown, CheckCircle, XCircle, ArrowRight, HelpCircle, X } from "lucide-react";
import { LessonContent } from "../components/LessonContent";

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

  // Helper to get CHOSEN sentence tokens (for comparison)
  const chosenSentenceData = useMemo(() => {
    if (!currentQuestion || !result) return null;
    const template = sentences.find(s => s.id === currentQuestion.templateId);
    if (!template) return null;
    const verb = verbs.find(v => v.id === template.verbId);
    if (!verb) return null;

    return conjugate({
      template,
      verb,
      tense: result.chosen.tense,
      aspect: result.chosen.aspect,
      futureMode: result.chosen.futureMode!,
      futureNuance: result.chosen.willNuance
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
            futureMode={answer.futureMode || "will"}
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
      {/* 3. Feedback Overlay / Bottom Sheet */}
      {result && (
        <div className="fixed inset-x-0 bottom-0 z-50 h-[85vh] flex flex-col bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.2)] rounded-t-2xl animate-in slide-in-from-bottom-10 duration-300 isolate">

          {/* 1. Sheet Header (Fixed) */}
          <div className="flex-none p-4 lg:p-6 border-b border-slate-100 flex items-start justify-between bg-white rounded-t-2xl z-10">
            {/* Headline */}
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
                <h2 className={`text-2xl font-black tracking-tight ${result.grade === "correct" ? "text-green-700" :
                  result.grade === "acceptable" ? "text-amber-700" :
                    "text-red-700"
                  }`}>
                  {result.headline}
                </h2>
                <div className="text-base font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg inline-block shadow-sm border border-slate-200/50">
                  💡 {result.ruleOfThumbJa}
                </div>
              </div>
            </div>

            {/* Close / Next Button */}
            <button
              onClick={handleNext}
              className="p-2 -mr-2 -mt-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              aria-label="Next Question"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 2. Sheet Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">

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

            {/* Comparison Display */}
            <div className="grid grid-cols-1 gap-4">
              {/* Your Answer (Always show for clarity unless 100% match) */}
              {/* Actually, if correct, showing both is redundant. Keep logic: show if not correct. */}
              {/* Force show if acceptable? Yes. */}
              {result.grade !== "correct" && chosenSentenceData && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 opacity-80">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-2">Your Answer</div>
                  <GeneratedSentence
                    tokens={chosenSentenceData.tokens}
                    breakdown={chosenSentenceData.breakdown}
                  />
                </div>
              )}

              {/* Correct Sentence Display */}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-indigo-100 rounded-bl-xl text-indigo-700">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-xs text-indigo-400 font-bold uppercase mb-2">Correct Answer</div>
                {correctSentenceData ? (
                  <GeneratedSentence
                    tokens={correctSentenceData.tokens}
                    breakdown={correctSentenceData.breakdown}
                  />
                ) : (
                  <div className="text-sm text-red-500 font-bold">
                    Error generating correct sentence. Please report this issue.
                  </div>
                )}
              </div>
            </div>

            {/* Acceptable Explanation */}
            {result.grade === "acceptable" && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm space-y-2 text-amber-900">
                <p><strong>なぜOK？</strong> {result.whyAcceptableJa}</p>
                <p className="opacity-80"><strong>ベストではない理由：</strong> {result.whyNotBestJa}</p>
              </div>
            )}

            {/* Detailed Lesson Content (No nested Sheet) */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <LessonContent
                meta={{
                  situationJa: currentQuestion.prompt.situationJa,
                  jpNatural: currentQuestion.prompt.jpNatural,
                  jpLiteral: currentQuestion.prompt.jpLiteral || "",
                  whyJa: result.why || [],
                  pitfallJa: result.pitfall,
                }}
              />
            </div>
            {/* Added extra padding for scroll comfort */}
            <div className="h-4" />
          </div>

          {/* 3. Sheet Footer (Fixed) */}
          <div className="flex-none p-4 bg-white border-t border-slate-100 safe-pb z-10">
            <div className="max-w-2xl mx-auto">
              <Button onClick={handleNext} variant="premium" size="lg" className="w-full shadow-lg">
                Next Question <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
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
