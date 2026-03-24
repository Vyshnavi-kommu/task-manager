import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut, LayoutDashboard, BarChart3, User as UserIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-medium tracking-tight dark:text-white">
                            Task<span className="font-bold">Manager</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isActive('/dashboard') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/analytics"
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isActive('/analytics') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    Analytics
                                </Link>
                            </>
                        )}

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700/50 mx-2" />

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {user && (
                            <div className="flex items-center space-x-3 ml-2">
                                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user?.name || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl text-slate-500 dark:text-slate-400"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-4 animate-in fade-in slide-in-from-top-4">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-2 rounded-xl text-sm font-bold ${isActive('/dashboard') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/analytics"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-2 rounded-xl text-sm font-bold ${isActive('/analytics') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                Analytics
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-bold text-red-500"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Link to="/login" className="btn-primary text-center">Login</Link>
                            <Link to="/register" className="btn-secondary text-center">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
