import { SignIn, SignUp, UserButton, useUser } from "@clerk/react";
import { ShieldCheck } from "lucide-react";
import App from "./App";
import "./ClerkEntry.css";

export default function ClerkEntry() {
  const { isLoaded, isSignedIn, user } = useUser();
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/sign-in" || path === "/sign-up") {
    return (
      <main className="clerk-screen">
        <div className="clerk-screen-top">
          <a href="/"><ShieldCheck size={24} /> mailert.</a>
          <a href="/">Back to homepage</a>
        </div>

        <div className="clerk-screen-layout">
          <div className="clerk-intro">
            <span>MAILERT ACCOUNT SECURITY</span>
            <h1>
              {path === "/sign-in"
                ? "Welcome back."
                : "Think Before You Click."}
            </h1>
            <p>
              Secure registration, email verification,
              and account access powered by Clerk.
            </p>
          </div>

          <div className="clerk-form-wrap">
            {path === "/sign-in"
              ? <SignIn routing="hash" />
              : <SignUp routing="hash" />}
          </div>
        </div>
      </main>
    );
  }

  if (path === "/account") {
    return (
      <main className="clerk-screen">
        <div className="clerk-screen-top">
          <a href="/"><ShieldCheck size={24} /> mailert.</a>
          <a href="/">Back to homepage</a>
        </div>

        <div className="clerk-account">
          {!isLoaded ? (
            <p>Loading account...</p>
          ) : isSignedIn ? (
            <>
              <UserButton />
              <h1>Hello, {user?.firstName || "Creator"}!</h1>
              <p>{user?.primaryEmailAddress?.emailAddress}</p>
              <p>You are signed in to Mailert.</p>
              <a href="/#scanner">Open email scanner</a>
            </>
          ) : (
            <>
              <h1>Sign in to continue</h1>
              <a href="/sign-in">Sign In</a>
            </>
          )}
        </div>
      </main>
    );
  }

  return <App />;
}

