import {
  Shirt,
  Palette,
  Sparkles,
  ChevronRight,
  X,
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
  onClose,
}) {
  return (
    <div
      className="
        absolute
        bottom-14
        left-0
        z-50
        w-72
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
      <div className="flex items-start justify-between border-b border-zinc-200 p-2.5 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
            AskDrip Actions
          </h3>

          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            Choose a specialized mode
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-md
            p-1
            text-zinc-500
            transition
            hover:bg-zinc-100
            hover:text-zinc-900

            dark:text-zinc-400
            dark:hover:bg-zinc-800
            dark:hover:text-white
          "
          aria-label="Close quick actions"
        >
          <X size={14} />
        </button>
      </div>

      {/* Actions */}
      <div className="p-1.5">
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
                gap-2.5
                rounded-xl
                p-2.5
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
                  h-9
                  w-9
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
                <Icon size={16} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                  {action.title}
                </h4>

                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  {action.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={14}
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
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          Select your mode for accurate AskDrip results.
        </p>
      </div>
    </div>
  );
}
