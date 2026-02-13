"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState<any>({ title: "", content: "", trigger_shortcut: "" });

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        const { data } = await supabase.from('message_templates').select('*').order('created_at', { ascending: false });
        if (data) setTemplates(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        let error;
        if (currentTemplate.id) {
            const res = await supabase.from('message_templates').update(currentTemplate).eq('id', currentTemplate.id);
            error = res.error;
        } else {
            const res = await supabase.from('message_templates').insert(currentTemplate);
            error = res.error;
        }

        if (!error) {
            setIsEditing(false);
            setCurrentTemplate({ title: "", content: "", trigger_shortcut: "" });
            fetchTemplates();
        } else {
            alert("Error al guardar plantilla");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Seguro que quieres borrarla?")) return;
        await supabase.from('message_templates').delete().eq('id', id);
        fetchTemplates();
    };

    return (
        <div className="p-8 h-full flex flex-col md:flex-row gap-8">
            {/* List */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0A0A0A]">Plantillas</h1>
                    <button
                        onClick={() => { setCurrentTemplate({}); setIsEditing(true); }}
                        className="bg-[#0A0A0A] text-[#C8FF00] px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-900"
                    >
                        <Plus size={18} /> Nueva
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto content-start">
                    {templates.map(t => (
                        <div key={t.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#C8FF00] transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#0A0A0A]">{t.title}</h3>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setCurrentTemplate(t); setIsEditing(true); }} className="text-gray-400 hover:text-blue-500">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono">
                                {t.content}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Atajo:</span>
                                <code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-blue-600 font-bold">/{t.trigger_shortcut || "-"}</code>
                            </div>
                        </div>
                    ))}
                    {templates.length === 0 && !loading && (
                        <div className="col-span-2 text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-xl">
                            No hay plantillas creadas.
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal / Panel */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
                        <h2 className="text-xl font-bold mb-6">{currentTemplate.id ? "Editar Plantilla" : "Nueva Plantilla"}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Título</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 outline-none focus:border-[#C8FF00]"
                                    value={currentTemplate.title || ""}
                                    onChange={e => setCurrentTemplate({ ...currentTemplate, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Atajo (ej: "saludo")</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 outline-none focus:border-[#C8FF00]"
                                    value={currentTemplate.trigger_shortcut || ""}
                                    onChange={e => setCurrentTemplate({ ...currentTemplate, trigger_shortcut: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Contenido del Mensaje</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 outline-none focus:border-[#C8FF00] h-32 resize-none"
                                    value={currentTemplate.content || ""}
                                    onChange={e => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-2 bg-gray-100 rounded-lg font-bold text-gray-600 hover:bg-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-[#C8FF00] rounded-lg font-bold text-black hover:bg-[#b0e000]"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
