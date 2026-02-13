"use client";
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, MessageSquare, TrendingUp, Calendar, Eye, Target } from "lucide-react";

interface ReportsDashboardProps {
    sessions: any[];
    pageViews?: any[];
}

export function ReportsDashboard({ sessions, pageViews = [] }: ReportsDashboardProps) {
    // 1. Calculate KPIs
    const totalLeads = sessions.length;
    const totalVisits = pageViews.length;
    const uniqueVisitors = new Set(pageViews.map(v => v.session_id)).size;

    const interestedLeads = sessions.filter(s => s.status === 'interested' || s.status === 'scheduled').length;

    // Lead Conversion: Leads / Unique Visitors
    const leadConversion = uniqueVisitors > 0 ? ((totalLeads / uniqueVisitors) * 100).toFixed(1) : "0";

    // Interest Conversion: Interested / Total Leads
    const interestRate = totalLeads > 0 ? ((interestedLeads / totalLeads) * 100).toFixed(1) : "0";

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
                leads: sessions.filter(s => s.created_at.startsWith(day)).length,
                visits: pageViews.filter(v => v.created_at.startsWith(day)).length
            };
        });
    }, [sessions, pageViews]);

    return (
        <div className="space-y-6 overflow-y-auto pb-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Eye size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Visitas Totales</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{totalVisits}</p>
                    <p className="text-xs text-gray-400 mt-1">{uniqueVisitors} visitantes únicos</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Users size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Leads Generados</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{totalLeads}</p>
                    <p className="text-xs text-green-600 mt-1">{leadConversion}% conv. visita</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-[#C8FF00]/20 text-[#5a7a00] rounded-lg">
                            <Target size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Interés Real</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">{interestedLeads}</p>
                    <p className="text-xs text-[#5a7a00] mt-1">{interestRate}% de los leads</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <MessageSquare size={20} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Tasa Conversión Total</h3>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                        {uniqueVisitors > 0 ? ((interestedLeads / uniqueVisitors) * 100).toFixed(1) : "0"}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Interesados / Visitantes</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Trends */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Tráfico vs Leads (7 días)</h3>
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
                                <Legend />
                                <Bar dataKey="visits" name="Visitas" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="leads" name="Leads" fill="#C8FF00" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Estado de los Leads</h3>
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
            </div>
        </div>
    );
}
