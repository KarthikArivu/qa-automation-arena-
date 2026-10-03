import React, { useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { UploadCloud, FileText, Download, Check } from 'lucide-react';

export const FilesModule: React.FC = () => {
  // Upload states
  const [singleFileName, setSingleFileName] = useState('');
  const [multiFileNames, setMultiFileNames] = useState<string[]>([]);
  const [dropFileName, setDropFileName] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Download state
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSingleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSingleFileName(e.target.files[0].name);
    }
  };

  const handleMultiUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setMultiFileNames(names);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDropFileName(e.dataTransfer.files[0].name);
    }
  };

  const triggerDynamicDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `=== AUTOMATED VERIFICATION REPORT ===\nAuthor: Karthik Arivu\nStatus: 100% E2E VERIFIED\nTimestamp: ${new Date().toISOString()}\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'automated-verification-report.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadSuccess(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. File Uploads */}
      <ChallengeCard
        id="file-uploads"
        badge="FILE UPLOAD"
        badgeColor="green"
        title="File Uploads (Single & Multi)"
        description="Verify single and multiple file inputs as well as drag-and-drop file upload zones."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Single File Attachment:
            </label>
            <input
              type="file"
              data-testid="input-single-file"
              onChange={handleSingleUpload}
              className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#00F5D4] file:text-black hover:file:bg-[#00dfc1] cursor-pointer"
            />
            {singleFileName && (
              <div data-testid="single-file-result" className="mt-2 text-xs font-mono text-[#00F5D4] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Uploaded: {singleFileName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Multi-File Attachment:
            </label>
            <input
              type="file"
              multiple
              data-testid="input-multi-file"
              onChange={handleMultiUpload}
              className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#FEE440] file:text-black hover:file:bg-[#ffd60a] cursor-pointer"
            />
            {multiFileNames.length > 0 && (
              <div data-testid="multi-files-list" className="mt-2 space-y-1">
                {multiFileNames.map((name, i) => (
                  <div key={i} className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#FEE440]" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            data-testid="dropzone-area"
            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
              isDraggingOver ? 'border-[#00F5D4] bg-[#00F5D4]/10' : 'border-slate-700 bg-[#0C101A]'
            }`}
          >
            <UploadCloud className="w-6 h-6 mx-auto mb-1 text-slate-400" />
            <div className="text-xs font-mono text-slate-300">
              {dropFileName ? (
                <span data-testid="dropzone-file-name" className="text-[#00F5D4] font-bold">
                  Received: {dropFileName}
                </span>
              ) : (
                'Drag and drop files directly here'
              )}
            </div>
          </div>
        </div>
      </ChallengeCard>

      {/* 2. File Downloads */}
      <ChallengeCard
        id="file-downloads"
        badge="DOWNLOAD"
        badgeColor="yellow"
        title="File Download Triggers"
        description="Trigger and verify static and dynamically generated file downloads."
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Clicking these actions triggers browser file download streams:
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="/sample-download.txt"
              download="sample-download.txt"
              data-testid="btn-download-static"
              className="btn-neo-yellow text-xs py-2 px-4 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Verification Record (.txt)</span>
            </a>

            <button
              data-testid="btn-download-dynamic"
              onClick={triggerDynamicDownload}
              className="btn-neo-cyan text-xs py-2 px-4 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate Dynamic Text Report</span>
            </button>
          </div>

          {downloadSuccess && (
            <div
              data-testid="download-triggered-badge"
              className="p-2.5 bg-[#00F5D4]/10 border border-[#00F5D4] rounded text-xs font-mono text-[#00F5D4] flex items-center justify-between"
            >
              <span>✅ Dynamic download triggered successfully!</span>
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
      </ChallengeCard>
    </div>
  );
};
