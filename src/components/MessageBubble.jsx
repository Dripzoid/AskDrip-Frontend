import { useState } from "react";

import ReactMarkdown from "react-markdown";

import ProductCarousel from "./ProductCarousel";

import {
  Copy,
  Check,
  User,
  Shirt,
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

  const [copied, setCopied] =
    useState(false);

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
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
            : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
        }`}
      >
        {isUser ? <User size={18} /> : <Shirt size={18} />}
      </div>

      {/* Content Area */}
      <div
        className={`flex flex-col ${
          isUser
            ? "max-w-[80%] items-end"
            : "w-full max-w-[92%] items-start"
        }`}
      >
        {/* Header */}
        <div className="mb-1 flex items-center gap-2">
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
          className={`shadow-lg transition-all ${
            isUser
              ? "rounded-3xl bg-zinc-100 px-5 py-4 text-zinc-900 dark:bg-white dark:text-black"
              : "w-full rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          }`}
        >
          {/* Message Content */}
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Product Carousel Inside Bubble */}
          {!isUser && products?.length > 0 && (
            <div className="mt-5 border-t border-zinc-200 pt-5 dark:border-zinc-800">
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
            opacity-0
            transition-all
            duration-200
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