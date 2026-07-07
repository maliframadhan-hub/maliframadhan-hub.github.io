import React, { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────
// LOADING SCREEN CINEMATIC
// ─────────────────────────────────────────────
function LoadingScreen({ onFinish }) {
  const [pct, setPct]       = useState(0);
  const [status, setStatus] = useState("Initializing...");
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const steps = [
      [15, "Loading assets..."],
      [35, "Building UI..."],
      [58, "Fetching data..."],
      [78, "Almost ready..."],
      [95, "Finalizing..."],
      [100, "Done!"],
    ];
    let i = 0;
    const run = () => {
      if (i >= steps.length) return;
      const [p, s] = steps[i++];
      setPct(p);
      setStatus(s);
      if (i < steps.length) setTimeout(run, i === 1 ? 400 : 350);
      else setTimeout(() => { setHiding(true); setTimeout(onFinish, 800); }, 600);
    };
    const t = setTimeout(run, 800);
    return () => clearTimeout(t);
  }, [onFinish]);

  const corners = [
    { top: 20,    left: 20,    borderWidth: "2px 0 0 2px" },
    { top: 20,    right: 20,   borderWidth: "2px 2px 0 0" },
    { bottom: 20, left: 20,    borderWidth: "0 0 2px 2px" },
    { bottom: 20, right: 20,   borderWidth: "0 2px 2px 0" },
  ];

  const tags = [
    ["Laravel",    "rgba(37,99,235,0.15)",   "#60a5fa", "rgba(37,99,235,0.25)"],
    ["React",      "rgba(34,197,94,0.12)",   "#4ade80", "rgba(34,197,94,0.2)"],
    ["MySQL",      "rgba(37,99,235,0.15)",   "#60a5fa", "rgba(37,99,235,0.25)"],
    ["IT Student", "rgba(255,255,255,0.05)", "#64748b", "rgba(255,255,255,0.08)"],
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000", zIndex: 99999,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
      opacity: hiding ? 0 : 1,
      visibility: hiding ? "hidden" : "visible",
      transition: "opacity 0.8s ease, visibility 0.8s ease",
      overflow: "hidden",
      padding: "16px",
    }}>
      <style>{`
        @keyframes loaderScanH {
          0%   { opacity:0; transform:scaleX(0); }
          30%  { opacity:1; transform:scaleX(1); }
          70%  { opacity:1; transform:scaleX(1); }
          100% { opacity:0; transform:scaleX(0); }
        }
        @keyframes loaderCorner { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes loaderSpin   { to{transform:rotate(360deg)} }
        @keyframes loaderFadeUp {
          from{opacity:0;transform:translateY(12px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes loaderPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.4)}
          50%{box-shadow:0 0 0 12px rgba(37,99,235,0)}
        }
      `}</style>

      {/* Scan lines */}
      {[20, 50, 80].map((top, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0, top: `${top}%`, height: "1px",
          background: "linear-gradient(90deg,transparent 0%,rgba(37,99,235,0.35) 50%,transparent 100%)",
          animation: `loaderScanH 4s ease-in-out ${i * 1.2}s infinite`,
        }} />
      ))}

      {/* Corner brackets */}
      {corners.map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: 28, height: 28,
          borderColor: "rgba(37,99,235,0.55)", borderStyle: "solid",
          borderWidth: c.borderWidth, ...c,
          animation: "loaderCorner 2s ease-in-out infinite",
        }} />
      ))}

      {/* Dot grid subtle */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(37,99,235,0.06) 1px,transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "100%", maxWidth: 320 }}>

        {/* Logo ring */}
        <div style={{ position: "relative", width: 88, height: 88, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
          <svg
            style={{ position: "absolute", inset: 0, animation: "loaderSpin 2.5s linear infinite" }}
            viewBox="0 0 88 88" fill="none" width="88" height="88"
          >
            <circle cx="44" cy="44" r="40" stroke="rgba(37,99,235,0.12)" strokeWidth="1.5"/>
            <path d="M44 4 A40 40 0 0 1 84 44" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="44" cy="4" r="3" fill="#2563eb"/>
          </svg>
          <div style={{
            width: 60, height: 60,
            background: "rgba(37,99,235,0.08)",
            border: "1.5px solid rgba(37,99,235,0.4)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "monospace", fontSize: 22, fontWeight: 800, color: "#3b82f6",
            animation: "loaderPulse 2s ease-in-out infinite",
          }}>A</div>
        </div>

        {/* Name */}
        <div style={{ textAlign: "center", marginBottom: 28, animation: "loaderFadeUp 0.6s ease 0.4s both" }}>
          <h1 style={{ fontSize: "clamp(19px, 5vw, 24px)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.5px", margin: "0 0 6px 0", lineHeight: 1.1 }}>
            M. Alif Ramadhan
          </h1>
          <p style={{ fontSize: 11, color: "#475569", fontFamily: "monospace", letterSpacing: "2.5px", textTransform: "uppercase", margin: 0 }}>
            Portfolio · v2.1.0
          </p>
        </div>

        {/* Progress */}
        <div style={{ width: "100%", maxWidth: 220, animation: "loaderFadeUp 0.5s ease 0.9s both", marginBottom: 24 }}>
          <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg,#1d4ed8,#60a5fa)",
              borderRadius: 999, width: `${pct}%`,
              transition: "width 0.15s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", color: "#475569" }}>
            <span>{status}</span>
            <span>{pct}%</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", animation: "loaderFadeUp 0.5s ease 1.1s both" }}>
          {tags.map(([label, bg, color, border]) => (
            <span key={label} style={{
              fontSize: 10, fontWeight: 700, padding: "3px 10px",
              borderRadius: 6, fontFamily: "monospace", letterSpacing: "0.5px",
              background: bg, color, border: `1px solid ${border}`,
            }}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
function useTypingAnimation(texts, typeSpeed = 90, deleteSpeed = 40, pauseAfterType = 1800, pauseAfterDelete = 400) {
  const [displayText, setDisplayText] = useState("");
  const stateRef = useRef({ textIndex: 0, charIndex: 0, isDeleting: false, texts, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete });
  const timerRef = useRef(null);
  useEffect(() => { stateRef.current.texts = texts; }, [texts]);
  useEffect(() => {
    function tick() {
      const s = stateRef.current;
      const current = s.texts[s.textIndex];
      if (!s.isDeleting) {
        if (s.charIndex < current.length) { s.charIndex++; setDisplayText(current.slice(0, s.charIndex)); timerRef.current = setTimeout(tick, s.typeSpeed); }
        else { s.isDeleting = true; timerRef.current = setTimeout(tick, s.pauseAfterType); }
      } else {
        if (s.charIndex > 0) { s.charIndex--; setDisplayText(current.slice(0, s.charIndex)); timerRef.current = setTimeout(tick, s.deleteSpeed); }
        else { s.isDeleting = false; s.textIndex = (s.textIndex + 1) % s.texts.length; timerRef.current = setTimeout(tick, s.pauseAfterDelete); }
      }
    }
    timerRef.current = setTimeout(tick, 600);
    return () => clearTimeout(timerRef.current);
  }, []);
  return displayText;
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("scroll-visible");
        });
      },
      { threshold: 0.05 }
    );
    const elements = document.querySelectorAll(".scroll-animate, .scroll-animate-left, .scroll-animate-right");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// LIVE CLOCK
