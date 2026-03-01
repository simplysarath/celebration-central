import { useState, useEffect } from "react";

const C = {
  coral: "#D94F5C", coralLight: "#FFF1F2", navy: "#2B2D42", gold: "#F9C74F",
  sage: "#A8D5BA", lavender: "#C3B1E1", sky: "#A8D8EA",
  white: "#FFFFFF", g100: "#F7F8FA", g200: "#E5E7EB", g300: "#D1D5DB",
  g400: "#9CA3AF", g600: "#6B7280",
};

// ══════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════
const Phone = ({ children, title }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    {title && <div style={{ fontSize: 10, fontWeight: 700, color: C.g600, textTransform: "uppercase", letterSpacing: 1.5, textAlign: "center", maxWidth: 320 }}>{title}</div>}
    <div style={{ width: 340, height: 700, borderRadius: 36, background: C.white, border: `3px solid ${C.g200}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
      <div style={{ height: 36, background: C.white, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: `1px solid ${C.g100}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>9:41</span>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 14, height: 8, borderRadius: 2, background: C.navy }} />
          <div style={{ width: 18, height: 8, borderRadius: 2, border: `1px solid ${C.navy}`, position: "relative" }}><div style={{ position: "absolute", left: 1, top: 1, width: 12, height: 4, borderRadius: 1, background: C.sage }} /></div>
        </div>
      </div>
      <div style={{ height: 664, overflowY: "auto", overflowX: "hidden" }}>{children}</div>
    </div>
  </div>
);

const Progress = ({ step, total }) => (
  <div style={{ padding: "6px 18px", display: "flex", gap: 3 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.coral : C.g200 }} />
    ))}
  </div>
);

const Back = ({ onClick, label }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", padding: "6px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: C.g600, fontSize: 12 }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
    {label || "Back"}
  </button>
);

const Chip = ({ label, active, onClick, color }) => (
  <button onClick={onClick} style={{
    padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", whiteSpace: "nowrap",
    background: active ? (color || C.coral) : C.white, color: active ? C.white : C.navy,
    fontSize: 11, fontWeight: 600, boxShadow: active ? `0 2px 8px ${color || C.coral}44` : `0 1px 3px rgba(0,0,0,0.08)`,
  }}>{label}</button>
);

const CTA = ({ label, onClick, secondary, disabled }) => (
  <button onClick={disabled ? undefined : onClick} style={{
    width: "100%", padding: "13px", borderRadius: 14, border: secondary ? `2px solid ${C.coral}` : "none",
    background: disabled ? C.g300 : secondary ? "transparent" : `linear-gradient(135deg, ${C.coral}, #C4404D)`,
    color: secondary ? C.coral : C.white, fontSize: 14, fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : secondary ? "none" : "0 4px 16px rgba(217,79,92,0.35)",
  }}>{label}</button>
);

const OptionRow = ({ label, value, options, onChange }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{label}</div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map(o => <Chip key={o} label={o} active={value === o} onClick={() => onChange(o)} />)}
    </div>
  </div>
);

const ColorDot = ({ color, active, onClick, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
    <button onClick={onClick} style={{
      width: 28, height: 28, borderRadius: "50%", background: color,
      border: active ? `3px solid ${C.coral}` : `2px solid ${C.g200}`, cursor: "pointer",
      boxShadow: active ? `0 0 0 2px ${C.white}, 0 0 0 4px ${C.coral}` : "none",
    }} />
    {label && <span style={{ fontSize: 8, color: C.g600 }}>{label}</span>}
  </div>
);

const ProductCard = ({ item, selected, onSelect, onCustomize }) => (
  <div style={{ minWidth: 140, flexShrink: 0 }}>
    <button onClick={onSelect} style={{
      width: "100%", padding: 10, borderRadius: 14, border: `2px solid ${selected ? C.coral : C.g200}`,
      background: selected ? C.coralLight : C.white, cursor: "pointer", textAlign: "left",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ fontSize: 28, textAlign: "center", padding: "2px 0" }}>{item.emoji}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>{item.name}</div>
      <div style={{ fontSize: 9, color: C.g600 }}>{item.detail}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: C.coral }}>{item.price}</span>
        {item.tag && <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: item.tagColor || C.sage, color: C.white }}>{item.tag}</span>}
      </div>
    </button>
    {selected && item.customizable && (
      <button onClick={onCustomize} style={{
        width: "100%", marginTop: 4, padding: "6px", borderRadius: 8, border: `1px dashed ${C.coral}`,
        background: "transparent", color: C.coral, fontSize: 10, fontWeight: 700, cursor: "pointer",
      }}>✏️ Customize</button>
    )}
  </div>
);

