import "./App.css";
import RiskResults from "./components/RiskResults";
import EmailScanner from "./components/EmailScanner";
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
    text: "Analyze suspicious emails using intelligent patterns, phishing indicators, and creator-focused scam signals.",
  },
  {
    icon: <Mail size={28} />,
    title: "Email Content Analysis",
    text: "Check sender details, message content, and suspicious language used in fake sponsorship emails.",
  },
  {
    icon: <Search size={28} />,
    title: "Link & Risk Inspection",
    text: "Identify misleading domains, unusual links, and potential phishing URLs without opening unsafe links.",
  },
  {
    icon: <AlertTriangle size={28} />,
    title: "Explainable Results",
    text: "Understand why an email was flagged with clear reasons, risk indicators, and safety recommendations.",
  },
  {
    icon: <Lock size={28} />,
    title: "Privacy Focused",
    text: "Designed to analyze email content without unnecessarily storing complete messages.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Creator Scam Protection",
    text: "Focused on fake brand deals, influencer scams, fraudulent payments, and account theft attempts.",
  },
];

const steps = [
  {
    number: "01",
    title: "Paste the Email",
    text: "Copy the sender, subject, email body, and links into Mailert.",
  },
  {
    number: "02",
    title: "Analyze the Email",
    text: "The detection system checks suspicious patterns, sender details, and phishing signs.",
  },
  {
    number: "03",
    title: "Understand the Risk",
    text: "View the risk category, warning signs, and safety recommendations.",
  },
];

function App() {
  return (
    <div className="page-shell">
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <header className="navbar glass">
        <a className="brand-wrap" href="#home">
          <div className="brand-mark">
            <ShieldCheck size={21} />
          </div>
          <span className="brand-name">mailert<span>.</span></span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#scanner">Scanner</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="btn btn-secondary"
            disabled
            title="Login will be added in Phase 3"
          >
            Login (soon)
          </button>
          <a className="btn btn-primary" href="#features">
            Explore <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="tag-pill glass">
              <Sparkles size={16} />
              <span>Intelligent Email Scam Protection</span>
            </div>

            <h1>
              Think Before
              <br />
              <span>You Click.</span>
            </h1>

            <p className="hero-subtext">
              Your intelligent layer of protection against suspicious
              emails, fake brand collaborations, phishing attempts,
              and online scams. Built for creators, influencers,
              freelancers, and businesses.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#features">
                Explore Mailert
                <ArrowRight size={19} />
              </a>

              <a className="btn btn-secondary btn-lg" href="#how">
                How It Works
              </a>
            </div>

            <div className="hero-points">
              <div>
                <CheckCircle2 size={18} />
                Fake collaboration detection
              </div>
              <div>
                <CheckCircle2 size={18} />
                Suspicious link analysis
              </div>
              <div>
                <CheckCircle2 size={18} />
                Explainable risk assessment
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dashboard-card glass">
              <div className="dashboard-header">
                <div>
                  <span className="eyebrow">DEMONSTRATION</span>
                  <h3>Email Risk Analysis</h3>
                  <p>Example assessment preview</p>
                </div>

                <span className="risk-badge danger">
                  High Risk
                </span>
              </div>

              <div className="mail-preview glass-inner">
                <div className="mail-meta">
                  <Mail size={17} />
                  <span>Incoming message</span>
                </div>

                <p className="mail-label">FROM</p>
                <h4>brandcollab.partner@gmail.com</h4>

                <p className="mail-label">SUBJECT</p>
                <h4>Urgent Sponsorship Confirmation</h4>
              </div>

              <div className="score-wrap">
                <div className="score-card glass-inner">
                  <span>Sample Risk Index</span>
                  <strong className="risk-number">87/100</strong>
                </div>

                <div className="score-card glass-inner">
                  <span>Assessment</span>
                  <strong>High Risk</strong>
                </div>
              </div>

              <div className="risk-progress">
                <motion.div
                  className="risk-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "87%" }}
                  transition={{ duration: 1.4, delay: 0.6 }}
                />
              </div>

              <div className="warning-box glass-inner">
                <div className="warning-heading">
                  <AlertTriangle size={18} />
                  <h4>Example Warning Signs</h4>
                </div>

                <ul>
                  <li>Unverified brand sender address</li>
                  <li>Urgent pressure language</li>
                  <li>Possible payment or verification trap</li>
                </ul>
              </div>

              <p className="demo-note">
                Illustrative UI only. Live detection will be added
                in later development phases.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="stats-row">
          <div className="stat-card glass">
            <span className="stat-symbol">01 /</span>
            <h3>Creator-Focused</h3>
            <p>
              Designed for influencers, freelancers,
              digital artists, and growing businesses.
            </p>
          </div>

          <div className="stat-card glass">
            <span className="stat-symbol">02 /</span>
            <h3>Intelligent Analysis</h3>
            <p>
              Planned AI and ML analysis combined
              with understandable security indicators.
            </p>
          </div>

          <div className="stat-card glass">
            <span className="stat-symbol">03 /</span>
            <h3>Safer Decisions</h3>
            <p>
              Understand warning signs before
              trusting suspicious collaboration offers.
            </p>
          </div>
        </section>

        <section id="features" className="section-block">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">CORE CAPABILITIES</span>

            <h2>
              A smarter way to
              <span className="heading-accent"> trust your inbox.</span>
            </h2>

            <p>
              Everything you need to identify potential
              email scams, understand risks, and make
              informed decisions.
            </p>
          </motion.div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>

                <div className="feature-bottom">
                  <span>0{index + 1}</span>
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how" className="section-block">
          <div className="section-head">
            <span className="section-badge">SIMPLE WORKFLOW</span>
            <h2>
              Three steps to
              <span className="heading-accent"> safer decisions.</span>
            </h2>
            <p>
              Mailert is being designed to make email risk
              assessment easy for everyone.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className="step-card glass"
                whileHover={{ y: -7 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
              >
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <EmailScanner />
        <RiskResults />
      </main>

      <footer id="contact" className="footer glass">
        <div>
          <h3>mailert<span>.</span></h3>
          <p>Think Before You Click.</p>
        </div>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#scanner">Scanner</a>
        </div>

        <p className="footer-note">Mailert — Development Preview</p>
      </footer>
    </div>
  );
}

export default App;


