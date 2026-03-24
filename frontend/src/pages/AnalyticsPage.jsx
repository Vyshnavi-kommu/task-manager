import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import AnalyticsCards from '../components/AnalyticsCards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Activity, TrendingUp, Sparkles, BarChart3, PieChart as PieChartIcon, Download, FileText, FileSpreadsheet, ChevronDown, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AnalyticsPage = () => {
    const { token } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        if (!token || token === 'undefined') return;
        const fetchAnalytics = async () => {
            try {
                const res = await axiosInstance.get('/tasks/analytics');
                setAnalytics(res.data);

            } catch (err) {
                toast.error('Failed to load performance data');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [token]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDownloadOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const statusData = analytics?.byStatus || [];
    const priorityData = analytics?.byPriority || [];

    const STATUS_COLORS = {
        'Todo': '#94A3B8',
        'In Progress': '#F59E0B',
        'Done': '#10B981'
    };

    const PRIORITY_COLORS = {
        'High': '#EF4444',
        'Medium': '#F97316',
        'Low': '#22C55E'
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xl">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{payload[0].value} Tasks</p>
                </div>
            );
        }
        return null;
    };

    const downloadCSV = () => {
        setDownloading('csv');
        try {
            const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const rows = [
                ['Task Manager — Performance Report'],
                [`Generated on: ${now}`],
                [],
                ['=== SUMMARY METRICS ==='],
                ['Metric', 'Value'],
                ['Total Tasks', analytics?.totalTasks ?? 0],
                ['Completed Tasks', analytics?.completedTasks ?? 0],
                ['Pending Tasks', analytics?.pendingTasks ?? 0],
                ['Success Rate (%)', analytics?.completionPercentage ?? 0],
                [],
                ['=== STATUS DISTRIBUTION ==='],
                ['Status', 'Count'],
                ...statusData.map(d => [d._id, d.count]),
                [],
                ['=== PRIORITY DISTRIBUTION ==='],
                ['Priority', 'Count'],
                ...priorityData.map(d => [d._id, d.count]),
            ];

            const csvContent = rows.map(r => r.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `task-report-${Date.now()}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('CSV report downloaded!');
        } catch {
            toast.error('Failed to generate CSV');
        }
        setTimeout(() => { setDownloading(null); setDownloadOpen(false); }, 600);
    };

    const downloadTXT = () => {
        setDownloading('txt');
        try {
            const now = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
            const bar = '─'.repeat(46);
            const lines = [
                '╔══════════════════════════════════════════════╗',
                '║         TASK MANAGER · PERFORMANCE REPORT       ║',
                '╚══════════════════════════════════════════════╝',
                '',
                `  Generated: ${now}`,
                '',
                bar,
                '  SUMMARY METRICS',
                bar,
                `  Total Tasks      : ${analytics?.totalTasks ?? 0}`,
                `  Completed Tasks  : ${analytics?.completedTasks ?? 0}`,
                `  Pending Tasks    : ${analytics?.pendingTasks ?? 0}`,
                `  Success Rate     : ${analytics?.completionPercentage ?? 0}%`,
                '',
                bar,
                '  STATUS BREAKDOWN',
                bar,
                ...statusData.map(d => `  ${d._id.padEnd(18)}: ${d.count} tasks`),
                '',
                bar,
                '  PRIORITY BREAKDOWN',
                bar,
                ...priorityData.map(d => `  ${d._id.padEnd(18)}: ${d.count} tasks`),
                '',
                bar,
                '  Generated by Task Manager Analytics Engine',
                bar,
            ];

            const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `task-report-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Text report downloaded!');
        } catch {
            toast.error('Failed to generate report');
        }
        setTimeout(() => { setDownloading(null); setDownloadOpen(false); }, 600);
    };

    return (
        <div className="min-h-screen animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">
                        <Activity size={14} />
                        <span>System Insights</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Performance <span className="text-indigo-600">Intelligence</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Data-driven insights into your productivity cycles.</p>
                </div>

                {/* Dashboard Stats */}
                <div className="mb-8 text-center sm:text-left">
                    <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp size={16} className="text-slate-400" />
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Efficiency Metrics</h2>
                    </div>
                    <AnalyticsCards data={analytics} />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Status Distribution */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl">
                                    <BarChart3 size={20} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Task Distribution</h3>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statusData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9', opacity: 0.4 }} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry._id] || '#6366F1'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Priority Focus */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-violet-50 dark:bg-violet-500/10 text-violet-600 rounded-xl">
                                    <PieChartIcon size={20} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Priority Focus</h3>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={priorityData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="count" nameKey="_id">
                                        {priorityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry._id] || '#818CF8'} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                            {Object.entries(PRIORITY_COLORS).map(([label, color]) => (
                                <div key={label} className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Download Report Section — no floating dropdown, no overlap */}
                <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-sm">
                    {/* Top banner */}
                    <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-8 relative overflow-hidden group">
                        <Sparkles className="absolute -right-6 -top-6 text-white opacity-10 group-hover:scale-125 transition-transform duration-1000" size={180} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Export Ready</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-1">Download Your Report</h2>
                                <p className="text-indigo-200 text-sm">Choose a format below to export your analytics data.</p>
                            </div>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {[
                                    { label: 'Total Tasks', value: analytics?.totalTasks ?? '—' },
                                    { label: 'Completed', value: analytics?.completedTasks ?? '—' },
                                    { label: 'Success Rate', value: analytics ? `${analytics.completionPercentage}%` : '—' },
                                ].map(stat => (
                                    <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 text-center min-w-[72px]">
                                        <div className="text-white font-bold text-xl leading-none">{stat.value}</div>
                                        <div className="text-indigo-200 text-xs mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Export cards row — flush with banner, no overlap */}
                    <div className="bg-white dark:bg-slate-800 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-700/50">
                        {/* CSV Card */}
                        <button
                            onClick={downloadCSV}
                            disabled={!!downloading}
                            className="group flex items-center gap-5 px-8 py-6 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-colors text-left disabled:opacity-60 disabled:cursor-wait"
                        >
                            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 group-hover:scale-110 transition-transform">
                                {downloading === 'csv'
                                    ? <Loader2 size={24} className="text-emerald-600 animate-spin" />
                                    : <FileSpreadsheet size={24} className="text-emerald-600" />
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-800 dark:text-white text-base">CSV Spreadsheet</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Open in Excel or Google Sheets</div>
                                <div className="inline-flex items-center space-x-1.5 mt-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                                    <Download size={12} />
                                    <span>Download .csv</span>
                                </div>
                            </div>
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 group-hover:translate-x-1 transition-all">
                                <ChevronDown size={14} className="text-slate-400 group-hover:text-emerald-600 -rotate-90" />
                            </div>
                        </button>

                        {/* TXT Card */}
                        <button
                            onClick={downloadTXT}
                            disabled={!!downloading}
                            className="group flex items-center gap-5 px-8 py-6 hover:bg-violet-50 dark:hover:bg-violet-500/5 transition-colors text-left disabled:opacity-60 disabled:cursor-wait"
                        >
                            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/10 group-hover:scale-110 transition-transform">
                                {downloading === 'txt'
                                    ? <Loader2 size={24} className="text-violet-600 animate-spin" />
                                    : <FileText size={24} className="text-violet-600" />
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-800 dark:text-white text-base">Formatted Report</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Human-readable summary in plain text</div>
                                <div className="inline-flex items-center space-x-1.5 mt-2 text-violet-600 dark:text-violet-400 font-semibold text-xs">
                                    <Download size={12} />
                                    <span>Download .txt</span>
                                </div>
                            </div>
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/20 group-hover:translate-x-1 transition-all">
                                <ChevronDown size={14} className="text-slate-400 group-hover:text-violet-600 -rotate-90" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
