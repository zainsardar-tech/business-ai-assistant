import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, Files, LogOut, Menu, X } from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'AI Agent', path: '/chat', icon: <MessageSquareText className="w-5 h-5" /> },
        { name: 'Documents', path: '/documents', icon: <Files className="w-5 h-5" /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            <div className="md:hidden fixed top-0 w-full glass-card border-x-0 border-t-0 rounded-none p-4 z-50 flex justify-between items-center">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">Aztify AI</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            <div className={`fixed mt-16 md:mt-0 md:relative z-40 w-64 min-h-screen glass-card border-y-0 rounded-none flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 hidden md:block">
                    <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                        Aztify AI
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Enterprise Assistant</p>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-dark-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
