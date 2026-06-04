import { useEffect, useRef } from "react";

import {
  Sparkles,
  Palette,
  MessageSquare,
} from "lucide-react";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

import { useChat } from "../context/ChatContext";
import { useConversations } from "../context/ConversationContext";

export default function ChatWindow() {
  const {
    messages,
    loading,
    sendMessage,
    setEndpoint,
    endpoint,
  } = useChat();

  const bottomRef = useRef(null);

  const {
    sidebarCollapsed,
    conversationLoading,
  } = useConversations();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, loading, conversationLoading]);

  const suggestions = [
    {
      prompt: "Suggest an outfit for college",
      endpoint: "outfit",
    },
    {
      prompt: "Best colors with black cargo",
      endpoint: "color",
    },
    {
      prompt: "Streetwear outfit under ₹3000",
      endpoint: "recommendation",
    },
    {
      prompt: "What shoes go with beige pants?",
      endpoint: "recommendation",
    },
  ];

  const handleSuggestionClick = async (
    prompt,
    endpoint
  ) => {
    if (!sendMessage) return;
    await sendMessage(prompt, endpoint);
  };

  if (conversationLoading) {
    return (
      <div
        className="
          flex
          h-full
          flex-1
          flex-col
          bg-white
          text-zinc-900
          dark:bg-black
          dark:text-white
        "
      >
        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            pb-6
            pt-2
          "
        >
          <ConversationLoader />
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800">
          <ChatInput />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-full
        flex-1
        flex-col
        bg-white
        text-zinc-900
        dark:bg-black
        dark:text-white
      "
    >
      {/* Messages Area */}
      <div
        className="
          custom-scrollbar
          flex-1
          overflow-y-auto
          px-4
          pb-6
          pt-2
        "
      >
        {messages.length === 0 ? (
          <div
            className="
              flex
              min-h-full
              flex-col
              items-center
              justify-center
              px-6
              py-12
            "
          >
            {/* Logo */}
            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                rounded-3xl
                border
                border-zinc-200
                bg-zinc-100
                p-5
                dark:border-zinc-800
                dark:bg-zinc-900
              "
            >
              <img
                src="/logo-light.png"
                alt="AskDrip"
                className="block h-14 w-14 dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="AskDrip"
                className="hidden h-14 w-14 dark:block"
              />
            </div>

            {/* Title */}
            <h1
              className="
                mb-3
                text-center
                text-4xl
                font-bold
                text-zinc-900
                dark:text-white
              "
            >
              AskDrip
            </h1>

            {/* Subtitle */}
            <p
              className="
                mb-10
                max-w-xl
                text-center
                text-zinc-600
                dark:text-zinc-400
              "
            >
              Your AI-powered fashion assistant.
              Discover outfits, color matches,
              styling advice, and fashion
              recommendations instantly.
            </p>

            {/* Feature Cards */}
            <div
              className="
                mb-8
                grid
                w-full
                max-w-4xl
                gap-4
                md:grid-cols-3
              "
            >
              <FeatureCard
                icon={<Sparkles size={20} />}
                title="Outfit Ideas"
                description="Complete outfit generation."
                onClick={() => setEndpoint("outfit")}
              />

              <FeatureCard
                icon={<Palette size={20} />}
                title="Color Matching"
                description="Find matching color combinations."
                onClick={() => setEndpoint("color")}
              />

              <FeatureCard
                icon={<Sparkles size={20} />}
                title="Recommendations"
                description="AI-powered styling advice."
                onClick={() =>
                  setEndpoint("recommendation")
                }
              />
            </div>

            {/* Suggestions */}
            <div className="w-full max-w-3xl">
              <p
                className="
                  mb-3
                  text-center
                  text-sm
                  text-zinc-500
                  dark:text-zinc-500
                "
              >
                Try asking
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                "
              >
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        item.prompt,
                        item.endpoint
                      )
                    }
                    className="
                      rounded-full
                      border
                      border-zinc-200
                      bg-white
                      px-4
                      py-2
                      text-sm
                      text-zinc-700
                      transition-all

                      hover:border-zinc-300
                      hover:bg-zinc-100

                      dark:border-zinc-800
                      dark:bg-zinc-900
                      dark:text-zinc-300
                      dark:hover:border-zinc-600
                      dark:hover:bg-zinc-800
                      dark:hover:text-white
                    "
                  >
                    {item.prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="
              mx-auto
              w-full
              max-w-5xl
              px-2
              pb-0
              pt-4
            "
          >
            <div
              className="
                mb-6
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-zinc-500
                  dark:text-zinc-500
                "
              >
                <MessageSquare size={16} />

                <span className="text-sm">
                  {messages.length} messages
                </span>
              </div>
            </div>

            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                role={message.role}
                content={message.content}
                products={message.products}
                timestamp={
                  message.createdAt ||
                  message.timestamp
                }
              />
            ))}

            {loading && (
              <TypingIndicator endpoint={endpoint} />
            )}

            <div
              ref={bottomRef}
              className="h-1"
            />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <ChatInput />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-5
        text-left
        transition-all

        hover:border-zinc-300
        hover:bg-zinc-100

        dark:border-zinc-800
        dark:bg-zinc-900
        dark:hover:border-zinc-700
        dark:hover:bg-zinc-800
      "
    >
      <div className="mb-3 text-zinc-900 dark:text-white">
        {icon}
      </div>

      <h3
        className="
          mb-1
          font-medium
          text-zinc-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          text-sm
          text-zinc-600
          dark:text-zinc-400
        "
      >
        {description}
      </p>
    </button>
  );
}

function ConversationLoader() {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-5xl
        px-2
        pb-4
        pt-4
      "
    >
      {[...Array(6)].map((_, index) => {
        const isUser = index % 2 === 0;

        return (
          <div
            key={index}
            className={`
              mb-8
              flex
              gap-4
              ${
                isUser
                  ? "flex-row-reverse"
                  : ""
              }
            `}
          >
            {/* Avatar */}
            <div
              className="
                h-10
                w-10
                shrink-0
                animate-pulse
                rounded-full
                bg-zinc-200
                dark:bg-zinc-800
              "
            />

            {/* Content */}
            <div
              className={`
                flex
                flex-col
                ${
                  isUser
                    ? "max-w-[80%] items-end"
                    : "w-full max-w-[92%] items-start"
                }
              `}
            >
              {/* Header */}
              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    h-4
                    w-16
                    animate-pulse
                    rounded
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />

                <div
                  className="
                    h-3
                    w-12
                    animate-pulse
                    rounded
                    bg-zinc-100
                    dark:bg-zinc-900
                  "
                />
              </div>

              {/* Bubble */}
              <div
                className={`
                  animate-pulse
                  rounded-3xl
                  border
                  border-zinc-200
                  bg-zinc-100
                  p-5
                  dark:border-zinc-800
                  dark:bg-zinc-900

                  ${
                    isUser
                      ? "w-72"
                      : "w-full max-w-3xl"
                  }
                `}
              >
                <div
                  className="
                    mb-3
                    h-4
                    w-[90%]
                    rounded
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />

                <div
                  className="
                    mb-3
                    h-4
                    w-[75%]
                    rounded
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />

                <div
                  className="
                    h-4
                    w-[55%]
                    rounded
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading conversation...
        </p>
      </div>
    </div>
  );
}
