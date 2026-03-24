import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { User, Mail, Lock, Loader2, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/auth/register', { name, email, password });
            toast.success('Account Created! Please sign in.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100-64px)] flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0F172A] animate-fadeIn">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 mb-6">
                        <LayoutDashboard className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-slate-500 dark:text-slate-400">Join over 10,000+ professionals today</p>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800/50 p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" required className="input-field pl-12" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="email" required className="input-field pl-12" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="password" required className="input-field pl-12" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 py-2">
                            <div className="mt-0.5"><CheckCircle2 size={14} className="text-emerald-500" /></div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
                        </div>

                        <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 flex items-center justify-center space-x-3 group">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <span>Create My Account</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
