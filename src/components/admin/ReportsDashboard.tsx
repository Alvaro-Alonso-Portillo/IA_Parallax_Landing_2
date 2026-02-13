"use client";
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, MessageSquare, TrendingUp, Calendar } from "lucide-react";

interface ReportsDashboardProps {
    sessions: any[];
}

export function ReportsDashboard({ sessions }: ReportsDashboardProps) {
    // 1. Calculate KPIs
    const totalLeads = sessions.length;
    const interestedLeads = sessions.filter(s => s.status === 'interested' || s.status === 'scheduled').length;
    const conversionRate = totalLeads > 0 ? ((interestedLeads / totalLeads) * 100).toFixed(1) : "0";

    // 2. Data for Status Pie Chart
    const statusData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        sessions.forEach(s => {
            const st = s.status || 'new';
            counts[st] = (counts[st] || 0) + 1;
        });
        return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
    }, [sessions]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C8FF00'];

    // 3. Data for Activity Bar Chart (Last 7 days)
    const activityData = useMemo(() => {
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return days.map(day => {
            return {
                date: day,
                count: sessions.filter(s => s.updated_at.startsWith(day)).length
            };
        });
    }, [sessions]);

    return (
        <div className="space-y-6 overflow-y-auto pb-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Leads</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{totalLeads}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-[#C8FF00]/20 text-[#5a7a00] rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">Avg</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Tasa Conversión</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{conversionRate}%</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Interesados/Agendados</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{interestedLeads}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <MessageSquare size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Chats Activos</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{sessions.filter(s => s.status === 'new' || s.status === 'contacted').length}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Distribución de Leads</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {statusData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs text-gray-600 capitalize">{entry.name}: {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Trends */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Actividad (Últimos 7 días)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 10 }}
                                    tickFormatter={(val: string) => new Date(val).toLocaleDateString(undefined, { weekday: 'short' })}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#0A0A0A" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
