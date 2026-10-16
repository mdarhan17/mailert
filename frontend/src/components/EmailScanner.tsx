import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, AtSign, Check, CircleHelp, ClipboardPaste,
  FileText, Fingerprint, Link2, LockKeyhole, Mail,
  RotateCcw, ScanLine, ShieldCheck, Sparkles
} from "lucide-react";
import "./EmailScanner.css";

type Mode = "fields" | "raw";

type EmailDraft = {
  sender: string;
  subject: string;
  body: string;
  urls: string;
};

const emptyDraft: EmailDraft = {
  sender: "",
  subject: "",
  body: "",
  urls: ""
};

const demoEmail: EmailDraft = {
  sender: "outreach@brand-deals.example",
  subject: "Creator collaboration - action required",
  body: "Hello Creator, we'd love to sponsor your next post. To secure your collaboration, please pay a refundable onboarding fee today. Visit https://brand-deals.example/verify to continue. This is a fictional demonstration email.",
  urls: "https://brand-deals.example/verify"
};

function findUrls(text: string): string[] {
  return [...new Set(
    text.match(/https?:\/\/[^\s<>"']+/gi) ?? []
  )];
}

function extractRawEmail(raw: string): EmailDraft {
  const from = raw.match(/^from\s*:\s*(.+)$/im)?.[1]?.trim() ?? "";
  const subject = raw.match(/^subject\s*:\s*(.+)$/im)?.[1]?.trim() ?? "";
  const sender = from.match(/<([^<>\s]+@[^<>\s]+)>/)?.[1] ?? from;

  const separator = raw.search(/\r?\n\s*\r?\n/);
  const body = separator >= 0
    ? raw.slice(separator).trim()
    : raw.replace(/^(from|subject|to|date)\s*:.+$/gim, "").trim();

  return {
    sender,
    subject,
    body,
    urls: findUrls(body).join("\n")
  };
}

export default function EmailScanner() {
  const [mode, setMode] = useState<Mode>("fields");
  const [draft, setDraft] = useState<EmailDraft>(emptyDraft);
  const [rawEmail, setRawEmail] = useState("");
  const [prepared, setPrepared] = useState<EmailDraft | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const reduceMotion = useReducedMotion();

  const links = useMemo(
    () => findUrls(`${draft.body}\n${draft.urls}`),
    [draft.body, draft.urls]
  );

  const filled = [
    draft.sender,
    draft.subject,
    draft.body
  ].filter(value => value.trim().length > 0).length;

  function update(field: keyof EmailDraft, value: string) {
    setDraft(current => ({ ...current, [field]: value }));
    setPrepared(null);
    setError("");
    setMessage("");
  }

  function loadExample() {
    setDraft(demoEmail);
    setRawEmail("");
    setMode("fields");
    setPrepared(null);
    setError("");
    setMessage("Fictional demonstration email loaded.");
  }

  function clearAll() {
    setDraft(emptyDraft);
    setRawEmail("");
    setPrepared(null);
    setError("");
    setMessage("Form cleared.");
  }

  function reviewRawEmail() {
    if (!rawEmail.trim()) {
      setError("Paste an email before extracting its details.");
      return;
    }

    setDraft(extractRawEmail(rawEmail));
    setMode("fields");
    setPrepared(null);
    setError("");
    setMessage("Details extracted. Review them before preparing a scan.");
  }

  function prepareScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.sender.trim())) {
      setError("Enter a valid sender email address.");
      return;
    }

    if (!draft.subject.trim()) {
      setError("Enter the email subject.");
      return;
    }

    if (draft.body.trim().length < 20) {
      setError("Enter at least 20 characters of the email message.");
      return;
    }

    setError("");
    setMessage("");
    setPrepared({ ...draft });
  }

  return (
    <section
      className="scanner-section"
      id="scanner"
      aria-labelledby="scanner-title"
    >
      <div className="scanner-heading">
        <span className="scanner-kicker">
          <ScanLine size={15} />
          THE SCANNING WORKSPACE
        </span>

        <h2 id="scanner-title">
          Every email has a story. <span>Look closer.</span>
        </h2>

        <p>
          A carefully designed place to review suspicious messages.
          Enter the details below to prepare your scan.
        </p>
      </div>

      <div className="scanner-layout">
        <motion.div
          className="scanner-form-card scanner-glass"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="scanner-card-top">
            <div className="scanner-card-icon">
              <Mail size={21} />
            </div>

            <div>
              <h3>New email check</h3>
              <p>Your private review workspace</p>
            </div>

            <span className="scanner-stage">UI PREVIEW</span>
          </div>

          <div
            className="scanner-mode-tabs"
            role="group"
            aria-label="Email input mode"
          >
            <button
              type="button"
              className={mode === "fields" ? "active" : ""}
              onClick={() => {
                setMode("fields");
                setError("");
              }}
            >
              <FileText size={16} />
              Email fields
            </button>

            <button
              type="button"
              className={mode === "raw" ? "active" : ""}
              onClick={() => {
                setMode("raw");
                setError("");
              }}
            >
              <ClipboardPaste size={16} />
              Paste full email
            </button>
          </div>

          {mode === "raw" ? (
            <div className="scanner-raw-panel">
              <label htmlFor="full-email">Complete email text</label>

              <textarea
                id="full-email"
                rows={12}
                value={rawEmail}
                onChange={event => {
                  setRawEmail(event.target.value);
                  setError("");
                }}
                placeholder={
                  "From: example@brand.example\n" +
                  "Subject: Partnership invitation\n\n" +
                  "Hello, we'd like to collaborate..."
                }
              />

              <p className="scanner-input-tip">
                Include the From and Subject lines.
                We'll extract details locally in your browser.
              </p>

              <button
                className="scanner-main-button"
                type="button"
                onClick={reviewRawEmail}
              >
                Extract & review
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <form onSubmit={prepareScan} noValidate>
              <div className="scanner-field-grid">
                <div className="scanner-field">
                  <label htmlFor="sender">
                    <AtSign size={15} />
                    Sender email <span>*</span>
                  </label>

                  <input
                    id="sender"
                    type="email"
                    autoComplete="off"
                    value={draft.sender}
                    maxLength={254}
                    onChange={event =>
                      update("sender", event.target.value)
                    }
                    placeholder="partnership@brand.com"
                  />
                </div>

                <div className="scanner-field">
                  <label htmlFor="subject">
                    <FileText size={15} />
                    Subject <span>*</span>
                  </label>

                  <input
                    id="subject"
                    type="text"
                    value={draft.subject}
                    maxLength={250}
                    onChange={event =>
                      update("subject", event.target.value)
                    }
                    placeholder="Exciting brand partnership"
                  />
                </div>
              </div>

              <div className="scanner-field">
                <label htmlFor="body">
                  <Mail size={15} />
                  Email message <span>*</span>
                </label>

                <textarea
                  id="body"
                  rows={8}
                  value={draft.body}
                  maxLength={20000}
                  onChange={event =>
                    update("body", event.target.value)
                  }
                  placeholder={
                    "Paste the complete message here. " +
                    "Include payment requests, login instructions, " +
                    "and anything that seems unusual..."
                  }
                />

                <div className="scanner-field-foot">
                  <span>Include the complete message for context.</span>
                  <span>{draft.body.length.toLocaleString()} / 20,000</span>
                </div>
              </div>

              <div className="scanner-field">
                <label htmlFor="urls">
                  <Link2 size={15} />
                  URLs
                  <span className="scanner-optional">Optional</span>
                </label>

                <textarea
                  id="urls"
                  rows={2}
                  value={draft.urls}
                  onChange={event =>
                    update("urls", event.target.value)
                  }
                  placeholder="https://example.com (one URL per line)"
                />

                <p className="scanner-input-tip">
                  Links are read as text only.
                  Mailert won't open them.
                </p>
              </div>

              <div className="scanner-form-actions">
                <button
                  type="submit"
                  className="scanner-main-button"
                >
                  Prepare scan
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="scanner-sub-button"
                  onClick={loadExample}
                >
                  <Sparkles size={16} />
                  Try sample
                </button>

                <button
                  type="button"
                  className="scanner-clear-button"
                  onClick={clearAll}
                >
                  <RotateCcw size={16} />
                  Clear
                </button>
              </div>
            </form>
          )}

          <div className="scanner-feedback" aria-live="polite">
            {error && <p className="scanner-error">{error}</p>}

            {!error && message && (
              <p className="scanner-success">
                <Check size={16} /> {message}
              </p>
            )}
          </div>

          <div className="scanner-privacy">
            <LockKeyhole size={16} />
            <span>
              No email is uploaded, scanned, or saved
              by this UI preview.
            </span>
          </div>
        </motion.div>

        <aside className="scanner-side" aria-label="Scanner status">
          <div className="scanner-visual scanner-glass">
            <div className="scanner-visual-header">
              <span className="scanner-live-dot" />
              SCAN ENGINE
              <span className="scanner-visual-phase">
                NOT CONNECTED
              </span>
            </div>

            <div className="scanner-radar" aria-hidden="true">
              <div className="scanner-radar-circle outer" />
              <div className="scanner-radar-circle inner" />

              <div className="scanner-radar-center">
                <ShieldCheck size={44} strokeWidth={1.5} />
              </div>

              <span className="scanner-radar-node node-one" />
              <span className="scanner-radar-node node-two" />
            </div>

            <h3>Clarity before action.</h3>

            <p>
              Review the message details first. Risk detection
              and threat intelligence will be added later.
            </p>

            <div className="scanner-checklist">
              <div>
                <Fingerprint size={18} />
                <span>Sender identity analysis</span>
                <small>Planned</small>
              </div>

              <div>
                <Link2 size={18} />
                <span>URL safety signals</span>
                <small>Planned</small>
              </div>

              <div>
                <ShieldCheck size={18} />
                <span>Creator scam detection</span>
                <small>Planned</small>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {prepared ? (
              <motion.div
                key="prepared"
                className="scanner-result scanner-glass"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="scanner-result-label">
                  <Check size={15} />
                  INPUT READY
                </span>

                <h3>Scan details prepared</h3>

                <p className="scanner-result-subject">
                  {prepared.subject}
                </p>

                <div className="scanner-result-meta">
                  <span>Sender</span>
                  <strong>{prepared.sender}</strong>
                </div>

                <div className="scanner-result-meta">
                  <span>Links found</span>
                  <strong>
                    {findUrls(
                      `${prepared.body}\n${prepared.urls}`
                    ).length}
                  </strong>
                </div>

                <p className="scanner-result-disclaimer">
                  <CircleHelp size={15} />
                  This is not a safety verdict.
                  AI analysis is not connected yet.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                className="scanner-summary scanner-glass"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="scanner-summary-label">
                  INPUT OVERVIEW
                </span>

                <div className="scanner-summary-row">
                  <span>Required fields filled</span>
                  <strong>{filled} / 3</strong>
                </div>

                <div className="scanner-mini-progress">
                  <div
                    style={{
                      width: `${(filled / 3) * 100}%`
                    }}
                  />
                </div>

                <div className="scanner-summary-row">
                  <span>URLs found in text</span>
                  <strong>{links.length}</strong>
                </div>

                <div className="scanner-summary-row">
                  <span>Message characters</span>
                  <strong>{draft.body.length.toLocaleString()}</strong>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}
