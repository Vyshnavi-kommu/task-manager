import React, { useState, useEffect } from 'react';
import { X, Loader2, Calendar, Type, AlignLeft, Info, Zap } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Todo',
        priority: 'Medium',
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'Todo',
                priority: initialData.priority || 'Medium',
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ''
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Todo',
                priority: 'Medium',
                dueDate: ''
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">
                        {initialData ? 'Update Task' : 'Create Task'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="e.g. Design meeting"
                            className="input-field"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Description</label>
                        <textarea
                            name="description"
                            placeholder="Add more details..."
                            className="input-field h-24 resize-none"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Status</label>
                            <select
                                name="status"
                                className="input-field cursor-pointer"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Priority</label>
                            <select
                                name="priority"
                                className="input-field cursor-pointer"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className="input-field"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-[2] flex items-center justify-center space-x-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={18} />}
                            <span>{initialData ? 'Update Task' : 'Save Task'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
