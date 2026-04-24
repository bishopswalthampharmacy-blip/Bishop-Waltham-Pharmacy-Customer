"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Stethoscope, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CHATBOT_API_URL =
    "https://j2p245nc7b.execute-api.us-east-1.amazonaws.com/prod/bishops-chatbot";

const starterMessages = [
    {
        id: 1,
        role: "assistant",
        text: "Hi! Welcome to Bishops Waltham Pharmacy. How can I help you today?",
    },
];

export default function ChatbotWidget() {
    const [chatState, setChatState] = useState({
        isOpen: false,
        input: "",
        messages: starterMessages,
        isTyping: false,
        sessionId: null,
    });
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const canSend = chatState.input.trim().length > 0 && !chatState.isTyping;

    useEffect(() => {
        if (chatState.isOpen) {
            inputRef.current?.focus();
        }
    }, [chatState.isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatState.messages, chatState.isTyping, chatState.isOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedMessage = chatState.input.trim();
        if (!trimmedMessage) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            text: trimmedMessage,
        };

        const currentSessionId = chatState.sessionId;

        setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            input: "",
            isTyping: true,
        }));

        try {
            const requestBody = {
                message: trimmedMessage,
            };

            if (currentSessionId) {
                requestBody.sessionId = currentSessionId;
            }

            const response = await fetch(CHATBOT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();


            // Handle API Gateway format where response body is a string
            let parsedData = data;
            if (data.body && typeof data.body === "string") {
                try {
                    parsedData = JSON.parse(data.body);
                } catch (parseError) {
                    console.error("Failed to parse body:", parseError);
                    throw parseError;
                }
            }

            const reply = parsedData?.reply || data?.reply;
            const sessionId = parsedData?.sessionId || data?.sessionId;



            const botMessage = {
                id: Date.now() + 1,
                role: "assistant",
                text: reply || "Sorry, I could not generate a response right now.",
            };

            setChatState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
                sessionId: sessionId || prev.sessionId,
                isTyping: false,
            }));
        } catch (error) {
            const fallbackMessage = {
                id: Date.now() + 1,
                role: "assistant",
                text: "Sorry, there was a connection issue. Please try again.",
            };

            setChatState((prev) => ({
                ...prev,
                messages: [...prev.messages, fallbackMessage],
                isTyping: false,
            }));
            console.error("Chatbot API error:", error);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[110] font-instrument">
            <AnimatePresence>
                {chatState.isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 22, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 22, scale: 0.96 }}
                        transition={{ type: "spring", damping: 22, stiffness: 280 }}
                        className="mb-3 w-[calc(100vw-2.5rem)] max-w-[390px] overflow-hidden rounded-2xl border border-[#d9ecf0] bg-white shadow-[0_22px_48px_rgba(3,127,145,0.22)]"
                    >
                        <div className="flex items-center justify-between bg-gradient-to-r from-[#037F91] to-[#0B5C64] px-4 py-3 text-white">
                            <div>
                                <h3 className="text-sm font-semibold">
                                    Bishops Waltham Pharmacy
                                </h3>
                                <p className="text-xs text-white/90">Chat support is online</p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setChatState((prev) => ({
                                        ...prev,
                                        isOpen: false,
                                    }))
                                }
                                aria-label="Close chatbot"
                                className="cursor-pointer rounded-full p-1.5 transition hover:bg-white/20"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="h-[350px] space-y-3 overflow-y-auto bg-[#f7fcfd] px-4 py-4">
                            {chatState.messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === "user"
                                            ? "rounded-br-sm bg-[#0B5C64] text-white"
                                            : "rounded-bl-sm border border-[#d3e8eb] bg-white text-[#264147]"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}

                            {chatState.isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="flex justify-start"
                                >
                                    <div className="rounded-2xl rounded-bl-sm border border-[#d3e8eb] bg-white px-3 py-2 text-[#264147]">
                                        <div className="flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7aa8b0] [animation-delay:0ms]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7aa8b0] [animation-delay:120ms]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7aa8b0] [animation-delay:220ms]" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="border-t border-[#e4f1f3] bg-white p-3"
                        >
                            <div className="flex items-center gap-2 rounded-xl border border-[#c9e3e7] px-3 py-2 transition focus-within:border-[#037F91] focus-within:shadow-[0_0_0_3px_rgba(3,127,145,0.14)]">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={chatState.input}
                                    onChange={(event) =>
                                        setChatState((prev) => ({
                                            ...prev,
                                            input: event.target.value,
                                        }))
                                    }
                                    placeholder="Type your message..."
                                    className="w-full bg-transparent text-sm text-[#1f3338] outline-none placeholder:text-[#8ba7ad]"
                                />
                                <button
                                    type="submit"
                                    aria-label="Send message"
                                    disabled={!canSend}
                                    className="cursor-pointer rounded-full bg-[#037F91] p-2 text-white transition hover:bg-[#0B5C64] disabled:cursor-not-allowed disabled:opacity-55"
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!chatState.isOpen && (
                <motion.button
                    type="button"
                    onClick={() =>
                        setChatState((prev) => ({
                            ...prev,
                            isOpen: true,
                        }))
                    }
                    aria-label="Open chatbot"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative ml-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#037F91] to-[#0B5C64] text-white shadow-[0_12px_28px_rgba(3,127,145,0.35)]"
                >
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-8 ring-[#037F91]/15" />
                    <Stethoscope size={22} />
                </motion.button>
            )}
        </div>
    );
}