// ══════════════════════════════════════════════
// 1. WELCOME
// ══════════════════════════════════════════════
const WelcomeScreen = ({ onStart }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg, ${C.coral}, #E8818A)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 8px 24px rgba(217,79,92,0.3)" }}>
        <span style={{ fontSize: 32 }}>🎉</span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.navy, margin: 0, lineHeight: 1.2 }}>Celebration<br />Central</h1>
      <p style={{ color: C.g600, fontSize: 13, margin: "10px 0 0", lineHeight: 1.5, maxWidth: 260 }}>
        Plan your perfect party — we'll curate the cake, platters, flowers & everything in between.
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        {["🎂", "🥗", "💐", "🎈"].map((e, i) => (
          <div key={i} style={{ width: 40, height: 40, borderRadius: 12, background: [C.coralLight, "#F0FDF4", "#FAF5FF", "#FEF9C3"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{e}</div>
        ))}
      </div>
    </div>
    <div style={{ padding: "0 20px 28px" }}>
      <CTA label="Let's Plan a Celebration" onClick={onStart} />
      <p style={{ textAlign: "center", color: C.g400, fontSize: 10, marginTop: 10 }}>Takes ~2 min • Bakery, Deli, Floral & More</p>
    </div>
  </div>
);

// ══════════════════════════════════════════════
// 2. COMBINED INTAKE — Hybrid: chips + follow-ups + free text
// ══════════════════════════════════════════════

// Dynamic follow-up questions per occasion
const FOLLOW_UPS = {
  Birthday: [
    { key: "who", label: "Who's it for?", options: ["Kids (under 12)", "Teen (13-17)", "Adult"] },
    { key: "gender", label: "Any theme preference?", options: ["Boy", "Girl", "Neutral", "Surprise"] },
  ],
  "Baby Shower": [
    { key: "gender", label: "Do you know the gender?", options: ["Boy", "Girl", "Surprise / Neutral"] },
    { key: "style", label: "Vibe?", options: ["Classic", "Modern / Minimal", "Fun & Colorful"] },
  ],
  Graduation: [
    { key: "level", label: "What level?", options: ["High School", "College", "Graduate"] },
    { key: "style", label: "Vibe?", options: ["School Colors", "Elegant", "Fun & Casual"] },
  ],
  Engagement: [
    { key: "style", label: "Vibe?", options: ["Romantic", "Elegant", "Casual / Fun"] },
  ],
  Corporate: [
    { key: "type", label: "Type of event?", options: ["Team Lunch", "Client Meeting", "Milestone / Award", "Holiday Party"] },
  ],
  Holiday: [
    { key: "which", label: "Which holiday?", options: ["Christmas", "Halloween", "Thanksgiving", "4th of July", "Easter", "Other"] },
  ],
};

const DIETARY_OPTIONS = [
  { key: "nut_free", label: "🥜 Nut-Free", color: "#FEF3C7" },
  { key: "gluten_free", label: "🌾 Gluten-Free", color: "#DBEAFE" },
  { key: "dairy_free", label: "🥛 Dairy-Free", color: "#F3E8FF" },
  { key: "vegan", label: "🌱 Vegan", color: "#DCFCE7" },
  { key: "vegetarian", label: "🥬 Vegetarian", color: "#D1FAE5" },
  { key: "halal", label: "🍖 Halal", color: "#FEE2E2" },
  { key: "kosher", label: "✡️ Kosher", color: "#E0E7FF" },
];

const IntakeScreen = ({ onNext, onBack }) => {
  const [occasion, setOccasion] = useState(null);
  const [followUps, setFollowUps] = useState({});
  const [guests, setGuests] = useState(20);
  const [budget, setBudget] = useState(1);
  const [dietary, setDietary] = useState([]);
  const [showDietary, setShowDietary] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [dateChoice, setDateChoice] = useState(null);

  const occasions = [
    { emoji: "🎂", label: "Birthday", bg: C.coralLight },
    { emoji: "👶", label: "Baby Shower", bg: "#F0F9FF" },
    { emoji: "🎓", label: "Graduation", bg: "#FEF9C3" },
    { emoji: "💍", label: "Engagement", bg: "#FAF5FF" },
    { emoji: "🏢", label: "Corporate", bg: "#F0FDF4" },
    { emoji: "🎃", label: "Holiday", bg: "#FFF7ED" },
  ];

  const handleOccasion = (label) => {
    setOccasion(label);
    setFollowUps({});
  };

  const toggleDietary = (key) => {
    setDietary(d => d.includes(key) ? d.filter(x => x !== key) : [...d, key]);
  };

  const currentFollowUps = occasion ? (FOLLOW_UPS[occasion] || []) : [];

  return (
    <div>
      <Progress step={0} total={4} />
      <Back onClick={onBack} />
      <div style={{ padding: "0 18px 18px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, margin: "0 0 4px" }}>Let's get started</h2>
        <p style={{ color: C.g600, fontSize: 12, margin: "0 0 14px" }}>Pick what applies or just tell us in your own words below.</p>

        {/* ── Occasion Grid ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>What's the occasion?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {occasions.map(o => (
              <button key={o.label} onClick={() => handleOccasion(o.label)} style={{
                padding: "12px 6px", borderRadius: 14, border: `2px solid ${occasion === o.label ? C.coral : "transparent"}`,
                background: o.bg, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: 24 }}>{o.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.navy }}>{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Dynamic Follow-Up Questions (appear after occasion is picked) ── */}
        {currentFollowUps.length > 0 && (
          <div style={{
            marginBottom: 12, padding: 12, borderRadius: 14, background: C.coralLight,
            border: `1px solid ${C.coral}22`,
            animation: "fadeIn 0.3s ease",
          }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            {currentFollowUps.map(fq => (
              <div key={fq.key} style={{ marginBottom: fq.key === currentFollowUps[currentFollowUps.length - 1].key ? 0 : 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{fq.label}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {fq.options.map(opt => (
                    <Chip key={opt} label={opt} active={followUps[fq.key] === opt}
                      onClick={() => setFollowUps(f => ({ ...f, [fq.key]: f[fq.key] === opt ? undefined : opt }))} />
                  ))}
                </div>
              </div>
            ))}
            <div style={{ fontSize: 8, color: C.g400, marginTop: 8, fontStyle: "italic" }}>Optional — skip any you don't need</div>
          </div>
        )}

        {/* ── Guests ── */}
        <div style={{ background: C.g100, borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>👥 Guests</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: C.coral }}>{guests}</span>
          </div>
          <input type="range" min={5} max={100} step={5} value={guests} onChange={e => setGuests(+e.target.value)} style={{ width: "100%", accentColor: C.coral, height: 4 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.g400, marginTop: 2 }}><span>5</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
        </div>

        {/* ── Budget ── */}
        <div style={{ background: C.g100, borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>💰 Budget</span>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            {["$50–100", "$100–250", "$250–500", "$500+"].map((b, i) => (
              <Chip key={b} label={b} active={budget === i} onClick={() => setBudget(i)} />
            ))}
          </div>
        </div>

        {/* ── Date ── */}
        <div style={{ background: C.g100, borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>📅 When?</span>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {["This Week", "Next Week", "Pick Date"].map(d => (
              <button key={d} onClick={() => setDateChoice(d)} style={{
                flex: 1, padding: 8, borderRadius: 12,
                border: `1px solid ${dateChoice === d ? C.coral : C.g200}`,
                background: dateChoice === d ? C.coralLight : C.white,
                color: dateChoice === d ? C.coral : C.navy,
                fontSize: 10, fontWeight: 600, cursor: "pointer"
              }}>{d}</button>
            ))}
          </div>
        </div>

        {/* ── Dietary Preferences (collapsible) ── */}
        <div style={{ marginBottom: 12 }}>
          <button onClick={() => setShowDietary(!showDietary)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            background: C.g100, border: "none", borderRadius: 14, padding: "12px 14px", cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>🥗 Dietary Needs</span>
              {dietary.length > 0 && (
                <span style={{ fontSize: 9, fontWeight: 700, background: C.coral, color: C.white, padding: "1px 6px", borderRadius: 8 }}>{dietary.length}</span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 9, color: C.g400 }}>Optional</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2.5"
                style={{ transform: showDietary ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </button>
          {showDietary && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "10px 14px 4px", animation: "fadeIn 0.2s ease" }}>
              {DIETARY_OPTIONS.map(d => (
                <button key={d.key} onClick={() => toggleDietary(d.key)} style={{
                  padding: "6px 10px", borderRadius: 12, border: `2px solid ${dietary.includes(d.key) ? C.coral : "transparent"}`,
                  background: dietary.includes(d.key) ? C.coralLight : d.color,
                  color: C.navy, fontSize: 10, fontWeight: 600, cursor: "pointer",
                }}>
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Free Text: "Tell us more" ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>💬 Tell us more</span>
            <span style={{ fontSize: 9, color: C.g400 }}>Optional</span>
          </div>
          <textarea
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            placeholder={"Skip the tapping — just tell us everything!\ne.g. \"My daughter Emma turns 7 next Saturday. She loves Frozen. About 15 kids. One kid has a nut allergy. We need a cake, cupcakes, some sandwich platters, and balloons. Budget around $200.\""}
            style={{
              width: "100%", height: 80, padding: "10px 12px", borderRadius: 12,
              border: `1px solid ${freeText ? C.coral : C.g200}`,
              background: freeText ? "#FFFBF5" : C.g100,
              fontSize: 11, color: C.navy, outline: "none", boxSizing: "border-box",
              resize: "none", fontFamily: "inherit", lineHeight: 1.5,
            }}
          />
          {freeText && (
            <div style={{
              marginTop: 6, padding: "6px 10px", borderRadius: 8, background: "#F0FDF4",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 12 }}>🤖</span>
              <span style={{ fontSize: 9, color: C.navy }}>
                The AI will extract occasion, guest count, theme, dietary needs & preferences from your text — no need to fill in the fields above if you've covered them here.
              </span>
            </div>
          )}
        </div>

        {/* ── Summary pill (shows what the agent will work with) ── */}
        {(occasion || freeText) && (
          <div style={{
            marginBottom: 12, padding: "8px 12px", borderRadius: 12, background: C.g100,
            display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center",
          }}>
            <span style={{ fontSize: 9, color: C.g400, marginRight: 2 }}>AI will use:</span>
            {occasion && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{occasion}</span>}
            {followUps.who && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.who}</span>}
            {followUps.gender && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.gender}</span>}
            {followUps.style && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.style}</span>}
            {followUps.level && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.level}</span>}
            {followUps.type && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.type}</span>}
            {followUps.which && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{followUps.which}</span>}
            <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{guests} guests</span>
            {dietary.length > 0 && <span style={{ fontSize: 8, background: C.white, padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>{dietary.length} dietary</span>}
            {freeText && <span style={{ fontSize: 8, background: "#FEF9C3", padding: "2px 6px", borderRadius: 6, color: C.navy, fontWeight: 600 }}>+ free text</span>}
          </div>
        )}

        <CTA label="Build My Package →" onClick={() => (occasion || freeText) && onNext(occasion || "Celebration")} disabled={!occasion && !freeText} />
        <p style={{ textAlign: "center", fontSize: 8, color: C.g400, marginTop: 6 }}>
          You can skip most fields — the AI works great with just an occasion, or just your free text description.
        </p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 3. AI LOADING
// ══════════════════════════════════════════════
const LoadingScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { emoji: "🎂", text: "Selecting from Bakery..." },
    { emoji: "🥗", text: "Matching Deli platters..." },
    { emoji: "💐", text: "Picking flowers..." },
    { emoji: "🎈", text: "Adding party essentials..." },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(s => { if (s >= 3) { clearInterval(t); setTimeout(onDone, 500); return s; } return s + 1; }), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: `3px solid ${C.g200}`, borderTopColor: C.coral, animation: "spin 0.8s linear infinite", marginBottom: 20 }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 14px" }}>Curating your package...</h3>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", opacity: i <= step ? 1 : 0.25, transition: "opacity 0.3s" }}>
          <span style={{ fontSize: 18 }}>{s.emoji}</span>
          <span style={{ fontSize: 12, color: C.navy, fontWeight: i <= step ? 600 : 400 }}>{s.text}</span>
          {i < step && <span style={{ color: C.sage, fontSize: 14 }}>✓</span>}
        </div>
      ))}
    </div>
  );
};

// ══════════════════════════════════════════════
// SECTION DATA — with two-level filters (category → sub-filter)
// ══════════════════════════════════════════════
const getSections = (occasion) => [
  {
    key: "bakery", emoji: "🎂", title: "Bakery", subtitle: "Cakes, cupcakes & treats",
    headerBg: C.coralLight, customizerType: "cake",
    aiReason: `For a ${occasion || "Birthday"} with 20 guests, a 10" round + cupcake dozen is the perfect combo.`,
    filters: ["All", "Custom Cakes", "Sheet Cakes", "Cupcakes", "Donuts", "Cookies"],
    subFilters: {
      "All": ["Popular", "Budget-Friendly", "Premium"],
      "Custom Cakes": ["6\"", "8\"", "10\"", "12\"", "Chocolate", "Vanilla", "Red Velvet", "Photo Print", "Decopac"],
      "Sheet Cakes": ["Quarter", "Half", "Full", "Birthday", "Graduation", "Holiday"],
      "Cupcakes": ["Dozen", "2-Dozen", "Decorated", "Classic", "Mini"],
      "Donuts": ["Glazed", "Filled", "Specialty", "Dozen", "2-Dozen"],
      "Cookies": ["Decorated", "Classic", "Cookie Tray", "Message Cookies"],
    },
    notePlaceholder: "e.g. 'Happy Birthday Emma' or 'No nuts'",
    items: [
      { emoji: "🎂", name: "Custom Round 10\"", detail: "Chocolate, feeds 20-24, Decopac avail.", price: "$45.99", tag: "AI Pick", tagColor: C.coral, customizable: true },
      { emoji: "🎂", name: "Half Sheet Cake", detail: "Vanilla, feeds 24-48, custom msg", price: "$34.99", tag: "Budget", tagColor: C.sage, customizable: true },
      { emoji: "📷", name: "Photo Cake 10\"", detail: "Upload your image, edible print", price: "$49.99", tag: "Photo", tagColor: C.sky, customizable: true, customizerType: "photo" },
      { emoji: "🧁", name: "Cupcake Tower (24)", detail: "Assorted decorated", price: "$42.99", tag: "Fun", tagColor: C.lavender },
      { emoji: "🍪", name: "Cookie Tray (24)", detail: "Decorated themed cookies", price: "$24.99" },
      { emoji: "🍩", name: "Donut Platter (24)", detail: "Glazed & filled assorted", price: "$19.99" },
    ],
  },
  {
    key: "deli", emoji: "🥗", title: "Deli & Catering", subtitle: "Platters, trays & savory bites",
    headerBg: "#F0FDF4", customizerType: "catering",
    aiReason: "Sandwich pinwheels + cheese & crackers covers lunch and snacking for your group.",
    filters: ["All", "Sandwich", "Cheese & Meat", "Wings", "Veggie", "Fruit"],
    subFilters: {
      "All": ["Serves 10-15", "Serves 15-25", "Serves 25+"],
      "Sandwich": ["Pinwheel", "Croissant", "Hoagie", "Pretzel Roll", "Flatbread"],
      "Cheese & Meat": ["Classic", "Italian", "Charcuterie", "With Crackers"],
      "Wings": ["Buffalo", "BBQ", "Lemon Pepper", "Teriyaki", "12pc", "24pc", "48pc"],
      "Veggie": ["With Hummus", "With Ranch", "Organic"],
      "Fruit": ["Seasonal", "With Cheese", "With Chocolate Dip"],
    },
    notePlaceholder: "e.g. 'No pork' or 'Extra ranch on side'",
    items: [
      { emoji: "🥪", name: "Pinwheel Tray 16\"", detail: "Assorted, serves 12-16", price: "$49.99", tag: "AI Pick", tagColor: C.coral, customizable: true },
      { emoji: "🧀", name: "Classic Party Tray 16\"", detail: "Meat & cheese, serves 15-20", price: "$39.99", tag: "Popular", tagColor: C.sage, customizable: true },
      { emoji: "🍗", name: "Wing Fling Tray 16\"", detail: "Buffalo & BBQ, serves 12-16", price: "$44.99", customizable: true },
      { emoji: "🥕", name: "Veggie & Hummus", detail: "Fresh cut, serves 15", price: "$29.99" },
      { emoji: "🍇", name: "Fruit & Cheese Tray", detail: "Seasonal premium", price: "$34.99" },
      { emoji: "🥖", name: "Pretzel Sliders 18\"", detail: "Assorted deli meats", price: "$54.99", customizable: true },
    ],
  },
  {
    key: "floral", emoji: "💐", title: "Floral", subtitle: "Bouquets & centerpieces",
    headerBg: "#FAF5FF",
    aiReason: "A medium centerpiece bouquet is the perfect table accent for a birthday.",
    filters: ["All", "Centerpieces", "Bouquets", "Roses", "Seasonal"],
    subFilters: {
      "All": ["Under $20", "$20–40", "$40+"],
      "Centerpieces": ["Small", "Medium", "Large", "With Vase"],
      "Bouquets": ["Mixed", "Single Variety", "Premium", "Wrapped"],
      "Roses": ["6-Stem", "12-Stem", "24-Stem", "Red", "Pink", "Mixed"],
      "Seasonal": ["Spring", "Summer", "Fall", "Winter / Holiday"],
    },
    notePlaceholder: "e.g. 'Pink & white theme' or 'No lilies'",
    items: [
      { emoji: "💐", name: "Centerpiece Bouquet", detail: "Seasonal mix, medium, vase incl.", price: "$29.99", tag: "AI Pick", tagColor: C.coral },
      { emoji: "🌹", name: "Rose Arrangement", detail: "12 red roses, glass vase", price: "$39.99" },
      { emoji: "🌸", name: "Spring Mixed", detail: "Bright seasonal flowers", price: "$19.99", tag: "Value", tagColor: C.sage },
      { emoji: "🌻", name: "Sunflower Bunch", detail: "6-stem bundle", price: "$14.99" },
      { emoji: "💐", name: "Premium Arrangement", detail: "Designer's choice, large", price: "$59.99", tag: "Luxury", tagColor: C.gold },
    ],
  },
  {
    key: "extras", emoji: "🎈", title: "Party Extras", subtitle: "Balloons, plates, drinks & more",
    headerBg: "#FEF9C3",
    aiReason: "Balloons + plates + cups covers your basics. Don't forget drinks!",
    filters: ["All", "Balloons", "Tableware", "Drinks", "Decor"],
    subFilters: {
      "All": ["Essentials", "Premium Pack", "Kid-Friendly"],
      "Balloons": ["Latex", "Foil / Mylar", "Number / Letter", "Themed", "Helium"],
      "Tableware": ["Plates", "Cups", "Napkins", "Cutlery", "Themed Sets"],
      "Drinks": ["Soda", "Juice", "Water", "Sparkling", "Alcohol Mixers"],
      "Decor": ["Banners", "Streamers", "Confetti", "Table Covers", "Candles"],
    },
    notePlaceholder: "e.g. 'Frozen theme plates' or '2L Coke x4'",
    items: [
      { emoji: "🎈", name: "Balloon Bundle (12)", detail: "Assorted + 2 foil", price: "$12.99", tag: "AI Pick", tagColor: C.coral },
      { emoji: "🍽️", name: "Plate Pack (24)", detail: "Themed disposable", price: "$6.99" },
      { emoji: "🥤", name: "Cup & Napkin Set", detail: "24 cups + 50 napkins", price: "$8.99" },
      { emoji: "🥤", name: "Coke 2L Bottles (4)", detail: "Coke, Sprite, Fanta, Diet", price: "$11.96" },
      { emoji: "💧", name: "Water Bottles 24pk", detail: "Purified", price: "$4.99" },
      { emoji: "🍴", name: "Cutlery Set (48pc)", detail: "Fork, knife, spoon", price: "$5.99" },
    ],
  },
];

// ══════════════════════════════════════════════
// 4. PACKAGE REVIEW (with customization entry)
// ══════════════════════════════════════════════
const SectionBlock = ({ section, expanded, onToggle, onCustomize }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [noteText, setNoteText] = useState("");

  const currentFilterName = section.filters[activeFilter];
  const subFilters = section.subFilters?.[currentFilterName] || [];

  const handleFilterChange = (i) => {
    setActiveFilter(i);
    setActiveSubFilter(null); // reset sub-filter when category changes
  };

  return (
    <div style={{ marginBottom: 14, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.g200}`, background: C.white }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
        background: section.headerBg, border: "none", cursor: "pointer", textAlign: "left"
      }}>
        <span style={{ fontSize: 20 }}>{section.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>{section.title}</div>
          <div style={{ fontSize: 9, color: C.g600 }}>{section.subtitle}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.coral }}>{section.items[selectedIdx].price}</div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.g400} strokeWidth="2.5" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </button>
      {expanded && (
        <div style={{ padding: "8px 14px 14px" }}>
          {/* AI recommendation */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 10, background: "#FEF9C3", marginBottom: 8 }}>
            <span style={{ fontSize: 12 }}>🤖</span>
            <div style={{ fontSize: 10, color: C.navy, lineHeight: 1.4 }}><strong>AI Pick:</strong> {section.aiReason}</div>
          </div>

          {/* Row 1: Category filter */}
          <div style={{ display: "flex", gap: 5, marginBottom: 4, overflowX: "auto", scrollbarWidth: "none" }}>
            {section.filters.map((f, i) => <Chip key={f} label={f} active={activeFilter === i} onClick={() => handleFilterChange(i)} />)}
          </div>

          {/* Row 2: Sub-filter (contextual) */}
          {subFilters.length > 0 && (
            <div style={{
              display: "flex", gap: 4, marginBottom: 6, overflowX: "auto", scrollbarWidth: "none",
              padding: "4px 0",
            }}>
              {subFilters.map((sf, i) => (
                <button key={sf} onClick={() => setActiveSubFilter(activeSubFilter === i ? null : i)} style={{
                  padding: "4px 10px", borderRadius: 14, border: `1px solid ${activeSubFilter === i ? C.navy : C.g200}`,
                  background: activeSubFilter === i ? C.navy : C.g100,
                  color: activeSubFilter === i ? C.white : C.g600,
                  fontSize: 9, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                }}>{sf}</button>
              ))}
            </div>
          )}

          {/* Active filters summary */}
          {(activeFilter > 0 || activeSubFilter !== null) && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 8, color: C.g400 }}>Showing:</span>
              <span style={{ fontSize: 8, background: C.coralLight, color: C.coral, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>{currentFilterName}</span>
              {activeSubFilter !== null && (
                <span style={{ fontSize: 8, background: "#EEF2FF", color: C.navy, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>{subFilters[activeSubFilter]}</span>
              )}
              <button onClick={() => { setActiveFilter(0); setActiveSubFilter(null); }} style={{
                background: "none", border: "none", color: C.g400, fontSize: 8, cursor: "pointer", textDecoration: "underline",
              }}>Clear</button>
            </div>
          )}

          {/* Product carousel */}
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "2px 0 6px", scrollbarWidth: "none" }}>
            {section.items.map((item, i) => (
              <ProductCard key={i} item={item} selected={selectedIdx === i} onSelect={() => setSelectedIdx(i)}
                onCustomize={() => onCustomize(item.customizerType || section.customizerType)} />
            ))}
          </div>

          {/* Customer notes */}
          <input type="text" placeholder={section.notePlaceholder} value={noteText} onChange={e => setNoteText(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 11, color: C.navy, outline: "none", boxSizing: "border-box", background: C.g100, marginTop: 4 }} />
        </div>
      )}
    </div>
  );
};

const PackageReviewScreen = ({ occasion, onNext, onBack, onCustomize }) => {
  const [expandedIdx, setExpandedIdx] = useState(0);
  const sections = getSections(occasion);
  return (
    <div>
      <Progress step={2} total={4} />
      <Back onClick={onBack} />
      <div style={{ padding: "0 14px 14px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>Your {occasion} Package</h2>
        <p style={{ color: C.g600, fontSize: 11, margin: "2px 0 10px" }}>AI-curated for 20 guests • Expand to customize each section</p>
        {sections.map((s, i) => (
          <SectionBlock key={s.key} section={s} expanded={expandedIdx === i}
            onToggle={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
            onCustomize={(type) => onCustomize(type)} />
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", borderTop: `1px solid ${C.g200}` }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Estimated Total</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: C.coral }}>$138.96</span>
        </div>
        <CTA label="Continue to Delivery →" onClick={onNext} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 5. CAKE PREVIEW & CUSTOMIZER
// ══════════════════════════════════════════════
const CakePreview = ({ size, shape, flavor, frostingColor, message, decopac }) => {
  const sizeMap = { '6"': 55, '8"': 75, '10"': 95, '12"': 115, 'Quarter Sheet': 100, 'Half Sheet': 130, 'Full Sheet': 160 };
  const flavorMap = { Chocolate: '#5C3317', Vanilla: '#F5E6CC', 'Red Velvet': '#8B1A1A', Marble: '#D4A574', Carrot: '#D4853B', Lemon: '#FDE68A' };
  const fColorMap = { White: '#FEFEFE', Pink: '#F9A8D4', Blue: '#93C5FD', Purple: '#C084FC', Yellow: '#FDE047', Green: '#86EFAC', Red: '#FCA5A5' };
  const w = sizeMap[size] || 95;
  const isSheet = size?.includes('Sheet');
  const br = isSheet ? 8 : shape === 'Round' ? w : 12;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
      <div style={{ position: "relative" }}>
        <div style={{ width: w + 8, height: 14, borderRadius: `${br}px ${br}px 0 0`, background: fColorMap[frostingColor] || '#FEFEFE', border: `2px solid ${C.g200}`, borderBottom: "none" }} />
        <div style={{ width: w + 8, height: w * 0.45, borderRadius: `0 0 ${br}px ${br}px`, background: `linear-gradient(180deg, ${fColorMap[frostingColor] || '#FEFEFE'} 0%, ${flavorMap[flavor] || '#F5E6CC'} 30%)`, border: `2px solid ${C.g200}`, borderTop: "none", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {message && <div style={{ fontSize: Math.min(9, 100 / message.length), fontWeight: 700, color: frostingColor === 'White' ? C.coral : C.white, textAlign: "center", padding: "0 4px", fontStyle: "italic", textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}>{message}</div>}
        </div>
        {decopac && <div style={{ position: "absolute", top: -12, right: -6, background: C.gold, borderRadius: 6, padding: "1px 5px", fontSize: 7, fontWeight: 700, color: C.navy }}>🎬 {decopac}</div>}
      </div>
      <div style={{ width: w + 20, height: 6, borderRadius: "0 0 50% 50%", background: C.g200, marginTop: -1 }} />
      <div style={{ fontSize: 8, color: C.g400, marginTop: 4 }}>Live Preview</div>
    </div>
  );
};

const CakeCustomizer = ({ onDone, onBack, onPhotoEditor }) => {
  const [size, setSize] = useState('10"');
  const [shape, setShape] = useState('Round');
  const [flavor, setFlavor] = useState('Chocolate');
  const [filling, setFilling] = useState('Buttercream');
  const [frosting, setFrosting] = useState('Buttercream');
  const [frostingColor, setFrostingColor] = useState('White');
  const [message, setMessage] = useState('Happy Birthday!');
  const [decopac, setDecopac] = useState(null);
  const [tab, setTab] = useState(0);
  const tabs = ['Base', 'Frosting', 'Message', 'Extras'];
  const colors = [{ n: 'White', h: '#FEFEFE' }, { n: 'Pink', h: '#F9A8D4' }, { n: 'Blue', h: '#93C5FD' }, { n: 'Purple', h: '#C084FC' }, { n: 'Yellow', h: '#FDE047' }, { n: 'Green', h: '#86EFAC' }, { n: 'Red', h: '#FCA5A5' }];

  return (
    <div>
      <Back onClick={onBack} label="Back to Package" />
      <div style={{ padding: "0 16px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>🎂 Customize Your Cake</h2>
        <p style={{ color: C.g600, fontSize: 10, margin: "0 0 6px" }}>Build step by step • Preview updates live</p>
        <div style={{ background: C.g100, borderRadius: 14, padding: "4px 10px 8px", marginBottom: 10 }}>
          <CakePreview size={size} shape={shape} flavor={flavor} frostingColor={frostingColor} message={message} decopac={decopac} />
          <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            {[size, shape, flavor, frosting].map((v, i) => (
              <span key={i} style={{ fontSize: 7, background: C.white, padding: "1px 5px", borderRadius: 4, color: C.g600, fontWeight: 600 }}>{v}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 3, marginBottom: 10, background: C.g100, borderRadius: 10, padding: 2 }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: 1, padding: "6px 0", borderRadius: 8, border: "none", cursor: "pointer",
              background: tab === i ? C.white : "transparent", color: tab === i ? C.coral : C.g600,
              fontSize: 10, fontWeight: 700, boxShadow: tab === i ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>{t}</button>
          ))}
        </div>
        <div style={{ minHeight: 150 }}>
          {tab === 0 && (<>
            <OptionRow label="Size" value={size} options={['6"', '8"', '10"', '12"']} onChange={setSize} />
            <OptionRow label="Shape" value={shape} options={['Round', 'Quarter Sheet', 'Half Sheet', 'Full Sheet']} onChange={v => { setShape(v); if (v !== 'Round') setSize(v); }} />
            <OptionRow label="Flavor" value={flavor} options={['Chocolate', 'Vanilla', 'Red Velvet', 'Marble', 'Carrot', 'Lemon']} onChange={setFlavor} />
            <OptionRow label="Filling" value={filling} options={['Buttercream', 'Bavarian', 'Strawberry', 'Choc Mousse', 'Lemon', 'None']} onChange={setFilling} />
          </>)}
          {tab === 1 && (<>
            <OptionRow label="Frosting Type" value={frosting} options={['Buttercream', 'Whipped', 'Fondant', 'Cream Cheese']} onChange={setFrosting} />
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Frosting Color</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {colors.map(c => <ColorDot key={c.n} color={c.h} active={frostingColor === c.n} onClick={() => setFrostingColor(c.n)} label={c.n} />)}
              </div>
            </div>
          </>)}
          {tab === 2 && (<>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Cake Message</div>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} maxLength={40} placeholder="e.g. Happy Birthday Emma!"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 12, color: C.navy, outline: "none", boxSizing: "border-box", background: C.g100 }} />
              <div style={{ fontSize: 9, color: C.g400, marginTop: 3, textAlign: "right" }}>{message.length}/40</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Message Color</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ n: 'Red', h: C.coral }, { n: 'Blue', h: '#3B82F6' }, { n: 'Green', h: '#22C55E' }, { n: 'Purple', h: '#8B5CF6' }, { n: 'Black', h: '#1F2937' }].map(c => <ColorDot key={c.n} color={c.h} active={false} onClick={() => { }} label={c.n} />)}
            </div>
          </>)}
          {tab === 3 && (<>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Decopac Character Topper</div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                {[{ l: 'None', e: '❌' }, { l: 'Frozen', e: '❄️' }, { l: 'Spider-Man', e: '🕷️' }, { l: 'Bluey', e: '🐕' }, { l: 'Mario', e: '🍄' }, { l: 'Barbie', e: '💅' }, { l: 'Minecraft', e: '⛏️' }].map(d => (
                  <button key={d.l} onClick={() => setDecopac(d.l === 'None' ? null : d.l)} style={{
                    minWidth: 56, padding: "8px 4px", borderRadius: 10, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    border: `2px solid ${decopac === d.l || (!decopac && d.l === 'None') ? C.coral : C.g200}`,
                    background: decopac === d.l || (!decopac && d.l === 'None') ? C.coralLight : C.white,
                  }}>
                    <span style={{ fontSize: 18 }}>{d.e}</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: C.navy }}>{d.l}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 8, color: C.g400, marginTop: 3 }}>+ $3.99 for character toppers</div>
            </div>
            <button onClick={onPhotoEditor} style={{ width: "100%", padding: "10px 12px", borderRadius: 12, background: "#F0F9FF", border: `1px dashed ${C.sky}`, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>📷</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>Add Edible Photo Print</div>
                <div style={{ fontSize: 9, color: C.g600 }}>Upload & position your photo • +$5.99</div>
              </div>
              <span style={{ color: C.coral, fontWeight: 700 }}>→</span>
            </button>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Add-ons</div>
            {[{ l: 'Birthday Candles (12pk)', p: '+$1.99', e: '🕯️' }, { l: 'Number Candle', p: '+$2.49', e: '🔢' }, { l: 'Sparklers (4pk)', p: '+$3.99', e: '✨' }].map(a => (
              <div key={a.l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.g100}` }}>
                <span style={{ fontSize: 14 }}>{a.e}</span>
                <span style={{ flex: 1, fontSize: 10, color: C.navy }}>{a.l}</span>
                <span style={{ fontSize: 9, color: C.g600 }}>{a.p}</span>
                <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${C.g300}`, cursor: "pointer" }} />
              </div>
            ))}
          </>)}
        </div>
        <div style={{ marginTop: 10 }}><CTA label="Save Cake to Package ✓" onClick={onDone} /></div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 6. PHOTO CAKE EDITOR
// ══════════════════════════════════════════════
const PhotoCakeEditor = ({ onDone, onBack }) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [zoom, setZoom] = useState(50);
  return (
    <div>
      <Back onClick={onBack} label="Back to Cake" />
      <div style={{ padding: "0 16px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>📷 Photo Cake Editor</h2>
        <p style={{ color: C.g600, fontSize: 10, margin: "0 0 10px" }}>Upload, position & preview your edible print</p>
        <div style={{ background: C.g100, borderRadius: 16, padding: 14, marginBottom: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 160, height: 160, borderRadius: "50%", border: `3px dashed ${C.g300}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: hasPhoto ? "#FDE68A" : C.white, position: "relative" }}>
            {hasPhoto ? (
              <div style={{ width: 90 + zoom * 0.5, height: 90 + zoom * 0.5, borderRadius: 8, background: `linear-gradient(135deg, #93C5FD, #A78BFA)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <span style={{ fontSize: 32 }}>👨‍👩‍👧</span>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}><span style={{ fontSize: 28 }}>📤</span><br /><span style={{ fontSize: 10, color: C.g400, fontWeight: 600 }}>Tap to upload</span></div>
            )}
            <div style={{ position: "absolute", bottom: 4, fontSize: 7, color: C.g400, background: "rgba(255,255,255,0.85)", padding: "1px 5px", borderRadius: 3 }}>Printable area</div>
          </div>
          <button onClick={() => setHasPhoto(true)} style={{ marginTop: 8, padding: "7px 18px", borderRadius: 10, border: `1px solid ${C.coral}`, background: hasPhoto ? C.coralLight : "transparent", color: C.coral, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
            {hasPhoto ? "Change Photo" : "Upload from Camera Roll"}
          </button>
        </div>
        {hasPhoto && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: C.g600, minWidth: 36 }}>Zoom</span>
              <input type="range" min={0} max={100} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ flex: 1, accentColor: C.coral, height: 3 }} />
              <span style={{ fontSize: 10, color: C.g600, minWidth: 28 }}>{zoom}%</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {['Rotate', 'Flip', 'Crop', 'Filter'].map(a => (
                <button key={a} style={{ flex: 1, padding: 7, borderRadius: 8, border: `1px solid ${C.g200}`, background: C.white, color: C.navy, fontSize: 9, fontWeight: 600, cursor: "pointer" }}>{a}</button>
              ))}
            </div>
            <div style={{ marginTop: 8, padding: "6px 8px", borderRadius: 8, background: "#FEF9C3", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10 }}>💡</span>
              <span style={{ fontSize: 8, color: C.navy }}>For best quality, use a photo at least 1000×1000 pixels</span>
            </div>
          </div>
        )}
        <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Print Preview</div>
        <div style={{ background: C.g100, borderRadius: 12, padding: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: hasPhoto ? "#FDE68A" : C.g200, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.g300}`, flexShrink: 0 }}>
            {hasPhoto ? <span style={{ fontSize: 20 }}>👨‍👩‍👧</span> : <span style={{ fontSize: 8, color: C.g400 }}>No photo</span>}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>10" Round Chocolate Cake</div>
            <div style={{ fontSize: 9, color: C.g600 }}>Edible image on icing sheet</div>
            <div style={{ fontSize: 9, color: C.coral, fontWeight: 600 }}>$49.99 + $5.99 print</div>
          </div>
        </div>
        <CTA label={hasPhoto ? "Save Photo Cake ✓" : "Upload a Photo to Continue"} onClick={hasPhoto ? onDone : undefined} disabled={!hasPhoto} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 7. CATERING CUSTOMIZER
// ══════════════════════════════════════════════
const CateringCustomizer = ({ onDone, onBack }) => {
  const [bread, setBread] = useState('Croissant');
  const [proteins, setProteins] = useState(['Turkey', 'Ham']);
  const [sides, setSides] = useState(['Pickle Spears']);
  const [servings, setServings] = useState('12-16');
  const [condiments, setCondiments] = useState(['Mustard', 'Mayo']);
  const toggle = (arr, set, item) => set(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);

  return (
    <div>
      <Back onClick={onBack} label="Back to Package" />
      <div style={{ padding: "0 16px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>🥗 Customize Platter</h2>
        <p style={{ color: C.g600, fontSize: 10, margin: "0 0 8px" }}>Sandwich Pinwheel Tray • Build it your way</p>
        <div style={{ background: C.g100, borderRadius: 14, padding: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, background: "#F0FDF4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 24 }}>🥪</span><span style={{ fontSize: 7, color: C.g400, fontWeight: 600 }}>16" Tray</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>Sandwich Pinwheel Tray</div>
            <div style={{ fontSize: 9, color: C.g600 }}>{bread} • {proteins.join(', ')} • Serves {servings}</div>
            <div style={{ display: "flex", gap: 3, marginTop: 3, flexWrap: "wrap" }}>
              {[...proteins, bread].map((t, i) => <span key={i} style={{ fontSize: 7, background: C.white, padding: "1px 4px", borderRadius: 3, color: C.g600, fontWeight: 600 }}>{t}</span>)}
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.coral }}>$49.99</div>
        </div>
        <OptionRow label="🍽️ Serving Size" value={servings} options={['8-10', '12-16', '18-24', '24-36']} onChange={setServings} />
        <OptionRow label="🍞 Bread Type" value={bread} options={['Croissant', 'Tortilla Wrap', 'Pretzel Roll', 'Sourdough', 'Flatbread']} onChange={setBread} />
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>🥩 Proteins (select up to 4)</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {['Turkey', 'Ham', 'Roast Beef', 'Salami', 'Chicken Salad', 'Tuna Salad', 'Veggie'].map(p => (
              <Chip key={p} label={p} active={proteins.includes(p)} onClick={() => toggle(proteins, setProteins, p)} color={proteins.includes(p) ? C.sage : undefined} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>🫙 Condiments</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {['Mustard', 'Mayo', 'Ranch', 'Italian', 'Honey Mustard', 'None'].map(c => (
              <Chip key={c} label={c} active={condiments.includes(c)} onClick={() => toggle(condiments, setCondiments, c)} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>🥒 Sides</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {['Pickle Spears', 'Pepperoncini', 'Olives', 'Lettuce/Tomato', 'None'].map(s => (
              <Chip key={s} label={s} active={sides.includes(s)} onClick={() => toggle(sides, setSides, s)} color={sides.includes(s) ? C.sage : undefined} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6 }}>📝 Special Instructions</div>
          <textarea placeholder="e.g. 'No pork' or 'Cut pinwheels smaller'" style={{ width: "100%", height: 50, padding: "8px 10px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 10, color: C.navy, outline: "none", boxSizing: "border-box", background: C.g100, resize: "none", fontFamily: "inherit" }} />
        </div>
        <CTA label="Save Platter to Package ✓" onClick={onDone} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 8. DELIVERY & CHECKOUT
// ══════════════════════════════════════════════
const DeliveryScreen = ({ onNext, onBack }) => {
  const [method, setMethod] = useState(0);
  const [slot, setSlot] = useState(2);
  return (
    <div>
      <Progress step={3} total={4} />
      <Back onClick={onBack} />
      <div style={{ padding: "0 18px 18px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "0 0 10px" }}>Delivery or Pickup?</h2>
        {[
          { emoji: "🚗", label: "Store Pickup", desc: "Ready at your chosen time", detail: "FREE", bg: "#F0FDF4" },
          { emoji: "🚚", label: "Home Delivery", desc: "Delivered to your door", detail: "$9.99", bg: "#F0F9FF" },
        ].map((m, i) => (
          <button key={i} onClick={() => setMethod(i)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px",
            borderRadius: 14, border: `2px solid ${method === i ? C.coral : C.g200}`,
            background: method === i ? m.bg : C.white, cursor: "pointer", marginBottom: 8, textAlign: "left",
          }}>
            <span style={{ fontSize: 22 }}>{m.emoji}</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{m.label}</div><div style={{ fontSize: 10, color: C.g600 }}>{m.desc}</div></div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.coral }}>{m.detail}</span>
          </button>
        ))}
        <div style={{ marginTop: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>Time slot</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 6 }}>
            {["9–11 AM", "11–1 PM", "1–3 PM", "3–5 PM", "5–7 PM", "7–9 PM"].map((t, i) => (
              <button key={t} onClick={() => setSlot(i)} style={{
                padding: 7, borderRadius: 10, border: `1px solid ${slot === i ? C.coral : C.g200}`,
                background: slot === i ? C.coralLight : C.white, textAlign: "center", fontSize: 10,
                fontWeight: 600, color: slot === i ? C.coral : C.navy, cursor: "pointer"
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: C.g100, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, color: C.g600 }}>Package items</span><span style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>$138.96</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, color: C.g600 }}>{method === 0 ? "Pickup" : "Delivery"}</span><span style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>{method === 0 ? "FREE" : "$9.99"}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: `1px solid ${C.g200}` }}><span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Total</span><span style={{ fontSize: 16, fontWeight: 800, color: C.coral }}>{method === 0 ? "$138.96" : "$148.95"}</span></div>
        </div>
        <CTA label="Proceed to Checkout →" onClick={onNext} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// 9. CONFIRMATION
// ══════════════════════════════════════════════
const ConfirmScreen = ({ onRestart }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
    <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.sage, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: "0 8px 24px rgba(168,213,186,0.4)" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
    <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, margin: "0 0 6px" }}>All Set! 🎉</h2>
    <p style={{ color: C.g600, fontSize: 12, margin: 0, lineHeight: 1.5 }}>Your celebration package is confirmed.<br />We'll send updates as each department<br />prepares your order.</p>
    <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: C.g100, width: "100%", textAlign: "left" }}>
      {["🎂 Custom Round Cake 10\" (Choc, Decopac)", "🧁 Cupcake Tower (24)", "🥪 Pinwheel Tray 16\" (Custom)", "🧀 Classic Party Tray", "💐 Centerpiece Bouquet", "🎈 Balloon Bundle + Tableware"].map((t, i) => (
        <div key={i} style={{ fontSize: 10, color: C.navy, padding: "3px 0" }}>{t}</div>
      ))}
      <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: C.g600 }}>Pickup: Sat 1–3 PM</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.coral }}>$138.96</span>
      </div>
    </div>
    <button onClick={onRestart} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 14, border: `2px solid ${C.coral}`, background: "transparent", color: C.coral, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
      Plan Another Celebration
    </button>
  </div>
);

// ══════════════════════════════════════════════
// MAIN APP — FULL FLOW
// ══════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [occasion, setOccasion] = useState("Birthday");
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const push = (s) => { setHistory(h => [...h, screen]); setScreen(s); };
  const pop = () => { const prev = history[history.length - 1] || "welcome"; setHistory(h => h.slice(0, -1)); setScreen(prev); };
  const reset = () => { setScreen("welcome"); setHistory([]); setOccasion("Birthday"); };

  const handleCustomize = (type) => {
    if (type === "photo") push("photo-editor");
    else if (type === "catering") push("catering-customizer");
    else push("cake-customizer");
  };

  const screenMap = {
    "welcome": <WelcomeScreen onStart={() => push("intake")} />,
    "intake": <IntakeScreen onNext={(occ) => { setOccasion(occ); push("loading"); }} onBack={pop} />,
    "loading": <LoadingScreen onDone={() => { setHistory(h => [...h, "loading"]); setScreen("package"); }} />,
    "package": <PackageReviewScreen occasion={occasion} onNext={() => push("delivery")} onBack={() => { setHistory([]); setScreen("intake"); }} onCustomize={handleCustomize} />,
    "cake-customizer": <CakeCustomizer onDone={pop} onBack={pop} onPhotoEditor={() => push("photo-editor")} />,
    "photo-editor": <PhotoCakeEditor onDone={pop} onBack={pop} />,
    "catering-customizer": <CateringCustomizer onDone={pop} onBack={pop} />,
    "delivery": <DeliveryScreen onNext={() => push("confirm")} onBack={pop} />,
    "confirm": <ConfirmScreen onRestart={reset} />,
  };

  const allScreens = [
    { key: "welcome", label: "1. Welcome" },
    { key: "intake", label: "2. Occasion + Details" },
    { key: "package", label: "3. Package Review" },
    { key: "cake-customizer", label: "4. Cake Builder" },
    { key: "photo-editor", label: "5. Photo Cake Editor" },
    { key: "catering-customizer", label: "6. Catering Customizer" },
    { key: "delivery", label: "7. Delivery & Checkout" },
    { key: "confirm", label: "8. Confirmation" },
  ];

  const navLabels = [
    { key: "welcome", short: "Welcome" },
    { key: "intake", short: "Intake" },
    { key: "loading", short: "Loading" },
    { key: "package", short: "Package" },
    { key: "cake-customizer", short: "🎂 Cake" },
    { key: "photo-editor", short: "📷 Photo" },
    { key: "catering-customizer", short: "🥗 Platter" },
    { key: "delivery", short: "Delivery" },
    { key: "confirm", short: "Done" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3F0", fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
      <div style={{ textAlign: "center", padding: "24px 16px 6px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: 0 }}>🎉 Celebration Central — Complete Flow</h1>
        <p style={{ color: C.g600, fontSize: 12, margin: "6px 0 2px" }}>
          Full flow: Intake → AI Package Builder → Customizers (Cake, Photo, Catering) → Checkout
        </p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
          <button onClick={() => setShowAll(false)} style={{ padding: "6px 16px", borderRadius: 16, border: "none", cursor: "pointer", background: !showAll ? C.coral : C.g200, color: !showAll ? C.white : C.g600, fontSize: 11, fontWeight: 700 }}>Interactive Flow</button>
          <button onClick={() => setShowAll(true)} style={{ padding: "6px 16px", borderRadius: 16, border: "none", cursor: "pointer", background: showAll ? C.coral : C.g200, color: showAll ? C.white : C.g600, fontSize: 11, fontWeight: 700 }}>All Screens</button>
        </div>
      </div>

      {showAll ? (
        <div style={{ padding: "12px 16px 32px", display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
          {allScreens.map(s => (
            <Phone key={s.key} title={s.label}>
              {s.key === "welcome" && <WelcomeScreen onStart={() => { }} />}
              {s.key === "intake" && <IntakeScreen onNext={() => { }} onBack={() => { }} />}
              {s.key === "package" && <PackageReviewScreen occasion="Birthday" onNext={() => { }} onBack={() => { }} onCustomize={() => { }} />}
              {s.key === "cake-customizer" && <CakeCustomizer onDone={() => { }} onBack={() => { }} onPhotoEditor={() => { }} />}
              {s.key === "photo-editor" && <PhotoCakeEditor onDone={() => { }} onBack={() => { }} />}
              {s.key === "catering-customizer" && <CateringCustomizer onDone={() => { }} onBack={() => { }} />}
              {s.key === "delivery" && <DeliveryScreen onNext={() => { }} onBack={() => { }} />}
              {s.key === "confirm" && <ConfirmScreen onRestart={() => { }} />}
            </Phone>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 16px 32px" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {navLabels.map(n => (
              <button key={n.key} onClick={() => { if (n.key === "intake") setOccasion("Birthday"); setHistory([]); setScreen(n.key); }} style={{
                padding: "3px 8px", borderRadius: 10, border: "none", cursor: "pointer",
                background: screen === n.key ? C.coral : C.g200,
                color: screen === n.key ? C.white : C.g600,
                fontSize: 9, fontWeight: 600,
              }}>{n.short}</button>
            ))}
          </div>
          <Phone>{screenMap[screen]}</Phone>
          <p style={{ color: C.g400, fontSize: 10, marginTop: 8 }}>
            {screen === "package" && "👆 Expand a section → select an item → tap \"Customize\" to open the builder"}
            {screen === "cake-customizer" && "🎂 Switch tabs: Base → Frosting → Message → Extras (Decopac + Photo)"}
            {screen === "photo-editor" && "📷 Tap 'Upload from Camera Roll' to simulate adding a photo"}
            {screen === "catering-customizer" && "🥗 Multi-select proteins, condiments & sides — preview updates live"}
          </p>
        </div>
      )}

      {/* Flow diagram */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 32px" }}>
        <div style={{ background: C.white, borderRadius: 14, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: C.navy, margin: "0 0 10px" }}>📱 Complete Navigation Map</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 10, color: C.g600 }}>
            {[
              { l: "Welcome", c: C.coral, arrow: true },
              { l: "Intake (Occasion + Guests + Budget + Date)", c: "#E07A5F", arrow: true },
              { l: "AI Loading (curating...)", c: C.gold, arrow: true },
              { l: "Package Review (4 expandable sections with carousels)", c: C.sage, arrow: true, children: [
                  "→ 🎂 Cake Builder (size, shape, flavor, frosting, color, message, Decopac)",
                  "→ → 📷 Photo Cake Editor (upload, zoom, rotate, crop, preview)",
                  "→ 🥗 Catering Customizer (bread, proteins, condiments, sides, instructions)",
                ] },
              { l: "Delivery & Checkout (pickup/delivery, time slot, total)", c: C.sky, arrow: true },
              { l: "Confirmation (order summary)", c: C.sage, arrow: false },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.c, flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: C.navy }}>{s.l}</span>
                </div>
                {s.children && s.children.map((ch, j) => (
                  <div key={j} style={{ marginLeft: 20, padding: "2px 0", color: C.g600, fontSize: 9 }}>{ch}</div>
                ))}
                {s.arrow && <div style={{ marginLeft: 4, color: C.g300, fontSize: 10 }}>↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}