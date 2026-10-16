import { useUser, UserButton } from "@clerk/react";

export default function AuthNavActions() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <span>Loading account...</span>;
  }

  if (isSignedIn) {
    return (
      <>
        <a className="btn btn-secondary" href="/account">
          My Account
        </a>
        <UserButton />
      </>
    );
  }

  return (
    <>
      <a className="btn btn-secondary" href="/sign-in">
        Sign In
      </a>

      <a className="btn btn-primary" href="/sign-up">
        Get Started
      </a>
    </>
  );
}
