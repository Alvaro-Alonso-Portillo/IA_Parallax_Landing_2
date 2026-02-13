"use client";
import React, { useState, useEffect } from "react";
import { ReportsDashboard } from "@/components/admin/ReportsDashboard";
import { supabase } from "@/lib/supabase";

export default function ReportsPage() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from('chat_sessions').select('*');
            if (data) setSessions(data as any);
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <div className="p-8 h-full flex flex-col">
            <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8">Reportes de Rendimiento</h1>

            <div className="flex-1 min-h-0">
                {loading ? (
                    <div className="text-gray-400">Cargando métricas...</div>
                ) : (
                    <ReportsDashboard sessions={sessions} />
                )}
            </div>
        </div>
    );
}
