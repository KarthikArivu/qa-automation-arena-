import React, { useState, useMemo } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { ArrowUpDown, Trash2, Edit2, Plus, Check } from 'lucide-react';

interface CreatorRow {
  id: string;
  handle: string;
  rizzRating: number;
  cloutTier: string;
  verified: boolean;
}

const initialData: CreatorRow[] = [
  { id: '1', handle: '@kai_cenat', rizzRating: 98, cloutTier: 'Legendary', verified: true },
  { id: '2', handle: '@ishowspeed', rizzRating: 94, cloutTier: 'Legendary', verified: true },
  { id: '3', handle: '@sigma_coder', rizzRating: 88, cloutTier: 'Epic', verified: false },
  { id: '4', handle: '@mewing_champion', rizzRating: 75, cloutTier: 'Rare', verified: false },
  { id: '5', handle: '@delulu_queen', rizzRating: 62, cloutTier: 'Uncommon', verified: false },
  { id: '6', handle: '@skibidi_toilet', rizzRating: 99, cloutTier: 'Mythic', verified: true },
  { id: '7', handle: '@touch_grass_dev', rizzRating: 82, cloutTier: 'Epic', verified: true },
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
      rizzRating: Number(newRizz) || 70,
      cloutTier: 'Epic',
      verified: true
    };
    setData([item, ...data]);
    setNewHandle('');
  };

  return (
    <ChallengeCard
      id="tables-and-grids"
      badge="📊 DATA GRIDS"
      badgeColor="cyan"
      title="Dynamic Data Tables & Grids"
      description="Assert table row counts, sort headers, filter columns, toggle pagination, and delete rows."
      playwrightCode={`// 1. Search filter
await page.getByTestId('input-table-search').fill('speed');
await expect(page.getByTestId('table-row-2')).toBeVisible();
await expect(page.getByTestId('table-rows-container')).toContainText('@ishowspeed');

// 2. Sort column by Rizz Rating
await page.getByTestId('sort-header-rizz').click();

// 3. Select Row and Delete
await page.getByTestId('row-checkbox-3').check();
await page.getByTestId('btn-delete-row-3').click();
await expect(page.getByTestId('table-row-3')).toBeHidden();

// 4. Pagination
await page.getByTestId('btn-next-page').click();
await expect(page.getByTestId('current-page-badge')).toHaveText('2');`}
      playwrightTip="Target specific cells using page.locator('table tr').filter({ hasText: '@ishowspeed' }).locator('td')."
    >
      <div className="space-y-4">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <input
            type="text"
            data-testid="input-table-search"
            placeholder="Search handle (e.g. @kai)..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-60 bg-[#161B26] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9]"
          />

          {/* Add Row Form */}
          <form onSubmit={addRow} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              data-testid="input-new-handle"
              placeholder="@new_creator"
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
                    <span>Creator</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('rizzRating')}
                  data-testid="sort-header-rizz"
                  className="p-3 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Rizz Rating</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="p-3">Clout Tier</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody data-testid="table-rows-container" className="divide-y divide-slate-800/80 bg-[#0B0F19]">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500 font-mono">
                    No creators found matching criteria.
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
