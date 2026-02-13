"use client";
import React, { useState, useEffect } from "react";
import { ClientsTable } from "@/components/admin/ClientsTable";
import { supabase } from "@/lib/supabase";

export default function ClientsPage() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('*')
            .order('updated_at', { ascending: false });

        if (data) setSessions(data as any);
        setLoading(false);
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0A0A0A]">Gestión de Clientes</h1>
                <p className="text-gray-500 mt-1">Administra tus leads y contactos capturados por la IA.</p>
            </div>

            <div className="flex-1 min-h-0">
                {loading ? (
                    <div className="w-full h-64 flex items-center justify-center text-gray-400">
                        Cargando clientes...
                    </div>
                ) : (
                    <ClientsTable sessions={sessions} />
                )}
            </div>
        </div>
    );
}
