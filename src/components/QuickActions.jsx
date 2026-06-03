import {
  Shirt,
  Palette,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    id: "outfit",
    title: "Outfit",
    description: "Generate complete outfits",
    icon: Shirt,
  },
  {
    id: "color",
    title: "Color Match",
    description: "Find matching colors",
    icon: Palette,
  },
  {
    id: "recommendation",
    title: "Recommendation",
    description: "Get AI styling advice",
    icon: Sparkles,
  },
];

export default function QuickActions({
  onSelect,
}) {
  return (
    <div
      className="
        absolute
        bottom-16
        left-0
        z-50
        w-80
        overflow-hidden
        rounded-2xl
        border
        border-zinc-200
        bg-white/95
        shadow-2xl
        backdrop-blur-xl

        dark:border-zinc-800
        dark:bg-zinc-900/95
      "
    >
      {/* Header */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          AskDrip Actions
        </h3>

        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Choose a specialized mode
        </p>
      </div>

      {/* Actions */}
      <div className="p-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              onClick={() => onSelect(action.id)}
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                p-3
                text-left
                transition-all
                duration-200

                hover:bg-zinc-100
                dark:hover:bg-zinc-800
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-zinc-100
                  text-zinc-900
                  transition
                  group-hover:scale-105

                  dark:bg-zinc-800
                  dark:text-white
                "
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                  {action.title}
                </h4>

                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {action.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={16}
                className="
                  text-zinc-500
                  transition
                  group-hover:translate-x-1
                  dark:text-zinc-400
                "
              />
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Select your mode for accurate AskDrip results.
        </p>
      </div>
    </div>
  );
}