import {
  Plus,
  Search,
  MessageSquare,
  PanelLeft,
  LogOut,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Pin,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  useState,
  useMemo,
} from "react";
import { useConversations } from "../context/ConversationContext";

export default function Sidebar() {
  const {
    conversations,
    activeConversationId,
    selectConversation,
    startNewChat,
    deleteConversation,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useConversations();

  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(null);

  const filteredChats = useMemo(() => {
    return [...conversations]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .filter((chat) =>
        (chat.title || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [conversations, search]);

  return (
    <aside
      className={`
        fixed
        left-0
        top-16
        z-50

        h-[calc(100vh-4rem)]

        md:relative
        md:top-0
        md:h-full

        flex
        flex-col

        border-r
        border-zinc-200
        bg-white
        text-zinc-900

        dark:border-zinc-800
        dark:bg-zinc-950
        dark:text-white

        ${
          sidebarCollapsed
            ? "w-20"
            : "w-72"
        }
      `}
    >
      {/* Floating Sidebar Toggle */}
      <button
        type="button"
        onClick={() =>
          setSidebarCollapsed(
            !sidebarCollapsed
          )
        }
        className={`
          mt-3
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-zinc-200
          bg-white
          text-zinc-500
          transition-all
          duration-300
          hover:bg-zinc-100
          hover:text-zinc-900

          dark:border-zinc-800
          dark:bg-zinc-900
          dark:text-zinc-400
          dark:hover:bg-zinc-800
          dark:hover:text-white

          ${
            sidebarCollapsed
              ? "mx-auto"
              : "ml-auto mr-3"
          }
        `}
        aria-label={
          sidebarCollapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
      >
        <PanelLeft size={32} />
      </button>

      {/* Header Area */}
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <button
          type="button"
          onClick={startNewChat}
          className={`
            mt-4
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-zinc-300
            bg-zinc-900
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            hover:scale-[1.01]
            hover:bg-zinc-800

            dark:border-zinc-700
            dark:bg-white
            dark:text-zinc-900
            dark:hover:bg-zinc-100

            ${
              sidebarCollapsed
                ? "mx-auto w-12 px-0"
                : "w-full px-4"
            }
          `}
        >
          <Plus size={16} />
          {!sidebarCollapsed && "New Chat"}
        </button>

        {!sidebarCollapsed && (
          <div className="relative mt-3">
            <Search
              size={15}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-zinc-500
                dark:text-zinc-400
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search chats..."
              className="
                w-full
                rounded-xl
                border
                border-zinc-200
                bg-zinc-100
                py-3
                pl-10
                pr-4
                text-sm
                text-zinc-900
                outline-none
                transition
                placeholder:text-zinc-500
                focus:ring-1
                focus:ring-zinc-300

                dark:border-zinc-800
                dark:bg-zinc-900
                dark:text-white
                dark:placeholder:text-zinc-500
                dark:focus:ring-zinc-700
              "
            />
          </div>
        )}
      </div>

      {/* Chats */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        {!sidebarCollapsed && (
          <div
            className="
              mb-3
              px-2
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-zinc-500
              dark:text-zinc-500
            "
          >
            Recent Chats
          </div>
        )}

        {filteredChats.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-zinc-300
              p-6
              text-center

              dark:border-zinc-800
            "
          >
            <MessageSquare
              size={28}
              className="mb-3 text-zinc-500 dark:text-zinc-600"
            />

            {!sidebarCollapsed && (
              <>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No conversations
                </p>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-600">
                  Start a new chat
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="relative"
              >
                <button
                  type="button"
                  title={chat.title}
                  onClick={() => {
                    selectConversation(chat.id);

                    if (
                      window.innerWidth < 768
                    ) {
                      setSidebarCollapsed(true);
                    }
                  }}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    rounded-xl
                    py-3
                    text-left
                    transition-all
                    ${
                      sidebarCollapsed
                        ? "gap-2 px-2"
                        : "gap-3 px-3"
                    }
                    ${
                      activeConversationId ===
                      chat.id
                        ? `
                          border
                          border-zinc-300
                          bg-zinc-100
                          text-zinc-900

                          dark:border-zinc-700
                          dark:bg-zinc-800
                          dark:text-white
                        `
                        : `
                          text-zinc-600
                          hover:bg-zinc-100
                          hover:text-zinc-900

                          dark:text-zinc-400
                          dark:hover:bg-zinc-900
                          dark:hover:text-white
                        `
                    }
                  `}
                >
                  <MessageSquare
                    size={16}
                    className="shrink-0"
                  />

                  <span
                    className={
                      sidebarCollapsed
                        ? "min-w-0 flex-1 truncate text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                        : "min-w-0 flex-1 truncate text-sm"
                    }
                  >
                    {chat.title}
                  </span>

                  {!sidebarCollapsed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(
                          menuOpen === chat.id
                            ? null
                            : chat.id
                        );
                      }}
                      className="
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:opacity-100
                      "
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  )}
                </button>

                {menuOpen === chat.id &&
                  !sidebarCollapsed && (
                    <div
                      className="
                        absolute
                        right-2
                        top-14
                        z-50
                        w-44
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white
                        p-1
                        shadow-xl

                        dark:border-zinc-800
                        dark:bg-zinc-900
                      "
                    >
                      <MenuItem
                        disabled
                        icon={<Pencil size={14} />}
                        label="Rename (Soon)"
                      />

                      <MenuItem
                        disabled
                        icon={<Pin size={14} />}
                        label="Pin (Soon)"
                      />

                      <MenuItem
                        disabled
                        icon={<Copy size={14} />}
                        label="Duplicate (Soon)"
                      />

                      <MenuItem
                        danger
                        icon={<Trash2 size={14} />}
                        label="Delete"
                        onClick={() => {
                          deleteConversation(chat.id);
                          setMenuOpen(null);
                        }}
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        {!sidebarCollapsed ? (
          <div className="flex items-center justify-between rounded-xl bg-zinc-100 p-3 dark:bg-zinc-900">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
                {user?.name?.[0] || "A"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                  {user?.name || "Anonymous"}
                </p>

                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="
                rounded-lg
                p-2
                text-zinc-500
                transition
                hover:bg-zinc-200
                hover:text-red-500

                dark:text-zinc-400
                dark:hover:bg-zinc-800
                dark:hover:text-red-400
              "
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-zinc-100
              text-zinc-500
              transition
              hover:bg-zinc-200
              hover:text-red-500

              dark:bg-zinc-900
              dark:text-zinc-400
              dark:hover:bg-zinc-800
              dark:hover:text-red-400
            "
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
  disabled,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        transition

        ${
          disabled
            ? `
              cursor-not-allowed
              opacity-50
              text-zinc-400
              dark:text-zinc-500
            `
            : danger
            ? `
              text-red-500
              hover:bg-red-500/10
            `
            : `
              text-zinc-700
              hover:bg-zinc-100

              dark:text-zinc-300
              dark:hover:bg-zinc-800
            `
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}