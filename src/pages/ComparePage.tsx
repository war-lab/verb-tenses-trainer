import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Layers } from 'lucide-react';

export const ComparePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-indigo-100 bg-indigo-50/30">
        <CardHeader>
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
            <Layers className="w-6 h-6" />
          </div>
          <CardTitle>Compare Mode</CardTitle>
          <CardDescription>
            似た表現を並べて、そのニュアンスの違いを深く学びましょう（近日公開）。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            現在は Trainer モード内での「対比（Compare）」機能を優先的に実装しています。
            独立した比較モードは、より高度な対比学習のために準備中です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
