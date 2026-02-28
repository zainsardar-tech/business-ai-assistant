import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { Activity, Users, FileText, Zap } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="glass-card p-6 flex items-start justify-between animate-slide-up">
        <div>
            <p className="text-slate-400 font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{value}</h3>
            {trend && (
                <p className="text-brand-400 text-sm mt-2 flex items-center">
                    <Activity className="w-4 h-4 mr-1" /> {trend}
                </p>
            )}
        </div>
        <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400 border border-brand-500/20">
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking an API call for the frontend UI dev
        setTimeout(() => {
            setData({
                total_documents: 24,
                active_users: 12,
                agent_queries_today: 142,
                sales_trend: [
                    { name: "Jan", sales: 4000 },
                    { name: "Feb", sales: 3000 },
                    { name: "Mar", sales: 2000 },
                    { name: "Apr", sales: 2780 },
                    { name: "May", sales: 1890 },
                    { name: "Jun", sales: 2390 },
                    { name: "Jul", sales: 3490 },
                ],
                system_status: "Healthy"
            });
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Admin</h1>
                <p className="text-slate-400">Here's your enterprise overview for today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Documents" value={data.total_documents} icon={FileText} trend="+2 this week" />
                <StatCard title="Active Users" value={data.active_users} icon={Users} trend="Steady" />
                <StatCard title="AI Queries Today" value={data.agent_queries_today} icon={Zap} trend="+12% from yesterday" />
                <StatCard title="System Status" value={data.system_status} icon={Activity} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="text-xl font-bold mb-6 text-white text-left">Company Performance Trend</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.sales_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#2dd4bf' }}
                                />
                                <Line type="monotone" dataKey="sales" stroke="#2dd4bf" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col items-start text-left">
                    <h2 className="text-xl font-bold mb-4 text-white">Recommended Actions</h2>
                    <ul className="space-y-4 w-full">
                        <li className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-brand-500/50 transition-colors cursor-pointer group">
                            <h4 className="font-semibold text-brand-400 group-hover:text-brand-300">Generate Q2 Report</h4>
                            <p className="text-sm text-slate-400 mt-1">AI detected new sales data uploads. Click to summarize.</p>
                        </li>
                        <li className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-brand-500/50 transition-colors cursor-pointer group">
                            <h4 className="font-semibold text-brand-400 group-hover:text-brand-300">Review Inventory</h4>
                            <p className="text-sm text-slate-400 mt-1">3 products are running low in stock based on recent queries.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
