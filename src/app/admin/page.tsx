"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, RefreshCw } from "lucide-react";

// Components
import { ChatList } from "@/components/admin/ChatList";
import { ChatWindow } from "@/components/admin/ChatWindow";
import { ClientProfile } from "@/components/admin/ClientProfile";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Data State
    const [sessions, setSessions] = useState<any[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [showProfile, setShowProfile] = useState(true); // Toggle right panel

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
            fetchSessions();
        } else {
            setLoading(false);
        }

        // Realtime Subscription
        const channel = supabase
            .channel('public:chat_messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, () => {
                fetchSessions(); // Refresh list on new message
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Alonsomorillo78") {
            setIsAuthenticated(true);
            localStorage.setItem("admin_auth", "true");
            fetchSessions();
        } else {
            setError("Contraseña incorrecta");
        }
    };

    const fetchSessions = async () => {
        // Fetch sessions with last message and user info
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('*, chat_messages(*)')
            .order('updated_at', { ascending: false });

        if (error) console.error("Error fetching sessions:", error);
        else setSessions(data || []);

        setLoading(false);
    };

    const activeSession = sessions.find(s => s.id === activeSessionId);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#C8FF00] rounded-full mx-auto flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-black" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">IA Parallax Admin</h1>
                        <p className="text-gray-400">Acceso restringido al Centro de Comando</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña de acceso"
                            className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#C8FF00] outline-none transition-colors"
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-[#C8FF00] hover:bg-[#b0e000] text-black font-bold py-3 rounded-lg transition-colors"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
            {/* Left: Chat List */}
            <ChatList
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelectSession={setActiveSessionId}
            />

            {/* Middle: Chat Window */}
            {activeSession ? (
                <div className="flex-1 flex flex-col min-w-0 border-r border-gray-200">
                    <ChatWindow
                        session={activeSession}
                        onUpdateSession={fetchSessions}
                    />
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 border-r border-gray-200">
                    <p>Selecciona una conversación para ver detalles</p>
                </div>
            )}

            {/* Right: Client Profile (CRM) */}
            {activeSession && showProfile && (
                <ClientProfile
                    session={activeSession}
                    onUpdate={fetchSessions}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </div>
    );
}
