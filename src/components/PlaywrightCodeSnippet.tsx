import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface PlaywrightCodeSnippetProps {
  title?: string;
  code: string;
  tip?: string;
}

export const PlaywrightCodeSnippet: React.FC<PlaywrightCodeSnippetProps> = ({
  title = "Playwright JS Snippet",
  code,
  tip
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 rounded-lg bg-[#07090E] border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-2 bg-[#0E121B] border-b border-slate-800">
        <div className="flex items-center space-x-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-[#00F5D4]" />
          <span className="font-semibold text-slate-300">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          data-testid="copy-snippet-btn"
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#00F5D4]" />
              <span className="text-[#00F5D4]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto text-slate-300 bg-[#080B12]">
        <pre className="leading-relaxed whitespace-pre font-mono">{code}</pre>
      </div>
      {tip && (
        <div className="px-3 py-1.5 bg-[#0C141F] border-t border-slate-800/80 text-[11px] text-[#00BBF9] flex items-center gap-1.5">
          <span className="font-bold">⚡ PRO-TIP:</span>
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
};
