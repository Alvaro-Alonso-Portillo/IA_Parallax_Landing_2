"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Tag, Calendar, Save, X, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ClientProfileProps {
    session: any;
    onUpdate: () => void;
    onClose: () => void;
}

export function ClientProfile({ session, onUpdate, onClose }: ClientProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        user_name: session.user_name || "",
        user_email: session.user_email || "",
        user_phone: session.user_phone || "",
        user_company: session.user_company || "",
        user_role: session.user_role || "",
        status: session.status || "new",
        notes: session.notes || "",
        tags: session.tags ? session.tags.join(", ") : ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from('chat_sessions')
            .update({
                user_name: formData.user_name,
                user_email: formData.user_email,
                user_phone: formData.user_phone,
                user_company: formData.user_company,
                user_role: formData.user_role,
                status: formData.status,
                notes: formData.notes,
                tags: formData.tags.split(",").map((t: string) => t.trim()).filter((t: string) => t)
            })
            .eq('id', session.id);

        if (error) {
            console.error("Error updating profile:", error);
            alert("Error al guardar");
        } else {
            setIsEditing(false);
            onUpdate();
        }
    };

    return (
        <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto absolute md:relative right-0 transition-transform z-10 shadow-xl md:shadow-none font-sans">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg">Perfil del Cliente</h3>
                <button onClick={onClose} className="md:hidden text-gray-400">
                    <X size={20} />
                </button>
            </div>

            <div className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                        {formData.user_name ? formData.user_name.substring(0, 2).toUpperCase() : "AN"}
                    </div>
                    {isEditing ? (
                        <input
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="text-center font-bold text-lg border-b border-gray-300 focus:border-[#C8FF00] outline-none w-full"
                            placeholder="Nombre..."
                        />
                    ) : (
                        <h2 className="font-bold text-lg text-center">{session.user_name || "Sin nombre"}</h2>
                    )}
                    <span className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-mono">ID: {session.id.substring(0, 8)}</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`py-2 px-4 rounded-lg text-sm font-bold transition-all ${isEditing ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {isEditing ? "Cancelar" : "Editar"}
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleSave}
                            className="py-2 px-4 rounded-lg text-sm font-bold bg-[#C8FF00] text-black hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={16} /> Guardar
                        </button>
                    )}
                </div>

                <hr className="border-gray-100" />

                {/* Corporate Details */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Empresa</h4>

                    <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        {isEditing ? (
                            <input
                                name="user_company"
                                value={formData.user_company}
                                onChange={handleChange}
                                className="flex-1 text-sm border-b border-gray-100 focus:border-[#C8FF00] outline-none"
                                placeholder="Nombre de la empresa..."
                            />
                        ) : (
                            <span className="text-sm font-medium text-gray-900">{session.user_company || <i className="text-gray-300">No especificada</i>}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-gray-400" />
                        {isEditing ? (
                            <input
                                name="user_role"
                                value={formData.user_role}
                                onChange={handleChange}
                                className="flex-1 text-sm border-b border-gray-100 focus:border-[#C8FF00] outline-none"
                                placeholder="Cargo o departamento..."
                            />
                        ) : (
                            <span className="text-sm text-gray-600">{session.user_role || <i className="text-gray-300">Puesto no especificado</i>}</span>
                        )}
                    </div>
                </div>

                <hr className="border-gray-50" />

                {/* Contact Info */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contacto</h4>

                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {isEditing ? (
                            <input
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                className="flex-1 text-sm border-b border-gray-100 focus:border-[#C8FF00] outline-none"
                                placeholder="Email..."
                            />
                        ) : (
                            <span className="text-sm text-gray-700 break-all">{session.user_email || "-"}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {isEditing ? (
                            <input
                                name="user_phone"
                                value={formData.user_phone}
                                onChange={handleChange}
                                className="flex-1 text-sm border-b border-gray-100 focus:border-[#C8FF00] outline-none"
                                placeholder="Teléfono..."
                            />
                        ) : (
                            <span className="text-sm text-gray-700">{session.user_phone || "-"}</span>
                        )}
                    </div>
                </div>

                {/* Status & Tags */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estado del Lead</h4>

                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Etapa</label>
                        {isEditing ? (
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8FF00] font-bold"
                            >
                                <option value="new">Nuevo</option>
                                <option value="contacted">Contactado</option>
                                <option value="interested">Interesado</option>
                                <option value="scheduled">Agendado</option>
                                <option value="closed">Cerrado</option>
                            </select>
                        ) : (
                            <div className="inline-block px-3 py-1 bg-black text-[#C8FF00] rounded-full text-[10px] font-black uppercase tracking-widest">
                                {session.status || "new"}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Etiquetas</label>
                        {isEditing ? (
                            <input
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8FF00]"
                                placeholder="vip, urgente, tech..."
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2 text-[10px]">
                                {session.tags && session.tags.length > 0 ? (
                                    session.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-[#C8FF00]/10 text-black border border-[#C8FF00]/20 rounded font-bold">
                                            #{tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">Sin etiquetas</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Notas Internas</h4>
                    {isEditing ? (
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-[#C8FF00] outline-none h-32 resize-none text-gray-700"
                            placeholder="Añadir observaciones estratégicas..."
                        />
                    ) : (
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 min-h-[100px]">
                            <p className="text-sm text-gray-600 italic leading-relaxed">
                                {session.notes || "No hay notas estratégicas registradas."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
