"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const CHATBOT_API_URL =
  "https://j2p245nc7b.execute-api.us-east-1.amazonaws.com/prod/bishops-chatbot";

const quickActions = ["Book appointment", "Opening hours", "Contact pharmacy", "Services available"];

const MIN_W = 300, MIN_H = 400, MAX_W = 900, MAX_H = 960;
const DEFAULT_W = 380, DEFAULT_H = 560;

/* ─── Detect mobile ─────────────────────────────────────────────────────── */
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 640;

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const BotIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const MinimizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const MaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const RestoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="21" y2="3" /><line x1="3" y1="21" x2="14" y2="10" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── Typing Dots ─────────────────────────────────────────────────────────── */
const TypingDots = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px" }}>
    {[0, 1, 2].map(i => (
      <motion.span key={i}
        style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(0,68,136,0.45)", display: "block" }}
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
      />
    ))}
  </div>
);

/* ─── Message Bubble ─────────────────────────────────────────────────────── */
const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";
  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 6 }}
    >
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0, marginRight: 8, marginTop: 2,
          background: "linear-gradient(135deg,#004488,#1a6abf)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,68,136,0.25)", color: "#fff"
        }}>
          <BotIcon size={14} />
        </div>
      )}
      <div style={{ maxWidth: "78%", position: "relative" }}>
        <div style={{
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          fontSize: 13.5, lineHeight: 1.55,
          background: isUser ? "linear-gradient(135deg,#004488,#1a6abf)" : "rgba(255,255,255,0.75)",
          color: isUser ? "#fff" : "#1a2e31",
          backdropFilter: isUser ? "none" : "blur(16px)",
          WebkitBackdropFilter: isUser ? "none" : "blur(16px)",
          border: isUser ? "none" : "1px solid rgba(0,68,136,0.12)",
          boxShadow: isUser ? "0 4px 16px rgba(0,68,136,0.22)" : "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          {msg.role === "assistant" ? (
            <ReactMarkdown components={{
              p: ({ children }) => <p style={{ margin: "0 0 6px" }}>{children}</p>,
              ul: ({ children }) => <ul style={{ margin: "6px 0 6px 0", paddingLeft: 20, listStyleType: "disc" }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ margin: "6px 0 6px 0", paddingLeft: 20, listStyleType: "decimal" }}>{children}</ol>,
              li: ({ children }) => <li style={{ marginBottom: 4, display: "list-item", listStylePosition: "outside" }}>{children}</li>,
              strong: ({ children }) => <strong style={{ fontWeight: 600, color: "#004488" }}>{children}</strong>,
              em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6,
                  padding: "5px 12px", borderRadius: 8,
                  background: "linear-gradient(135deg,#1a6abf,#004488)",
                  color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,68,136,0.3)"
                }}>{children}</a>
              ),
            }}>{msg.text}</ReactMarkdown>
          ) : msg.text}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: isUser ? "flex-end" : "flex-start", gap: 6, marginTop: 3 }}>
          <span style={{ fontSize: 10.5, color: "rgba(0,68,136,0.45)", letterSpacing: 0.2 }}>
            {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {msg.role === "assistant" && msg.text && (
            <button onClick={handleCopy} title="Copy" style={{
              background: "none", border: "none", cursor: "pointer", padding: 2,
              color: copied ? "#004488" : "rgba(0,68,136,0.35)",
              transition: "color 0.2s", display: "flex", alignItems: "center"
            }}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Resize handle definitions ─────────────────────────────────────────── */
const HANDLES = [
  { id: "n",  cursor: "n-resize",  style: { top: 0, left: 10, right: 10, height: 6 } },
  { id: "s",  cursor: "s-resize",  style: { bottom: 0, left: 10, right: 10, height: 6 } },
  { id: "e",  cursor: "e-resize",  style: { top: 10, right: 0, bottom: 10, width: 6 } },
  { id: "w",  cursor: "w-resize",  style: { top: 10, left: 0, bottom: 10, width: 6 } },
  { id: "ne", cursor: "ne-resize", style: { top: 0, right: 0, width: 16, height: 16 } },
  { id: "nw", cursor: "nw-resize", style: { top: 0, left: 0, width: 16, height: 16 } },
  { id: "se", cursor: "se-resize", style: { bottom: 0, right: 0, width: 16, height: 16 } },
  { id: "sw", cursor: "sw-resize", style: { bottom: 0, left: 0, width: 16, height: 16 } },
];

/* ─── Main Widget ────────────────────────────────────────────────────────── */
export default function ChatbotWidget() {
  const [isOpen, setIsOpen]       = useState(false);
  const [input, setInput]         = useState("");
  const [messages, setMessages]   = useState([
    { id: 1, role: "assistant", text: "Hi! I'm Bishop's assistant. How can I help you today? 👋", time: new Date() }
  ]);
  const [isTyping, setIsTyping]   = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [unread, setUnread]       = useState(0);
  const [pulse, setPulse]         = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [mobile, setMobile]       = useState(false);

  /* position & size — initialised to bottom-right corner */
  const [pos,  setPos]  = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth  - DEFAULT_W - 24 : 100,
    y: typeof window !== "undefined" ? window.innerHeight - DEFAULT_H - 90 : 100,
  }));
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });

  const snapshot    = useRef(null);
  const dragRef     = useRef(null);
  const resizeRef   = useRef(null);
  const inputRef    = useRef(null);
  const messagesEnd = useRef(null);

  const canSend = input.trim().length > 0 && !isTyping;

  /* ── Detect & track mobile ── */
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Lock body scroll on mobile when open ── */
  useEffect(() => {
    if (mobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobile, isOpen]);

  /* pulse FAB */
  useEffect(() => {
    if (isOpen) return;
    const id = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 1200); }, 5000);
    return () => clearInterval(id);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { inputRef.current?.focus(); setUnread(0); }
  }, [isOpen]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ── Drag (desktop only) ── */
  const startDrag = useCallback((e) => {
    if (mobile || maximized || e.button !== 0) return;
    e.preventDefault();
    dragRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }, [mobile, maximized, pos]);

  /* ── Resize (desktop only) ── */
  const startResize = useCallback((e, handle) => {
    if (mobile || maximized || e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    resizeRef.current = {
      mx: e.clientX, my: e.clientY,
      px: pos.x, py: pos.y,
      pw: size.w, ph: size.h,
      handle,
    };
    document.body.style.userSelect = "none";
    document.body.style.cursor = e.currentTarget.style.cursor;
  }, [mobile, maximized, pos, size]);

  /* global move / up */
  useEffect(() => {
    const onMove = (e) => {
      if (dragRef.current) {
        const { mx, my, px, py } = dragRef.current;
        let nx = px + e.clientX - mx;
        let ny = py + e.clientY - my;
        nx = Math.max(0, Math.min(nx, window.innerWidth  - size.w));
        ny = Math.max(0, Math.min(ny, window.innerHeight - size.h));
        setPos({ x: nx, y: ny });
      }
      if (resizeRef.current) {
        const { mx, my, px, py, pw, ph, handle } = resizeRef.current;
        const dx = e.clientX - mx;
        const dy = e.clientY - my;
        let nx = px, ny = py, nw = pw, nh = ph;
        if (handle.includes("e")) nw = Math.min(MAX_W, Math.max(MIN_W, pw + dx));
        if (handle.includes("s")) nh = Math.min(MAX_H, Math.max(MIN_H, ph + dy));
        if (handle.includes("w")) { nw = Math.min(MAX_W, Math.max(MIN_W, pw - dx)); nx = px + pw - nw; }
        if (handle.includes("n")) { nh = Math.min(MAX_H, Math.max(MIN_H, ph - dy)); ny = py + ph - nh; }
        setSize({ w: nw, h: nh });
        setPos({ x: nx, y: ny });
      }
    };
    const onUp = () => {
      dragRef.current = null;
      resizeRef.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   onUp);
    };
  }, [size.w, size.h]);

  /* ── Maximize / restore (desktop only) ── */
  const toggleMax = () => {
    if (mobile) return;
    if (!maximized) {
      snapshot.current = { pos: { ...pos }, size: { ...size } };
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight });
    } else {
      setPos(snapshot.current.pos);
      setSize(snapshot.current.size);
    }
    setMaximized(m => !m);
  };

  /* ── Send ── */
  const sendMessage = useCallback(async (text) => {
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text, time: new Date() }]);
    setInput(""); setIsTyping(true);
    try {
      const res  = await fetch(CHATBOT_API_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      let parsed = data;
      if (data.body && typeof data.body === "string") { try { parsed = JSON.parse(data.body); } catch {} }
      const reply = parsed?.reply || "I'm sorry, I didn't get that. Could you try again?";
      setSessionId(parsed?.sessionId || sessionId);
      const words = reply.split(" ");
      let idx = 0;
      const botMsg = { id: Date.now() + 1, role: "assistant", text: "", time: new Date() };
      setMessages(prev => [...prev, botMsg]);
      const tick = setInterval(() => {
        idx++;
        setMessages(prev => {
          const u = [...prev];
          u[u.length - 1] = { ...u[u.length - 1], text: words.slice(0, idx).join(" ") };
          return u;
        });
        if (idx >= words.length) {
          clearInterval(tick); setIsTyping(false);
          if (!isOpen) setUnread(n => n + 1);
        }
      }, 22);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 2, role: "assistant", text: "Connection issue — please try again.", time: new Date() }]);
      setIsTyping(false);
    }
  }, [sessionId, isOpen]);

  const handleSubmit = (e) => { e.preventDefault(); if (canSend) sendMessage(input.trim()); };

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        .cb * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
        .cb ::-webkit-scrollbar { width:4px; }
        .cb ::-webkit-scrollbar-track { background:transparent; }
        .cb ::-webkit-scrollbar-thumb { background:rgba(0,68,136,0.18); border-radius:4px; }
        .cb ::-webkit-scrollbar-thumb:hover { background:rgba(0,68,136,0.3); }
        .ci:focus { outline:none; border-color:rgba(0,68,136,0.45)!important; box-shadow:0 0 0 3px rgba(0,68,136,0.1); }
        .sb:hover:not(:disabled) { background:linear-gradient(135deg,#1a6abf,#003370)!important; transform:scale(1.05); }
        .sb:disabled { opacity:0.45; cursor:not-allowed; }
        .qc:hover { background:rgba(0,68,136,0.1)!important; border-color:rgba(0,68,136,0.35)!important; transform:translateY(-1px); }
        .hb:hover { background:rgba(255,255,255,0.28)!important; }
        .hbc:hover { background:rgba(220,60,60,0.5)!important; }
        .rh { position:absolute; z-index:20; transition:background 0.15s; }
        .rh:hover { background:rgba(0,68,136,0.15)!important; }
        @keyframes fabPulse { 0%,100%{box-shadow:0 4px 24px rgba(0,68,136,0.35)} 50%{box-shadow:0 4px 32px rgba(0,68,136,0.55),0 0 0 8px rgba(0,68,136,0.1)} }
        @keyframes ping { 0%{transform:scale(1);opacity:0.8} 80%,100%{transform:scale(2.2);opacity:0} }

        /* ── Mobile-specific ── */
        .cb-mobile-sheet {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100% !important;
          height: 92dvh !important;
          border-radius: 20px 20px 0 0 !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: none !important;
        }
        @media (max-width: 639px) {
          .cb-fab {
            right: 16px !important;
            bottom: 16px !important;
            left: auto !important;
            top: auto !important;
            width: 52px !important;
            height: 52px !important;
          }
          .cb-input-row input {
            font-size: 16px !important; /* prevents iOS zoom */
          }
        }
      `}</style>

      <div className="cb" style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>

        {/* ── Backdrop (mobile only) ── */}
        <AnimatePresence>
          {isOpen && mobile && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(0,20,50,0.45)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                pointerEvents: "all",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Chat Window ─────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-window"
              className={mobile ? "cb-mobile-sheet" : ""}
              initial={mobile
                ? { y: "100%", opacity: 1 }
                : { opacity: 0, scale: 0.94 }
              }
              animate={mobile
                ? { y: 0, opacity: 1 }
                : { opacity: 1, scale: 1 }
              }
              exit={mobile
                ? { y: "100%", opacity: 1 }
                : { opacity: 0, scale: 0.94 }
              }
              transition={mobile
                ? { type: "spring", stiffness: 340, damping: 36 }
                : { type: "spring", stiffness: 360, damping: 30 }
              }
              style={{
                position: "absolute",
                ...(mobile ? {} : {
                  left: pos.x, top: pos.y,
                  width: size.w, height: size.h,
                  borderRadius: maximized ? 0 : 20,
                }),
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                background: "rgba(240,246,255,0.92)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: (mobile || maximized) ? "none" : "1px solid rgba(255,255,255,0.75)",
                boxShadow: mobile
                  ? "0 -4px 40px rgba(0,68,136,0.18)"
                  : maximized ? "none" : "0 8px 40px rgba(0,68,136,0.18),0 1.5px 6px rgba(0,68,136,0.1),inset 0 1px 0 rgba(255,255,255,0.9)",
                pointerEvents: "all",
              }}
            >
              {/* Resize handles — desktop only */}
              {!mobile && !maximized && HANDLES.map(h => (
                <div key={h.id} className="rh"
                  style={{ cursor: h.cursor, borderRadius: h.id.length === 2 ? 4 : 0, ...h.style }}
                  onPointerDown={e => startResize(e, h.id)}
                />
              ))}

              {/* SE corner grip — desktop only */}
              {!mobile && !maximized && (
                <div style={{
                  position: "absolute", bottom: 4, right: 4, zIndex: 25,
                  display: "grid", gridTemplateColumns: "repeat(3,4px)", gap: 2,
                  opacity: 0.3, pointerEvents: "none"
                }}>
                  {[...Array(9)].map((_, i) => i > 2 && (
                    <span key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#004488" }} />
                  ))}
                </div>
              )}

              {/* Mobile drag pill */}
              {mobile && (
                <div style={{
                  flexShrink: 0,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  padding: "10px 0 4px",
                  background: "rgba(240,246,255,0.95)",
                }}>
                  <div style={{
                    width: 40, height: 4, borderRadius: 4,
                    background: "rgba(0,68,136,0.2)"
                  }} />
                </div>
              )}

              {/* Header */}
              <div
                onPointerDown={!mobile ? startDrag : undefined}
                style={{
                  flexShrink: 0,
                  padding: mobile ? "10px 16px 12px" : "13px 16px",
                  background: "linear-gradient(135deg,#004488 0%,#1a6abf 100%)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  position: "relative", overflow: "hidden",
                  cursor: mobile || maximized ? "default" : "grab",
                  userSelect: "none",
                }}
              >
                <div style={{ position:"absolute",top:-20,right:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none" }} />
                <div style={{ position:"absolute",bottom:-30,left:80,width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none" }} />

                {/* Avatar + title */}
                <div style={{ display:"flex",alignItems:"center",gap:10,zIndex:1 }}>
                  <div style={{
                    width:36,height:36,borderRadius:"50%",
                    background:"rgba(255,255,255,0.18)",backdropFilter:"blur(8px)",
                    border:"1.5px solid rgba(255,255,255,0.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"
                  }}>
                    <BotIcon size={18} />
                  </div>
                  <div>
                    <div style={{color:"#fff",fontWeight:600,fontSize:14,letterSpacing:0.2}}>Bishop's Assistant</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:1}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"#60cfff",boxShadow:"0 0 6px #60cfff",display:"inline-block"}} />
                      <span style={{color:"rgba(255,255,255,0.75)",fontSize:11.5}}>Online </span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display:"flex",alignItems:"center",gap:6,zIndex:1 }}
                  onPointerDown={e => e.stopPropagation()}>
                  {/* Desktop: size readout + maximize */}
                  {!mobile && (
                    <>
                      
                      <button className="hb" onClick={toggleMax} title={maximized ? "Restore" : "Maximize"} style={{
                        background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",
                        borderRadius:8,padding:"5px 7px",cursor:"pointer",color:"#fff",
                        display:"flex",alignItems:"center",transition:"background 0.2s"
                      }}>
                        {maximized ? <RestoreIcon /> : <MaximizeIcon />}
                      </button>
                      <button className="hb" onClick={() => setIsOpen(false)} title="Minimize" style={{
                        background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",
                        borderRadius:8,padding:"5px 7px",cursor:"pointer",color:"#fff",
                        display:"flex",alignItems:"center",transition:"background 0.2s"
                      }}>
                        <MinimizeIcon />
                      </button>
                    </>
                  )}
                  {/* Both: close button */}
                  <button
                    className="hb hbc"
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    style={{
                      background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",
                      borderRadius:8,
                      padding: mobile ? "7px 9px" : "5px 7px",
                      cursor:"pointer",color:"#fff",
                      display:"flex",alignItems:"center",transition:"background 0.2s"
                    }}
                  >
                    {mobile ? <ChevronDownIcon /> : <CloseIcon />}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{
                flex:1, overflowY:"auto",
                padding:"16px 14px 8px",
                display:"flex", flexDirection:"column", minHeight:0,
                /* On mobile, ensure this area scrolls and doesn't get squished by keyboard */
                WebkitOverflowScrolling: "touch",
              }}>
                <AnimatePresence initial={false}>
                  {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}
                    style={{display:"flex",justifyContent:"flex-start",marginBottom:6}}>
                    <div style={{
                      width:28,height:28,borderRadius:"50%",flexShrink:0,marginRight:8,marginTop:2,
                      background:"linear-gradient(135deg,#004488,#1a6abf)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 2px 8px rgba(0,68,136,0.25)",color:"#fff"
                    }}>
                      <BotIcon size={14} />
                    </div>
                    <div style={{
                      background:"rgba(255,255,255,0.75)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
                      border:"1px solid rgba(0,68,136,0.12)",borderRadius:"18px 18px 18px 4px",
                      boxShadow:"0 2px 12px rgba(0,0,0,0.06)"
                    }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEnd} />
              </div>

              {/* Quick Actions */}
              <div style={{
                flexShrink:0, padding: mobile ? "8px 12px" : "8px 14px",
                borderTop:"1px solid rgba(0,68,136,0.08)",
                display:"flex", flexWrap:"wrap", gap:6,
                background:"rgba(255,255,255,0.4)",
                overflowX: mobile ? "auto" : "visible",
                flexWrap: mobile ? "nowrap" : "wrap",
                /* Hide scrollbar on mobile quick actions */
                scrollbarWidth: "none",
              }}>
                {quickActions.map((q,i) => (
                  <motion.button key={i} className="qc"
                    onClick={() => sendMessage(q)} disabled={isTyping} whileTap={{scale:0.96}}
                    style={{
                      fontSize: mobile ? 12 : 11.5,
                      padding: mobile ? "7px 13px" : "5px 11px",
                      borderRadius:20,
                      border:"1px solid rgba(0,68,136,0.18)",background:"rgba(255,255,255,0.6)",
                      color:"#004488",cursor:isTyping?"not-allowed":"pointer",
                      fontWeight:500,letterSpacing:0.1,backdropFilter:"blur(8px)",
                      transition:"all 0.2s",opacity:isTyping?0.5:1,
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      /* Bigger tap targets on mobile */
                      minHeight: mobile ? 36 : "auto",
                    }}
                  >{q}</motion.button>
                ))}
              </div>

              {/* Input bar */}
              <div style={{
                flexShrink:0,
                padding: mobile ? "10px 12px 20px" : "10px 12px 12px",
                background:"rgba(255,255,255,0.5)",
                backdropFilter:"blur(8px)",
                /* Extra bottom padding on mobile for home indicator */
                paddingBottom: mobile ? "max(20px, env(safe-area-inset-bottom, 20px))" : 12,
              }}>
                <div className="cb-input-row" style={{display:"flex",gap:8,alignItems:"center"}}>
                  <input
                    ref={inputRef}
                    className="ci"
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && canSend) { e.preventDefault(); sendMessage(input.trim()); } }}
                    placeholder="Type your message…"
                    disabled={isTyping}
                    autoComplete="off"
                    autoCorrect="on"
                    autoCapitalize="sentences"
                    style={{
                      flex:1,
                      padding: mobile ? "12px 16px" : "10px 14px",
                      borderRadius:12,
                      border:"1px solid rgba(0,68,136,0.18)",
                      background:"rgba(255,255,255,0.8)",
                      backdropFilter:"blur(8px)",
                      fontSize: mobile ? 16 : 13.5, /* 16px prevents iOS auto-zoom */
                      color:"#1a2e31",
                      transition:"all 0.2s",
                      fontFamily:"inherit",
                    }}
                  />
                  <motion.button
                    onClick={() => { if (canSend) sendMessage(input.trim()); }}
                    className="sb"
                    disabled={!canSend}
                    whileTap={canSend?{scale:0.92}:{}}
                    style={{
                      width: mobile ? 46 : 40,
                      height: mobile ? 46 : 40,
                      flexShrink:0,borderRadius:12,border:"none",
                      background:"linear-gradient(135deg,#1a6abf,#004488)",color:"#fff",
                      cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 3px 12px rgba(0,68,136,0.3)",transition:"all 0.2s"
                    }}
                  ><SendIcon /></motion.button>
                </div>
                {!mobile && (
                  <div style={{textAlign:"center",marginTop:8,fontSize:10.5,color:"rgba(0,68,136,0.35)",letterSpacing:0.2}}>
                    <a href="https://algoflowai.com/" target="_blank" rel="noreferrer" style={{ color: "rgba(0,68,136,0.65)", textDecoration: "underline", cursor: "pointer" }}>
                      Powered by AlgoFlow AI
                    </a>
                    <span> · Press Enter to send</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FAB ─────────────────────────────────────────────── */}
        <motion.button
          className="cb-fab"
          onClick={() => setIsOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            position: "absolute",
            /* Desktop: follow window; Mobile: fixed bottom-right */
            ...(mobile ? {
              right: 16,
              bottom: 16,
            } : {
              left: isOpen ? pos.x + size.w - 56 : "auto",
              right: isOpen ? "auto" : 24,
              top: isOpen ? pos.y + size.h + 14 : "auto",
              bottom: isOpen ? "auto" : 24,
            }),
            /* On mobile, hide FAB while chat is open (sheet covers it) */
            opacity: mobile && isOpen ? 0 : 1,
            pointerEvents: mobile && isOpen ? "none" : "all",
            width: 56, height: 56, borderRadius: "50%", border: "none",
            background: isOpen
              ? "linear-gradient(135deg,#003370,#004488)"
              : "linear-gradient(135deg,#1a6abf,#004488)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 24px rgba(0,68,136,0.4)",
            animation: pulse && !isOpen ? "fabPulse 1.2s ease-in-out" : "none",
            transition: "background 0.3s, opacity 0.2s",
          }}
        >
          {!isOpen && (
            <span style={{
              position:"absolute",inset:0,borderRadius:"50%",
              border:"2px solid rgba(0,68,136,0.5)",
              animation:"ping 2s ease-out infinite",pointerEvents:"none"
            }} />
          )}
          <AnimatePresence>
            {unread > 0 && !isOpen && (
              <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                style={{
                  position:"absolute",top:-2,right:-2,
                  background:"#e63946",color:"#fff",
                  fontSize:10,fontWeight:700,width:18,height:18,borderRadius:"50%",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  border:"2px solid #fff",boxShadow:"0 2px 6px rgba(230,57,70,0.5)"
                }}>{unread}</motion.span>
            )}
          </AnimatePresence>
          <motion.div animate={{rotate:isOpen?180:0}} transition={{type:"spring",stiffness:300,damping:22}}>
            {isOpen ? <CloseIcon /> : <BotIcon size={20} />}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}