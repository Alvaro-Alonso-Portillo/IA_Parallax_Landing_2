"use client";
import React, { useState } from "react";
import { Search, MessageSquare, Clock } from "lucide-react";

interface ChatListProps {
    sessions: any[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
}

export function ChatList({ sessions, activeSessionId, onSelectSession }: ChatListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSessions = sessions.filter(s =>
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-700";
            case "interested": return "bg-[#C8FF00]/20 text-[#5a7a00]";
            case "scheduled": return "bg-purple-100 text-purple-700";
            case "closed": return "bg-gray-100 text-gray-500";
            default: return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200 w-full md:w-[320px] lg:w-[360px] flex-shrink-0">
            {/* Header / Search */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Chats</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#C8FF00] focus:ring-1 focus:ring-[#C8FF00] transition-all"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {filteredSessions.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        No se encontraron conversaciones.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {filteredSessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => onSelectSession(session.id)}
                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex gap-3 ${activeSessionId === session.id ? "bg-[#F5F5F5] border-l-4 border-[#C8FF00]" : "border-l-4 border-transparent"
                                    }`}
                            >
                                {/* Avatar Placeholder */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${activeSessionId === session.id ? "bg-[#0A0A0A]" : "bg-gray-300"
                                    }`}>
                                    {session.user_name ? session.user_name.substring(0, 2).toUpperCase() : "AN"}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`text-sm font-semibold truncate ${activeSessionId === session.id ? "text-[#0A0A0A]" : "text-gray-700"
                                            }`}>
                                            {session.user_name || "Anónimo"}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                            {new Date(session.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 truncate mb-2">
                                        {session.last_message_preview || "Nueva conversación..."}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${getStatusColor(session.status)}`}>
                                            {session.status || "new"}
                                        </span>
                                        {session.lead_score > 0 && (
                                            <span className="text-[10px] font-bold text-[#C8FF00] bg-black px-1.5 py-0.5 rounded">
                                                {session.lead_score} pts
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
