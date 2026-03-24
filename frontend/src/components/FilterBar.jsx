import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ListFilter, ArrowUpDown } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onFilterChange({ search, status, priority, sortBy, order });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search, status, priority, sortBy, order]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search objectives..."
                        className="input-field pl-11"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center space-x-2">
                        <select
                            className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold dark:text-white outline-none cursor-pointer flex-1 sm:w-32"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <select
                            className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold dark:text-white outline-none cursor-pointer flex-1 sm:w-32"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <select
                            className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold dark:text-white outline-none cursor-pointer flex-1"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority Rank</option>
                        </select>
                        <button
                            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-2"
                        >
                            <ArrowUpDown size={14} />
                            <span>{order}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
