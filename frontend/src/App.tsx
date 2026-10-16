import "./App.css";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  AlertTriangle,
  Brain,
  Search,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI-Powered Detection",
    text: "Analyze suspicious emails using intelligent pattern detection, phishing indicators, and creator-focused scam signals.",
  },
  {
    icon: <Mail size={28} />,
    title: "Email Content Analysis",
    text: "Check sender details, message content, and suspicious language used in fake sponsorships and phishing emails.",
  },
  {
    icon: <Search size={28} />,
    title: "Link & Risk Inspection",
    text: "Identify risky URLs, impersonation attempts, fake collaborations, and misleading offers without opening unsafe links.",
  },
  {
    icon: <AlertTriangle size={28} />,
    title: "Explainable Results",
    text: "Understand why an email was flagged with clear warning reasons, risk scoring, and safe next-step recommendations.",
  },
  {
    icon: <Lock size={28} />,
    title: "Privacy Focused",
    text: "Protect user trust by analyzing content safely and avoiding unnecessary storage of full email data by default.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Creator Scam Protection",
    text: "Specially focused on brand collaboration scams, influencer fraud, fake payment requests, and account theft attempts.",
  },
];

const steps = [
  {
    number: "01",
    title: "Paste the Email",
    text: "Copy subject, sender, body, and links into Mailert.",
  },
  {
    number: "02",
    title: "AI Analyzes It",
    text: "Mailert checks suspicious patterns, phishing clues, and fake collaboration signs.",
  },
  {
    number: "03",
    title: "Get the Result",
    text: "See whether the email is likely safe, suspicious, or high risk with clear reasons.",
  },
];

function App() {
  return (
    <div className="page-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="grid-overlay" />

      <header className="navbar glass">
        <div className="brand-wrap">
          <div className="brand-mark">
            <ShieldCheck size={18} />
          </div>
          <div className="brand-text">
            <span className="brand-name">mailert.</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#scanner">Scanner</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-secondary" disabled title="Login will be added in Phase 3">Login (soon)</button>
          <a className="btn btn-primary" href="#features">Explore</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="tag-pill glass">
              <Sparkles size={16} />
              <span>AI-Powered Email Scam Protection</span>
            </div>

            <h1>
              Think Before <span>You Click.</span>
            </h1>

            <p className="hero-subtext">
              Mailert helps creators, influencers, freelancers, and businesses
              identify phishing emails, fake collaboration offers, suspicious
              links, and online scam attempts with AI-powered analysis.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#features">
                Explore Features <ArrowRight size={18} />
              </a>
              <a className="btn btn-secondary btn-lg" href="#how">
                How It Works
              </a>
            </div>

            <div className="hero-points">
              <div><CheckCircle2 size={18} /> Fake brand collaboration detection</div>
              <div><CheckCircle2 size={18} /> Suspicious URL analysis</div>
              <div><CheckCircle2 size={18} /> Explainable AI results</div>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="dashboard-card glass">
              <div className="dashboard-header">
                <div>
                  <h3>Mail Analysis · Demo</h3>
                  <p>AI-powered email risk detection</p>
                </div>
                <span className="risk-badge danger">High Risk · Sample</span>
              </div>

              <div className="mail-preview glass-inner">
                <p className="mail-label">From</p>
                <h4>brandcollab.partner@gmail.com</h4>
                <p className="mail-label">Subject</p>
                <h4>Urgent Sponsorship Confirmation</h4>
              </div>

              <div className="score-wrap">
                <div className="score-card glass-inner">
                  <span>Risk Score</span>
                  <strong>87/100</strong>
                </div>
                <div className="score-card glass-inner">
                  <span>Status</span>
                  <strong>High Risk</strong>
                </div>
              </div>

              <div className="warning-box glass-inner">
                <p>Detected warning signs</p>
                <ul>
                  <li>Free email used instead of official brand domain</li>
                  <li>Urgent pressure language</li>
                  <li>Possible payment / verification trap</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="stats-row">
          <div className="stat-card glass">
            <h3>Creator-Focused</h3>
            <p>Built for influencers, freelancers, artists, and businesses.</p>
          </div>
          <div className="stat-card glass">
            <h3>Smart Analysis</h3>
            <p>Combines risk indicators, content analysis, and future ML scoring.</p>
          </div>
          <div className="stat-card glass">
            <h3>Safer Decisions</h3>
            <p>Understand the warning signs before you trust an email.</p>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="section-head">
            <span className="section-badge">Core Features</span>
            <h2>Professional protection with an elegant user experience</h2>
            <p>
              Mailert is designed as a modern AI security platform with clear,
              useful, and trustworthy email analysis.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass"
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how" className="section-block">
          <div className="section-head">
            <span className="section-badge">How It Works</span>
            <h2>Simple process. Strong protection.</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="step-card glass"
                whileHover={{ y: -6 }}
              >
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="scanner" className="cta-section glass">
          <div className="cta-left">
            <span className="section-badge">Ready to Scan?</span>
            <h2>Protect your inbox with Mailert</h2>
            <p>
              Paste suspicious email details and let Mailert help you detect
              phishing, fake collaborations, and risky messages.
            </p>
          </div>

          <div className="cta-right">
            <button className="btn btn-primary btn-lg" disabled title="Scanner UI arrives in Phase 2.2">Scanner (coming soon)</button>
            <button className="btn btn-secondary btn-lg" disabled title="Authentication arrives in Phase 3">Account (coming soon)</button>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer glass">
        <div>
          <h3>mailert.</h3>
          <p>Think Before You Click.</p>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#scanner">Scanner</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
