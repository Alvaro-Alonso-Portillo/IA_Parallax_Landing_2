"use client";
import React from "react";
import { Lock, Save, Globe, Database } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-8 h-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8">Configuración</h1>

            <div className="space-y-6">
                {/* Admin Access */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Lock size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0A0A0A]">Acceso de Administrador</h3>
                            <p className="text-sm text-gray-500">Gestiona la seguridad de tu panel.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Contraseña Actual</label>
                            <input type="password" value="********" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-gray-400 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Nueva Contraseña</label>
                            <input type="password" placeholder="Escribe para cambiar..." className="w-full bg-white border border-gray-200 rounded-lg p-2 outline-none focus:border-[#C8FF00]" />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800">
                            <Save size={14} /> Actualizar Clave
                        </button>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Globe size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0A0A0A]">Preferencias Generales</h3>
                            <p className="text-sm text-gray-500">Ajustes globales del sistema.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-sm text-[#0A0A0A]">Modo Mantenimiento</p>
                                <p className="text-xs text-gray-500">Desactiva el chatbot temporalmente.</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-sm text-[#0A0A0A]">Notificaciones por Email</p>
                                <p className="text-xs text-gray-500">Recibe alertas de nuevos leads.</p>
                            </div>
                            <div className="w-12 h-6 bg-[#C8FF00] rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-black rounded-full absolute top-1 right-1 shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Database Info */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                            <Database size={20} className="text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0A0A0A]">Estado del Sistema</h3>
                            <p className="text-sm text-gray-500">Supabase conectado • v1.0.0</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Activo</span>
                </div>
            </div>
        </div>
    );
}
