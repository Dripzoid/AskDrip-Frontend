import { useState } from "react";

import {
  Plus,
  SendHorizontal,
  Shirt,
  Palette,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";

import QuickActions from "./QuickActions";

import { useChat } from "../context/ChatContext";
import { useConversations } from "../context/ConversationContext";

export default function ChatInput() {
  const [prompt, setPrompt] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { sidebarCollapsed } = useConversations();

  const {
    sendMessage,
    loading,
    endpoint,
    setEndpoint,
  } = useChat();

  const endpointConfig = {
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

  const handleSend = async () => {
    if (!prompt.trim() || loading) {
      return;
    }

    const message = prompt.trim();
    setPrompt("");

    await sendMessage(message, endpoint);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        bg-white
        px-4
        py-3
        dark:bg-black
      "
    >
      <div
  className="
    relative
    mx-auto
    max-w-4xl
  "
>
        {showMenu && (
          {showMenu && (
  <QuickActions
    onSelect={(value) => {
      setEndpoint(value);
      setShowMenu(false);
    }}
    onClose={() => setShowMenu(false)}
  />
)}
        )}

        <div
          className="
            rounded-3xl
            border
            border-zinc-200
            bg-white
            shadow-xl
            transition-all
            focus-within:border-zinc-400

            dark:border-zinc-800
            dark:bg-zinc-900
            dark:focus-within:border-zinc-600
          "
        >
          {/* Endpoint Badge */}
          {(endpoint !== "chat" || prompt.length > 0) && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                px-4
                pt-3
              "
            >
              {endpoint !== "chat" && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-zinc-200
                    bg-zinc-100
                    px-3
                    py-1.5
                    text-xs
                    text-zinc-900

                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                  "
                >
                  {(() => {
                    const Icon = endpointConfig[endpoint]?.icon;
                    return Icon ? <Icon size={14} /> : null;
                  })()}

                  <span>{endpointConfig[endpoint]?.label}</span>

                  <button
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
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Input Row */}
          <div
            className="
              flex
              items-end
              gap-3
              px-4
              py-3
            "
          >
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="
                rounded-full
                p-2
                text-zinc-500
                transition
                hover:bg-zinc-100
                hover:text-zinc-900

                dark:text-zinc-400
                dark:hover:bg-zinc-800
                dark:hover:text-white
              "
            >
              <Plus size={18} />
            </button>

            <textarea
              rows={1}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);

                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Ask anything..."
              className="
                custom-scrollbar

                min-h-[40px]
                max-h-32
                flex-1
                resize-none
                overflow-y-auto
                bg-transparent
                leading-[40px]
                text-zinc-900
                outline-none
                placeholder:text-zinc-500

                dark:text-white
                dark:placeholder:text-zinc-500

                disabled:opacity-60
              "
            />

            <button
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-zinc-900
                text-white
                transition-all
                hover:scale-105
                hover:bg-zinc-800
                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:bg-white
                dark:text-black
                dark:hover:bg-zinc-200
              "
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <SendHorizontal size={18} />
              )}
            </button>
          </div>
        </div>

        <p
          className="
            mt-2
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
