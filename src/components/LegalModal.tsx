"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LegalType = "privacy" | "legal" | "cookies";

interface LegalContent {
    title: string;
    sections: {
        h: string;
        p: string;
    }[];
}

const content: Record<LegalType, LegalContent> = {
    privacy: {
        title: "Política de Privacidad",
        sections: [
            {
                h: "🔒 Privacidad de Datos",
                p: "Política de Protección y Tratamiento"
            },
            {
                h: "01. Marco Normativo",
                p: "Respetando lo establecido en la legislación vigente, IA_Parallax se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.\n\n› El Reglamento (UE) 2016/679 (RGPD).\n› La Ley Orgánica 3/2018 (LOPD-GDD).\n› El Real Decreto 1720/2007 (RDLOPD).\n› La Ley 34/2002 (LSSI-CE)."
            },
            {
                h: "02. Responsable del Tratamiento",
                p: "El responsable del tratamiento de los datos personales recogidos en IA_Parallax es Alvaro Alonso Portillo.\n\nTitular: Alvaro Alonso Portillo\nNIF: 44955300Y\nDirección: Calle Castillo de Utrera\nTeléfono: 666426999\nEmail: balonsomorillo@gmail.com"
            },
            {
                h: "03. Principios Aplicables",
                p: "El tratamiento se someterá a los siguientes principios del RGPD:\n\n1. Licitud, lealtad y transparencia\n2. Limitación de la finalidad\n3. Minimización de datos\n4. Exactitud\n5. Limitación del plazo de conservación\n6. Integridad y confidencialidad\n7. Responsabilidad proactiva"
            },
            {
                h: "04. Derechos del Usuario",
                p: "Puedes ejercer tus derechos (Acceso, Rectificación, Supresión, Limitación, Portabilidad, Oposición) enviando un email a: balonsomorillo@gmail.com con la referencia 'RGPD-iaparallax.es'."
            },
            {
                h: "05. Secreto y Seguridad",
                p: "IA_Parallax garantiza la seguridad mediante certificado SSL. Los datos personales serán tratados como confidenciales y se garantiza el secreto profesional."
            },
            {
                h: "06. Aceptación y Cambios",
                p: "El uso del Sitio Web implica la aceptación de esta política. IA_Parallax se reserva el derecho a modificarla según criterios legales o legislativos."
            }
        ]
    },
    legal: {
        title: "Aviso Legal",
        sections: [
            {
                h: "LSSI-CE / Dominio: IAPARALLAX.COM",
                p: "Documento informativo de cumplimiento legal."
            },
            {
                h: "01. Información General",
                p: "En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSI-CE) de 11 de julio, se facilitan a continuación los siguientes datos:\n\nTitular: Alvaro Alonso Portillo\nNIF: 44955300Y\nDirección: Calle Castillo de Utrera\nTeléfono: 666426999\nEmail: balonsomorillo@gmail.com"
            },
            {
                h: "02. Términos de Uso",
                p: "El objeto de las presentes Condiciones Generales de Uso es regular el acceso y la utilización del Sitio Web. IA_Parallax se reserva la facultad de modificar, en cualquier momento y sin aviso previo, la presentación y configuración del mismo.\n\nEl Objeto: Apariencia externa de los interfaces, árbol de navegación y todos los elementos integrados.\n\nEl Usuario: El acceso confiere la condición de Usuario, asumiendo la responsabilidad del uso correcto y la veracidad de los datos aportados."
            },
            {
                h: "03. Exclusión de Garantías",
                p: "IA_Parallax no garantiza la continuidad, disponibilidad y utilidad del Sitio Web. No se responsabiliza por pérdidas o daños que surjan del acceso o uso, incluyendo fallos en sistemas informáticos o virus."
            },
            {
                h: "04. Política de Enlaces",
                p: "El Sitio Web puede poner a disposición enlaces (links, banners, botones) a sitios de terceros. IA_Parallax no asume responsabilidad por los contenidos, servicios o productos de dichos sitios enlazados."
            },
            {
                h: "05. Propiedad Intelectual",
                p: "IA_Parallax es titular de todos los derechos de propiedad intelectual e industrial. Queda prohibida la reproducción, distribución y comunicación pública de los contenidos sin autorización expresa."
            },
            {
                h: "06. Jurisdicción",
                p: "La relación entre el Usuario e IA_Parallax se regirá por la normativa española vigente. Cualquier controversia se someterá a los jueces y tribunales que correspondan conforme a derecho."
            }
        ]
    },
    cookies: {
        title: "Política de Cookies",
        sections: [
            {
                h: "01. Definición y Función",
                p: "El acceso a este Sitio Web puede implicar la utilización de cookies. Las cookies son pequeñas cantidades de información que se almacenan en el navegador para que el servidor recuerde cierta información. Facilitan la navegación y no dañan el dispositivo."
            },
            {
                h: "02. Privacidad y Datos",
                p: "La información recabada puede incluir fecha y hora de visitas, páginas visionadas y tiempo de estancia. La información privada solo formará parte del archivo si el usuario la facilita personalmente.\n\n'Ninguna cookie permite contactar con el número de teléfono del Usuario o extraer información del disco duro o robar información personal.'"
            },
            {
                h: "03. Tipología de Cookies",
                p: "Utilizamos diferentes tipos de galletas digitales para asegurar que tu experiencia sea fluida y personalizada.\n\nCookies Propias: Gestionadas exclusivamente por IA_Parallax para mejorar el funcionamiento del Sitio Web.\n\nCookies de Redes Sociales: Plugins que permiten acceder a redes sociales desde el Sitio Web (Facebook, Twitter, Instagram, YouTube, Pinterest, LinkedIn). Cada red dispone de su propia política de privacidad."
            },
            {
                h: "04. Gestión y Desactivación",
                p: "El Usuario puede deshabilitar, rechazar y eliminar las cookies mediante la configuración de su navegador. Si se rechazan, se podrá seguir usando el Sitio Web, aunque algunas prestaciones podrían verse limitadas."
            }
        ]
    }
};

