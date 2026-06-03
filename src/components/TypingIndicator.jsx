import { useEffect, useState } from "react";

const MESSAGES = {
  chat: [
    "Analyzing your request...",
    "Preparing a response...",
    "Understanding your intent...",
    "Generating insights...",
    "Looking for the best answer...",
    "Processing your message...",
    "Building a helpful response...",
    "Reviewing available information...",
    "Crafting a thoughtful reply...",
    "Connecting the dots...",
  ],

  outfit: [
    "Creating outfit combinations...",
    "Matching tops and bottoms...",
    "Finding the perfect fit...",
    "Building a stylish outfit...",
    "Checking fashion trends...",
    "Curating outfit suggestions...",
    "Generating outfit ideas...",
    "Styling your next look...",
    "Exploring fashion combinations...",
    "Putting together the perfect outfit...",
  ],

  color: [
    "Finding matching colors...",
    "Analyzing color harmony...",
    "Building a color palette...",
    "Checking complementary shades...",
    "Matching wardrobe colors...",
    "Optimizing color balance...",
    "Exploring color combinations...",
    "Reviewing fashion color theory...",
    "Finding shades that work together...",
    "Creating stylish color pairings...",
  ],

  recommendation: [
    "Creating personalized recommendations...",
    "Analyzing fashion preferences...",
    "Finding wardrobe essentials...",
    "Preparing fashion insights...",
    "Optimizing style choices...",
    "Building tailored suggestions...",
    "Exploring trending products...",
    "Searching for the best matches...",
    "Reviewing fashion options...",
    "Curating recommendations for you...",
  ],
};

const SLOW_MESSAGES = [
  "Still working on it...",
  "Taking a little longer than usual...",
  "Searching deeper for the best result...",
  "Reviewing additional fashion insights...",
  "Almost there, refining the response...",
  "Double-checking recommendations...",
  "Looking through more possibilities...",
  "Ensuring the best answer for you...",
  "Finalizing the response...",
  "Thanks for your patience...",
];

export default function TypingIndicator({
  endpoint = "chat",
}) {
  const [message, setMessage] =
    useState("Thinking...");

  useEffect(() => {
    const routeMessages =
      MESSAGES[endpoint] ||
      MESSAGES.chat;

    let currentIndex = 0;
    let elapsed = 0;

    setMessage("Thinking...");

    const interval = setInterval(() => {
      elapsed += 3;

      if (elapsed >= 20) {
        setMessage(
          SLOW_MESSAGES[
            currentIndex %
              SLOW_MESSAGES.length
          ]
        );
      } else {
        setMessage(
          routeMessages[
            currentIndex %
              routeMessages.length
          ]
        );
      }

      currentIndex++;
    }, 3000);

    return () =>
      clearInterval(interval);
  }, [endpoint]);

  return (
    <div className="mb-4 flex justify-start">
      <div
        className="
          flex
          items-center
          gap-2
          rounded-xl
          px-3
          py-2
        "
      >
        {/* Animated Dots */}
        <div className="flex gap-1">
          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-zinc-500
              dark:bg-zinc-400
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-zinc-500
              dark:bg-zinc-400
            "
            style={{
              animationDelay:
                "0.15s",
            }}
          />

          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-zinc-500
              dark:bg-zinc-400
            "
            style={{
              animationDelay:
                "0.3s",
            }}
          />
        </div>

        {/* Status Text */}
        <span
          className="
            text-xs
            text-zinc-600
            transition-all
            duration-300

            dark:text-zinc-400
          "
        >
          {message}
        </span>
      </div>
    </div>
  );
}