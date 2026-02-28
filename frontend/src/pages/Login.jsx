import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login for dev
        localStorage.setItem('token', 'dev-dummy-token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 absolute inset-0 z-50">
            <div className="w-full max-w-md animate-slide-up">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                        Aztify AI
                    </h1>
                    <p className="text-slate-400 mt-2">Sign in to your enterprise workspace</p>
                </div>

                <form onSubmit={handleLogin} className="glass-card p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="admin@aztify.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center text-xs text-brand-400 bg-brand-500/10 p-3 rounded border border-brand-500/20">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        <span>Development mode: Any credentials will work.</span>
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 text-lg">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
