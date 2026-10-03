import React from 'react';

export type CategoryId =
  | 'all'
  | 'forms'
  | 'clicks'
  | 'async'
  | 'dialogs'
  | 'iframes'
  | 'files'
  | 'tables'
  | 'shadow'
  | 'network'
  | 'auth'
  | 'keyboard'
  | 'visual';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

const CATEGORIES: Array<{ id: CategoryId; label: string; emoji: string }> = [
  { id: 'all', label: 'All Modules', emoji: '🔥' },
  { id: 'forms', label: 'Inputs & Forms', emoji: '⚡' },
  { id: 'clicks', label: 'Clicks & Drag', emoji: '🖱️' },
  { id: 'async', label: 'Async & Waiting', emoji: '⏱️' },
  { id: 'dialogs', label: 'Dialogs & Modals', emoji: '🚨' },
  { id: 'iframes', label: 'iFrames & Tabs', emoji: '🖼️' },
  { id: 'files', label: 'File Up/Down', emoji: '📁' },
  { id: 'tables', label: 'Data Tables', emoji: '📊' },
  { id: 'shadow', label: 'Shadow DOM', emoji: '👻' },
  { id: 'network', label: 'Network Chaos', emoji: '🌐' },
  { id: 'auth', label: 'Auth & Storage', emoji: '🔐' },
  { id: 'keyboard', label: 'Hotkeys & A11y', emoji: '⌨️' },
  { id: 'visual', label: 'Visual Edge', emoji: '📸' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="py-4 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 max-w-7xl mx-auto px-4 sm:px-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            data-testid={`cat-btn-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border-2 ${
              activeCategory === cat.id
                ? 'bg-[#FEE440] text-black border-black shadow-brutal translate-y-[-1px]'
                : 'bg-[#121622] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
