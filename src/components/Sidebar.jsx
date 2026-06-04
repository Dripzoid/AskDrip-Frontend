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
  Menu,
  X,
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

  const [search, setSearch] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(null);

  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const { user, logout } =
    useAuth();

  const filteredChats = useMemo(() => {
    return [...conversations]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .filter((chat) =>
        (chat.title || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
  }, [conversations, search]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            md:hidden
          "
          onClick={() =>
            setMobileSidebarOpen(false)
          }
        />
      )}

      {/* Mobile Open Button */}
      <button
        type="button"
        onClick={() =>
          setMobileSidebarOpen(true)
        }
        className="
          fixed
          left-4
          top-20
          z-40
          rounded-xl
          border
          border-zinc-200
          bg-white
          p-2
          shadow-md
          md:hidden

          dark:border-zinc-800
          dark:bg-zinc-900
        "
      >
        <Menu size={22} />
      </button>

      <aside
        className={`
          fixed
          left-0
          top-16
          z-50

          h-[calc(100vh-4rem)]

          flex
          flex-col

          border-r
          border-zinc-200
          bg-white
          text-zinc-900

          dark:border-zinc-800
          dark:bg-zinc-950
          dark:text-white

          transition-all
          duration-300

          md:relative
          md:top-0
          md:h-full
          md:translate-x-0

          ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${
            sidebarCollapsed
              ? "md:w-20"
              : "md:w-72"
          }

          w-72
        `}
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() =>
            setMobileSidebarOpen(false)
          }
          className="
            absolute
            right-3
            top-3
            rounded-lg
            p-2
            md:hidden
          "
        >
          <X size={18} />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() =>
            setSidebarCollapsed(
              !sidebarCollapsed
            )
          }
          className={`
            hidden
            md:flex

            mt-3
            h-12
            w-12
            items-center
            justify-center

            rounded-xl
            border
            border-zinc-200
            bg-white

            dark:border-zinc-800
            dark:bg-zinc-900

            ${
              sidebarCollapsed
                ? "mx-auto"
                : "ml-auto mr-3"
            }
          `}
        >
          <PanelLeft size={30} />
        </button>

        {/* Header */}
        <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => {
              startNewChat();
              setMobileSidebarOpen(
                false
              );
            }}
            className={`
              mt-4
              flex
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-zinc-900
              py-3
              text-white

              dark:bg-white
              dark:text-zinc-900

              ${
                sidebarCollapsed
                  ? "mx-auto w-12"
                  : "w-full px-4"
              }
            `}
          >
            <Plus size={16} />
            {!sidebarCollapsed &&
              "New Chat"}
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
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
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

                  dark:border-zinc-800
                  dark:bg-zinc-900
                "
              />
            </div>
          )}
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {filteredChats.map(
              (chat) => (
                <div
                  key={chat.id}
                  className="relative"
                >
                  <button
                    type="button"
                    title={chat.title}
                    onClick={() => {
                      selectConversation(
                        chat.id
                      );

                      if (
                        window.innerWidth <
                        768
                      ) {
                        setMobileSidebarOpen(
                          false
                        );
                      }
                    }}
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      rounded-xl
                      py-3

                      ${
                        sidebarCollapsed
                          ? "gap-2 px-2"
                          : "gap-3 px-3"
                      }

                      ${
                        activeConversationId ===
                        chat.id
                          ? "bg-zinc-100 dark:bg-zinc-800"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }
                    `}
                  >
                    <MessageSquare
                      size={16}
                    />

                    <span
                      className={
                        sidebarCollapsed
                          ? "truncate text-xs"
                          : "flex-1 truncate text-sm"
                      }
                    >
                      {chat.title}
                    </span>

                    {!sidebarCollapsed && (
                      <button
                        type="button"
                        onClick={(
                          e
                        ) => {
                          e.stopPropagation();

                          setMenuOpen(
                            menuOpen ===
                              chat.id
                              ? null
                              : chat.id
                          );
                        }}
                      >
                        <MoreHorizontal
                          size={16}
                        />
                      </button>
                    )}
                  </button>

                  {menuOpen ===
                    chat.id &&
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
                          icon={
                            <Pencil size={14} />
                          }
                          label="Rename (Soon)"
                        />

                        <MenuItem
                          disabled
                          icon={
                            <Pin size={14} />
                          }
                          label="Pin (Soon)"
                        />

                        <MenuItem
                          disabled
                          icon={
                            <Copy size={14} />
                          }
                          label="Duplicate (Soon)"
                        />

                        <MenuItem
                          danger
                          icon={
                            <Trash2 size={14} />
                          }
                          label="Delete"
                          onClick={() => {
                            deleteConversation(
                              chat.id
                            );
                            setMenuOpen(
                              null
                            );
                          }}
                        />
                      </div>
                    )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={logout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-zinc-100
              p-3

              dark:bg-zinc-900
            "
          >
            <LogOut size={16} />
            {!sidebarCollapsed &&
              "Logout"}
          </button>
        </div>
      </aside>
    </>
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

        ${
          danger
            ? "text-red-500 hover:bg-red-500/10"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}
