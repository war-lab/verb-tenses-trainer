import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

export function SectionHeader({ title, description, icon: Icon, className }: Props) {
  return (
    <div className={cn("flex items-start gap-4 mb-6", className)}>
      {Icon && (
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
