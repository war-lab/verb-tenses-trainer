import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Layers, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ComparePage: React.FC = () => {
  const comparisons = [
    {
      title: "現在形 vs 現在進行形",
      subtitle: "習慣か、今この瞬間か",
      left: {
        label: "Present Simple",
        sentence: "I eat apples.",
        desc: "習慣、不変の真理、安定した状態。",
        nuance: "（普段から）食べる習慣がある"
      },
      right: {
        label: "Present Progressive",
        sentence: "I am eating an apple.",
        desc: "今まさに進行中の動作、一時的な状態。",
        nuance: "（今まさに）食べている最中だ"
      },
      icon: Zap
    },
    {
      title: "過去形 vs 現在完了形",
      subtitle: "点か、線（今のつながり）か",
      left: {
        label: "Past Simple",
        sentence: "I lost my key.",
        desc: "過去の特定の「点」の出来事。今は見つかったかも？",
        nuance: "（あの時）失くした（過去の事実）"
      },
      right: {
        label: "Present Perfect",
        sentence: "I have lost my key.",
        desc: "過去の出来事が「今」に影響している（結果・継続）。",
        nuance: "（失くしてしまって）今も持っていない"
      },
      icon: RefreshCw
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-3">
          <Layers className="w-8 h-8 text-indigo-600" />
          Tense Comparisons
        </h1>
        <p className="text-slate-500">似た時制を並べて、その核心的な違いを理解しましょう。</p>
      </div>

      <div className="space-y-12">
        {comparisons.map((comp) => (
          <section key={comp.title} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-indigo-600">
                <comp.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{comp.title}</h3>
                <p className="text-sm text-slate-500">{comp.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side */}
              <Card className="border-slate-100 bg-white hover:border-indigo-100 transition-all">
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="w-fit mb-2 text-slate-500">{comp.left.label}</Badge>
                  <CardTitle className="text-2xl font-mono text-indigo-600">{comp.left.sentence}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">{comp.left.desc}</p>
                  <div className="text-xs font-bold text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    日本語感：{comp.left.nuance}
                  </div>
                </CardContent>
              </Card>

              {/* Right Side */}
              <Card className="border-indigo-200 bg-indigo-50/20 hover:border-indigo-400 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-indigo-200">
                  <CheckCircle2 className="w-12 h-12 rotate-12" />
                </div>
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-indigo-600">{comp.right.label}</Badge>
                  <CardTitle className="text-2xl font-mono text-slate-900">{comp.right.sentence}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">{comp.right.desc}</p>
                  <div className="text-xs font-bold text-indigo-600 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                    日本語感：{comp.right.nuance}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center md:hidden">
              <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
