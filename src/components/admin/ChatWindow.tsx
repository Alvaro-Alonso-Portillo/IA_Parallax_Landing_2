"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, MoreVertical, Phone, Mail, Tag, Calendar, User, Paperclip, Smile } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ChatWindowProps {
    session: any;
    onUpdateSession: () => void; // Trigger refresh
}

export function ChatWindow({ session, onUpdateSession }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [session?.chat_messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            // Insert message as 'agent' (or 'assistant' if allow-list doesn't support 'agent')
            // Using 'assistant' for now to keep it simple with existing enum, but ideally 'agent'
            const { error } = await supabase
                .from('chat_messages')
                .insert({
                    session_id: session.id,
                    role: 'assistant', // acting as the AI/Agent
                    content: newMessage.trim()
                });

            if (error) throw error;

            // Update session timestamp & preview
            await supabase
                .from('chat_sessions')
                .update({
                    updated_at: new Date().toISOString(),
                    last_message_preview: newMessage.trim()
                })
                .eq('id', session.id);

            setNewMessage("");
            onUpdateSession(); // Refresh parent
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error al enviar mensaje");
        } finally {
            setIsSending(false);
        }
    };

    if (!session) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} />
                </div>
                <p>Selecciona una conversación para empezar</p>
            </div>
        );
    }

    // Sort messages
    const sortedMessages = session.chat_messages?.sort(
        (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ) || [];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative">
            {/* Header */}
            <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-[#C8FF00] flex items-center justify-center font-bold">
                        {session.user_name ? session.user_name.substring(0, 2).toUpperCase() : "AN"}
                    </div>
                    <div>
                        <h2 className="font-bold text-[#0A0A0A] text-sm">
                            {session.user_name || "Usuario Anónimo"}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{session.user_email || "Sin email"}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-green-600 font-medium">Online hace 2m</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Llamar">
                        <Phone size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Email">
                        <Mail size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Más opciones">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {sortedMessages.map((msg: any) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-4 rounded-2xl max-w-[70%] text-sm leading-relaxed shadow-sm ${isUser
                                    ? 'bg-[#0A0A0A] text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                }`}>
                                <p>{msg.content}</p>
                                <span className={`text-[10px] mt-2 block opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex gap-4 items-end max-w-4xl mx-auto">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-[#C8FF00] focus-within:border-transparent transition-all">
                        <button type="button" className="text-gray-400 hover:text-gray-600 mr-3">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            rows={1}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 resize-none max-h-32 py-1"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                        <button type="button" className="text-gray-400 hover:text-gray-600 ml-3">
                            <Smile size={20} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className="h-12 w-12 bg-[#0A0A0A] hover:bg-black text-[#C8FF00] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
import { MessageSquare } from "lucide-react";
