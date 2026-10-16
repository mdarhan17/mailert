import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, Check, CheckCircle2, ClipboardCopy,
  CreditCard, ExternalLink, FileWarning, Fingerprint, Info,
  Link2, LockKeyhole, Mail, ScanSearch, ShieldAlert, ShieldCheck,
  Sparkles, TriangleAlert, type LucideIcon,
} from "lucide-react";
import "./RiskResults.css";

type ScenarioKey = "high" | "review" | "low";
type Severity = "high" | "medium" | "informational";

type Finding = {
  title: string;
  detail: string;
  severity: Severity;
  icon: LucideIcon;
};

type Scenario = {
  name: string;
  score: number;
  status: string;
  summary: string;
  sender: string;
  subject: string;
  findings: Finding[];
  steps: string[];
};

const scenarios: Record<ScenarioKey, Scenario> = {
  high: {
    name: "Fake brand deal",
    score: 87,
    status: "High risk",
    summary:
      "This fictional sponsorship email pressures the recipient to pay before receiving a collaboration.",
    sender: "collabs@brand-partner.example",
    subject: "Pay a fee to confirm your sponsorship",
    findings: [
      {
        title: "Upfront payment requested",
        detail: "The message asks for a fee before the promised deal begins.",
        severity: "high",
        icon: CreditCard,
      },
      {
        title: "Brand identity unverified",
        detail: "The sender uses an unverified third-party domain in this example.",
        severity: "medium",
        icon: Fingerprint,
      },
      {
        title: "Artificial urgency",
        detail: "The email urges immediate action instead of allowing normal verification.",
        severity: "medium",
        icon: FileWarning,
      },
    ],
    steps: [
      "Do not pay or disclose account credentials.",
      "Find the brand's official website independently.",
      "Confirm the offer through a trusted contact channel.",
    ],
  },
  review: {
    name: "Unclear outreach",
    score: 54,
    status: "Suspicious",
    summary:
      "This fictional outreach leaves important details unclear and asks the creator to review an external document.",
    sender: "talent@media-brief.example",
    subject: "Review your campaign brief today",
    findings: [
      {
        title: "Unexpected external link",
        detail: "The email redirects the recipient to an unfamiliar document host.",
        severity: "medium",
        icon: Link2,
      },
      {
        title: "Incomplete offer details",
        detail: "The message omits the campaign scope and the actual contracting party.",
        severity: "medium",
        icon: Mail,
      },
      {
        title: "Identity needs checking",
        detail: "The sender's claimed business relationship has not been independently verified.",
        severity: "informational",
        icon: Fingerprint,
      },
    ],
    steps: [
      "Do not open an unexpected attachment or sign in through the link.",
      "Ask for the brand's official campaign contact.",
      "Verify the proposed collaboration independently.",
    ],
  },
  low: {
    name: "Routine follow-up",
    score: 14,
    status: "Lower apparent risk",
    summary:
      "This fictional follow-up does not contain obvious pressure, payment, or credential requests.",
    sender: "hello@studio-notes.example",
    subject: "Following up on our design meeting",
    findings: [
      {
        title: "No payment request",
        detail: "No transfer or advance fee is requested in the sample message.",
        severity: "informational",
        icon: CheckCircle2,
      },
      {
        title: "No password request",
        detail: "The example contains no instruction to share login details.",
        severity: "informational",
        icon: LockKeyhole,
      },
      {
        title: "No link in the example",
        detail: "There is no external URL requiring review in this sample.",
        severity: "informational",
        icon: Link2,
      },
    ],
    steps: [
      "A low score is not proof an email is genuine.",
      "Check the sender through a known contact method if unexpected.",
      "Never share OTPs, passwords, or recovery codes.",
    ],
  },
};

const options: {
  id: ScenarioKey;
  label: string;
  detail: string;
}[] = [
  {
    id: "high",
    label: "High-risk example",
    detail: "Fake sponsorship",
  },
  {
    id: "review",
    label: "Suspicious example",
    detail: "Unclear pitch",
  },
  {
    id: "low",
    label: "Lower-risk example",
    detail: "Routine follow-up",
  },
];

