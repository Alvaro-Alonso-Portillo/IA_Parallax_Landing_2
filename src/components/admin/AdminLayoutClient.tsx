"use client";
import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth");
        if (auth === "true") setIsAuthenticated(true);
    }, []);

    if (!isAuthenticated) {
        return <div className="min-h-screen bg-[#0A0A0A]">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-white text-[#0A0A0A] flex">
            {/* Sidebar */}
            <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:pl-72 transition-all duration-300">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#C8FF00] rounded-lg flex items-center justify-center">
                            <span className="font-bold text-xs">IP</span>
                        </div>
                        <span className="font-bold">IA_Parallax</span>
                    </div>
                    <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
