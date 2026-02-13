"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ReportsDashboard } from "@/components/admin/ReportsDashboard";
import { Loader2 } from "lucide-react";

export default function ReportsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [pageViews, setPageViews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Chat Sessions (Leads)
                const { data: sessionData } = await supabase
                    .from('chat_sessions')
                    .select('*')
                    .order('created_at', { ascending: false });

                // 2. Fetch Page Views (Visits)
                const { data: viewsData } = await supabase
                    .from('page_views')
                    .select('*')
                    .order('created_at', { ascending: false });

                setSessions(sessionData || []);
                setPageViews(viewsData || []);
            } catch (error) {
                console.error("Error fetching report data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full p-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0A0A0A]">Panel de Analítica</h1>
                <p className="text-gray-500">Visualiza el rendimiento de tu web y la generación de leads.</p>
            </div>

            <ReportsDashboard sessions={sessions} pageViews={pageViews} />
        </div>
    );
}
