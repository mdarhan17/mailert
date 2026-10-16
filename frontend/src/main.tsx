import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import ClerkEntry from "./ClerkEntry";
import "./index.css";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!key) {
  throw new Error("Clerk Publishable Key is missing.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={key}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/account"
      signUpFallbackRedirectUrl="/account"
    >
      <ClerkEntry />
    </ClerkProvider>
  </StrictMode>
);