export function LegalModal() {
    const [type, setType] = useState<LegalType | null>(null);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setType(e.detail);
            document.body.style.overflow = "hidden";
        };
        const handleClose = () => {
            setType(null);
            document.body.style.overflow = "";
        };

        window.addEventListener("open-legal", handleOpen);
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") handleClose();
        });

        return () => {
            window.removeEventListener("open-legal", handleOpen);
        };
    }, []);

    const close = () => {
        setType(null);
        document.body.style.overflow = "";
    };

    const getHeaderColor = () => {
        if (type === "cookies") return "bg-[#3893D8]";
        if (type === "privacy") return "bg-[#E34E70]";
        return "bg-[#F3951B]";
    };

    const getEmoji = (itemType: LegalType) => {
        if (itemType === "cookies") return "🍪";
        if (itemType === "privacy") return "🔒";
        return "⚖️";
    };

    const currentContent = type ? content[type] : null;

    return (
        <AnimatePresence>
            {type && currentContent && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 overflow-hidden">
                    {/* Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="relative z-10 w-full max-w-4xl max-h-full flex flex-col"
                        data-lenis-prevent
                    >
                        {/* THE "DOCUMENT" CONTAINER */}
                        <div className="bg-[#F2F1ED] border-[3px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden rounded-sm">

                            {/* Colorful Header Section */}
                            <div className={`${getHeaderColor()} p-6 md:p-8 border-b-[3px] border-black text-center relative`}>
                                <button
                                    onClick={close}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all transform hover:rotate-90 active:scale-90"
                                >
                                    ✕
                                </button>

                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl md:text-3xl block mb-2 drop-shadow-md"
                                >
                                    {getEmoji(type)}
                                </motion.span>

                                <h2 className="text-2xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                    {currentContent.title}
                                </h2>
                                <p className="text-white/80 font-display font-bold text-[10px] uppercase tracking-widest mt-2">
                                    Dominio: iaparallax.com
                                </p>
                            </div>

                            {/* Scrollable Document Body */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-20 bg-white">
                                <div className="space-y-16 max-w-2xl mx-auto">
                                    {currentContent.sections.map((s, i) => (
                                        <div key={i} className="relative pl-12 md:pl-16">
                                            {/* Section Icon/Number Circle */}
                                            <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 bg-[#C8FF00] border-2 border-black rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                {i + 1}
                                            </div>

                                            <h3 className="text-xl md:text-3xl font-display font-black text-black uppercase tracking-tight mb-4 leading-none">
                                                {s.h}
                                            </h3>
                                            <div className="text-[#333] font-body leading-relaxed text-[15px] md:text-[17px] whitespace-pre-line border-l-2 border-black/5 pl-6">
                                                {s.p}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Final Stamp Section */}
                                    <div className="pt-20 pb-10 flex flex-col items-center justify-center text-center relative">
                                        <div className="w-full h-px bg-black/10 mb-12" />

                                        <p className="text-[10px] font-display font-bold text-black/30 uppercase tracking-[0.4em] mb-4">
                                            Última actualización: Enero 2026
                                        </p>

                                        {/* THE RED STAMP */}
                                        <motion.div
                                            initial={{ scale: 2, opacity: 0, rotate: 20 }}
                                            whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
                                            className="border-4 border-red-600 px-6 py-2 text-red-600 font-display font-black text-2xl md:text-4xl uppercase tracking-tighter rotate-[-12deg] absolute -right-4 bottom-4 md:-right-10 md:bottom-10 bg-white/50 backdrop-blur-sm shadow-xl"
                                        >
                                            Aburrido<br />pero legal
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Close Bar */}
                            <div className="p-6 bg-[#F2F1ED] border-t-[3px] border-black flex justify-center">
                                <button
                                    onClick={close}
                                    className="bg-black text-white px-10 py-4 font-display font-black text-xs uppercase tracking-widest hover:bg-nBlue hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                                >
                                    Volver al sitio
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
