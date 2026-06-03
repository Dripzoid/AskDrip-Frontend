import { useEffect, useState } from "react";
import {
  Loader2,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";

import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";

const AUTH_REDIRECT_KEY =
  "dripzoid_auth_redirected_once";

function App() {
  const { loading, authStatus } =
    useAuth();

  const { theme } = useTheme();

  const [redirectedOnce, setRedirectedOnce] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return (
        sessionStorage.getItem(
          AUTH_REDIRECT_KEY
        ) === "1"
      );
    });

  useEffect(() => {
    if (
      authStatus === "authenticated"
    ) {
      sessionStorage.removeItem(
        AUTH_REDIRECT_KEY
      );

      setRedirectedOnce(false);
    }
  }, [authStatus]);

  useEffect(() => {
    if (
      authStatus ===
        "unauthenticated" &&
      !redirectedOnce
    ) {
      sessionStorage.setItem(
        AUTH_REDIRECT_KEY,
        "1"
      );

      setRedirectedOnce(true);

      const returnTo =
        encodeURIComponent(
          window.location.href
        );

      window.location.href =
        `https://dripzoid.com/login?returnTo=${returnTo}`;
    }
  }, [
    authStatus,
    redirectedOnce,
  ]);

  const handleRetry = () => {
    sessionStorage.removeItem(
      AUTH_REDIRECT_KEY
    );

    setRedirectedOnce(false);

    window.location.reload();
  };

  const FullScreenCenter = ({
    children,
  }) => (
    <div
      className="
        flex
        h-screen
        items-center
        justify-center
        bg-background
        text-foreground
        transition-colors
        duration-300
      "
    >
      {children}
    </div>
  );

  const cardClass = `
    rounded-3xl
    border
    border-border
    bg-card
    shadow-lg
    backdrop-blur-xl
  `;

  const buttonClass = `
    mt-6
    rounded-xl
    border
    border-border
    bg-foreground
    px-5
    py-2
    text-background
    transition-all
    duration-200
    hover:opacity-90
  `;

  if (
    loading ||
    authStatus === "checking"
  ) {
    return (
      <FullScreenCenter>
        <div
          className="
            flex
            flex-col
            items-center
            gap-6
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              border
              border-border
              bg-card
            "
          >
            <Loader2
              className="
                h-10
                w-10
                animate-spin
                text-foreground
              "
            />
          </div>

          <div className="text-center">
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              Authenticating
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              Verifying your
              Dripzoid session...
            </p>
          </div>
        </div>
      </FullScreenCenter>
    );
  }

  if (authStatus === "error") {
    return (
      <FullScreenCenter>
        <div
          className={`${cardClass} max-w-md p-8 text-center`}
        >
          <AlertTriangle
            className="
              mx-auto
              mb-4
              h-12
              w-12
              text-red-500
            "
          />

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Authentication Failed
          </h2>

          <p
            className="
              mt-3
              text-sm
              text-muted-foreground
            "
          >
            We could not verify
            your Dripzoid session.
            Please try again.
          </p>

          <button
            onClick={handleRetry}
            className={buttonClass}
          >
            Retry
          </button>
        </div>
      </FullScreenCenter>
    );
  }

  if (
    authStatus ===
    "unauthenticated"
  ) {
    if (redirectedOnce) {
      return (
        <FullScreenCenter>
          <div
            className={`${cardClass} max-w-md p-8 text-center`}
          >
            <AlertTriangle
              className="
                mx-auto
                mb-4
                h-12
                w-12
                text-red-500
              "
            />

            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Authentication Failed
            </h2>

            <p
              className="
                mt-3
                text-sm
                text-muted-foreground
              "
            >
              You were redirected
              to login, but no
              valid session was
              returned. Please
              retry.
            </p>

            <button
              onClick={handleRetry}
              className={buttonClass}
            >
              Retry
            </button>
          </div>
        </FullScreenCenter>
      );
    }

    return (
      <FullScreenCenter>
        <div
          className="
            flex
            flex-col
            items-center
            gap-6
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              border
              border-border
              bg-card
            "
          >
            <ShieldCheck
              className="
                h-10
                w-10
                text-foreground
              "
            />
          </div>

          <div className="text-center">
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              Redirecting
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              Taking you to
              Dripzoid Login...
            </p>
          </div>
        </div>
      </FullScreenCenter>
    );
  }

  return (
    <div
      className="
        flex
        h-screen
        flex-col
        overflow-hidden
        bg-background
        text-foreground
        transition-colors
        duration-300
      "
    >
      <Header />

      <div
        className="
          flex
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        <Sidebar />
        <ChatPage />
      </div>
    </div>
  );
}

export default App;