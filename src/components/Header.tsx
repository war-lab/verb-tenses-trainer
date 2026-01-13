import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, GraduationCap, Compass } from 'lucide-react';
import { cn } from '../lib/cn';

export const Header: React.FC = () => {
  const navItems = [
    { to: '/trainer', icon: GraduationCap, label: 'Trainer' },
    { to: '/compare', icon: Layers, label: 'Compare' },
    { to: '/future', icon: Compass, label: 'Future' },
  ];

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between h-14">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 gap-0.5 transition-all relative",
                isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive ? "scale-110" : "")} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-1 bg-indigo-600 rounded-t-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
