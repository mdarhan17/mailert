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
