import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Compass, Clock, MapPin, Zap, Info } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const FutureGuidePage: React.FC = () => {
  const futureModes = [
    {
      mode: "will",
      jp: "意志・予測",
      description: "その場で決めたこと、根拠のない予測、約束など。",
      example: "I will call you tonight.",
      nuance: "「〜しよう」「〜だろう」",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      mode: "be going to",
      jp: "予定・兆候",
      description: "以前から決めている予定、客観的な状況からの確実な兆候。",
      example: "It's going to rain.",
      nuance: "「〜するつもり」「〜しそうだ」",
      icon: MapPin,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      mode: "Present Progressive",
      jp: "確定した近未来",
      description: "手配済み・準備済みの確定した予定（旅行、会議など）。",
      example: "I'm leaving tomorrow.",
      nuance: "「（既に手はずが整って）〜することになっている」",
      icon: Clock,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      mode: "be about to",
      jp: "直後の未来",
      description: "今まさに何かが起ころうとしている瞬間。",
      example: "The movie is about to start.",
      nuance: "「今まさに〜するところだ」",
      icon: Zap,
      color: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Compass className="w-8 h-8 text-indigo-600" />
          Future Guide
        </h1>
        <p className="text-slate-500">未来の表現は、話し手の「確信の度合い」や「準備の状態」によって使い分けます。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {futureModes.map((item) => (
          <Card key={item.mode} className="overflow-hidden border-2 hover:border-indigo-200 transition-all group">
            <CardHeader className={`${item.color} border-b`}>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-white/50 border-current">
                  {item.mode}
                </Badge>
                <item.icon className="w-5 h-5" />
              </div>
              <CardTitle className="mt-2 text-xl font-bold">{item.jp}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</div>
                <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nuance</div>
                <p className="text-sm font-medium text-indigo-600 italic">「{item.nuance}」</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-mono flex items-center gap-2">
                <span className="text-indigo-500 font-bold">e.g.</span>
                {item.example}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/20 p-4 rounded-2xl shrink-0">
          <Info className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-lg">使い分けのコツ</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            will は「その場のひらめき」、going to は「前から思っていたこと」、進行形は「手配まで終わっていること」と考えると、スムーズに使い分けられます。
          </p>
        </div>
      </div>
    </div>
  );
};
