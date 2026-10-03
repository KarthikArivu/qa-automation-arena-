import React, { useState } from 'react';
import { Code, Play, CheckCircle2 } from 'lucide-react';
import { PlaywrightCodeSnippet } from './PlaywrightCodeSnippet';

interface ChallengeCardProps {
  id: string;
  badge: string;
  badgeColor?: 'pink' | 'green' | 'yellow' | 'cyan' | 'purple';
  title: string;
  description: string;
  playwrightCode: string;
  playwrightTip?: string;
  children: React.ReactNode;
  isCompleted?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  badge,
  badgeColor = 'green',
  title,
  description,
  playwrightCode,
  playwrightTip,
  children,
  isCompleted = false,
}) => {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'code'>('sandbox');

  const badgeStyles = {
    pink: 'bg-[#FF4365]/20 text-[#FF4365] border-[#FF4365]/50',
    green: 'bg-[#00F5D4]/20 text-[#00F5D4] border-[#00F5D4]/50',
    yellow: 'bg-[#FEE440]/20 text-[#FEE440] border-[#FEE440]/50',
    cyan: 'bg-[#00BBF9]/20 text-[#00BBF9] border-[#00BBF9]/50',
    purple: 'bg-[#7B2CBF]/20 text-[#c77dff] border-[#7B2CBF]/50',
  };

  return (
    <div
      id={id}
      data-testid={`challenge-card-${id}`}
      className="card-neo flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
          <div className="flex items-center gap-1.5">
            {isCompleted && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded-full border border-[#00F5D4]/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Interacted</span>
              </span>
            )}
            <div className="flex bg-[#0A0D15] p-0.5 rounded-md border border-slate-800">
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`px-2 py-0.5 text-xs rounded font-medium flex items-center gap-1 transition-all ${
                  activeTab === 'sandbox'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Interactive Playground"
              >
                <Play className="w-3 h-3" />
                <span>Test</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-2 py-0.5 text-xs rounded font-medium flex items-center gap-1 transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#00F5D4] text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Playwright Code"
              >
                <Code className="w-3 h-3" />
                <span>Code</span>
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Body */}
      <div className="flex-1">
        {activeTab === 'sandbox' ? (
          <div className="bg-[#090D17] border border-slate-800/80 rounded-lg p-4">
            {children}
          </div>
        ) : (
          <PlaywrightCodeSnippet code={playwrightCode} tip={playwrightTip} />
        )}
      </div>
    </div>
  );
};
