# Mailert Phase 2.5 - Light theme, dark toggle and Creator Safety Hub
# Run from PowerShell: cd D:\Mailert ; & .\mailert_light_upgrade.ps1
$ErrorActionPreference = 'Stop'
Set-Location 'D:\Mailert\frontend'
New-Item -ItemType Directory -Force -Path 'src\components', 'src\styles' | Out-Null

@'
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUp, BookOpen, Check, CheckCheck, ChevronDown,
  CircleAlert, ClipboardCopy, CreditCard, Fingerprint, Link2,
  Moon, ShieldCheck, Sparkles, Sun, UserRound, type LucideIcon
} from "lucide-react";
import "./MailertUpgrade.css";

type Theme = "light" | "dark";
type Story = "creator" | "freelancer" | "account";

const cases: {
  id: Story; icon: LucideIcon; title: string; subtitle: string;
  signals: string[]; next: string;
}[] = [
  {
    id: "creator", icon: Sparkles, title: "Brand collaboration",
    subtitle: "A sponsorship offer asks you to pay first.",
    signals: ["Advance payment to unlock an offer", "Unverified brand domain", "Pressure to act immediately"],
    next: "Contact the brand through its independently found official website."
  },
  {
    id: "freelancer", icon: CreditCard, title: "Freelance payment",
    subtitle: "A client sends an unexpected invoice link.",
    signals: ["New payment portal", "Changed bank details", "Unexpected attachment or link"],
    next: "Confirm any payment changes using a previously trusted channel."
  },
  {
    id: "account", icon: Fingerprint, title: "Account verification",
    subtitle: "An email says your profile will be disabled.",
    signals: ["Login demanded by email", "Threat of suspension", "Request for OTP or recovery code"],
    next: "Open the platform yourself using its official app or saved bookmark."
  }
];

const checklist = [
  "I checked the actual sender address, not just the display name.",
  "I verified the brand or company through its official channels.",
  "I did not open unfamiliar links or download unexpected files.",
  "I did not share passwords, OTPs or recovery codes.",
  "I checked payment requests independently before taking action."
];

const faqs = [
  {
    question: "Can Mailert guarantee that an email is safe?",
    answer: "No. Even a lower-risk assessment cannot prove a sender is genuine. Independent verification is always important."
  },
  {
    question: "Does the scanner currently use AI?",
    answer: "Not yet. The current frontend demonstrates the interface. Real analysis, evaluation and integrations will be added in later phases."
  },
  {
    question: "Is this checklist connected to my account?",
    answer: "No. It is a local interactive checklist in this preview. We do not save its selections to a server."
  }
];

