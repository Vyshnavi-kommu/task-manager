import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import AnalyticsCards from '../components/AnalyticsCards';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import TaskForm from '../components/TaskForm';
import { Plus, LayoutGrid, ClipboardList, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        sortBy: 'createdAt',
        order: 'desc',
        page: 1,
        limit: 10
    });

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await axiosInstance.get(`/tasks?${query}`);
            setTasks(res.data.tasks);
        } catch (err) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const res = await axiosInstance.get('/tasks/analytics');
            setAnalytics(res.data);
        } catch (err) {
            console.error('Failed to load analytics');
        }
    };

    useEffect(() => {
        if (!token || token === 'undefined') return;
        fetchTasks();
        fetchAnalytics();
    }, [filters, token]);

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (editingTask) {
                await axiosInstance.put(`/tasks/${editingTask._id}`, formData);
                toast.success('Task updated successfully');
            } else {
                await axiosInstance.post('/tasks', formData);
                toast.success('Task created successfully');
            }
            fetchTasks();
            fetchAnalytics();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            toast.success('Task deleted');
            fetchTasks();
            fetchAnalytics();
        } catch (err) {
            toast.error('Failed to delete task');
        }
    };

    const handleToggleDone = async (id) => {
        try {
            const task = tasks.find(t => t._id === id);
            const newStatus = task.status === 'Done' ? 'Todo' : 'Done';
            await axiosInstance.put(`/tasks/${id}`, { status: newStatus });
            fetchTasks();
            fetchAnalytics();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="min-h-screen animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">
                            <Sparkles size={14} />
                            <span>Command Center</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Your <span className="text-indigo-600">Productivity</span> Grid
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Coordinate and execute your daily operations.</p>
                    </div>

                    <button
                        onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                        className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
                    >
                        <Plus size={20} />
                        <span>Create New Task</span>
                    </button>
                </div>

                {/* Stat Cards */}
                <div className="mb-8">
                    <AnalyticsCards data={analytics} />
                </div>

                {/* Filter Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <LayoutGrid size={16} className="text-slate-400" />
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Task Management</h2>
                    </div>
                    <FilterBar onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
                </div>

                {/* Task Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 h-48 animate-pulse p-5">
                                <div className="h-4 w-20 bg-slate-100 dark:bg-slate-700 rounded-full mb-4"></div>
                                <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-700 rounded-lg mb-2"></div>
                                <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-lg mb-1"></div>
                                <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : tasks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {tasks.map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                                onDelete={handleDelete}
                                onToggleDone={handleToggleDone}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
                        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                            <ClipboardList size={40} className="text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No tasks found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xs text-center">Your objective list is clear. Add a new task to begin your workflow.</p>
                        <button
                            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                            className="mt-6 btn-secondary flex items-center space-x-2"
                        >
                            <Plus size={18} />
                            <span>Initiate Task</span>
                        </button>
                    </div>
                )}
            </div>

            <TaskForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateOrUpdate}
                initialData={editingTask}
            />
        </div>
    );
};

export default DashboardPage;
