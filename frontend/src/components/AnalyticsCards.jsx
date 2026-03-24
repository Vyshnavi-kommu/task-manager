import React from 'react';
import { ClipboardList, CheckCircle2, Clock, Zap } from 'lucide-react';

const AnalyticsCards = ({ data }) => {
    const cards = [
        {
            title: 'Total Tasks',
            value: data?.totalTasks || 0,
            icon: <ClipboardList size={20} />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50 dark:bg-indigo-500/10',
            border: 'border-indigo-600/20'
        },
        {
            title: 'Completed',
            value: data?.completedTasks || 0,
            icon: <CheckCircle2 size={20} />,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-600/20'
        },
        {
            title: 'Pending',
            value: data?.pendingTasks || 0,
            icon: <Clock size={20} />,
            color: 'text-amber-600',
            bg: 'bg-amber-50 dark:bg-amber-500/10',
            border: 'border-amber-600/20'
        },
        {
            title: 'Success Rate',
            value: `${data?.completionPercentage || 0}%`,
            icon: <Zap size={20} />,
            color: 'text-violet-600',
            bg: 'bg-violet-50 dark:bg-violet-500/10',
            border: 'border-violet-600/20'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{card.title}</span>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{card.value}</div>
                    </div>
                    {/* Bottom Accent Bar */}
                    <div className={`mt-4 h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full ${card.color.replace('text-', 'bg-')}`}></div>
                </div>
            ))}
        </div>
    );
};

export default AnalyticsCards;
