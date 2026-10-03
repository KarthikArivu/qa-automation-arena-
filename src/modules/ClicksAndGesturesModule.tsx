import React, { useState, useRef, useEffect } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { MousePointer, GripVertical, RotateCcw, Sparkles } from 'lucide-react';

export const ClicksAndGesturesModule: React.FC = () => {
  // Click states
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [contextAction, setContextAction] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);

  // Drag and Drop (Kanban)
  const [columns, setColumns] = useState<{ [key: string]: string[] }>({
    todo: ['Develop E2E Suite', 'Fix Regression Bug'],
    progress: ['Review Pull Request'],
    done: ['Ship Production Release']
  });
  const [draggedItem, setDraggedItem] = useState<{ item: string; fromCol: string } | null>(null);

  // Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#00F5D4';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Drag handlers
  const handleDragStart = (item: string, fromCol: string) => {
    setDraggedItem({ item, fromCol });
  };

  const handleDrop = (toCol: string) => {
    if (!draggedItem) return;
    const { item, fromCol } = draggedItem;
    if (fromCol === toCol) return;

    setColumns(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(i => i !== item),
      [toCol]: [...prev[toCol], item]
    }));
    setDraggedItem(null);
  };

  // Modifier click handler
  const handleModifierClick = (e: React.MouseEvent) => {
    const mods: string[] = [];
    if (e.shiftKey) mods.push('Shift');
    if (e.ctrlKey || e.metaKey) mods.push('Ctrl/Cmd');
    if (e.altKey) mods.push('Alt');
    setActiveModifiers(mods);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Multi-Click & Context Menu */}
      <ChallengeCard
        id="clicks-and-context"
        badge="CLICKS"
        badgeColor="pink"
        title="Double Click & Right Click Menu"
        description="Trigger double-click counters and custom right-click context menu selections."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#161B26] rounded-lg border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Double Click Action</div>
              <div className="text-[11px] text-slate-400">Counter: <span data-testid="double-click-score" className="text-[#FF4365] font-mono font-bold">{doubleClickCount}</span></div>
            </div>
            <button
              data-testid="btn-double-click"
              onDoubleClick={() => setDoubleClickCount(prev => prev + 1)}
              className="btn-neo-pink text-xs py-1.5 px-3"
            >
              Double Click Here
            </button>
          </div>

          <div
            data-testid="right-click-zone"
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenuPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
            }}
            className="relative h-28 border-2 border-dashed border-slate-700 rounded-lg bg-[#0C101A] flex flex-col items-center justify-center cursor-context-menu select-none p-2"
          >
            <span className="text-xs font-mono text-slate-400">Right click anywhere inside this boundary</span>
            {contextAction && (
              <span data-testid="context-action-result" className="text-xs font-mono text-[#00F5D4] mt-1 font-bold">
                Action: {contextAction}
              </span>
            )}

            {contextMenuPos && (
              <div
                data-testid="context-menu"
                style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
                className="absolute z-20 bg-[#161B26] border-2 border-black rounded-lg shadow-brutal p-1.5 w-48 font-mono text-xs text-white"
              >
                <div
                  data-testid="menu-item-rizz"
                  onClick={() => { setContextAction('Parameters Boosted'); setContextMenuPos(null); }}
                  className="px-2 py-1.5 hover:bg-[#FF4365] hover:text-white rounded cursor-pointer"
                >
                  ⚡ Boost Parameters
                </div>
                <div
                  data-testid="menu-item-delulu"
                  onClick={() => { setContextAction('Settings Reset'); setContextMenuPos(null); }}
                  className="px-2 py-1.5 hover:bg-[#00F5D4] hover:text-black rounded cursor-pointer"
                >
                  🔄 Reset Settings
                </div>
              </div>
            )}
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Hover & Modifiers */}
      <ChallengeCard
        id="hover-and-modifiers"
        badge="GESTURES"
        badgeColor="cyan"
        title="Hover, Coordinates & Modifiers"
        description="Verify mouse hover tooltips, modifier key detection (Shift, Ctrl, Alt), and coordinate reporting."
      >
        <div className="space-y-4">
          <div className="relative">
            <div
              data-testid="hover-target"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="p-3 bg-[#161B26] border border-slate-700 rounded-lg text-center cursor-pointer hover:border-[#00BBF9] transition-all"
            >
              <span className="text-xs font-mono text-slate-300">Hover over this element to view tooltip</span>
            </div>
            {isHovered && (
              <div
                data-testid="secret-tooltip"
                className="mt-2 p-2 bg-[#00BBF9] text-black font-mono font-bold text-xs rounded-lg shadow-brutal flex items-center justify-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tooltip activated: Component status verified</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#161B26] rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <button
                data-testid="modifier-click-btn"
                onClick={handleModifierClick}
                className="btn-neo-cyan text-xs py-1.5 px-3"
              >
                Click with Shift / Ctrl / Alt
              </button>
              <div className="flex gap-1" data-testid="modifier-pill">
                {activeModifiers.length === 0 ? (
                  <span className="text-[11px] font-mono text-slate-500">No modifiers</span>
                ) : (
                  activeModifiers.map(m => (
                    <span key={m} className="px-1.5 py-0.5 bg-[#00BBF9]/20 text-[#00BBF9] rounded text-[10px] font-mono font-bold">
                      {m}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div
              data-testid="coords-zone"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setClickCoords({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
              }}
              className="h-16 bg-[#0B0F19] border border-slate-700/60 rounded flex items-center justify-center cursor-crosshair text-xs font-mono text-slate-400"
            >
              {clickCoords ? (
                <span data-testid="coords-display" className="text-[#00F5D4]">
                  Recorded Coordinates: X: {clickCoords.x}px, Y: {clickCoords.y}px
                </span>
              ) : (
                'Click anywhere to record (X, Y) coordinates'
              )}
            </div>
          </div>
        </div>
      </ChallengeCard>

      {/* 3. Drag and Drop Kanban */}
      <ChallengeCard
        id="drag-and-drop"
        badge="DRAG & DROP"
        badgeColor="yellow"
        title="Kanban Drag & Drop Board"
        description="Transfer tasks across workflow columns using drag-and-drop actions."
      >
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'todo', label: 'To Do', color: 'border-yellow-500/40' },
            { id: 'progress', label: 'In Progress', color: 'border-[#00BBF9]/40' },
            { id: 'done', label: 'Completed', color: 'border-[#00F5D4]/40' }
          ].map(col => (
            <div
              key={col.id}
              data-testid={`column-${col.id}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className={`bg-[#0C101A] p-2.5 rounded-lg border ${col.color} min-h-[140px] flex flex-col gap-2`}
            >
              <div className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>{col.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">({columns[col.id].length})</span>
              </div>
              {columns[col.id].map(item => (
                <div
                  key={item}
                  draggable
                  data-testid={`card-${item}`}
                  onDragStart={() => handleDragStart(item, col.id)}
                  className="p-2 bg-[#161B26] border border-slate-700 rounded text-xs font-mono text-white flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-slate-500 shadow-sm"
                >
                  <span>{item}</span>
                  <GripVertical className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </ChallengeCard>

      {/* 4. Canvas Drawing Pad */}
      <ChallengeCard
        id="canvas-gesture"
        badge="CANVAS"
        badgeColor="green"
        title="HTML5 Canvas Drawing"
        description="Verify mouse down, move, and up drawing interactions on HTML5 2D canvas elements."
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Signature Pad:</span>
            <div className="flex items-center gap-2">
              {hasDrawn && (
                <span data-testid="canvas-drawn-badge" className="text-[11px] font-mono text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/30">
                  Drawing Recorded ✅
                </span>
              )}
              <button
                data-testid="btn-clear-canvas"
                onClick={clearCanvas}
                className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          <div className="border-2 border-slate-700 rounded-lg overflow-hidden bg-[#0A0D15]">
            <canvas
              ref={canvasRef}
              data-testid="draw-canvas"
              width={380}
              height={120}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full cursor-crosshair block"
            />
          </div>
        </div>
      </ChallengeCard>
    </div>
  );
};
