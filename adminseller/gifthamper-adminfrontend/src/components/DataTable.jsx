'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ headers, rows, pagination, onPageChange }) {
  const currentPage = pagination?.currentPage || pagination?.page || 1;

  return (
    <div className="card overflow-hidden p-0">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">{rows}</tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">{rows}</div>

      {/* Empty state */}
      {(!rows || (Array.isArray(rows) && rows.length === 0)) && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">No data found</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs font-mono text-gray-500">
            Page {currentPage} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
