import { Card } from './ui/Card';

type Props = {
  nuance?: string;
};

export function NuanceNote({ nuance }: Props) {
  if (!nuance) return null;

  return (
    <Card className="bg-amber-50/50 border-amber-100 p-6 dark:bg-amber-950/20 dark:border-amber-900/50">
      <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
        {nuance}
      </p>
    </Card>
  );
}
