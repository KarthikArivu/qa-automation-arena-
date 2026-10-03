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
  { id: 'all', label: 'All Modules', emoji: '⚡' },
  { id: 'forms', label: 'Forms & Inputs', emoji: '📝' },
  { id: 'clicks', label: 'Mouse & Gestures', emoji: '🖱️' },
  { id: 'async', label: 'Async & Dynamic DOM', emoji: '⏱️' },
  { id: 'dialogs', label: 'Dialogs & Modals', emoji: '🔔' },
  { id: 'iframes', label: 'Frames & Windows', emoji: '🖼️' },
  { id: 'files', label: 'File Transfers', emoji: '📁' },
  { id: 'tables', label: 'Data Tables', emoji: '📊' },
  { id: 'shadow', label: 'Shadow DOM', emoji: '🧩' },
  { id: 'network', label: 'Network Simulation', emoji: '🌐' },
  { id: 'auth', label: 'Auth & Storage', emoji: '🔐' },
  { id: 'keyboard', label: 'Keyboard & A11y', emoji: '⌨️' },
  { id: 'visual', label: 'Visual Rendering', emoji: '👁️' },
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
                ? 'bg-[#00F5D4] text-black border-black shadow-brutal translate-y-[-1px]'
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
