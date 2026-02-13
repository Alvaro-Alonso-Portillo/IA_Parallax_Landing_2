"use client";
import React, { useState } from "react";
import { Search, Filter, Download, User, Mail, Phone, Tag, MoreHorizontal } from "lucide-react";

interface ClientsTableProps {
    sessions: any[];
}

export function ClientsTable({ sessions }: ClientsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter Logic
    const filteredSessions = sessions.filter(session => {
        const matchesSearch =
            (session.user_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (session.user_email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (session.id || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || session.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles: { [key: string]: string } = {
            new: "bg-blue-100 text-blue-700",
            interested: "bg-[#C8FF00]/20 text-[#5a7a00]",
            closed: "bg-gray-100 text-gray-500",
            scheduled: "bg-purple-100 text-purple-700",
            contacted: "bg-orange-100 text-orange-700"
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[status] || styles.new}`}>
                {status || "new"}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Controls */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar cliente por nombre, email o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#C8FF00]"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm outline-none focus:border-[#C8FF00] cursor-pointer"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="new">Nuevo</option>
                            <option value="contacted">Contactado</option>
                            <option value="interested">Interesado</option>
                            <option value="scheduled">Agendado</option>
                            <option value="closed">Cerrado</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                        <Download size={16} /> Exportar CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3 font-semibold">Cliente</th>
                            <th className="px-6 py-3 font-semibold">Empresa</th>
                            <th className="px-6 py-3 font-semibold">Contacto</th>
                            <th className="px-6 py-3 font-semibold">Estado</th>
                            <th className="px-6 py-3 font-semibold text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredSessions.map((session) => (
                            <tr key={session.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {session.user_name ? session.user_name.substring(0, 2).toUpperCase() : "AN"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#0A0A0A]">{session.user_name || "Anónimo"}</p>
                                            <p className="text-[10px] text-gray-400 font-mono">{session.id.substring(0, 8)}...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {session.user_company || <span className="text-gray-300 italic">No especificada</span>}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {session.user_email && (
                                            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                                <Mail size={12} className="text-gray-400" /> {session.user_email}
                                            </div>
                                        )}
                                        {session.user_phone && (
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Phone size={12} className="text-gray-400" /> {session.user_phone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(session.status)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-black p-1 rounded-md hover:bg-gray-200 transition-colors">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>Mostrando {filteredSessions.length} resultados</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Siguiente</button>
                </div>
            </div>
        </div>
    );
}
