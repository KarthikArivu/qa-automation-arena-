import React, { useState, useMemo } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { ArrowUpDown, Trash2, Plus } from 'lucide-react';

interface CreatorRow {
  id: string;
  handle: string;
  rizzRating: number;
  cloutTier: string;
  verified: boolean;
}

const initialData: CreatorRow[] = [
  { id: '1', handle: '@karthik_arivu', rizzRating: 99, cloutTier: 'Lead Architect', verified: true },
  { id: '2', handle: '@ishowspeed', rizzRating: 94, cloutTier: 'Enterprise Admin', verified: true },
  { id: '3', handle: '@sigma_coder', rizzRating: 88, cloutTier: 'Senior Engineer', verified: false },
  { id: '4', handle: '@qa_specialist', rizzRating: 85, cloutTier: 'SDET Specialist', verified: true },
  { id: '5', handle: '@devops_runner', rizzRating: 78, cloutTier: 'DevOps Engineer', verified: false },
  { id: '6', handle: '@frontend_pro', rizzRating: 91, cloutTier: 'Senior Frontend', verified: true },
  { id: '7', handle: '@system_architect', rizzRating: 96, cloutTier: 'Staff Architect', verified: true },
];

export const TablesModule: React.FC = () => {
  const [data, setData] = useState<CreatorRow[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'handle' | 'rizzRating'>('rizzRating');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // New row input
  const [newHandle, setNewHandle] = useState('');
  const [newRizz, setNewRizz] = useState('85');

  // Filter & Sort
  const filteredData = useMemo(() => {
    return data
      .filter(item => item.handle.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortField === 'handle') {
          return sortAsc ? a.handle.localeCompare(b.handle) : b.handle.localeCompare(a.handle);
        } else {
          return sortAsc ? a.rizzRating - b.rizzRating : b.rizzRating - a.rizzRating;
        }
      });
  }, [data, searchTerm, sortField, sortAsc]);

  // Paginated Data
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const toggleSort = (field: 'handle' | 'rizzRating') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(d => d.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const deleteRow = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const addRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;
    const item: CreatorRow = {
      id: String(Date.now()),
      handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
      rizzRating: Number(newRizz) || 80,
      cloutTier: 'Engineer',
      verified: true
    };
    setData([item, ...data]);
    setNewHandle('');
  };

  return (
    <ChallengeCard
      id="tables-and-grids"
      badge="DATA GRID"
      badgeColor="cyan"
      title="Dynamic Records Table & Pagination"
      description="Filter records, sort by column, manage batch row selection, paginate, and delete items."
    >
      <div className="space-y-4">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <input
            type="text"
            data-testid="input-table-search"
            placeholder="Search handle (e.g. @karthik or @ishowspeed)..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64 bg-[#161B26] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9]"
          />

          {/* Add Row Form */}
          <form onSubmit={addRow} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              data-testid="input-new-handle"
              placeholder="@new_handle"
              value={newHandle}
              onChange={(e) => setNewHandle(e.target.value)}
              className="bg-[#161B26] border border-slate-700 rounded px-2 py-1 text-xs text-white w-32 focus:outline-none"
            />
            <button
              type="submit"
              data-testid="btn-add-row"
              className="btn-neo-green text-xs py-1 px-2.5 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#141A28] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    data-testid="select-all-checkbox"
                    checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length}
                    onChange={toggleSelectAll}
                    className="accent-[#00BBF9] rounded"
                  />
                </th>
                <th
                  onClick={() => toggleSort('handle')}
                  data-testid="sort-header-handle"
                  className="p-3 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Account Handle</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('rizzRating')}
                  data-testid="sort-header-rizz"
                  className="p-3 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Performance Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="p-3">Access Tier</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody data-testid="table-rows-container" className="divide-y divide-slate-800/80 bg-[#0B0F19]">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500 font-mono">
                    No records found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map(row => (
                  <tr
                    key={row.id}
                    data-testid={`table-row-${row.id}`}
                    className={`hover:bg-[#121824] transition-colors ${
                      selectedIds.includes(row.id) ? 'bg-[#00BBF9]/10' : ''
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        data-testid={`row-checkbox-${row.id}`}
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                        className="accent-[#00BBF9] rounded"
                      />
                    </td>
                    <td className="p-3 font-mono font-bold text-white flex items-center gap-1.5">
                      <span>{row.handle}</span>
                      {row.verified && (
                        <span className="text-[10px] bg-[#00F5D4]/20 text-[#00F5D4] px-1 rounded">✓</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-yellow-400 font-bold">{row.rizzRating} / 100</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                        {row.cloutTier}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        data-testid={`btn-delete-row-${row.id}`}
                        onClick={() => deleteRow(row.id)}
                        className="text-slate-400 hover:text-[#FF4365] p-1 rounded"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            Showing page <span data-testid="current-page-badge" className="text-white font-bold">{currentPage}</span> of {totalPages}
          </div>
          <div className="flex gap-1">
            <button
              data-testid="btn-prev-page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-2.5 py-1 rounded bg-[#161B26] border border-slate-700 disabled:opacity-40 hover:bg-slate-700 text-white"
            >
              Prev
            </button>
            <button
              data-testid="btn-next-page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-2.5 py-1 rounded bg-[#161B26] border border-slate-700 disabled:opacity-40 hover:bg-slate-700 text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ChallengeCard>
  );
};
