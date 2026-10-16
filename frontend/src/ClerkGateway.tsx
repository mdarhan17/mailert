import { SignIn, SignUp, SignedIn, SignedOut, UserButton, useUser } from "@clerk/react";
import { ArrowRight, LockKeyRound, Mail, ShieldCheck, Sparkles } from "lucide-react";
import App from "./App";
import "./ClerkGateway.css";

function AccountLinks() {
  return (
    <div className="m3-links">
      <SignedOut>
        <a href="/sign-in">Log in</a>
        <a className="m3-action" href="/sign-up">Create account <ArrowRight size={15}/></a>
      </SignedOut>
      <SignedIn>
        <a href="/account">My account</a>
        <UserButton />
      </SignedIn>
    </div>
  );
}

function AuthPage({ kind }: { kind: "in" | "up" }) {
  return (
    <main className="m3-auth">
      <header className="m3-header">
        <a href="/" className="m3-logo"><ShieldCheck size={25}/> mailert<span>.</span></a>
        <a href="/" className="m3-home">Back to homepage</a>
      </header>

      <div className="m3-auth-layout">
        <section className="m3-intro">
          <div className="m3-eyebrow"><Sparkles size={16}/> YOUR EMAIL SECURITY WORKSPACE</div>
          <h1>{kind === "up" ? "Better security " : "Welcome "}
            <span>{kind === "up" ? "starts here." : "back."}</span>
          </h1>
          <p>
            {kind === "up"
              ? "Create your Mailert account to access your personal security workspace."
              : "Sign in securely to continue using Mailert."}
          </p>
          <div className="m3-benefit"><LockKeyRound size={21}/> Secure account sessions</div>
          <div className="m3-benefit"><Mail size={21}/> Email verification powered by Clerk</div>
          <div className="m3-benefit"><ShieldCheck size={21}/> Privacy-first email analysis roadmap</div>
        </section>

        <div className="m3-form">
          <div className="m3-form-title">
            <strong>{kind === "up" ? "Create your account" : "Sign in to Mailert"}</strong>
            <small>Protected authentication by Clerk</small>
          </div>
          {kind === "up" ? (
            <SignUp routing="hash" />
          ) : (
            <SignIn routing="hash" />
          )}
        </div>
      </div>
    </main>
  );
}

function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <main className="m3-auth">
      <header className="m3-header">
        <a href="/" className="m3-logo"><ShieldCheck size={25}/> mailert<span>.</span></a>
        <a href="/" className="m3-home">Back to Mailert</a>
      </header>

      <section className="m3-account">
        <div className="m3-eyebrow"><LockKeyRound size={16}/> YOUR PERSONAL SPACE</div>
        {!isLoaded ? (
          <p>Loading account...</p>
        ) : isSignedIn && user ? (
          <>
            <div className="m3-account-top">
              <img src={user.imageUrl} alt="" className="m3-avatar"/>
              <UserButton />
            </div>
            <h1>Hello, {user.firstName || "Creator"}!</h1>
            <p>{user.primaryEmailAddress?.emailAddress}</p>
            <div className="m3-account-status">
              <ShieldCheck size={18}/>
              Authenticated with Clerk
            </div>
            <div className="m3-account-info">
              Email scanning history and private reports will be connected
              after the FastAPI and PostgreSQL integration.
            </div>
            <a href="/#scanner" className="m3-account-cta">
              Go to email scanner <ArrowRight size={17}/>
            </a>
          </>
        ) : (
          <>
            <h1>Sign in to continue.</h1>
            <p>Your account information is not available while signed out.</p>
            <a href="/sign-in" className="m3-account-cta">
              Sign in <ArrowRight size={17}/>
            </a>
          </>
        )}
      </section>
    </main>
  );
}

export default function ClerkGateway() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/sign-in") return <AuthPage kind="in" />;
  if (path === "/sign-up") return <AuthPage kind="up" />;
  if (path === "/account") return <AccountPage />;

  return (
    <>
      <div className="m3-access-bar">
        <span><ShieldCheck size={15}/> MAILERT ACCOUNT ACCESS</span>
        <AccountLinks />
      </div>
      <App />
    </>
  );
}
