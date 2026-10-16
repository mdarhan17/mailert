import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity, ArrowRight, ArrowUpRight, BarChart3, CheckCircle2,
  Clock3, Eye, EyeOff, Fingerprint, KeyRound, LayoutDashboard,
  LockKeyhole, Mail, ScanSearch, ShieldCheck, ShieldAlert,
  Sparkles, UserRound, type LucideIcon
} from "lucide-react";
import "./AuthWorkspace.css";

type AuthView = "signin" | "signup" | "otp";
type DashboardTab = "overview" | "activity";

const benefits: {
  icon: LucideIcon;
  title: string;
  detail: string;
}[] = [
  {
    icon: LockKeyhole,
    title: "Protected workspace",
    detail: "Private scan history is planned for signed-in users."
  },
  {
    icon: Fingerprint,
    title: "Email verification",
    detail: "One-time email verification will be connected in Phase 3."
  },
  {
    icon: ShieldCheck,
    title: "Clear risk explanations",
    detail: "Understand individual indicators alongside every future scan."
  }
];

const exampleScans = [
  {
    title: "Sponsorship approval fee",
    sender: "collabs@brand-partner.example",
    risk: "High risk",
    className: "high",
    icon: ShieldAlert
  },
  {
    title: "New campaign brief",
    sender: "talent@media-brief.example",
    risk: "Review",
    className: "medium",
    icon: ScanSearch
  },
  {
    title: "Design follow-up",
    sender: "hello@studio-notes.example",
    risk: "Lower risk",
    className: "low",
    icon: CheckCircle2
  }
];