// ─────────────────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"16px", fontSize:"13px", color:"#64748b", fontFamily:"monospace", fontWeight:"500", flexWrap:"wrap" }}>
      <span style={{ display:"flex", alignItems:"center", gap:"5px" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {pad(now.getHours())}.{pad(now.getMinutes())}.{pad(now.getSeconds())}
      </span>
      <span style={{ display:"flex", alignItems:"center", gap:"5px" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {pad(now.getDate())}/{pad(now.getMonth()+1)}/{now.getFullYear()}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// WARNING MODAL
// ─────────────────────────────────────────────
function WarningModal({ reason, onClose }) {
  const reasonLabels = {
    rightclick:  "Klik kanan terdeteksi.",
    screenshot:  "Percobaan screenshot terdeteksi.",
    copy:        "Percobaan menyalin konten terdeteksi.",
    devtools:    "Developer Tools terdeteksi.",
    keyboard:    "Kombinasi tombol berbahaya terdeteksi.",
  };
  return (
    <div style={{ position:"fixed", inset:0, zIndex:99999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", backgroundColor:"rgba(0,0,0,0.82)", backdropFilter:"blur(8px)" }}>
      <div style={{ width:"100%", maxWidth:"420px", maxHeight:"90vh", overflowY:"auto", backgroundColor:"#12121f", border:"1.5px solid rgba(220,38,38,0.45)", borderRadius:"20px", padding:"32px 24px 24px", textAlign:"center", boxShadow:"0 32px 80px rgba(0,0,0,0.7)", animation:"modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div style={{ width:"64px", height:"64px", borderRadius:"50%", backgroundColor:"rgba(220,38,38,0.12)", border:"1.5px solid rgba(220,38,38,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px auto" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 style={{ margin:"0 0 6px 0", fontSize:"20px", fontWeight:"800", color:"#f8fafc" }}>Akses Ditolak</h2>
        <p style={{ margin:"0 0 14px 0", fontSize:"12px", fontWeight:"700", color:"#ef4444", fontFamily:"monospace", textTransform:"uppercase" }}>⚠ {reasonLabels[reason] || "Tindakan tidak diizinkan terdeteksi."}</p>
        <p style={{ margin:"0 0 20px 0", fontSize:"13px", color:"#94a3b8", lineHeight:"1.7" }}>Tindakan Anda merekayasa, memodifikasi, atau mengakses sistem tanpa hak merupakan pelanggaran hukum sesuai dengan <span style={{ color:"#ef4444", fontWeight:"700" }}>UU ITE Pasal 30 ayat (1), (2), dan (3).</span></p>
        <div style={{ backgroundColor:"rgba(220,38,38,0.08)", border:"1px solid rgba(220,38,38,0.25)", borderRadius:"10px", padding:"12px 14px", marginBottom:"22px" }}>
          <p style={{ margin:0, fontSize:"12px", color:"#f87171", fontFamily:"monospace", lineHeight:"1.6" }}>Setiap aktivitas dicatat demi keamanan sistem.</p>
        </div>
        <button onClick={onClose}
          style={{ width:"100%", padding:"14px", backgroundColor:"#dc2626", border:"none", borderRadius:"12px", color:"#fff", fontSize:"15px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor="#b91c1c"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor="#dc2626"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECURITY MODAL
// ─────────────────────────────────────────────
function SecurityModal({ onClose }) {
  const items = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>, title:"Protected by Cloudflare CDN", desc:"Global Edge Caching & WAF Active", color:"#38bdf8" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:"XSS Protection Active (CSP)", desc:"Content Security Policy Implemented", color:"#22c55e" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title:"HSTS (Strict Transport Security)", desc:"Force HTTPS Connection Active", color:"#22c55e" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>, title:"Input Sanitization Enforced", desc:"Mencegah Injeksi Kode Berbahaya (XSS/SQLi)", color:"#22c55e" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title:"DDoS Rate Limiting", desc:"Mencegah Kelebihan Beban Lalu Lintas", color:"#f59e0b" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title:"Vercel Deployment Integrity", desc:"Serverless Functions Isolated & Monitored", color:"#818cf8" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:99998, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backgroundColor:"rgba(0,0,0,0.75)", backdropFilter:"blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width:"100%", maxWidth:"460px", maxHeight:"88vh", overflowY:"auto", backgroundColor:"#1a2035", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"20px", overflow:"hidden", boxShadow:"0 40px 80px rgba(0,0,0,0.6)", animation:"modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div style={{ padding:"22px 20px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", minWidth:0 }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"12px", backgroundColor:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div style={{ minWidth:0 }}>
              <h3 style={{ margin:0, fontSize:"16px", fontWeight:"800", color:"#22c55e" }}>Security & Compliance Report</h3>
              <p style={{ margin:"4px 0 0 0", fontSize:"11px", color:"#94a3b8", lineHeight:"1.5" }}>Aplikasi ini dirancang dengan standar keamanan modern.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#64748b", padding:"4px", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
            onMouseEnter={e => e.currentTarget.style.color="#f8fafc"}
            onMouseLeave={e => e.currentTarget.style.color="#64748b"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ padding:"14px", display:"flex", flexDirection:"column", gap:"8px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px", backgroundColor:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"12px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"10px", backgroundColor:`${item.color}18`, border:`1px solid ${item.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{item.icon}</div>
              <div style={{ minWidth:0 }}>
                <p style={{ margin:0, fontSize:"13px", fontWeight:"700", color:"#f1f5f9" }}>{item.title}</p>
                <p style={{ margin:"2px 0 0 0", fontSize:"11px", color:"#64748b" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 18px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"6px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <span style={{ width:"8px", height:"8px", backgroundColor:"#22c55e", borderRadius:"50%", display:"inline-block" }}/>
            <span style={{ fontSize:"12px", color:"#22c55e", fontWeight:"600" }}>All systems operational</span>
          </div>
          <span style={{ fontSize:"11px", color:"#475569", fontFamily:"monospace" }}>v2.1.0 · 2026</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({ proj, theme, darkMode, isMobile, isTablet }) {
  const [hovered, setHovered]   = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasThumbnail = proj.img && !imgError;
  const hasLink      = proj.link && proj.link !== "#";
  const isWebsite    = proj.type === "website";

  const thumbHeight = isMobile ? "200px" : isTablet ? "190px" : "185px";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${hovered ? "#2563eb" : theme.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(37,99,235,0.14)" : "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        cursor: hasLink ? "pointer" : "default",
        height: "100%",
      }}
      onClick={() => hasLink && window.open(proj.link, "_blank")}
    >
      <div style={{ height:"3px", background: hovered ? "linear-gradient(90deg,#2563eb,#60a5fa)" : "transparent", transition:"background 0.3s ease" }} />

      <div style={{
        width: "100%",
        height: thumbHeight,
        backgroundColor: darkMode ? "#0d1526" : "#e8edf5",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}>
        {hasThumbnail ? (
          <img
            src={proj.img}
            alt={proj.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
            background: darkMode
              ? "linear-gradient(135deg,#1e2a45,#0f1729)"
              : "linear-gradient(135deg,#dde6f5,#eef2f8)",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={darkMode?"#4f6090":"#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span style={{ fontSize:"12px", color: darkMode?"#4f6090":"#94a3b8", fontWeight:"600" }}>Preview Unavailable</span>
          </div>
        )}
        <span style={{
          position:"absolute", top:"10px", left:"10px",
          fontSize:"10px", fontWeight:"700", padding:"3px 9px", borderRadius:"6px",
          backdropFilter:"blur(4px)",
          backgroundColor: isWebsite ? "rgba(37,99,235,0.85)" : "rgba(139,92,246,0.85)",
          color: "#fff",
        }}>
          {isWebsite ? "🌐 Website" : "⚙️ Project"}
        </span>
      </div>

      <div style={{ padding:"18px 20px 20px", display:"flex", flexDirection:"column", flex:1, gap:"8px" }}>
        <h4 style={{ margin:0, fontSize:"15px", fontWeight:"700", color:theme.text, lineHeight:"1.4" }}>{proj.title}</h4>
        <p style={{ margin:0, fontSize:"13px", color:theme.subText, lineHeight:"1.6", flex:1 }}>{proj.desc}</p>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"6px" }}>
          {proj.tech.map((t, j) => (
            <span key={j} style={{ fontSize:"11px", color:"#2563eb", padding:"3px 9px", backgroundColor: darkMode?"rgba(37,99,235,0.15)":"#dbeafe", borderRadius:"6px", fontWeight:"600" }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop:"14px" }}>
          {hasLink ? (
            <div
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"10px 0", backgroundColor: isWebsite?"#2563eb":"#7c3aed", color:"#fff", borderRadius:"10px", fontSize:"13px", fontWeight:"700", transition:"background-color 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = isWebsite?"#1d4ed8":"#6d28d9"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = isWebsite?"#2563eb":"#7c3aed"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isWebsite
                  ? <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>
                  : <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>
                }
              </svg>
              {isWebsite ? "View Website" : "View Project"}
            </div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"10px 0", backgroundColor: darkMode?"rgba(255,255,255,0.05)":"#f1f5f9", color:theme.subText, borderRadius:"10px", fontSize:"13px", fontWeight:"600", border:`1px dashed ${theme.border}` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Belum Dipublikasi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CERT CARD
// ─────────────────────────────────────────────
function CertCard({ cert, theme, darkMode, isMobile, isTablet }) {
  const [hovered, setHovered]   = useState(false);
  const [imgError, setImgError] = useState(false);

  const categoryColors = {
    "Backend":     { bg: darkMode?"rgba(37,99,235,0.15)":"#dbeafe",   text:"#2563eb" },
    "Database":    { bg: darkMode?"rgba(16,185,129,0.15)":"#d1fae5",  text:"#059669" },
    "Frontend":    { bg: darkMode?"rgba(139,92,246,0.15)":"#ede9fe",  text:"#7c3aed" },
    "Cloud":       { bg: darkMode?"rgba(245,158,11,0.15)":"#fef3c7",  text:"#d97706" },
    "Security":    { bg: darkMode?"rgba(239,68,68,0.15)":"#fee2e2",   text:"#dc2626" },
    "General":     { bg: darkMode?"rgba(99,102,241,0.12)":"#e0e7ff",  text:"#4f46e5" },
    "Competition": { bg: darkMode?"rgba(234,179,8,0.15)":"#fef9c3",   text:"#ca8a04" },
    "Event":       { bg: darkMode?"rgba(20,184,166,0.15)":"#ccfbf1",  text:"#0d9488" },
  };
  const cat          = categoryColors[cert.category] || categoryColors["General"];
  const hasThumbnail = cert.img && !imgError;
  const hasLink      = cert.link && cert.link !== "#";

  const thumbHeight = isMobile ? "180px" : isTablet ? "190px" : "165px";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${hovered ? "#2563eb" : theme.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(37,99,235,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        height: "100%",
      }}
    >
      <div style={{ height:"3px", background: hovered ? "linear-gradient(90deg,#2563eb,#60a5fa)" : "transparent", transition:"background 0.3s ease" }} />
      <div style={{ width:"100%", height: thumbHeight, backgroundColor: darkMode?"#0d1526":"#e8edf5", overflow:"hidden", position:"relative", flexShrink:0 }}>
        {hasThumbnail ? (
          <img src={cert.img} alt={cert.title} onError={() => setImgError(true)}
            style={{
              width:"100%", height:"100%",
              objectFit:"cover",
              objectPosition:"top center",
              display:"block",
            }} />
        ) : (
          <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"8px", background: darkMode?"linear-gradient(135deg,#1e2a45,#0f1729)":"linear-gradient(135deg,#dde6f5,#eef2f8)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={darkMode?"#4f6090":"#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span style={{ fontSize:"11px", color: darkMode?"#4f6090":"#94a3b8", fontWeight:"600" }}>Certificate</span>
          </div>
        )}
        <span style={{ position:"absolute", top:"10px", right:"10px", fontSize:"10px", fontWeight:"700", padding:"3px 9px", backgroundColor: darkMode?"rgba(0,0,0,0.65)":cat.bg, color: darkMode?"#e2e8f0":cat.text, borderRadius:"6px", backdropFilter:"blur(4px)", border:`1px solid ${darkMode?"rgba(255,255,255,0.1)":cat.bg}` }}>
          {cert.category}
        </span>
      </div>
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1, gap:"6px" }}>
        <h4 style={{ margin:0, fontSize:"14px", fontWeight:"700", color:theme.text, lineHeight:"1.4", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{cert.title}</h4>
        <p style={{ margin:0, fontSize:"12px", color:"#2563eb", fontWeight:"600", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{cert.issuer}</p>
        <p style={{ margin:"2px 0 0 0", fontSize:"11px", color:theme.subText, fontFamily:"monospace" }}>{cert.date}</p>
        <div style={{ marginTop:"12px" }}>
          {hasLink ? (
            <a href={cert.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"9px 0", backgroundColor:"#2563eb", color:"#fff", borderRadius:"10px", fontSize:"13px", fontWeight:"700", textDecoration:"none", transition:"background-color 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor="#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor="#2563eb"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Certificate
            </a>
          ) : (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"9px 0", backgroundColor: darkMode?"rgba(255,255,255,0.05)":"#f1f5f9", color:theme.subText, borderRadius:"10px", fontSize:"13px", fontWeight:"600" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Private
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} aria-label="Kembali ke atas"
      style={{ position:"fixed", bottom:"20px", right:"20px", width:"44px", height:"44px", borderRadius:"50%", background:"#2563eb", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:998, boxShadow:"0 4px 18px rgba(37,99,235,0.5)", transition:"opacity 0.3s ease, transform 0.3s ease", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(16px)", pointerEvents:visible?"auto":"none" }}
      onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; e.currentTarget.style.transform="scale(1.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.transform="scale(1)"; }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
function App() {
  const [appLoaded, setAppLoaded]         = useState(false);
  const handleLoadFinish                  = useCallback(() => setAppLoaded(true), []);

  const [warning, setWarning]             = useState({ show:false, reason:"" });
  const [securityModal, setSecurityModal] = useState(false);
  const [darkMode, setDarkMode]           = useState(true);
  const [activeTab, setActiveTab]         = useState("backend");
  const [hoveredOrg, setHoveredOrg]       = useState(null);
  const [photoHovered, setPhotoHovered]   = useState(false);
  const [photoMousePos, setPhotoMousePos] = useState({ x:0, y:0 });
  const [menuOpen, setMenuOpen]           = useState(false);
  const [brandingCursor, setBrandingCursor] = useState(true);
  const [certFilter, setCertFilter]       = useState("Semua");
  const menuRef     = useRef(null);
  const devtoolsRef = useRef(false);
  const windowWidth = useWindowWidth();

  useScrollAnimation();

  // ── Breakpoints tuned for real devices:
  // < 480: small phones (Android/iOS) · 480-767: large phones/phablets
  // 768-1023: tablets (iPad/Android tab) · 1024+: desktop
  const isSmallPhone     = windowWidth < 480;
  const isMobile         = windowWidth < 768;
  const isTablet         = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop        = windowWidth >= 1024;
  const isMobileOrTablet = windowWidth < 1024;

  const triggerWarning = (reason) => setWarning({ show:true, reason });

  useEffect(() => {
    const GRACE = 3000;
    let ready = false;
    const gracePeriod = setTimeout(() => { ready = true; }, GRACE);
    const onContextMenu = (e) => { if (!ready) return; e.preventDefault(); triggerWarning("rightclick"); };
    const onKeyDown = (e) => {
      if (!ready) return;
      const key = e.key?.toLowerCase(); const ctrl = e.ctrlKey || e.metaKey;
      if (key === "printscreen") { e.preventDefault(); triggerWarning("screenshot"); return; }
      if (key === "f12") { e.preventDefault(); triggerWarning("devtools"); return; }
      if (ctrl && e.shiftKey && ["i","j","c"].includes(key)) { e.preventDefault(); triggerWarning("devtools"); return; }
      if (ctrl && key === "u") { e.preventDefault(); triggerWarning("devtools"); return; }
      if (ctrl && ["c","a","s","p"].includes(key)) { e.preventDefault(); triggerWarning("copy"); return; }
    };
    const onDragStart = (e) => { if (!ready) return; e.preventDefault(); triggerWarning("copy"); };
    const detectDevTools = () => {
      if (!ready) return;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if ((widthDiff > 160 || heightDiff > 160) && !devtoolsRef.current) { devtoolsRef.current = true; triggerWarning("devtools"); }
      else if (widthDiff <= 160 && heightDiff <= 160) { devtoolsRef.current = false; }
    };
    const devtoolsTimeout = setTimeout(() => {
      devtoolsRef._interval = setInterval(detectDevTools, 1500);
    }, GRACE + 500);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      clearTimeout(gracePeriod);
      clearTimeout(devtoolsTimeout);
      clearInterval(devtoolsRef._interval);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  useEffect(() => {
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    return () => { document.body.style.userSelect = ""; document.body.style.webkitUserSelect = ""; };
  }, []);

  const typedText     = useTypingAnimation(["IT Student & Developer","Laravel Enthusiast","Database Architect","Open Source Contributor"], 85, 45, 2000, 400);
  const heroTypedText = useTypingAnimation(["IT Student & Developer","Laravel Enthusiast","Database Architect","Open Source Contributor"], 85, 45, 2000, 400);

  useEffect(() => { const interval = setInterval(() => setBrandingCursor(v => !v), 530); return () => clearInterval(interval); }, []);
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [mousePos, setMousePos] = useState({ x:0, y:0 });
  useEffect(() => {
    if (isMobileOrTablet) return; // parallax off for touch devices
    const handler = (e) => setMousePos({ x:(e.clientX - window.innerWidth/2)*0.03, y:(e.clientY - window.innerHeight/2)*0.03 });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobileOrTablet]);

  const handlePhotoMouseMove = (e) => {
    if (isMobileOrTablet) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPhotoMousePos({ x:((e.clientX-rect.left)/rect.width-0.5)*20, y:((e.clientY-rect.top)/rect.height-0.5)*20 });
  };

  const theme = {
    bg:         darkMode?"#0f172a":"#f0f4f8",
    cardBg:     darkMode?"#1e293b":"#ffffff",
    cardBg2:    darkMode?"#1a2744":"#e8eef6",
    text:       darkMode?"#f8fafc":"#1e293b",
    subText:    darkMode?"#94a3b8":"#475569",
    border:     darkMode?"rgba(255,255,255,0.08)":"#c8d5e8",
    navBg:      darkMode?"rgba(30,41,59,0.85)":"rgba(248,251,255,0.92)",
    techCard:   darkMode?"#111827":"#f8fafc",
    gridColor:  darkMode?"rgba(255,255,255,0.04)":"rgba(15,23,42,0.05)",
    badgeBg:    darkMode?"rgba(99,102,241,0.12)":"#e0e7ff",
    badgeText:  darkMode?"#a5b4fc":"#4f46e5",
    sectionAlt: darkMode?"#1a2744":"#dce6f2",
    techBg:     darkMode?"#1a2335":"#2d3348",
  };

  const organisasiData = [
    { jabatan:"Ketua IT OSIM", tahun:"(2023 - 2024)", instansi:"MAN 1 Medan", deskripsi:"Memimpin divisi IT dalam organisasi OSIM MAN 1 Medan, mengelola infrastruktur teknologi sekolah, serta mengkoordinasikan program berbasis digital.", img:"/it_osim.jpeg" },
    { jabatan:"Ketua Pandu Digital", tahun:"(2023 - 2024)", instansi:"MAN 1 Medan", deskripsi:"Memimpin organisasi Pandu Digital MAN 1 Medan, mengkoordinasikan program literasi digital untuk siswa dan pengembangan kompetensi digital anggota.", img:"/ketum_pandig.jpeg" },
    { jabatan:"Anggota UKM EPS", tahun:"(2025 - 2026)", instansi:"Politeknik Negeri Medan", deskripsi:"Aktif dalam Unit Kegiatan Mahasiswa English Public Speaking (EPS) Politeknik Negeri Medan, pengembangan kemampuan komunikasi profesional bahasa Inggris.", img:"/logo-eps.jpg" },
    { jabatan:"Staff Inti Teknis", tahun:"(2026)", instansi:"Developer Student Community", deskripsi:"Berpartisipasi aktif dalam merancang arsitektur database untuk aplikasi open-source skala komunitas mahasiswa.", img:"/tekdevdent_com.jpeg" },
  ];

  const techStack = {
    backend:  [
      { name:"Laravel Core (PHP)", level:"Expert",       color:"#3b82f6" },
      { name:"Eloquent ORM & SQL", level:"Advanced",     color:"#2563eb" },
      { name:"RESTful API / Sanctum", level:"Advanced",  color:"#60a5fa" },
      { name:"FastAPI / Node.js",  level:"Intermediate", color:"#1d4ed8" },
    ],
    frontend: [
      { name:"Inertia.js & React", level:"Advanced",  color:"#3b82f6" },
      { name:"Livewire & Blade",   level:"Expert",     color:"#2563eb" },
      { name:"Tailwind CSS",       level:"Expert",     color:"#60a5fa" },
      { name:"TypeScript",         level:"Advanced",   color:"#1d4ed8" },
    ],
  };

  const sertifikatData = [
    { title:"Ketua Umum Pandu Digital Man 1 Medan", issuer:"Pandu Digital MAN 1 Medan", date:"Juli 2024", category:"General", link:"sertif pandig_20250214_153816_0000.pdf", img:"pandig.jpeg" },
    { title:"Ketua IT OSIM Man 1 Medan", issuer:"Organisasi Siswa Intra Madrasah MAN 1 Medan", date:"Sept 2024", category:"General", link:"Sertifikat Ketua IT OSIM.pdf", img:"IT Osim.jpeg" },
    { title:"Jambore Nasional TIK", issuer:"Jaringan Sekolah Digital Indonesia", date:"Nov 2022", category:"Competition", link:"M. ALIF RAMADHAN (2) (1).pdf", img:"sertif lomba pandig.png" },
    { title:"Laravel Backend Development Fundamentals", issuer:"Dicoding Indonesia", date:"Jan 2024", category:"Backend", link:null, img:"laravel.png" },
    { title:"Workshop Capacity Building", issuer:"Pandu Digital MAN 1 Medan", date:"Feb 2023", category:"Event", link:"M. ALIF RAMADHAN.pdf", img:"Sertifikat Workshop Capacity Building.jpeg" },
    { title:"Build With AI 2026 (BWAI)", issuer:"Google Developer", date:"Mei 2026", category:"Cloud", link:null, img:"bwai.jpeg" },
    { title:"Makin Cakap Digital", issuer:"Dinas Pendidikan Prov. Sumatera Utara", date:"Sept 2022", category:"Event", link:"M. ALIF RAMADHAN (2).pdf", img:"Cakap digital.jpeg" },
    { title:"IDCamp 2025", issuer:"Dicoding Indonesia", date:"Des 2025", category:"Frontend", link:null, img:"idcamp.jpeg" },
    { title:"Seminar Nasional Pandu Digital", issuer:"Kementerian Komunikasi dan Informatika", date:"Nov 2022", category:"Event", link:"M. ALIF RAMADHAN 3.pdf", img:"Lokalkarya.jpeg" },
    { title:"Campus Expo MAN 1 Medan", issuer:"Campus Expo", date:"Jan 2024", category:"Event", link:"sertif.jpeg", img:"sertif.jpeg" },
  ];

  const certCategories = ["Semua", ...Array.from(new Set(sertifikatData.map(c => c.category)))];
  const filteredCerts  = certFilter === "Semua" ? sertifikatData : sertifikatData.filter(c => c.category === certFilter);
  const certStats = [
    { num: sertifikatData.length, label:"Total Sertifikat" },
    { num: "2022", label:"Tahun Mulai Aktif" },
    { num: "4+", label:"Tahun di Bidang IT" },
    { num: sertifikatData.filter(c=>["Backend","Database","Frontend"].includes(c.category)).length, label:"Sertifikat Teknis" },
  ];

  const projectsData = [
    { title:"Website OSIM MAN 1 Medan", desc:"Website resmi OSIM MAN 1 Medan yang menyajikan informasi terkini tentang siswa/siswi MAN 1 Medan.", tech:["HTML","CSS","Website"], type:"website", link:"https://osimman1medan.vercel.app/", img:"osim.png" },
    { title:"Sistem Monitoring Kelas", desc:"Aplikasi untuk memonitoring kehadiran dan aktivitas mahasiswa di dalam kelas secara real-time.", tech:["FastAPI","SQLServer","PHP"], type:"website", link:"https://sistemmonitoringkelas.page.gd/", img:"sistem.jpeg" },
    { title:"Proyek Penjualan", desc:"Sistem informasi untuk mengelola penjualan produk secara efisien dan efektif.", tech:["React Client","PHP","MySQL"], type:"website", link:"https://proyekpenjualan.infinityfreeapp.com/", img:"proyekpenjualan.jpeg" },
    { title:"Analisis Kelulusan Mahasiswa", desc:"Sistem untuk menganalisis data kelulusan mahasiswa berdasarkan berbagai faktor akademik.", tech:["Pandas","Matplotlib","Streamlit","Python"], type:"project", link:"https://9wowf62gvi4vvjyr2d23st.streamlit.app/", img:"streamlit.png" },
    { title:"Project Ucapan Ulang Tahun", desc:"Sistem web interaktif untuk menampilkan ucapan ulang tahun dengan animasi, gambar, dan musik secara personal.", tech:["HTML","CSS","JavaScript"], type:"project", link:"https://happy-birthday-nayla.vercel.app/", img:"webnayla.png" },
    { title:"RECYNT AI - Recycle Intelligent Waste Detection System", desc:"Aplikasi berbasis AI untuk mendeteksi jenis sampah, memberikan informasi daur ulang, serta membantu pengelolaan limbah secara cerdas dan ramah lingkungan.", tech:["HTML","CSS","JavaScript","Node.js","YoLov8","Python","FastAPI","MySQL"], type:"project", link:"https://recynt-ai.vercel.app/", img:"recyntai.png" },
  ];

  const navLinks = ["Profile","Organisasi","Skill","Projects","Sertifikat","Contact"];
  const navIcons = [
    <path key="p" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>,
    <><circle key="c" cx="12" cy="8" r="4"/><path key="p" d="M6 20v-2a6 6 0 0 1 12 0v2"/></>,
    <><rect key="r" x="2" y="3" width="20" height="14" rx="2"/><path key="p" d="M8 21h8M12 17v4"/></>,
    <path key="p" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>,
    <><rect key="r" x="2" y="5" width="20" height="14" rx="2"/><path key="p1" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/></>,
    <path key="p" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 14.9 19.79 19.79 0 0 1 1.08 6.18 2 2 0 0 1 3.05 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 19z"/>,
  ];

  const stackTechs = [
    { name:"Laravel", color:"#F55247", svg:<svg viewBox="0 0 50 52" width="40" height="40" fill="none"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302-.032.018v10.509a.8.8 0 0 1-.403.694L20.979 51.536a.61.61 0 0 1-.071.031.79.79 0 0 1-.247.05h-.02a.8.8 0 0 1-.31-.064.487.487 0 0 1-.056-.027L1.515 40.997a.8.8 0 0 1-.402-.694V18.98c0-.148.04-.294.117-.423.029-.049.064-.094.102-.135l.024-.025.041-.04.026-.02 9.298-5.35a.8.8 0 0 1 .8 0l9.296 5.35.027.022.04.04.026.024c.038.042.073.087.102.136a.8.8 0 0 1 .117.423v10.272l8.007-4.604V11.773c0-.148.04-.294.117-.423.029-.049.065-.094.102-.135l.026-.025.039-.04.027-.02 9.299-5.35a.8.8 0 0 1 .799 0l9.3 5.35.027.021.041.04.024.025c.039.042.074.086.103.135z" fill="#F55247"/></svg> },
    { name:"PHP",   color:"#6181b6", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#6181b6" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 10c29.8 0 54 24.2 54 54S93.8 118 64 118 10 93.8 10 64 34.2 10 64 10zm-26.9 47.6c2.9 0 5 .6 6.3 1.9 1.3 1.3 1.7 3.3 1.2 6.1-.5 2.8-1.6 4.9-3.3 6.2-1.7 1.3-4.1 2-7 2H32l-1.6 8.7H25l4.7-24.9h7.4zm-3.6 12.4c1.3 0 2.4-.4 3.2-1.1.9-.7 1.4-1.8 1.7-3.2.2-1.2.1-2.1-.4-2.7-.5-.5-1.4-.8-2.7-.8h-1.8l-1.8 7.8h1.8z"/></svg> },
    { name:"MySQL", color:"#00618A", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#00618A" d="M2 95.5h7.5v-28L17 91.5h5.5l7.5-24v28H37.5V67.5H27l-6.5 22-6.5-22H2v28zm45.5 0h21v-5H53V83.5h15.5v-5H53V72.5h15.5v-5h-21v28zm28.5 0h6V79.5l11 16h5.5V67.5H92.5v16l-11-16H76v28zm40.5-28v28c0 5.5-4.5 8-9 8s-9-2.5-9-8v-28h5.5v28c0 2.5 1.5 3 3.5 3s3.5-.5 3.5-3V67.5h5.5z"/></svg> },
    { name:"React", color:"#61DAFB", svg:<svg viewBox="0 0 128 128" width="40" height="40"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13-1.2-21.8-9.6-26.5-7.5-4.3-17.9-2.3-28.6 5.2C53 8.4 42.6 6.4 35.1 10.7c-8.4 4.8-11.7 13.5-9.7 26.3.5 2.5 1.1 5 1.8 7.5-2.6.7-5 1.5-7.4 2.3-13.4 4.3-21.5 11.5-21.5 21 0 9.6 8.3 17 22 21.3 2.4.8 5 1.4 7.6 2-.5 2.3-.9 4.5-1.2 6.8-2.1 13.3 1.1 22.1 9.5 26.9 3.5 2 7.5 3.1 11.5 3.1 6.1 0 12.3-2.1 18.3-6.2 5.8 4 11.8 6.1 17.7 6.1 4.1 0 8.2-1.1 11.7-3.2 8.4-4.8 11.7-13.8 9.5-27.2-.3-2.1-.7-4.2-1.2-6.2 2.4-.6 4.6-1.3 6.7-2 13.8-4.3 22.1-11.6 22.1-21.4 0-9.4-8-16.8-21-21.1z"/></g></svg> },
    { name:"Tailwind CSS", color:"#38BDF8", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.745-12.207-8.66C55.127 71.371 47.868 64 32.004 64z" fill="#38BDF8"/></svg> },
    { name:"Node.js", color:"#83CD29", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L22.014 90.73c-.338-.195-.54-.55-.54-.943V38.407c0-.392.203-.747.54-.942l44.054-25.604c.351-.175.774-.175 1.125 0l43.996 25.604c.352.195.557.55.557.942v51.142c0 .392-.205.747-.557.943l-43.996 25.604c-.352.175-.793.175-1.125 0l-11.279-6.539c-.257-.144-.603-.131-.814.031-3.896 2.243-4.943 2.668-8.832 3.876-1.072.337-2.649.844.558 2.413l14.747 8.532c1.39.776 2.886 1.192 4.405 1.192 1.516 0 3.012-.416 4.363-1.191l44.054-25.604c2.87-1.659 4.957-4.763 4.957-8.083V38.407c0-3.319-2.087-6.423-4.957-8.073z"/></svg> },
    { name:"Git",    color:"#F34F29", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 0 1-13.683 0 9.677 9.677 0 0 1-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 0 1 2.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 0 1 3.167-2.11V47.333a9.581 9.581 0 0 1-3.167-2.109c-2.862-2.86-3.551-7.06-2.083-10.576L40.836 20.13 3.264 57.702a8.133 8.133 0 0 0 0 11.496l55.115 55.118c3.171 3.17 8.317 3.17 11.488 0l54.869-54.869a8.133 8.133 0 0 0 .001-11.069z"/></svg> },
    { name:"GitHub", color:"#ffffff", svg:<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#fff" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/></svg> },
  ];
  const doubled = [...stackTechs, ...stackTechs];

  const heroGrid   = isDesktop ? "1fr auto 1.3fr" : "1fr";
  const heroNameFS = isSmallPhone ? "24px" : isMobile ? "28px" : isTablet ? "40px" : "52px";
  const heroSubFS  = isSmallPhone ? "15px" : isMobile ? "17px" : isTablet ? "22px" : "26px";
  const heroPad    = isSmallPhone ? "28px 16px 32px" : isMobile ? "32px 20px 40px" : isTablet ? "48px 32px 56px" : "80px 40px 60px 40px";
  const sectionPad = isSmallPhone ? "36px 16px" : isMobile ? "40px 20px" : isTablet ? "60px 32px" : "80px 10%";
  const navPad     = isSmallPhone ? "12px 14px" : isMobile ? "14px 20px" : "18px 10%";
  const orgCols    = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)";
  const projCols   = isMobile ? "1fr" : "repeat(2,1fr)";
  const certCols   = isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)";
  const certStatCols = isSmallPhone ? "repeat(2,1fr)" : "repeat(4,1fr)";
  const skillCols  = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)";
  const heroStatCols = isSmallPhone ? "repeat(2,1fr)" : "repeat(4,1fr)";
  const btn        = { textDecoration:"none", padding:isSmallPhone?"9px 12px":isMobile?"9px 14px":"10px 20px", fontSize:"13px", fontWeight:"700", borderRadius:"8px", cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s ease", whiteSpace:"nowrap" };

  return (
    <>
      {!appLoaded && <LoadingScreen onFinish={handleLoadFinish} />}

      <div style={{
        margin: 0,
        fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
        color: theme.text,
        minHeight: "100vh",
        backgroundColor: theme.bg,
        overflowX: "hidden",
        position: "relative",
        transition: "background-color 0.3s ease, color 0.3s ease, opacity 0.8s ease",
        opacity: appLoaded ? 1 : 0,
        width: "100%",
        maxWidth: "100vw",
      }}>

        {warning.show && <WarningModal reason={warning.reason} onClose={() => setWarning({ show:false, reason:"" })} />}
        {securityModal && <SecurityModal onClose={() => setSecurityModal(false)} />}
        <BackToTop />

        <style>{`
          * { box-sizing:border-box; }
          html, body { margin:0; padding:0; max-width:100%; overflow-x:hidden; }
          @keyframes modalIn    { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
          @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes slideDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
          @keyframes scrollLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          @keyframes certFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

          .scroll-animate {
            opacity: 0; transform: translateY(32px);
            transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
          }
          .scroll-animate.scroll-visible { opacity:1; transform:translateY(0); }
          .scroll-animate-left {
            opacity:0; transform:translateX(-32px);
            transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
          }
          .scroll-animate-left.scroll-visible { opacity:1; transform:translateX(0); }
          .scroll-animate-right {
            opacity:0; transform:translateX(32px);
            transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
          }
          .scroll-animate-right.scroll-visible { opacity:1; transform:translateX(0); }
          .scroll-delay-1{transition-delay:.1s} .scroll-delay-2{transition-delay:.2s}
          .scroll-delay-3{transition-delay:.3s} .scroll-delay-4{transition-delay:.4s}

          html { scroll-behavior:smooth; }
          .ts-track { display:flex; gap:52px; align-items:center; width:max-content; animation:scrollLeft 28s linear infinite; }
          .ts-track:hover { animation-play-state:paused; }
          .ts-item { display:flex; flex-direction:column; align-items:center; gap:10px; cursor:default; }
          .ts-icon { width:52px; height:52px; display:flex; align-items:center; justify-content:center; opacity:0.72; transition:opacity 0.25s,transform 0.25s; }
          .ts-item:hover .ts-icon { opacity:1; transform:scale(1.12) translateY(-4px); }
          .ts-label { font-size:12px; font-weight:500; white-space:nowrap; transition:color 0.2s; }
          .ts-item:hover .ts-label { color:#e2e8f0 !important; }
          .hamburger-line { display:block; width:18px; height:2px; border-radius:2px; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
          .ham-open .hamburger-line:nth-child(1){ transform:translateY(6px) rotate(45deg); }
          .ham-open .hamburger-line:nth-child(2){ opacity:0; transform:scaleX(0); }
          .ham-open .hamburger-line:nth-child(3){ transform:translateY(-6px) rotate(-45deg); }
          .dropdown-menu { animation:slideDown 0.2s cubic-bezier(0.4,0,0.2,1) forwards; }
          .typing-cursor    { display:inline-block; width:2px; height:1em; background:#2563eb; border-radius:1px; margin-left:3px; animation:blink 0.9s step-end infinite; vertical-align:middle; }
          .typing-cursor-lg { display:inline-block; width:3px; height:0.85em; background:#2563eb; border-radius:2px; margin-left:4px; animation:blink 0.9s step-end infinite; vertical-align:middle; }
          .brand-cursor { display:inline-block; width:8px; height:15px; vertical-align:middle; margin-left:3px; }
          .cert-card-anim { animation:certFadeIn 0.35s ease forwards; }
          .secure-btn { cursor:pointer; transition:all 0.2s ease; }
          .secure-btn:hover { transform:scale(1.05); filter:brightness(1.1); }
          img { max-width:100%; display:block; }
          a { -webkit-tap-highlight-color:transparent; }

          @media (max-width:1023px) {
            .hero-photo-col { display:flex !important; justify-content:center !important; align-items:center !important; width:100% !important; }
            .hero-content-col { align-items:center !important; text-align:center !important; }
            .photo-wrapper { border-radius:50% !important; padding:0 !important; max-width:180px !important; border-width:3px !important; }
            .photo-inner { border-radius:50% !important; height:180px !important; min-height:180px !important; }
            .photo-inner img { object-fit:cover !important; height:180px !important; width:180px !important; border-radius:50% !important; }
            .photo-caption { display:none !important; }
            .hero-desc-text { text-align:left !important; align-self:flex-start !important; }
            .hero-badge-row { justify-content:center !important; }
            .hero-btn-row   { justify-content:center !important; }
            .hero-live-badge { margin:0 auto 24px !important; }
            .hero-stats-grid { text-align:center !important; }
            .hero-content-col h1 { text-align:center !important; }
            .hero-content-col h3 { justify-content:center !important; }
          }
          @media (max-width:767px) {
            .manifesto-quote { font-size:18px !important; }
            .section-heading { font-size:20px !important; }
            .photo-wrapper { max-width:140px !important; }
            .photo-inner, .photo-inner img { height:140px !important; width:140px !important; }
          }
          @media (max-width:479px) {
            .nav-brand-text { font-size:12px !important; }
            .hero-stat-num { font-size:16px !important; }
            .hero-stat-label { font-size:10px !important; }
          }
          @media (max-width:359px) {
            .photo-wrapper { max-width:120px !important; }
            .photo-inner, .photo-inner img { height:120px !important; width:120px !important; }
          }
        `}</style>

        {/* BACKGROUND GRID */}
        <div style={{ position:"fixed", top:"-5%", left:"-5%", width:"110%", height:"110%", pointerEvents:"none", zIndex:0, backgroundImage:`linear-gradient(to right,${theme.gridColor} 1px,transparent 1px),linear-gradient(to bottom,${theme.gridColor} 1px,transparent 1px)`, backgroundSize:"40px 40px", transform:`translate(${mousePos.x}px,${mousePos.y}px)`, transition:"transform 0.1s cubic-bezier(0.25,1,0.5,1)" }} />

        {/* NAVBAR */}
        <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:navPad, backgroundColor:theme.navBg, borderBottom:`1px solid ${theme.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:1000, transition:"background-color 0.3s ease", gap:"8px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"2px", minWidth:0, overflow:"hidden", flexShrink:1 }}>
            <span style={{ color:"#2563eb", fontWeight:"700", fontSize:"16px", flexShrink:0 }}>$</span>
            <h2 className="nav-brand-text" style={{ margin:0, fontSize:isSmallPhone?"12px":isMobile?"13px":"16px", fontWeight:"600", fontFamily:"monospace", color:theme.text, display:"flex", alignItems:"center", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", minWidth:0 }}>
              &nbsp;alif <span style={{ color:"#64748b" }}>&nbsp;@portfolio</span>
              <span className="brand-cursor" style={{ backgroundColor:brandingCursor?"#2563eb":"transparent", transition:"background-color 0.05s", flexShrink:0 }} />
            </h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:isSmallPhone?"6px":"8px", flexShrink:0 }} ref={menuRef}>
            <button onClick={() => setDarkMode(!darkMode)}
              style={{ background:"none", border:`1px solid ${theme.border}`, backgroundColor:theme.cardBg, borderRadius:"50%", width:"38px", height:"38px", minWidth:"38px", display:"flex", justifyContent:"center", alignItems:"center", cursor:"pointer", transition:"transform 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.06) rotate(15deg)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}>
              {darkMode
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            {!isSmallPhone && (
              <div className="secure-btn" onClick={() => setSecurityModal(true)}
                style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 10px", backgroundColor:darkMode?"rgba(16,185,129,0.1)":"#dcfce7", border:darkMode?"1px solid rgba(16,185,129,0.2)":"1px solid #86efac", borderRadius:"20px", fontSize:isMobile?"10px":"12px", fontWeight:"700", color:"#059669", whiteSpace:"nowrap", userSelect:"none" }}>
                <span style={{ width:"6px", height:"6px", backgroundColor:"#10b981", borderRadius:"50%", flexShrink:0 }}/>
                {isMobile?"SECURE":"SECURE ↗"}
              </div>
            )}
            <div style={{ position:"relative" }}>
              <button onClick={() => setMenuOpen(v => !v)} className={menuOpen?"ham-open":""} aria-label="Menu navigasi"
                style={{ width:"42px", height:"42px", borderRadius:"12px", border:`1px solid ${menuOpen?"#2563eb":theme.border}`, backgroundColor:menuOpen?(darkMode?"rgba(37,99,235,0.15)":"#dbeafe"):theme.cardBg, cursor:"pointer", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"4px", transition:"all 0.25s ease", flexShrink:0 }}>
                <span className="hamburger-line" style={{ backgroundColor:menuOpen?"#2563eb":theme.text }}/>
                <span className="hamburger-line" style={{ backgroundColor:menuOpen?"#2563eb":theme.text, width:"14px" }}/>
                <span className="hamburger-line" style={{ backgroundColor:menuOpen?"#2563eb":theme.text }}/>
              </button>
              {menuOpen && (
                <div className="dropdown-menu" style={{ position:"absolute", top:"calc(100% + 12px)", right:0, width:"min(230px, 88vw)", backgroundColor:theme.cardBg, border:`1px solid ${theme.border}`, borderRadius:"18px", overflow:"hidden", boxShadow:darkMode?"0 24px 48px rgba(0,0,0,0.5)":"0 24px 48px rgba(15,23,42,0.15)", zIndex:9999 }}>
                  <div style={{ padding:"14px 16px 10px", borderBottom:`1px solid ${theme.border}`, display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"8px", backgroundColor:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </div>
                    <p style={{ margin:0, fontSize:"16px", fontWeight:"800", color:theme.text }}>Navigation</p>
                  </div>
                  <div style={{ padding:"8px" }}>
                    {navLinks.map((item, i) => (
                      <a key={i} href={`#${item.toLowerCase()}`}
                        onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo(item.toLowerCase()); }}
                        style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"10px", textDecoration:"none", color:theme.text, fontSize:"13px", fontWeight:"600", transition:"background-color 0.15s ease" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor=darkMode?"rgba(37,99,235,0.1)":"#dbeafe"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor="transparent"}>
                        <span style={{ width:"30px", height:"30px", borderRadius:"8px", backgroundColor:darkMode?"rgba(255,255,255,0.05)":"#e8eef6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode?"#94a3b8":"#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{navIcons[i]}</svg>
                        </span>
                        {item}
                        <svg style={{ marginLeft:"auto", flexShrink:0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </a>
                    ))}
                  </div>
                  <div style={{ padding:"10px 16px 14px", borderTop:`1px solid ${theme.border}` }}>
                    <a href="mailto:muhammadaliframadhanramadhan@gmail.com"
                      style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"10px", backgroundColor:"#2563eb", borderRadius:"10px", textDecoration:"none", color:"#fff", fontSize:"12px", fontWeight:"700" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Hubungi Alif
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div style={{ position:"relative", zIndex:1 }}>

          {/* HERO */}
          <div id="profile" style={{ position:"relative", width:"100%" }}>
            <div style={{ position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)", width:"92%", height:"calc(100% - 40px)", backgroundColor:darkMode?"#1a2744":"rgba(210,225,245,0.5)", border:darkMode?"1px solid rgba(26,39,68,0.6)":"1px solid rgba(180,200,230,0.6)", borderRadius:"28px", zIndex:0, pointerEvents:"none" }} />
            <section style={{ display:"grid", gridTemplateColumns:heroGrid, gap:0, maxWidth:"1150px", margin:"0 auto", padding:heroPad, alignItems:"center", position:"relative", zIndex:1 }}>
              <div className="hero-photo-col" style={{ display:"flex", justifyContent:"center", marginBottom:isDesktop?0:"28px" }}>
                <div className="photo-wrapper"
                  onMouseEnter={() => setPhotoHovered(true)}
                  onMouseLeave={() => { setPhotoHovered(false); setPhotoMousePos({x:0,y:0}); }}
                  onMouseMove={handlePhotoMouseMove}
                  style={{ position:"relative", width:"100%", maxWidth:isMobileOrTablet?"180px":"320px", backgroundColor:theme.cardBg, borderRadius:isMobileOrTablet?"50%":"24px", padding:isMobileOrTablet?"0":"16px", boxShadow:photoHovered?"0 30px 60px rgba(0,0,0,0.2),0 0 0 1px #2563eb":darkMode?"0 20px 40px rgba(0,0,0,0.4)":"0 20px 40px rgba(15,23,42,0.1)", border:`${isMobileOrTablet?"3px":"2px"} solid ${darkMode?"#2563eb":"#94b8d8"}`, transform:photoHovered?`perspective(800px) rotateX(${-photoMousePos.y}deg) rotateY(${photoMousePos.x}deg) scale(1.03)`:"perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)", transition:photoHovered?"transform 0.1s ease,box-shadow 0.3s ease":"transform 0.5s cubic-bezier(0.25,1,0.5,1),box-shadow 0.3s ease", cursor:"pointer" }}>
                  <div className="photo-inner" style={{ width:"100%", height:isMobileOrTablet?"180px":"340px", borderRadius:isMobileOrTablet?"50%":"16px", overflow:"hidden", backgroundColor:darkMode?"#0f172a":"#d8e6f2", border:isMobileOrTablet?"none":`1px solid ${theme.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <img src="/foto-alif.jpeg" alt="M. Alif Ramadhan" style={{ width:isMobileOrTablet?"180px":"100%", height:isMobileOrTablet?"180px":"100%", objectFit:"cover", objectPosition:"center top", display:"block", borderRadius:isMobileOrTablet?"50%":"0" }} />
                  </div>
                  {isDesktop && (
                    <div className="photo-caption" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"14px", padding:"0 4px" }}>
                      <div style={{ minWidth:0, flex:1 }}>
                        <h4 style={{ margin:0, fontSize:"14px", fontWeight:"700", color:theme.text }}>M. Alif Ramadhan</h4>
                        <p style={{ margin:"4px 0 0 0", fontSize:"11px", color:theme.subText, fontWeight:"500", display:"flex", alignItems:"center", minHeight:"16px" }}>{typedText}<span className="typing-cursor"/></p>
                      </div>
                      <span style={{ fontSize:"10px", fontWeight:"700", color:theme.subText, padding:"4px 8px", backgroundColor:darkMode?"#0f172a":"#dce6f2", borderRadius:"6px", flexShrink:0, marginLeft:"8px" }}>● SECURE</span>
                    </div>
                  )}
                </div>
              </div>

              {isDesktop && <div style={{ width:"1px", alignSelf:"stretch", background:darkMode?"linear-gradient(to bottom,transparent,rgba(99,102,241,0.4),rgba(37,99,235,0.4),transparent)":"linear-gradient(to bottom,transparent,rgba(37,99,235,0.25),rgba(99,102,241,0.25),transparent)", margin:"20px 40px", flexShrink:0 }}/>}

              <div className="hero-content-col" style={{ display:"flex", flexDirection:"column", alignItems:isMobileOrTablet?"center":"flex-start" }}>
                <h1 style={{ fontSize:heroNameFS, fontWeight:"900", color:theme.text, margin:"0 0 8px 0", letterSpacing:"-1px", lineHeight:1.1, textAlign:isMobileOrTablet?"center":"left" }}>M. Alif Ramadhan</h1>
                <h3 style={{ fontSize:heroSubFS, fontWeight:"600", color:theme.subText, margin:"0 0 24px 0", display:"flex", alignItems:"center", minHeight:isMobile?"28px":"42px", flexWrap:"wrap", justifyContent:isMobileOrTablet?"center":"flex-start", textAlign:isMobileOrTablet?"center":"left" }}>
                  {heroTypedText}<span className="typing-cursor-lg"/>
                </h3>
                <div className="hero-badge-row" style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"24px", flexWrap:"wrap", justifyContent:isMobileOrTablet?"center":"flex-start" }}>
                  <span style={{ color:"#3b82f6", fontSize:"13px", fontWeight:"700" }}>&gt; Core Competency of</span>
                  <span style={{ fontSize:"12px", fontWeight:"600", color:darkMode?"#38bdf8":"#0369a1", backgroundColor:darkMode?"rgba(56,189,248,0.15)":"#bfdbfe", padding:"3px 10px", borderRadius:"6px" }}>Software Engineering</span>
                  <span style={{ color:"#64748b" }}>&</span>
                  <span style={{ fontSize:"12px", fontWeight:"600", color:darkMode?"#4ade80":"#166534", backgroundColor:darkMode?"rgba(74,222,128,0.15)":"#bbf7d0", padding:"3px 10px", borderRadius:"6px" }}>Database Systems</span>
                </div>
                <a href="https://proyekpenjualan.infinityfreeapp.com/" target="_blank" rel="noreferrer"
                  className="hero-live-badge"
                  style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 12px", backgroundColor:theme.cardBg, border:`1px solid ${theme.border}`, borderRadius:"8px", marginBottom:"24px", textDecoration:"none", transition:"border-color 0.2s, box-shadow 0.2s", maxWidth:"100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(37,99,235,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=theme.border; e.currentTarget.style.boxShadow="none"; }}>
                  <span style={{ width:"6px", height:"6px", backgroundColor:"#3b82f6", borderRadius:"50%", flexShrink:0 }}/>
                  <span style={{ fontSize:"11px", fontWeight:"700", color:"#3b82f6", textTransform:"uppercase" }}>Live Project</span>
                  <span style={{ color:"#cbd5e1" }}>|</span>
                  <span style={{ fontSize:isMobile?"10px":"12px", color:theme.subText, fontWeight:"500", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Proyek Penjualan ↗</span>
                </a>
                <p className="hero-desc-text" style={{ fontSize:isSmallPhone?"13px":isMobile?"14px":"15px", color:theme.subText, lineHeight:"1.7", margin:"0 0 32px 0", textAlign:"left", alignSelf:"auto", maxWidth:"100%" }}>
                  Halo, Saya Alif, mahasiswa IT yang fokus pada <strong style={{ color:theme.text }}>Backend Development</strong> dan arsitektur basis data. Aktif membangun solusi server-side dengan ekosistem <strong style={{ color:theme.text }}>Laravel</strong> serta mengoptimasi database relasional demi sistem yang efisien dan terintegrasi.
                </p>
                <div className="hero-stats-grid" style={{ display:"grid", gridTemplateColumns:heroStatCols, borderTop:`1px solid ${theme.border}`, paddingTop:"24px", marginBottom:"32px", width:"100%", rowGap:isSmallPhone?"16px":0 }}>
                  {[{num:"4+",label:"Years Learning"},{num:"4+",label:"Projects Done"},{num:"8+",label:"Tech Mastered"},{num:"∞",label:"Logic & Code"}].map((s, i) => (
                    <div key={i} style={{ textAlign:isMobileOrTablet?"center":"left", padding:"16px 14px", borderRight: (isSmallPhone ? (i % 2 === 0) : i < 3) ? `1px solid ${theme.border}` : "none", paddingLeft: (i === 0 || (isSmallPhone && i === 2)) ? "0" : "14px" }}>
                      <h3 className="hero-stat-num" style={{ margin:0, fontSize:isMobile?"18px":"28px", fontWeight:"800", color:theme.text }}>{s.num}</h3>
                      <p className="hero-stat-label" style={{ margin:"4px 0 0 0", fontSize:"11px", color:"#64748b", fontWeight:"500" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="hero-btn-row" style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:isMobileOrTablet?"center":"flex-start" }}>
                  <a href="https://www.instagram.com/alifframadhnn_?igsh=MnNmbG9qaWk4Mzhs" target="_blank" rel="noreferrer" style={{ ...btn, backgroundColor:"#2563eb", color:"#fff", border:"none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight:"6px" }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/m-alif-ramadhan" target="_blank" rel="noreferrer" style={{ ...btn, backgroundColor:"#0077b5", color:"#fff", border:"none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight:"6px" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                  <a href="/CV_M_ALIF_RAMADHAN.pdf" download style={{ ...btn, backgroundColor:theme.cardBg, color:theme.text, border:`1px solid ${theme.border}` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight:"6px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download CV
                  </a>
                  <a href="#projects" onClick={(e)=>{e.preventDefault();scrollTo("projects");}} style={{ ...btn, backgroundColor:"transparent", color:"#2563eb", border:"1px solid #2563eb" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor=darkMode?"rgba(37,99,235,0.1)":"#dbeafe"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor="transparent"}>
                    View Projects
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* MANIFESTO */}
          <section style={{ padding:isMobile?"40px 24px 24px":"50px 40px 30px", textAlign:"center", maxWidth:"900px", margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:"14px" }}>
            <div className="scroll-animate" style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 14px", backgroundColor:theme.badgeBg, border:`1px solid ${darkMode?"rgba(99,102,241,0.2)":"#a5b4fc"}`, borderRadius:"100px", fontSize:"11px", fontFamily:"monospace", fontWeight:"600", color:theme.badgeText }}>personal manifesto</div>
            <h2 className="manifesto-quote scroll-animate scroll-delay-1" style={{ fontSize:isSmallPhone?"17px":isMobile?"20px":"34px", fontWeight:"700", color:theme.text, lineHeight:"1.35", margin:"6px 0 2px 0", maxWidth:"750px" }}>
              "Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya."
            </h2>
            <p className="scroll-animate scroll-delay-2" style={{ margin:0, fontSize:"14px", color:"#64748b", fontWeight:"600", fontFamily:"monospace" }}>— Alif</p>
          </section>

          {/* ORGANISASI */}
          <section id="organisasi" style={{ padding:isSmallPhone?"36px 16px 48px":isMobile?"40px 20px 60px":isTablet?"40px 28px 60px":"40px 3% 70px", backgroundColor:darkMode?"transparent":theme.sectionAlt, borderTop:`1px solid ${theme.border}`, borderBottom:`1px solid ${theme.border}` }}>
            <h2 className="scroll-animate section-heading" style={{ fontSize:isMobile?"20px":"26px", fontWeight:"800", textAlign:"center", color:theme.text, marginBottom:"32px" }}>Pengalaman Organisasi</h2>
            <div style={{ display:"grid", gridTemplateColumns:orgCols, gap:"20px", maxWidth:"1200px", margin:"0 auto" }}>
              {organisasiData.map((org, idx) => (
                <div key={idx}
                  className={`scroll-animate scroll-delay-${Math.min(idx+1,4)}`}
                  onMouseEnter={() => setHoveredOrg(idx)} onMouseLeave={() => setHoveredOrg(null)}
                  style={{ backgroundColor:theme.cardBg, border:`1px solid ${hoveredOrg===idx?"#2563eb":theme.border}`, borderRadius:"20px", padding:isSmallPhone?"28px 20px":"40px 28px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", transform:hoveredOrg===idx?"translateY(-4px)":"translateY(0)", boxShadow:hoveredOrg===idx?"0 16px 36px rgba(37,99,235,0.1)":"0 4px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ width:"80px", height:"80px", borderRadius:"50%", overflow:"hidden", marginBottom:"16px", border:`2px solid ${hoveredOrg===idx?"#2563eb":theme.border}`, backgroundColor:darkMode?"#0f172a":"#d8e6f2", flexShrink:0 }}>
                    <img src={org.img} alt={org.jabatan} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <h3 style={{ fontSize:"15px", fontWeight:"700", color:theme.text, margin:"0 0 4px 0", lineHeight:"1.4" }}>{org.jabatan}<br/>{org.instansi}</h3>
                  <span style={{ fontSize:"12px", fontWeight:"600", color:darkMode?"#818cf8":"#4f46e5", marginBottom:"12px", display:"block" }}>{org.tahun}</span>
                  <p style={{ fontSize:"13px", color:theme.subText, lineHeight:"1.6", margin:0 }}>{org.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SKILL */}
          <section id="skill" style={{ backgroundColor:darkMode?"#1a2744":theme.cardBg, borderTop:`1px solid ${theme.border}`, borderBottom:`1px solid ${theme.border}`, padding:sectionPad, transition:"background-color 0.3s ease" }}>
            <div className="scroll-animate" style={{ textAlign:"center", marginBottom:"36px" }}>
              <h2 className="section-heading" style={{ fontSize:isMobile?"20px":"28px", fontWeight:"800", color:theme.text, margin:"0 0 8px 0" }}>My Skills & Ability</h2>
              <p style={{ color:"#64748b", margin:0, fontSize:"14px" }}>Komposisi teknologi yang saya gunakan untuk mewujudkan ide menjadi kenyataan.</p>
            </div>
            <div className="scroll-animate scroll-delay-1" style={{ display:"flex", justifyContent:"center", marginBottom:"28px" }}>
              <div style={{ display:"flex", backgroundColor:darkMode?"#0f172a":"#dce6f2", padding:"4px", borderRadius:"10px", flexWrap:"wrap", justifyContent:"center", maxWidth:"100%" }}>
                {[["backend","Laravel Backend Core"],["frontend","Frontend Integration"]].map(([key,label]) => (
                  <button key={key} onClick={() => setActiveTab(key)}
                    style={{ padding:isSmallPhone?"7px 9px":isMobile?"7px 10px":"8px 14px", border:"none", borderRadius:"8px", fontSize:isSmallPhone?"10px":isMobile?"11px":"13px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s ease", backgroundColor:activeTab===key?theme.cardBg:"transparent", color:activeTab===key?theme.text:"#64748b", boxShadow:activeTab===key?(darkMode?"0 2px 8px rgba(0,0,0,0.15)":"0 2px 8px rgba(0,0,0,0.08)"):"none", whiteSpace:"nowrap" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:skillCols, gap:"16px", maxWidth:"1000px", margin:"0 auto" }}>
              {techStack[activeTab].map((tech, i) => (
                <div key={i} className={`scroll-animate scroll-delay-${Math.min(i+1,4)}`}
                  style={{ backgroundColor:darkMode?"#111827":"#f0f4f8", border:`1px solid ${theme.border}`, borderRadius:"14px", padding:"18px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:"80px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"8px" }}>
                    <span style={{ fontWeight:"700", fontSize:"14px", color:theme.text }}>{tech.name}</span>
                    <span style={{ width:"8px", height:"8px", borderRadius:"50%", backgroundColor:tech.color, flexShrink:0 }}/>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"12px" }}>
                    <span style={{ fontSize:"11px", color:"#64748b" }}>Kapabilitas</span>
                    <span style={{ fontSize:"11px", color:theme.text, fontWeight:"700", padding:"2px 8px", backgroundColor:theme.cardBg, borderRadius:"6px", border:`1px solid ${theme.border}` }}>{tech.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" style={{ padding:sectionPad, backgroundColor:darkMode?"transparent":theme.sectionAlt, borderBottom:`1px solid ${theme.border}` }}>
            <div className="scroll-animate" style={{ textAlign:"center", marginBottom:"40px" }}>
              <h2 className="section-heading" style={{ fontSize:isMobile?"20px":"28px", fontWeight:"800", color:theme.text, margin:"0 0 8px 0" }}>My Projects</h2>
              <p style={{ color:"#64748b", margin:0, fontSize:"14px" }}>Kumpulan proyek yang telah saya kerjakan.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:projCols, gap:"20px", maxWidth:"900px", margin:"0 auto" }}>
              {projectsData.map((proj, i) => (
                <div key={i} className={`scroll-animate scroll-delay-${Math.min(i+1,4)}`}>
                  <ProjectCard proj={proj} theme={theme} darkMode={darkMode} isMobile={isMobile} isTablet={isTablet} />
                </div>
              ))}
            </div>
          </section>

          {/* TECH SCROLL */}
          <section style={{ background: darkMode?"#1a2335":"#e0e8f4", padding:isSmallPhone?"32px 0 28px":"44px 0 36px", overflow:"hidden", borderTop:`1px solid ${darkMode?"rgba(255,255,255,0.06)":"#b8cce0"}`, borderBottom:`1px solid ${darkMode?"rgba(255,255,255,0.06)":"#b8cce0"}` }}>
            <h2 className="scroll-animate" style={{ color: darkMode?"#fff":"#1e293b", textAlign:"center", fontWeight:"700", fontSize:isSmallPhone?"16px":isMobile?"18px":"22px", margin:"0 0 2rem", padding:"0 16px" }}>My Go-To Tech Stack</h2>
            <div style={{ position:"relative", overflow:"hidden" }}>
              <div className="ts-track">
                {doubled.map((t, i) => (
                  <div key={i} className="ts-item">
                    <div className="ts-icon">{t.svg}</div>
                    <span className="ts-label" style={{ color: darkMode?"#94a3b8":"#475569" }}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERTIFIKAT */}
          <section id="sertifikat" style={{ padding:sectionPad, backgroundColor:darkMode?"transparent":theme.cardBg, borderBottom:`1px solid ${theme.border}` }}>
            <div className="scroll-animate" style={{ textAlign:"center", marginBottom:"36px" }}>
              <h2 className="section-heading" style={{ fontSize:isMobile?"20px":"28px", fontWeight:"800", color:theme.text, margin:"0 0 8px 0" }}>My Certificate</h2>
              <p style={{ color:"#64748b", margin:"0 auto", fontSize:"14px", maxWidth:"560px" }}>Kumpulan sertifikat standar keahlian dan kualifikasi teknis yang saya miliki.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:certStatCols, gap:"16px", maxWidth:"800px", margin:"0 auto 36px" }}>
              {certStats.map((s, i) => (
                <div key={i} className={`scroll-animate scroll-delay-${Math.min(i+1,4)}`}
                  style={{ backgroundColor:theme.cardBg, border:`1px solid ${theme.border}`, borderRadius:"14px", padding:isSmallPhone?"16px 10px":"20px 16px", textAlign:"center", boxShadow: darkMode?"none":"0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ margin:0, fontSize:isSmallPhone?"20px":"28px", fontWeight:"800", color:"#2563eb" }}>{s.num}</h3>
                  <p style={{ margin:"4px 0 0 0", fontSize:"11px", color:theme.subText, fontWeight:"600" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="scroll-animate" style={{ display:"flex", justifyContent:"center", marginBottom:"32px", flexWrap:"wrap", gap:"8px", padding:"0 16px" }}>
              {certCategories.map(cat => (
                <button key={cat} onClick={() => setCertFilter(cat)}
                  style={{ padding:"6px 16px", border:`1px solid ${certFilter===cat?"#2563eb":theme.border}`, borderRadius:"20px", fontSize:"12px", fontWeight:"700", cursor:"pointer", backgroundColor:certFilter===cat?"#2563eb":theme.cardBg, color:certFilter===cat?"#fff":theme.subText, transition:"all 0.2s ease" }}>
                  {cat}{cat==="Semua" && <span style={{ marginLeft:"6px", fontSize:"10px", backgroundColor:certFilter===cat?"rgba(255,255,255,0.25)":"rgba(37,99,235,0.1)", color:certFilter===cat?"#fff":"#2563eb", padding:"1px 5px", borderRadius:"10px" }}>{sertifikatData.length}</span>}
                </button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:certCols, gap:"20px", maxWidth:"1200px", margin:"0 auto" }}>
              {filteredCerts.map((cert, idx) => (
                <div key={`${certFilter}-${idx}`} className="cert-card-anim scroll-animate" style={{ animationDelay:`${idx*60}ms` }}>
                  <CertCard cert={cert} theme={theme} darkMode={darkMode} isMobile={isMobile} isTablet={isTablet} />
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ padding:isSmallPhone?"48px 20px":isMobile?"60px 28px":isTablet?"70px 48px":"80px 10%", backgroundColor:darkMode?"#1a2744":theme.sectionAlt, borderTop:`1px solid ${theme.border}`, display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"center", justifyContent:"space-between", gap:"40px" }}>
            <div style={{ flex:1, maxWidth:"560px" }}>
              <p style={{ margin:"0 0 12px 0", fontSize:"12px", fontWeight:"700", color:"#3074d2", letterSpacing:"1.5px", textTransform:"uppercase" }}>PUNYA PROJECT?</p>
              <h2 style={{ fontSize:isSmallPhone?"24px":isMobile?"28px":isTablet?"34px":"42px", fontWeight:"700", color:theme.text, margin:"0 0 18px 0", letterSpacing:"-1px", lineHeight:1.1, textAlign:"left" }}>Tertarik untuk berkolaborasi!</h2>
              <p style={{ color:"#64748b", margin:"0 0 36px 0", fontSize:"15px", lineHeight:"1.75", maxWidth:"420px", textAlign:"left" }}>Saya selalu terbuka untuk peluang baru, kolaborasi menarik, atau hanya ingin berdiskusi tentang teknologi dan pengembangan. Klik tombol di bawah untuk mengirim email langsung!</p>
              <a href="mailto:muhammadaliframadhanramadhan@gmail.com"
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", backgroundColor:"#3074d2", color:"#fff", border:"none", borderRadius:"12px", fontSize:"14px", fontWeight:"700", textDecoration:"none", cursor:"pointer", boxShadow:"0 4px 20px rgba(35,118,206,0.48)", transition:"all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor="#0ea5e9"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor="#3074d2"; e.currentTarget.style.transform="translateY(0)"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Kirim Email
              </a>
            </div>
            {!isMobile && <div style={{ flexShrink:0, opacity:darkMode?0.08:0.12, pointerEvents:"none" }}><svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>}
          </section>

          {/* FOOTER */}
          <footer style={{ padding:isSmallPhone?"14px 16px":isMobile?"16px 20px":"18px 10%", backgroundColor:theme.cardBg, borderTop:`1px solid ${theme.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"8px", userSelect:"none", WebkitUserSelect:"none" }}>
            <span style={{ fontSize:isSmallPhone?"11px":"13px", color:darkMode?"#94a3b8":"#64748b", fontWeight:"500" }}>© 2026 M. Alif Ramadhan. Dibuat dengan <span style={{ color:darkMode?"#a78bfa":"#7c3aed", fontWeight:"700" }}>☕</span> dan <span style={{ color:"#2563eb", fontWeight:"700" }}>&lt;/&gt;</span>.</span>
            <LiveClock />
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