export default function RiskResults() {
  const [selected, setSelected] = useState<ScenarioKey>("high");
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const data = scenarios[selected];

  const ringStyle = {
    "--risk-progress": `${data.score}%`,
  } as CSSProperties;

  async function copyExample() {
    const content = [
      "MAILERT - FICTIONAL DEMO REPORT (NOT A REAL SCAN)",
      `Scenario: ${data.name}`,
      `Illustrative risk index: ${data.score}/100`,
      `Category: ${data.status}`,
      `Sender: ${data.sender}`,
      `Subject: ${data.subject}`,
      "Indicators:",
      ...data.findings.map(
        (item) => `- ${item.title}: ${item.detail}`
      ),
      "Advice:",
      ...data.steps.map((item) => `- ${item}`),
      "No live AI, sender authentication, or URL reputation check was performed.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch {
      setCopied(false);
      window.alert("Clipboard access was blocked by your browser.");
    }
  }

  return (
    <section
      className="risk-ui"
      id="results"
      aria-labelledby="risk-ui-title"
      data-tone={selected}
    >
      <div className="risk-ui-heading">
        <span className="risk-ui-eyebrow">
          <Sparkles size={15} />
          ANALYSIS EXPERIENCE / 02
        </span>

        <h2 id="risk-ui-title">
          Clarity behind <span>every warning.</span>
        </h2>

        <p>
          Explore what Mailert's future result experience will look
          like. Switch between three fictional examples below.
        </p>
      </div>

      <div className="risk-ui-demo-notice" role="note">
        <Info size={19} />
        <span>
          <strong>Interactive UI demo only.</strong> These scores are
          illustrative, not probabilities. No email has been scanned,
          and AI or URL reputation services are not connected.
        </span>
      </div>

      <div
        className="risk-ui-switch"
        role="group"
        aria-label="Choose demonstration email"
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected === option.id}
            className={`risk-ui-choice ${
              selected === option.id ? "is-active" : ""
            }`}
            onClick={() => {
              setSelected(option.id);
              setCopied(false);
            }}
          >
            <span className="risk-ui-choice-dot" />

            <span>
              <strong>{option.label}</strong>
              <small>{option.detail}</small>
            </span>

            <ArrowRight size={17} className="risk-ui-choice-arrow" />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          className="risk-ui-content"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.24 }}
        >
          <div className="risk-ui-hero risk-ui-glass">
            <div className="risk-ui-ring-shell">
              <div
                className="risk-ui-ring"
                style={ringStyle}
                role="img"
                aria-label={`Example risk index ${data.score} out of 100`}
              >
                <div className="risk-ui-ring-center">
                  <strong>{data.score}</strong>
                  <small>/ 100</small>
                </div>
              </div>

              <span>ILLUSTRATIVE RISK INDEX</span>
            </div>

            <div className="risk-ui-hero-copy">
              <div className="risk-ui-report-label">
                <ScanSearch size={16} />
                EXAMPLE ASSESSMENT
                <span>·</span>
                NOT A LIVE RESULT
              </div>

              <div className="risk-ui-status">
                <ShieldAlert size={20} />
                <span>{data.status}</span>
              </div>

              <h3>{data.name}</h3>
              <p>{data.summary}</p>

              <div className="risk-ui-meta">
                <span>
                  <Mail size={15} />
                  {data.sender}
                </span>

                <span>
                  <FileWarning size={15} />
                  {data.subject}
                </span>
              </div>

              <div className="risk-ui-hero-actions">
                <button
                  type="button"
                  className="risk-ui-copy"
                  onClick={copyExample}
                >
                  {copied ? (
                    <Check size={17} />
                  ) : (
                    <ClipboardCopy size={17} />
                  )}
                  {copied ? "Demo report copied" : "Copy sample report"}
                </button>

                <a href="#scanner" className="risk-ui-back">
                  Back to scanner
                  <ArrowDownRight size={17} />
                </a>
              </div>
            </div>
          </div>

          <div className="risk-ui-detail-grid">
            <div className="risk-ui-panel risk-ui-glass">
              <div className="risk-ui-panel-heading">
                <span className="risk-ui-panel-icon">
                  <TriangleAlert size={19} />
                </span>

                <div>
                  <h3>Indicator breakdown</h3>
                  <p>Why this sample received its demo category</p>
                </div>

                <small>{data.findings.length} INDICATORS</small>
              </div>

              <div className="risk-ui-findings">
                {data.findings.map(
                  ({ icon: Icon, title, detail, severity }) => (
                    <div className="risk-ui-finding" key={title}>
                      <span
                        className={`risk-ui-finding-icon risk-ui-severity-${severity}`}
                      >
                        <Icon size={20} />
                      </span>

                      <div>
                        <h4>{title}</h4>
                        <p>{detail}</p>
                      </div>

                      <span
                        className={`risk-ui-indicator risk-ui-severity-${severity}`}
                      >
                        {severity === "informational"
                          ? "INFO"
                          : severity.toUpperCase()}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="risk-ui-footnote">
                <Info size={16} />
                Indicators are illustrative. Real explanations will
                require evidence from the detection engine.
              </div>
            </div>

            <aside className="risk-ui-panel risk-ui-glass">
              <div className="risk-ui-panel-heading">
                <span className="risk-ui-panel-icon guidance">
                  <ShieldCheck size={19} />
                </span>

                <div>
                  <h3>Recommended next steps</h3>
                  <p>Actions to consider before responding</p>
                </div>
              </div>

              <div className="risk-ui-guidance">
                {data.steps.map((step, index) => (
                  <div className="risk-ui-guidance-step" key={step}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div className="risk-ui-security-note">
                <LockKeyhole size={19} />
                <span>
                  Never trust a message solely because it looks
                  professional—or receives a low risk score.
                </span>
              </div>
            </aside>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="risk-ui-bottom">
        <span>
          <ShieldCheck size={16} />
          Designed for creators and businesses
        </span>

        <span>
          Not a substitute for independent verification
          <ExternalLink size={14} />
        </span>
      </div>
    </section>
  );
}
