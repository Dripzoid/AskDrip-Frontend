export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        flex
        items-center

        border-b
        border-zinc-200

        bg-white/95
        px-4
        py-2.5

        backdrop-blur-xl

        dark:border-zinc-800
        dark:bg-zinc-950/95
      "
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img
          src="/logo-light.png"
          alt="AskDrip"
          className="
            block
            h-11
            w-auto

            select-none

            dark:hidden
          "
        />

        <img
          src="/logo-dark.png"
          alt="AskDrip"
          className="
            hidden
            h-11
            w-auto

            select-none

            dark:block
          "
        />

        {/* Brand */}
        <div className="leading-tight">
          <h2
            className="
              text-base
              font-semibold
              tracking-tight

              text-zinc-900

              dark:text-white
            "
          >
            AskDrip
          </h2>

          <p
            className="
              text-[11px]

              text-zinc-500

              dark:text-zinc-400
            "
          >
            Fashion AI Assistant
          </p>
        </div>
      </div>
    </header>
  );
}
