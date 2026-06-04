import { useState } from "react";
import ReactMarkdown from "react-markdown";

import ProductCarousel from "./ProductCarousel";

import {
  Copy,
  Check,
  User,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";

export default function MessageBubble({
  role,
  content,
  products = [],
  timestamp = new Date(),
}) {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <div
      className={`group mb-8 flex gap-4 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${
          isUser
            ? `
              bg-zinc-900
              text-white
              shadow-md

              dark:bg-white
              dark:text-black
            `
            : `
              border
              border-zinc-300
              bg-white
              shadow-md

              dark:border-zinc-700
              dark:bg-zinc-900
            `
        }`}
      >
        {isUser ? (
          <User size={18} />
        ) : (
          <>
            <img
              src="/logo-light.png"
              alt="AskDrip"
              className="block h-full w-full object-contain p-1.5 dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="AskDrip"
              className="hidden h-full w-full object-contain p-1.5 dark:block"
            />
          </>
        )}
      </div>

      {/* Content Area */}
      <div
        className={`flex flex-col ${
          isUser
            ? "max-w-[78%] items-end"
            : "w-full max-w-[90%] items-start"
        }`}
      >
        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {isUser ? "You" : "AskDrip"}
          </span>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={`
            transition-all
            duration-200

            ${
              isUser
                ? `
                  rounded-3xl
                  bg-zinc-900
                  px-5
                  py-4
                  text-white

                  shadow-[0_8px_30px_rgba(0,0,0,0.18)]

                  dark:bg-white
                  dark:text-black
                  dark:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
                `
                : `
                  w-full
                  rounded-3xl

                  border
                  border-zinc-300/80

                  bg-white/95
                  backdrop-blur-md

                  px-5
                  py-4

                  text-zinc-900

                  shadow-[0_10px_35px_rgba(0,0,0,0.08)]

                  dark:border-zinc-700
                  dark:bg-zinc-900/95
                  dark:text-white

                  dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)]
                `
            }
          `}
        >
          {/* Message Content */}
          <div
            className="
              prose
              prose-zinc
              max-w-none

              prose-p:leading-7
              prose-li:leading-7

              prose-pre:rounded-2xl
              prose-pre:border
              prose-pre:border-zinc-700

              dark:prose-invert
            "
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Product Carousel */}
          {!isUser && products?.length > 0 && (
            <div
              className="
                mt-5
                border-t
                border-zinc-200
                pt-5

                dark:border-zinc-800
              "
            >
              <ProductCarousel products={products} />
            </div>
          )}
        </div>

        {/* Hover Actions */}
        <div
          className="
            mt-2
            flex
            gap-1

            translate-y-1
            opacity-0

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          {/* Copy */}
          <button
            onClick={copyMessage}
            className="
              rounded-lg
              p-2

              text-zinc-500

              hover:bg-zinc-100
              hover:text-zinc-900

              dark:text-zinc-400
              dark:hover:bg-zinc-800
              dark:hover:text-white
            "
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {/* Assistant Actions */}
          {!isUser && (
            <>
              <button
                className="
                  rounded-lg
                  p-2

                  text-zinc-500

                  hover:bg-zinc-100
                  hover:text-zinc-900

                  dark:text-zinc-400
                  dark:hover:bg-zinc-800
                  dark:hover:text-white
                "
              >
                <ThumbsUp size={16} />
              </button>

              <button
                className="
                  rounded-lg
                  p-2

                  text-zinc-500

                  hover:bg-zinc-100
                  hover:text-zinc-900

                  dark:text-zinc-400
                  dark:hover:bg-zinc-800
                  dark:hover:text-white
                "
              >
                <ThumbsDown size={16} />
              </button>

              <button
                className="
                  rounded-lg
                  p-2

                  text-zinc-500

                  hover:bg-zinc-100
                  hover:text-zinc-900

                  dark:text-zinc-400
                  dark:hover:bg-zinc-800
                  dark:hover:text-white
                "
              >
                <RotateCcw size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
