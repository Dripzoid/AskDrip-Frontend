import {
  Shirt,
  Activity,
} from "lucide-react";

export default function Header() {
  return (
    <div
      className="
        sticky top-0 z-50
        flex items-center justify-between
        border-b
        border-zinc-200
        bg-white/80
        px-6 py-4
        backdrop-blur-xl
        dark:border-zinc-800
        dark:bg-black/80
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            rounded-xl
            bg-zinc-100
            p-2
            dark:bg-zinc-900
          "
        >
          <Shirt
            size={20}
            className="text-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">
            AskDrip
          </h2>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Fashion AI Assistant
          </p>
        </div>
      </div>

      <div
        className="
          flex items-center gap-2
          rounded-full
          border
          border-zinc-200
          bg-zinc-100
          px-3 py-1
          dark:border-zinc-800
          dark:bg-zinc-900
        "
      >
        <Activity
          size={12}
          className="text-green-500"
        />

        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          Online
        </span>
      </div>
    </div>
  );
}