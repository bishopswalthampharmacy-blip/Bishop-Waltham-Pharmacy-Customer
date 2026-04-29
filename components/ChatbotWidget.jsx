"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const CHATBOT_API_URL =
    "https://j2p245nc7b.execute-api.us-east-1.amazonaws.com/prod/bishops-chatbot";

const starterMessages = [
    {
        id: 1,
        role: "assistant",
        text: "Hi! How can I help you today?",
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
    const [wiggle, setWiggle] = useState(false);
    const [typewriter, setTypewriter] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const canSend = chatState.input.trim().length > 0 && !chatState.isTyping;

   
    useEffect(() => {
        if (chatState.isOpen) return;
        const interval = setInterval(() => {
            setTypewriter(true);
            setTimeout(() => {
                setWiggle(true);
                setTimeout(() => {
                    setWiggle(false);
                    setTypewriter(false);
                }, 800);
            }, 1000);
        }, 4000);
        return () => clearInterval(interval);
    }, [chatState.isOpen]);

    useEffect(() => {
        if (chatState.isOpen) inputRef.current?.focus();
    }, [chatState.isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatState.messages, chatState.isTyping, chatState.isOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedMessage = chatState.input.trim();
        if (!trimmedMessage) return;

        const userMessage = { id: Date.now(), role: "user", text: trimmedMessage };
        const currentSessionId = chatState.sessionId;

        setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            input: "",
            isTyping: true,
        }));

        try {
            const requestBody = { message: trimmedMessage };
            if (currentSessionId) requestBody.sessionId = currentSessionId;

            const response = await fetch(CHATBOT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

            const data = await response.json();
            let parsedData = data;
            if (data.body && typeof data.body === "string") {
                try { parsedData = JSON.parse(data.body); } catch (e) { throw e; }
            }

            const reply = parsedData?.reply || data?.reply;
            const sessionId = parsedData?.sessionId || data?.sessionId;

            setChatState((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        id: Date.now() + 1,
                        role: "assistant",
                        text: reply || "Sorry, I could not generate a response right now.",
                    },
                ],
                sessionId: sessionId || prev.sessionId,
                isTyping: false,
            }));
        } catch (error) {
            setChatState((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        id: Date.now() + 1,
                        role: "assistant",
                        text: "Sorry, there was a connection issue. Please try again.",
                    },
                ],
                isTyping: false,
            }));
            console.error("Chatbot API error:", error);
        }
    };

    return (
        <>
            <style>{`
                @keyframes bwGradShift {
                    0%{background-position:0% 50%}
                    50%{background-position:100% 50%}
                    100%{background-position:0% 50%}
                }
                @keyframes bwFloat {
                    0%,100%{transform:translateY(0)}
                    50%{transform:translateY(-5px)}
                }
                @keyframes bwWiggle {
                    0%,100%{transform:rotate(0deg)}
                    15%{transform:rotate(-13deg)}
                    30%{transform:rotate(10deg)}
                    45%{transform:rotate(-8deg)}
                    60%{transform:rotate(5deg)}
                    75%{transform:rotate(-3deg)}
                    90%{transform:rotate(2deg)}
                }
                @keyframes bwPulse1 {
                    0%{transform:scale(1);opacity:0.6}
                    70%,100%{transform:scale(1.7);opacity:0}
                }
                @keyframes bwPulse2 {
                    0%{transform:scale(1);opacity:0.3}
                    70%,100%{transform:scale(2.1);opacity:0}
                }
                @keyframes bwGreenDot {
                    0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.7)}
                    50%{box-shadow:0 0 0 5px rgba(74,222,128,0)}
                }
                @keyframes bwTypingDot {
                    0%,60%,100%{transform:translateY(0)}
                    30%{transform:translateY(-6px)}
                }
                @keyframes bwBotPop {
                    0%,100%{transform:scale(1)}
                    50%{transform:scale(1.12)}
                }
                @keyframes bwTypeIn {
                    from{width:0}
                    to{width:5.5rem}
                }
                @keyframes bwCursorBlink {
                    0%,100%{opacity:1}
                    50%{opacity:0}
                }

                .bw-chat-btn {
                    background: #5BB9EC;
                    animation: bwFloat 2.8s ease-in-out infinite;
                    box-shadow: 0 8px 20px rgba(91,185,236,0.4);
                }
                .bw-chat-btn:hover {
                    animation: bwWiggle 0.75s ease !important;
                    box-shadow: 0 12px 28px rgba(91,185,236,0.55) !important;
                }
                .bw-chat-btn-wiggle {
                    animation: bwWiggle 0.75s ease !important;
                }

                .bw-pulse-1 { animation: bwPulse1 2.4s ease-out infinite; }
                .bw-pulse-2 { animation: bwPulse2 2.4s ease-out infinite 0.6s; }

                .bw-header-grad {
                    background: linear-gradient(135deg, #037F91 0%, #0B5C64 100%);
                }
                .bw-green-dot { animation: bwGreenDot 1.8s ease-in-out infinite; }

                .bw-typing span:nth-child(1){animation:bwTypingDot 1s ease infinite 0ms}
                .bw-typing span:nth-child(2){animation:bwTypingDot 1s ease infinite 160ms}
                .bw-typing span:nth-child(3){animation:bwTypingDot 1s ease infinite 320ms}

                .bw-bot-icon { animation: bwBotPop 2s ease-in-out infinite; }

                /* Typewriter text */
                .bw-tw-text {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 5.5rem;
                }
                .bw-tw-text-anim {
                    width: 0;
                    animation: bwTypeIn 0.9s steps(12, end) forwards;
                }

                /* Blinking cursor */
                .bw-cursor {
                    display: inline-block;
                    width: 1.5px;
                    height: 0.75em;
                    background: rgba(255,255,255,0.9);
                    margin-left: 1px;
                    vertical-align: middle;
                    opacity: 0;
                }
                .bw-cursor-anim {
                    opacity: 1;
                    animation: bwCursorBlink 0.45s ease infinite;
                }
            `}</style>

            <div className="fixed bottom-5 right-5 z-[110] font-instrument flex flex-col items-end">

                {/* ── Chat window ── */}
                <AnimatePresence>
                    {chatState.isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.94 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="mb-3 w-[calc(100vw-2.5rem)] max-w-[390px] overflow-hidden rounded-2xl border border-[#d9ecf0]"
                            style={{ boxShadow: "0 22px 48px rgba(91,185,236,0.22)" }}
                        >
                            {/* Header */}
                            <div className="bw-header-grad flex items-center justify-between px-4 py-3 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-white/20">
                                        <Bot size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold tracking-tight">
                                            Bishops Waltham Pharmacy
                                        </h3>
                                        <p className="flex items-center gap-1.5 text-xs text-white/90">
                                            <span className="bw-green-dot inline-block h-2 w-2 rounded-full bg-green-400" />
                                           Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setChatState((prev) => ({ ...prev, isOpen: false }))}
                                    aria-label="Close chatbot"
                                    className="cursor-pointer rounded-full p-1.5 transition hover:bg-white/25"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                className="h-[330px] space-y-2.5 overflow-y-auto px-4 py-4"
                                style={{ background: "linear-gradient(180deg, #f0fafa 0%, #f7fcfd 100%)" }}
                            >
                                {chatState.messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.22, ease: "easeOut" }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === "user"
                                                    ? "rounded-br-sm text-white"
                                                    : "rounded-bl-sm border border-[#d3e8eb] bg-white text-[#264147] prose prose-sm max-w-none"
                                                }`}
                                            style={
                                                message.role === "user"
                                                    ? { background: "linear-gradient(135deg, #037F91, #0B5C64)" }
                                                    : {}
                                            }
                                        >
                                            {message.role === "assistant" ? (
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ children }) => <p className="mb-1">{children}</p>,
                                                        ul: ({ children }) => <ul className="list-disc list-inside mb-1">{children}</ul>,
                                                        li: ({ children }) => <li className="mb-0.5">{children}</li>,
                                                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                        em: ({ children }) => <em className="italic">{children}</em>,
                                                    }}
                                                >
                                                    {message.text}
                                                </ReactMarkdown>
                                            ) : (
                                                message.text
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {chatState.isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bw-typing rounded-2xl rounded-bl-sm border border-[#d3e8eb] bg-white px-3 py-2.5">
                                            <div className="flex items-center gap-1">
                                                <span className="inline-block h-2 w-2 rounded-full bg-[#7aa8b0]" />
                                                <span className="inline-block h-2 w-2 rounded-full bg-[#7aa8b0]" />
                                                <span className="inline-block h-2 w-2 rounded-full bg-[#7aa8b0]" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={handleSubmit}
                                className="border-t border-[#e4f1f3] bg-white p-3"
                            >
                                <div className="flex items-center gap-2 rounded-xl border border-[#c9e3e7] px-3 py-2 transition focus-within:border-[#037F91] focus-within:shadow-[0_0_0_3px_rgba(3,127,145,0.14)]">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={chatState.input}
                                        onChange={(e) =>
                                            setChatState((prev) => ({ ...prev, input: e.target.value }))
                                        }
                                        placeholder="Type your message…"
                                        className="w-full bg-transparent text-sm text-[#1f3338] outline-none placeholder:text-[#8ba7ad]"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Send message"
                                        disabled={!canSend}
                                        className="flex-shrink-0 cursor-pointer rounded-full p-2 text-white transition hover:bg-[#0B5C64] disabled:cursor-not-allowed disabled:opacity-40"
                                        style={{ background: "#037F91" }}
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Trigger button — compact, bot icon + typewriter label ── */}
                {!chatState.isOpen && (
                    <div className="relative flex items-center justify-center">
                        <div
                            className="bw-pulse-1 pointer-events-none absolute inset-0 rounded-2xl"
                            style={{ background: "rgba(91,185,236,0.38)" }}
                        />
                        <div
                            className="bw-pulse-2 pointer-events-none absolute inset-0 rounded-2xl"
                            style={{ background: "rgba(91,185,236,0.2)" }}
                        />

                        <motion.button
                            type="button"
                            onClick={() => setChatState((prev) => ({ ...prev, isOpen: true }))}
                            aria-label="Open chatbot"
                            whileTap={{ scale: 0.94 }}
                            className={`bw-chat-btn ${wiggle ? "bw-chat-btn-wiggle" : ""} relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-white`}
                        >
                            <span className="bw-bot-icon leading-none">
                                <Bot size={20} />
                            </span>
                            <span className="flex items-center leading-none">
                                <span
                                    className={`bw-tw-text text-[12px] font-semibold tracking-wide ${typewriter ? "bw-tw-text-anim" : ""}`}
                                >
                                    Chat with us
                                </span>
                                <span className={`bw-cursor ${typewriter ? "bw-cursor-anim" : ""}`} />
                            </span>
                        </motion.button>
                    </div>
                )}
            </div>
        </>
    );
}