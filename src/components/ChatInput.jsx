import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Plus,
  SendHorizontal,
  Shirt,
  Palette,
  Sparkles,
  Loader2,
  X,
  CornerDownLeft,
} from "lucide-react";

import QuickActions from "./QuickActions";

import { useChat } from "../context/ChatContext";

const ENDPOINT_CONFIG = {
  outfit: {
    label: "Outfit",
    icon: Shirt,
  },
  color: {
    label: "Color Match",
    icon: Palette,
  },
  recommendation: {
    label: "Recommendation",
    icon: Sparkles,
  },
};

export default function ChatInput() {
  const [prompt, setPrompt] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef(null);

  const {
    sendMessage,
    loading,
    endpoint,
    setEndpoint,
  } = useChat();

  const activeEndpoint = useMemo(() => {
    return ENDPOINT_CONFIG[endpoint] ?? null;
  }, [endpoint]);

  const canSend = prompt.trim().length > 0 && !loading;

  const handleSend = async () => {
    if (!canSend) return;

    const message = prompt.trim();
    setPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await sendMessage(message, endpoint);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

    if (e.key === "Escape") {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [prompt]);

  return (
    <div
      className="
        sticky
        bottom-0
        z-20
        border-t
        border-zinc-200/70
        bg-white/90
        backdrop-blur-xl

        dark:border-zinc-800/70
        dark:bg-zinc-950/80
      "
    >
      <div className="mx-auto w-full max-w-4xl px-4 py-4">
        {showMenu && (
          <div className="mb-3">
            <QuickActions
              onSelect={(value) => {
                setEndpoint(value);
                setShowMenu(false);
              }}
            />
          </div>
        )}

        <div
          className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            transition-all
            duration-200

            ${
              isFocused
                ? "border-zinc-400 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:border-zinc-600 dark:bg-zinc-900"
                : "border-zinc-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-900"
            }
          `}
        >
          {/* Top status row */}
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {activeEndpoint && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-zinc-200
                    bg-zinc-100
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-zinc-900

                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                  "
                >
                  <activeEndpoint.icon size={14} />
                  <span>{activeEndpoint.label}</span>

                  <button
                    type="button"
                    onClick={() => setEndpoint("chat")}
                    className="
                      rounded-full
                      p-0.5
                      text-zinc-500
                      transition
                      hover:bg-zinc-200
                      hover:text-zinc-900

                      dark:text-zinc-400
                      dark:hover:bg-zinc-700
                      dark:hover:text-white
                    "
                    aria-label="Clear mode"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              {prompt.trim().length > 0 && (
                <div
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-3
                    py-1.5
                    text-xs
                    text-zinc-600

                    dark:border-zinc-700
                    dark:bg-zinc-900
                    dark:text-zinc-400
                  "
                >
                  {prompt.trim().length} chars
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-zinc-200
                bg-zinc-50
                text-zinc-600
                transition
                hover:bg-zinc-100
                hover:text-zinc-900

                dark:border-zinc-800
                dark:bg-zinc-900
                dark:text-zinc-400
                dark:hover:bg-zinc-800
                dark:hover:text-white
              "
              aria-label="Open quick actions"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Input Row */}
          <div className="flex items-end gap-3 px-4 pb-4 pt-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={loading}
              placeholder="Ask anything..."
              className="
                custom-scrollbar

                min-h-[52px]
                max-h-32
                flex-1
                resize-none
                overflow-y-auto
                rounded-2xl
                border
                border-transparent
                bg-zinc-50
                px-4
                py-3
                text-[15px]
                leading-6
                text-zinc-900
                outline-none
                placeholder:text-zinc-500

                focus:bg-white

                dark:bg-zinc-950
                dark:text-white
                dark:placeholder:text-zinc-500
                dark:focus:bg-zinc-900

                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-zinc-900
                text-white
                shadow-lg
                transition-all
                hover:scale-[1.03]
                hover:bg-zinc-800
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:bg-white
                dark:text-black
                dark:hover:bg-zinc-200
              "
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <SendHorizontal size={18} />
              )}
            </button>
          </div>

          {/* Bottom hint */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              border-t
              border-zinc-200/70
              px-4
              py-3

              text-xs
              text-zinc-500

              dark:border-zinc-800/70
              dark:text-zinc-400
            "
          >
            <div className="flex items-center gap-2">
              <CornerDownLeft size={14} />
              <span>Enter to send</span>
              <span className="text-zinc-400">•</span>
              <span>Shift + Enter for new line</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setPrompt("");
                if (textareaRef.current) {
                  textareaRef.current.style.height = "auto";
                  textareaRef.current.focus();
                }
              }}
              className="
                rounded-full
                px-2.5
                py-1
                text-zinc-500
                transition
                hover:bg-zinc-100
                hover:text-zinc-900

                dark:hover:bg-zinc-800
                dark:hover:text-white
              "
            >
              Clear
            </button>
          </div>
        </div>

        <p
          className="
            mt-3
            text-center
            text-xs
            text-zinc-500
            dark:text-zinc-400
          "
        >
          AskDrip can make mistakes. Verify important fashion advice.
        </p>
      </div>
    </div>
  );
}