export default function AuthWorkspace() {
  const [authView, setAuthView] = useState<AuthView>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>("overview");
  const reduceMotion = useReducedMotion();

  function changeView(next: AuthView) {
    setAuthView(next);
    setShowPassword(false);
  }

  return (
    <div className="ma-wrapper">
      <section className="ma-section" id="account" aria-labelledby="ma-auth-title">
        <div className="ma-heading">
          <span className="ma-kicker">
            <Sparkles size={15} /> PERSONAL SECURITY SPACE
          </span>
          <h2 id="ma-auth-title">
            Your inbox, <span>your peace of mind.</span>
          </h2>
          <p>
            A polished preview of the Mailert account experience.
            Email OTP and secure sessions will be implemented in Phase 3.
          </p>
        </div>

        <div className="ma-auth-layout">
          <motion.div
            className="ma-auth-card ma-glass"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
          >
            <div className="ma-card-header">
              <span className="ma-card-logo"><ShieldCheck size={22}/></span>
              <div>
                <strong>mailert<span className="ma-dot">.</span></strong>
                <small>Think Before You Click.</small>
              </div>
              <span className="ma-preview-tag">UI PREVIEW</span>
            </div>

            <div className="ma-tabs" role="group" aria-label="Authentication screen preview">
              <button
                className={authView === "signin" ? "active" : ""}
                onClick={() => changeView("signin")}
                type="button"
              >Sign in</button>

              <button
                className={authView === "signup" ? "active" : ""}
                onClick={() => changeView("signup")}
                type="button"
              >Create account</button>

              <button
                className={authView === "otp" ? "active" : ""}
                onClick={() => changeView("otp")}
                type="button"
              >OTP preview</button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={authView}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: .2 }}
              >
                {authView === "otp" ? (
                  <div className="ma-otp-panel">
                    <span className="ma-form-symbol"><KeyRound size={25}/></span>
                    <h3>Verify your email</h3>
                    <p>
                      During registration, a one-time code
                      will be sent to your email address.
                    </p>
                    <div
                      className="ma-otp-slots"
                      aria-label="Six digit OTP input design preview"
                    >
                      {Array.from({ length: 6 }, (_, i) => (
                        <span key={i}>—</span>
                      ))}
                    </div>
                    <div className="ma-demo-note">
                      <LockKeyhole size={16}/>
                      No OTP is sent or verified in this design preview.
                    </div>
                    <button
                      className="ma-primary"
                      type="button"
                      onClick={() => changeView("signup")}
                    >
                      Back to registration <ArrowRight size={17}/>
                    </button>
                  </div>
                ) : (
                  <div className="ma-form-panel">
                    <h3>
                      {authView === "signin" ? "Welcome back" : "Create your space"}
                    </h3>
                    <p>
                      {authView === "signin"
                        ? "Explore the upcoming secure login experience."
                        : "Preview the flow for joining Mailert."}
                    </p>

                    {authView === "signup" && (
                      <label className="ma-field">
                        Full name
                        <span className="ma-input-shell">
                          <UserRound size={18}/>
                          <input
                            type="text"
                            placeholder="Your name"
                            disabled
                            aria-label="Full name preview, disabled"
                          />
                        </span>
                      </label>
                    )}

                    <label className="ma-field">
                      Email address
                      <span className="ma-input-shell">
                        <Mail size={18}/>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          disabled
                          aria-label="Email address preview, disabled"
                        />
                      </span>
                    </label>

                    <label className="ma-field">
                      Password
                      <span className="ma-input-shell">
                        <LockKeyhole size={18}/>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled
                          aria-label="Password preview, disabled"
                        />
                        <button
                          type="button"
                          title={showPassword ? "Hide password preview" : "Show password preview"}
                          aria-label={showPassword ? "Hide password preview" : "Show password preview"}
                          onClick={() => setShowPassword(v => !v)}
                        >
                          {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                      </span>
                    </label>

                    <div className="ma-demo-note">
                      <ShieldCheck size={16}/>
                      Inputs are disabled until real authentication is connected.
                    </div>

                    {authView === "signup" ? (
                      <button
                        className="ma-primary"
                        type="button"
                        onClick={() => changeView("otp")}
                      >
                        Preview email verification <ArrowRight size={18}/>
                      </button>
                    ) : (
                      <a className="ma-primary" href="#dashboard">
                        Explore dashboard preview <ArrowRight size={18}/>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="ma-card-footnote">
              Design preview only · No login, credentials or codes are processed.
            </p>
          </motion.div>

          <div className="ma-benefits ma-glass">
            <div className="ma-benefits-top">
              <span className="ma-benefits-icon"><Fingerprint size={27}/></span>
              <span>SECURITY-FIRST EXPERIENCE</span>
            </div>

            <h3>Built for the moments when trust matters.</h3>
            <p>
              One workspace to review potentially risky brand deals
              and understand security warning signs.
            </p>

            <div className="ma-benefits-list">
              {benefits.map(({ icon: Icon, title, detail }) => (
                <div className="ma-benefit" key={title}>
                  <span><Icon size={19}/></span>
                  <div>
                    <strong>{title}</strong>
                    <p>{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ma-benefits-footer">
              <span className="ma-pulse"/>
              Phase 3: secure authentication integration
            </div>
          </div>
        </div>
      </section>

      <section
        className="ma-section ma-dashboard-section"
        id="dashboard"
        aria-labelledby="ma-dashboard-title"
      >
        <div className="ma-heading">
          <span className="ma-kicker">
            <LayoutDashboard size={15}/> YOUR COMMAND CENTRE
          </span>
          <h2 id="ma-dashboard-title">
            All your signals. <span>One clear view.</span>
          </h2>
          <p>
            A dashboard prototype with fictional demonstration content,
            ready to connect to PostgreSQL and real scan history later.
          </p>
        </div>

        <div className="ma-dashboard ma-glass">
          <div className="ma-dashboard-header">
            <div>
              <span className="ma-mini-label">
                MAILERT WORKSPACE / DEMONSTRATION
              </span>
              <h3>Security overview</h3>
              <p>Welcome to your future scan dashboard.</p>
            </div>
            <span className="ma-demo-label">
              <Sparkles size={14}/> SAMPLE DATA
            </span>
          </div>

          <div className="ma-dashboard-tabs" role="group" aria-label="Dashboard view">
            <button
              type="button"
              onClick={() => setDashboardTab("overview")}
              className={dashboardTab === "overview" ? "active" : ""}
            >
              <BarChart3 size={16}/> Overview
            </button>
            <button
              type="button"
              onClick={() => setDashboardTab("activity")}
              className={dashboardTab === "activity" ? "active" : ""}
            >
              <Clock3 size={16}/> Example activity
            </button>
          </div>

          {dashboardTab === "overview" ? (
            <div className="ma-dash-content">
              <div className="ma-metric-grid">
                <div className="ma-metric">
                  <span><ScanSearch size={18}/> Example scans</span>
                  <strong>24</strong>
                  <small>Illustrative count</small>
                </div>
                <div className="ma-metric">
                  <span><ShieldAlert size={18}/> High risk</span>
                  <strong>7</strong>
                  <small>Illustrative count</small>
                </div>
                <div className="ma-metric">
                  <span><ShieldCheck size={18}/> Other results</span>
                  <strong>17</strong>
                  <small>Illustrative count</small>
                </div>
              </div>

              <div className="ma-chart-row">
                <div className="ma-chart">
                  <div className="ma-chart-caption">
                    <div>
                      <span className="ma-mini-label">EXAMPLE VISUALIZATION</span>
                      <h4>Scan activity</h4>
                    </div>
                    <Activity size={20}/>
                  </div>
                  <div
                    className="ma-bars"
                    aria-label="Illustrative scan activity over seven days"
                  >
                    {[34, 57, 43, 73, 52, 88, 67].map((height, i) => (
                      <div className="ma-bar-column" key={i}>
                        <span style={{ height: `${height}%` }}/>
                        <small>{["M","T","W","T","F","S","S"][i]}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ma-insight">
                  <div className="ma-insight-icon">
                    <ShieldCheck size={27}/>
                  </div>
                  <h4>Stay informed.</h4>
                  <p>
                    Future results will explain why an email is
                    flagged and what to verify next.
                  </p>
                  <a href="#scanner">
                    Open scanner UI <ArrowUpRight size={17}/>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="ma-activity-list">
              {exampleScans.map(({ title, sender, risk, className, icon: Icon }) => (
                <div className="ma-activity-item" key={title}>
                  <span className="ma-activity-icon"><Icon size={19}/></span>
                  <div>
                    <strong>{title}</strong>
                    <small>{sender}</small>
                  </div>
                  <span className={`ma-risk-pill ${className}`}>
                    {risk}
                  </span>
                </div>
              ))}
              <p className="ma-activity-note">
                Examples only. No actual scan records are being saved or retrieved.
              </p>
            </div>
          )}

          <div className="ma-dashboard-bottom">
            <span>
              <LockKeyhole size={15}/>
              Real history requires authentication and database integration.
            </span>
            <a href="#account">
              Account preview <ArrowRight size={15}/>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
