"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const trackView = async () => {
            // Get or create a simple session ID for uniqueness
            let sessionId = sessionStorage.getItem("analytics_session_id");
            if (!sessionId) {
                sessionId = crypto.randomUUID();
                sessionStorage.setItem("analytics_session_id", sessionId);
            }

            const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

            // Avoid tracking admin pages to keep data clean
            if (url.startsWith("/admin") || url.startsWith("/api")) return;

            try {
                await supabase.from("page_views").insert({
                    url,
                    referrer: document.referrer || null,
                    user_agent: navigator.userAgent,
                    session_id: sessionId
                });
            } catch (error) {
                console.error("Error tracking page view:", error);
            }
        };

        trackView();
    }, [pathname, searchParams]);

    return null; // This component doesn't render anything
}
