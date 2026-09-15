'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ headers, rows, pagination, onPageChange }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">{rows}</tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">{rows}</div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">
            Page {pagination.currentPage || pagination.page || 1} of{' '}
            {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                onPageChange && onPageChange((pagination.currentPage || pagination.page || 1) - 1)
              }
              disabled={(pagination.currentPage || pagination.page || 1) <= 1}
              className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                onPageChange && onPageChange((pagination.currentPage || pagination.page || 1) + 1)
              }
              disabled={
                (pagination.currentPage || pagination.page || 1) >= pagination.totalPages
              }
              className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
