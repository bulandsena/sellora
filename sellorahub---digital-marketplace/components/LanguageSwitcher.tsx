'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/lib/types';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Language"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs"
      >
        <span className="text-base">{currentLangObj.flag}</span>
        <span className="font-semibold">{currentLangObj.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Select Language / भाषा निवडा
          </div>
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <span className="block leading-tight">{item.nativeName}</span>
                    <span className="text-[11px] text-zinc-400 block">{item.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
