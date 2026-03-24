import React from 'react';
import { Edit2, Trash2, CheckCircle, Calendar, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleDone }) => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400';
            case 'Medium': return 'bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400';
            case 'Low': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400';
            default: return 'bg-slate-50 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400';
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Done': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400';
            case 'In Progress': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
            default: return 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <span className={`badge ${getPriorityStyles(task.priority)}`}>
                    {task.priority}
                </span>
                <div className="flex items-center space-x-2">
                    {isOverdue && (
                        <span className="flex items-center space-x-1 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
                            <AlertCircle size={10} />
                            <span>Overdue</span>
                        </span>
                    )}
                    <span className={`badge ${getStatusStyles(task.status)}`}>
                        {task.status}
                    </span>
                </div>
            </div>

            <h3 className={`text-base font-semibold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${task.status === 'Done' ? 'line-through opacity-50' : ''}`}>
                {task.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 flex-grow">
                {task.description || 'No description provided.'}
            </p>

            <div className="border-t border-slate-100 dark:border-slate-700/50 mt-4 pt-4 flex items-center justify-between">
                <div className={`flex items-center space-x-1.5 text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-slate-400'}`}>
                    <Calendar size={14} />
                    <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Set date'}</span>
                </div>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                        title="Edit Task"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        title="Delete Task"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={() => onToggleDone(task._id)}
                        className={`p-1.5 rounded-lg transition-all ${task.status === 'Done' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 shadow-none'}`}
                        title={task.status === 'Done' ? 'Completed' : 'Mark as Done'}
                    >
                        {task.status === 'Done' ? <CheckCircle2 size={16} /> : <CheckCircle size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
