import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getConversations,
  createConversationApi,
  deleteConversationApi,
} from "../services/conversationService";

const ConversationContext = createContext(null);

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversationLoading, setConversationLoading] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    JSON.parse(
      localStorage.getItem("askdrip_sidebar_collapsed") || "false"
    )
  );

  /* =========================
     LOAD CONVERSATIONS
  ========================= */
  const loadConversations = async () => {
    try {
      setLoading(true);

      const response = await getConversations();
      const chats = response?.conversations || [];

      setConversations(chats);
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    loadConversations();
  }, []);

  /* =========================
     SIDEBAR STATE
  ========================= */
  useEffect(() => {
    localStorage.setItem(
      "askdrip_sidebar_collapsed",
      JSON.stringify(sidebarCollapsed)
    );
  }, [sidebarCollapsed]);

  /* =========================
     CREATE CONVERSATION
  ========================= */
  const createConversation = async (title = "Untitled") => {
    try {
      const response = await createConversationApi(title);
      const conversation = response.conversation;

      setConversations((prev) => [conversation, ...prev]);
      setActiveConversationId(conversation.id);

      return conversation.id;
    } catch (err) {
      console.error("Failed to create conversation:", err);
      return null;
    }
  };

  /* =========================
     SELECT CONVERSATION
  ========================= */
  const selectConversation = async (id) => {
    if (id === activeConversationId) {
      return;
    }

    try {
      setConversationLoading(true);
      setActiveConversationId(id);
    } catch (err) {
      console.error("Failed to switch conversation:", err);
    }
  };

  /* =========================
     FINISH CONVERSATION LOAD
  ========================= */
  const finishConversationLoading = () => {
    setConversationLoading(false);
  };

  /* =========================
     DELETE CONVERSATION
  ========================= */
  const deleteConversation = async (id) => {
    try {
      await deleteConversationApi(id);

      const updated = conversations.filter(
        (chat) => chat.id !== id
      );

      setConversations(updated);

      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  /* =========================
     NEW CHAT
  ========================= */
  const startNewChat = () => {
    setActiveConversationId(null);
    setConversationLoading(false);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        loading,
        conversationLoading,
        setConversationLoading,
        finishConversationLoading,
        activeConversationId,
        setActiveConversationId,
        selectConversation,
        sidebarCollapsed,
        setSidebarCollapsed,
        loadConversations,
        createConversation,
        deleteConversation,
        startNewChat,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversations = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversations must be used inside ConversationProvider"
    );
  }

  return context;
};