export default function MailertUpgrade() {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return localStorage.getItem("mailert-theme") === "dark" ? "dark" : "light"; }
    catch { return "light"; }
  });
  const [story, setStory] = useState<Story>("creator");
  const [checks, setChecks] = useState<boolean[]>(() => checklist.map(() => false));
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [scroll, setScroll] = useState(0);
  const reduced = useReducedMotion();
  const selected = cases.find((item) => item.id === story)!;
  const completed = checks.filter(Boolean).length;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("mailert-theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? Math.min(100, window.scrollY / total * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  async function copyChecklist() {
    try {
      await navigator.clipboard.writeText(
        "MAILERT - CREATOR EMAIL SAFETY CHECKLIST\n" +
        checklist.map((item, index) => `${index + 1}. ${item}`).join("\n")
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="mu-scroll-progress" aria-hidden="true" style={{ width: `${scroll}%` }} />
      <div className="mu-floating-tools" aria-label="Display preferences">
        <button
          type="button"
          className="mu-theme-button"
          onClick={() => setTheme((previous) => previous === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <Moon size={17}/> : <Sun size={17}/>}
          <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
        {scroll > 18 && (
          <button type="button" className="mu-top-button" aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}>
            <ArrowUp size={18}/>
          </button>
        )}
      </div>

      <section className="mu-section" id="trust-center" aria-labelledby="mu-title">
        <div className="mu-section-heading">
          <span className="mu-eyebrow"><ShieldCheck size={16}/> CREATOR SAFETY HUB</span>
          <h2 id="mu-title">Make smarter moves. <span>Stay in control.</span></h2>
          <p>More than a scan: learn common email scam patterns, practise a safety routine and make better decisions before clicking.</p>
        </div>

        <div className="mu-trust-strips">
          <div><ShieldCheck size={21}/><strong>Creator first</strong><span>Built around real-world workflows</span></div>
          <div><Link2 size={21}/><strong>Think before links</strong><span>Verify destinations independently</span></div>
          <div><UserRound size={21}/><strong>Your decision</strong><span>Assessments support, not replace, judgement</span></div>
        </div>

        <div className="mu-title-row">
          <div>
            <span className="mu-eyebrow">01 / INTERACTIVE LEARNING</span>
            <h3>Explore a scam scenario</h3>
          </div>
          <p>Pick a situation to see common warning signs.</p>
        </div>

        <div className="mu-stories">
          <div className="mu-story-list" role="group" aria-label="Choose an example">
            {cases.map(({ id, icon: Icon, title, subtitle }) => (
              <button key={id} type="button" aria-pressed={story === id}
                onClick={() => setStory(id)} className={`mu-story-choice ${story === id ? "is-active" : ""}`}>
                <span className="mu-story-icon"><Icon size={21}/></span>
                <span><strong>{title}</strong><small>{subtitle}</small></span>
                <ArrowRight size={17}/>
              </button>
            ))}
          </div>
          <motion.div key={story} initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: .27 }} className="mu-story-detail">
            <div className="mu-detail-head"><CircleAlert size={20}/><span>WHAT TO WATCH FOR</span></div>
            <h3>{selected.title}</h3>
            <p>{selected.subtitle}</p>
            <div className="mu-signal-list">
              {selected.signals.map((signal, index) => (
                <div key={signal}><span>{String(index + 1).padStart(2, "0")}</span>{signal}</div>
              ))}
            </div>
            <div className="mu-next-action"><Check size={18}/><span><strong>Safer next step:</strong> {selected.next}</span></div>
            <small className="mu-educational-note">Educational example, not an analysis of a submitted email.</small>
          </motion.div>
        </div>

        <div className="mu-lower-grid">
          <div className="mu-checklist-card">
            <div className="mu-card-label"><CheckCheck size={19}/> 02 / QUICK SELF-CHECK</div>
            <h3>Before you reply or click</h3>
            <p>Use this short checklist when a collaboration email feels unusual.</p>
            <div className="mu-check-progress" aria-label={`${completed} of ${checklist.length} checklist items complete`}>
              <div style={{ width: `${completed / checklist.length * 100}%` }}/>
            </div>
            <span className="mu-check-count">{completed} of {checklist.length} reviewed</span>
            <div className="mu-check-items">
              {checklist.map((item, index) => (
                <label key={item} className={checks[index] ? "checked" : ""}>
                  <input type="checkbox" checked={checks[index]} onChange={(event) => {
                    setChecks((previous) => previous.map((value, i) => i === index ? event.target.checked : value));
                  }} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <button type="button" className="mu-copy-button" onClick={copyChecklist}>
              {copied ? <Check size={17}/> : <ClipboardCopy size={17}/>}
              {copied ? "Checklist copied" : "Copy safety checklist"}
            </button>
          </div>
          <div className="mu-faq-card">
            <div className="mu-card-label"><BookOpen size={19}/> 03 / KNOW BEFORE YOU TRUST</div>
            <h3>Quick answers</h3>
            <p>A few things everyone should know about email protection.</p>
            <div className="mu-faq-list">
              {faqs.map(({ question, answer }, index) => (
                <div key={question} className="mu-faq-item">
                  <button type="button" aria-expanded={openFAQ === index} onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                    {question}<ChevronDown className={openFAQ === index ? "open" : ""} size={18}/>
                  </button>
                  {openFAQ === index && <p>{answer}</p>}
                </div>
              ))}
            </div>
            <a href="#scanner" className="mu-try-link">Go to email scanner <ArrowRight size={17}/></a>
          </div>
        </div>
      </section>
    </>
  );
}
'@ | Set-Content -Encoding utf8 '.\src\components\MailertUpgrade.tsx'

@'
/* Mailert Creator Safety Hub. The variables also support dark mode. */
html[data-theme="light"] {
  --mu-ink: #132838; --mu-sub: #5d7282; --mu-card: rgba(255,255,255,.82);
  --mu-border: rgba(90,134,150,.18); --mu-accent: #118f85;
  --mu-shadow: 0 18px 54px rgba(38,81,110,.09);
}
html[data-theme="dark"] {
  --mu-ink: #f4fbff; --mu-sub: #a3b9cc; --mu-card: rgba(255,255,255,.055);
  --mu-border: rgba(165,208,235,.16); --mu-accent: #72e8cf;
  --mu-shadow: 0 18px 55px rgba(0,0,0,.2);
}
.mu-section { max-width: 1280px; margin: 120px auto 0; scroll-margin-top: 125px; color: var(--mu-ink); }
.mu-section-heading { max-width: 790px; margin-bottom: 33px; }
.mu-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: .74rem; color: var(--mu-accent); font-weight: 800; letter-spacing: .12em; }
.mu-section-heading h2 { font-size: clamp(2.3rem, 4.5vw, 4rem); line-height: 1.08; letter-spacing: -.06em; margin: 17px 0; }
.mu-section-heading h2 span { background: linear-gradient(110deg,#148e83,#3789c7); background-clip: text; color: transparent; }
.mu-section-heading p, .mu-title-row > p, .mu-story-detail > p, .mu-checklist-card > p, .mu-faq-card > p { color: var(--mu-sub); line-height: 1.8; }
.mu-trust-strips { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:15px; margin-bottom:68px; }
.mu-trust-strips > div, .mu-story-choice, .mu-story-detail, .mu-checklist-card, .mu-faq-card {
  border:1px solid var(--mu-border); background:var(--mu-card); box-shadow:var(--mu-shadow);
  backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border-radius:22px;
}
.mu-trust-strips > div { padding:22px; display:grid; align-content:center; gap:8px; }
.mu-trust-strips svg { color:var(--mu-accent); }
.mu-trust-strips strong { font-size:.94rem; }
.mu-trust-strips span { font-size:.78rem; color:var(--mu-sub); }
.mu-title-row { display:flex; align-items:end; justify-content:space-between; gap:25px; margin-bottom:21px; }
.mu-title-row h3 { font-size:clamp(1.6rem,2.4vw,2.3rem); letter-spacing:-.045em; margin:13px 0 0; }
.mu-title-row > p { max-width:310px; font-size:.89rem; margin:0; }
.mu-stories { display:grid; grid-template-columns:.88fr 1.12fr; gap:20px; }
.mu-story-list { display:flex; flex-direction:column; gap:12px; }
.mu-story-choice { padding:21px; width:100%; text-align:left; color:var(--mu-ink); display:flex; align-items:center; gap:14px; cursor:pointer; transition:transform .23s,border-color .23s,box-shadow .23s; }
.mu-story-choice:hover { transform:translateX(5px); border-color:var(--mu-accent); }
.mu-story-choice.is-active { border-color:var(--mu-accent); box-shadow:0 10px 34px rgba(21,151,138,.12); }
.mu-story-icon { display:grid; place-items:center; width:47px; height:47px; flex-shrink:0; border-radius:14px; color:var(--mu-accent); background:rgba(35,185,165,.1); }
.mu-story-choice > span:nth-child(2) { flex:1; display:grid; gap:5px; }
.mu-story-choice strong { font-size:.96rem; }
.mu-story-choice small { color:var(--mu-sub); font-size:.78rem; line-height:1.55; }
.mu-story-choice > svg:last-child { color:var(--mu-accent); }
.mu-story-detail { padding:31px; background: linear-gradient(135deg, rgba(34,180,165,.08), transparent 70%), var(--mu-card); }
.mu-detail-head, .mu-card-label { display:flex; align-items:center; gap:10px; color:var(--mu-accent); font-size:.72rem; font-weight:800; letter-spacing:.1em; }
.mu-story-detail h3 { font-size:1.8rem; letter-spacing:-.04em; margin:18px 0 6px; }
.mu-story-detail > p { font-size:.92rem; margin:0 0 20px; }
.mu-signal-list { display:grid; gap:8px; }
.mu-signal-list div { padding:12px 14px; border:1px solid var(--mu-border); border-radius:11px; display:flex; align-items:center; gap:13px; font-size:.9rem; }
.mu-signal-list span { color:var(--mu-accent); font-size:.7rem; font-weight:800; }
.mu-next-action { display:flex; align-items:start; gap:11px; background:rgba(28,174,151,.09); border-radius:12px; padding:15px; margin-top:19px; font-size:.86rem; line-height:1.65; }
.mu-next-action svg { color:var(--mu-accent); flex-shrink:0; }
.mu-educational-note { display:block; margin-top:13px; color:var(--mu-sub); font-size:.73rem; }
.mu-lower-grid { margin-top:25px; display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }
.mu-checklist-card,.mu-faq-card { padding:28px; }
.mu-checklist-card h3,.mu-faq-card h3 { font-size:1.5rem; letter-spacing:-.035em; margin:18px 0 6px; }
.mu-checklist-card > p,.mu-faq-card > p { font-size:.88rem; margin:0 0 23px; }
.mu-check-progress { height:8px; border-radius:99px; background:rgba(118,165,166,.15); overflow:hidden; }
.mu-check-progress div { height:100%; border-radius:inherit; background:linear-gradient(90deg,#17a994,#5aafe1); transition:width .3s; }
.mu-check-count { display:block; margin:9px 0 17px; color:var(--mu-sub); font-size:.78rem; }
.mu-check-items { display:grid; gap:9px; }
.mu-check-items label { display:flex; align-items:start; gap:12px; padding:12px; border:1px solid var(--mu-border); border-radius:12px; cursor:pointer; font-size:.87rem; line-height:1.6; }
.mu-check-items label.checked { background:rgba(30,174,145,.08); }
.mu-check-items input { accent-color:#139e90; width:17px; height:17px; margin-top:3px; flex-shrink:0; }
.mu-copy-button,.mu-try-link { display:inline-flex; justify-content:center; align-items:center; gap:9px; color:#fff; font-weight:750; border:0; cursor:pointer; background:linear-gradient(120deg,#129e8e,#236db5); border-radius:12px; padding:13px 19px; margin-top:21px; transition:transform .22s,box-shadow .22s; }
.mu-copy-button:hover,.mu-try-link:hover { transform:translateY(-3px); box-shadow:0 11px 28px rgba(16,116,142,.2); }
.mu-faq-list { border-top:1px solid var(--mu-border); }
.mu-faq-item { border-bottom:1px solid var(--mu-border); }
.mu-faq-item button { background:transparent; color:var(--mu-ink); border:0; width:100%; padding:19px 0; font-size:.93rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:12px; text-align:left; }
.mu-faq-item button svg { color:var(--mu-accent); flex-shrink:0; transition:transform .2s; }
.mu-faq-item button svg.open { transform:rotate(180deg); }
.mu-faq-item p { margin:0 0 18px; color:var(--mu-sub); font-size:.87rem; line-height:1.7; }
.mu-scroll-progress { z-index:1000; height:3px; background:linear-gradient(90deg,#1fae9b,#3f98d9); position:fixed; left:0; top:0; transition:width .1s linear; pointer-events:none; }
.mu-floating-tools { position:fixed; z-index:150; bottom:22px; right:22px; display:flex; gap:8px; align-items:center; }
.mu-theme-button,.mu-top-button { display:inline-flex; align-items:center; justify-content:center; gap:9px; padding:12px 15px; border-radius:999px; background:var(--mu-card); color:var(--mu-ink); border:1px solid var(--mu-border); box-shadow:0 8px 30px rgba(21,65,86,.14); backdrop-filter:blur(22px); cursor:pointer; font-weight:750; transition:transform .2s; }
.mu-theme-button:hover,.mu-top-button:hover { transform:translateY(-3px); }
.mu-top-button { padding:12px; }
.mu-section button:focus-visible,.mu-floating-tools button:focus-visible { outline:2px solid #159f95; outline-offset:3px; }
@media(max-width:900px) { .mu-stories,.mu-lower-grid { grid-template-columns:1fr; } }
@media(max-width:680px) { .mu-section { margin-top:90px; } .mu-trust-strips { grid-template-columns:1fr; gap:10px; margin-bottom:50px; } .mu-title-row { display:block; } .mu-title-row > p { margin-top:12px; } .mu-story-detail,.mu-checklist-card,.mu-faq-card { padding:20px; } .mu-floating-tools { right:12px; bottom:12px; } }
@media(prefers-reduced-motion:reduce) { .mu-section *, .mu-floating-tools * { animation:none!important; transition:none!important; } }
'@ | Set-Content -Encoding utf8 '.\src\components\MailertUpgrade.css'

@'
/* Phase 2.5 global light theme, plus dark theme preservation */
html[data-theme="light"] { color-scheme:light; --bg:#f5fafc; --text:#152e3c; --muted:#5b7182; --accent:#138f86; --accent2:#377ebf; --surface:rgba(255,255,255,.78); --border:rgba(78,126,150,.17); }
html[data-theme="light"] body { color:#152e3c; background:#f7fbfd; }
html[data-theme="light"] .page-shell { color:#152e3c; background:radial-gradient(ellipse at 6% 3%,rgba(104,215,203,.18),transparent 38%),radial-gradient(ellipse at 94% 30%,rgba(137,194,241,.19),transparent 38%),linear-gradient(150deg,#f7fbfd,#eef7fa 55%,#fbfdff); }
html[data-theme="light"] .grid-overlay { opacity:.6; }
html[data-theme="light"] .bg-orb { opacity:.09; }
html[data-theme="light"] :is(.glass,.glass-inner,.scanner-glass,.risk-ui-glass,.ma-glass) { color:#152e3c; background:rgba(255,255,255,.78); border-color:rgba(80,135,160,.17); box-shadow:0 18px 48px rgba(39,91,118,.08); }
html[data-theme="light"] :is(.dashboard-card,.feature-card,.stat-card,.step-card,.scanner-glass,.risk-ui-glass,.ma-glass):hover { border-color:rgba(29,161,151,.33); }
html[data-theme="light"] :is(.nav-links a,.footer-links a,.footer p,.hero-subtext,.hero-points div,.stat-card p,.feature-card p,.step-card p,.section-head p,.dashboard-header p,.mail-label,.score-card span,.warning-box ul,.tag-pill,.section-badge,.coming-soon) { color:#536f80; }
html[data-theme="light"] :is(.hero-left h1,.section-head h2,.stat-card h3,.feature-card h3,.step-card h3,.dashboard-header h3,.dashboard-card h4,.score-card strong,.footer h3,.cta-section h2) { color:#173447; }
html[data-theme="light"] :is(.hero-left h1 span,.heading-accent) { background:linear-gradient(110deg,#119e91,#397fc5); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
html[data-theme="light"] .navbar { background:rgba(255,255,255,.83); box-shadow:0 12px 35px rgba(55,100,125,.09); }
html[data-theme="light"] .nav-links a:hover,html[data-theme="light"] .footer-links a:hover { color:#0c8f83; }
html[data-theme="light"] .btn-secondary { color:#1e5064; background:rgba(255,255,255,.83); border-color:rgba(53,132,159,.22); }
html[data-theme="light"] .btn-primary { color:#fff; background:linear-gradient(120deg,#139e8e,#287ab4); }
html[data-theme="light"] .brand-mark,html[data-theme="light"] .feature-icon { color:#0e9387; background:rgba(32,179,160,.1); }
html[data-theme="light"] .tag-pill,html[data-theme="light"] .section-badge { color:#0d8d83; border-color:rgba(41,163,146,.23); background:rgba(248,255,255,.7); }
html[data-theme="light"] .risk-badge.danger { color:#b23c59; background:rgba(239,84,117,.085); }
html[data-theme="light"] .score-card .risk-number { color:#c34863; }
html[data-theme="light"] .demo-note { color:#708b9c; }
html[data-theme="light"] .cta-section { background:linear-gradient(120deg,rgba(221,249,244,.8),rgba(244,250,255,.9)); }
html[data-theme="light"] .footer { color:#173447; }
/* Existing Scanner */
html[data-theme="light"] :is(.scanner-heading h2,.scanner-card-top h3,.scanner-visual h3,.scanner-result h3) { color:#153445; }
html[data-theme="light"] :is(.scanner-heading p,.scanner-card-top p,.scanner-input-tip,.scanner-field-foot,.scanner-visual > p,.scanner-checklist > div,.scanner-summary-row,.scanner-result-meta,.scanner-result-subject,.scanner-privacy) { color:#567384; }
html[data-theme="light"] .scanner-kicker { color:#138f84; }
html[data-theme="light"] .scanner-mode-tabs { background:rgba(220,234,240,.76); }
html[data-theme="light"] .scanner-mode-tabs button { color:#426779; }
html[data-theme="light"] .scanner-mode-tabs button.active { color:#096e6a; background:#fff; }
html[data-theme="light"] :is(.scanner-field label,.scanner-raw-panel label,.scanner-checklist small,.scanner-summary-row strong,.scanner-result-meta strong) { color:#173d4e; }
html[data-theme="light"] :is(.scanner-field input,.scanner-field textarea,.scanner-raw-panel textarea) { color:#183848; background:rgba(249,253,255,.9); border-color:rgba(72,126,147,.24); }
html[data-theme="light"] :is(.scanner-field input,.scanner-field textarea,.scanner-raw-panel textarea)::placeholder { color:#899eaa; }
html[data-theme="light"] :is(.scanner-field input:focus,.scanner-field textarea:focus,.scanner-raw-panel textarea:focus) { background:#fff; border-color:#169a8b; }
html[data-theme="light"] .scanner-sub-button,html[data-theme="light"] .scanner-clear-button { color:#26596b; background:#f7fcfd; border-color:rgba(64,137,158,.2); }
html[data-theme="light"] .scanner-summary-label,html[data-theme="light"] .scanner-result-label { color:#148e85; }
html[data-theme="light"] .scanner-visual-phase { color:#8d5360; }
/* Existing Results */
html[data-theme="light"] .risk-ui { color:#143749; }
html[data-theme="light"] :is(.risk-ui-heading p,.risk-ui-hero-copy > p,.risk-ui-panel-heading p,.risk-ui-finding p,.risk-ui-guidance-step p,.risk-ui-footnote,.risk-ui-meta span,.risk-ui-choice small,.risk-ui-ring-shell > span) { color:#5c7687; }
html[data-theme="light"] .risk-ui-choice { background:rgba(255,255,255,.8); color:#17394b; border-color:rgba(84,141,163,.18); }
html[data-theme="light"] .risk-ui-choice.is-active { background:#e7f7f4; border-color:#23a496; }
html[data-theme="light"] .risk-ui-report-label,html[data-theme="light"] .risk-ui-panel-heading small { color:#6b8494; }
html[data-theme="light"] .risk-ui-ring-center { background:#fff; border-color:#d9e7ed; }
html[data-theme="light"] .risk-ui-finding,html[data-theme="light"] .risk-ui-guidance-step { background:rgba(245,251,253,.78); border-color:rgba(88,137,155,.13); }
html[data-theme="light"] .risk-ui-back { color:#177b81; }
html[data-theme="light"] .risk-ui-security-note { color:#23796b; }
html[data-theme="light"] .risk-ui-demo-notice { color:#4d6d80; background:rgba(223,240,253,.68); }
html[data-theme="light"] .risk-ui-demo-notice strong,html[data-theme="light"] .risk-ui-finding h4,html[data-theme="light"] .risk-ui-panel-heading h3 { color:#173447; }
/* Existing Account + Dashboard */
html[data-theme="light"] .ma-section { color:#153344; }
html[data-theme="light"] :is(.ma-heading p,.ma-benefits > p,.ma-benefit p,.ma-form-panel > p,.ma-otp-panel > p,.ma-dashboard-header p,.ma-metric > span,.ma-chart p,.ma-insight p,.ma-activity-item small,.ma-card-header small,.ma-field,.ma-demo-note,.ma-dashboard-bottom) { color:#617d8d; }
html[data-theme="light"] .ma-tabs,html[data-theme="light"] .ma-dashboard-tabs { background:#e9f3f7; }
html[data-theme="light"] :is(.ma-tabs button,.ma-dashboard-tabs button) { color:#55778a; }
html[data-theme="light"] :is(.ma-tabs button.active,.ma-dashboard-tabs button.active) { color:#0e817a; background:#fff; }
html[data-theme="light"] :is(.ma-input-shell,.ma-otp-slots span) { background:#f8fcfd; border-color:#c9dce4; }
html[data-theme="light"] .ma-input-shell input { color:#1f4657; }
html[data-theme="light"] :is(.ma-metric,.ma-chart,.ma-insight,.ma-activity-item) { background:rgba(249,253,255,.84); border-color:#dce9ef; }
html[data-theme="light"] :is(.ma-card-header strong,.ma-benefit strong,.ma-insight h4,.ma-activity-item strong,.ma-metric strong,.ma-dashboard-header h3) { color:#193b4d; }
html[data-theme="light"] .ma-activity-item:hover { background:#f1fafb; }
html[data-theme="light"] .ma-chart-caption h4 { color:#1b4051; }
/* Universal visual refinement */
html[data-theme="light"] .glass,html[data-theme="light"] .scanner-glass,html[data-theme="light"] .risk-ui-glass,html[data-theme="light"] .ma-glass { backdrop-filter:blur(22px); }
html[data-theme="light"] ::selection { background:#9de9db; color:#143a43; }
html[data-theme="dark"] body { color:#f4f9ff; }
@media(prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } }
'@ | Set-Content -Encoding utf8 '.\src\styles\lightTheme.css'

# Integrate without duplicating the component or overwriting the existing page.
$appFile = '.\src\App.tsx'
if (-not (Test-Path $appFile)) { throw 'Missing src\App.tsx' }
$backupDir = Join-Path $env:TEMP 'MailertBackups'
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Copy-Item $appFile (Join-Path $backupDir 'App.before-light-theme.tsx') -Force
$app = Get-Content $appFile -Raw
if ($app -notmatch 'import MailertUpgrade from') {
    $app = 'import MailertUpgrade from "./components/MailertUpgrade";' + "`r`n" + $app
}
if ($app -notmatch 'import "./styles/lightTheme.css"') {
    # Place the override import last in the header, before the first React declaration.
    $firstDecl = [regex]::new('(?m)^(?=(?:const|function|type|interface|export\s+default)\s)')
    if ($firstDecl.IsMatch($app)) {
        $app = $firstDecl.Replace($app, 'import "./styles/lightTheme.css";' + "`r`n", 1)
    } else {
        $app = 'import "./styles/lightTheme.css";' + "`r`n" + $app
    }
}
if ($app -notmatch '<MailertUpgrade\s*/>') {
    if ($app -match '<AuthWorkspace\s*/>') {
        $app = $app.Replace('<AuthWorkspace />', '<AuthWorkspace />' + "`r`n" + '        <MailertUpgrade />')
    } elseif ($app -match '<RiskResults\s*/>') {
        $app = $app.Replace('<RiskResults />', '<RiskResults />' + "`r`n" + '        <MailertUpgrade />')
    } else {
        throw 'Could not find AuthWorkspace or RiskResults in App.tsx. No integration performed.'
    }
}
if ($app -notmatch 'href="#trust-center"') {
    $app = $app.Replace('<a href="#features">Features</a>', '<a href="#features">Features</a>' + "`r`n" + '          <a href="#trust-center">Safety Hub</a>')
}
Set-Content -Encoding utf8 $appFile $app
Write-Host 'Mailert light/dark design and Safety Hub installed.' -ForegroundColor Green
Write-Host 'Next: npm.cmd run build' -ForegroundColor Cyan
