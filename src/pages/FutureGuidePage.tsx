import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Compass } from 'lucide-react';

export const FutureGuidePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-indigo-100 bg-indigo-50/30">
        <CardHeader>
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
            <Compass className="w-6 h-6" />
          </div>
          <CardTitle>Future Guide</CardTitle>
          <CardDescription>
            未来を語るための様々な表現（will, going to, 進行形, about to）の使い分けを一覧で確認しましょう（近日公開）。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            現在は Trainer モード内での用法切り替え機能を優先的に実装しています。
            一覧ガイドは、知識の整理のために準備中です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
