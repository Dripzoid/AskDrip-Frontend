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
            flex
            items-center
            justify-center
            rounded-xl
            bg-zinc-100
            p-2
            dark:bg-zinc-900
          "
        >
          <img
            src="/logo-light.png"
            alt="AskDrip"
            className="block h-8 w-8 dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="AskDrip"
            className="hidden h-8 w-8 dark:block"
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
    </div>
  );
}
