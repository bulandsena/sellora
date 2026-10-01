'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Camera,
  Palette,
  LayoutTemplate,
  Share2,
  Video,
  Music,
  FileSpreadsheet,
  Code,
  GraduationCap,
  Globe,
  Briefcase,
  TrendingUp,
  BookCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  BookCheck: <BookCheck className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

export const CategoryGrid: React.FC = () => {
  const { categories, t, setSelectedCategorySlug, setActiveView } = useApp();

  const handleCategorySelect = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('shop');
  };

  return (
    <section className="py-12 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 mb-2">
              Browse Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t('browseByCategory')}
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setActiveView('shop');
            }}
            className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 group self-start sm:self-auto"
          >
            <span>{t('exploreProducts')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 15 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const icon = iconMap[cat.iconName] || <Layers className="w-6 h-6" />;
            const translationKey = `cat_${cat.id.replace('cat-', '').replace(/-/g, '_')}` as any;
            const localizedName = t(translationKey) || cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className="group relative p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/60 shadow-xs hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {localizedName}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {cat.itemCount}+ products
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
