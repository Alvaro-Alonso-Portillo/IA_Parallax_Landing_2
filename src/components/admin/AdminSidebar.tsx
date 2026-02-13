"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    MessageSquare,
    Users,
    BarChart3,
    Calendar,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
    { name: "Conversaciones", icon: MessageSquare, href: "/admin" },
    { name: "Clientes (CRM)", icon: Users, href: "/admin/clients" },
    { name: "Reportes", icon: BarChart3, href: "/admin/reports" },
    { name: "Agenda", icon: Calendar, href: "/admin/calendar" },
    { name: "Plantillas", icon: FileText, href: "/admin/templates" },
    { name: "Configuración", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (v: boolean) => void }) {
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#FAFAFA] border-r border-gray-200">
            {/* Logo Area */}
            <div className="flex items-center gap-2 mb-6 px-2">
                <div className="w-8 h-8 bg-[#C8FF00] rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-black" size={20} />
                </div>
                <div>
                    <h1 className="font-bold text-lg text-[#0A0A0A] leading-tight">IA_Parallax</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">DASHBOARD</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                ? "bg-white text-[#0A0A0A] shadow-sm border border-gray-100"
                                : "text-gray-500 hover:bg-gray-100 hover:text-[#0A0A0A]"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-[#0A0A0A]" : "text-gray-400"}`} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AA
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-[#0A0A0A] truncate">Álvaro Alonso</p>
                        <p className="text-xs text-gray-500 truncate">admin@iaparallax.com</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 h-screen fixed left-0 top-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[80%] max-w-xs z-50 md:hidden bg-[#FAFAFA]"
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
