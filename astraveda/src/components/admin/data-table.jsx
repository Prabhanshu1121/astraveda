'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function DataTable({ 
  data, 
  columns, 
  onDelete, 
  editPath = '', 
  loading = false 
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map(item => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedRows.length > 0 && window.confirm('Are you sure you want to delete selected items?')) {
      onDelete(selectedRows);
      setSelectedRows([]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {selectedRows.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 flex items-center">
          <span className="text-sm text-gray-700 mr-4">
            {selectedRows.length} selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete Selected
          </button>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item._id)}
                      onChange={() => handleSelectRow(item._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editPath && (
                        <Link
                          href={`${editPath}/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <EditOutlined />
                        </Link>
                      )}
                      <button
                        onClick={() => onDelete([item._id])}
                        className="text-red-600 hover:text-red-900"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}