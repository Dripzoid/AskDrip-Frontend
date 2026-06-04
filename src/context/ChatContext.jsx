import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { useConversations } from "./ConversationContext";
import { sendPrompt } from "../services/chatService";
import { getMessages } from "../services/conversationService";

const ChatContext = createContext();

const generateTitle = (text) => {
  const cleaned = text.trim().replace(/\s+/g, " ");

  return cleaned
    .split(" ")
    .slice(0, 4)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [endpoint, setEndpoint] = useState("chat");

  const skipNextMessagesLoadRef = useRef(false);

  const {
    conversations,
    activeConversationId,
    createConversation,
    loadConversations,
    setConversationLoading,
    finishConversationLoading,
  } = useConversations();

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (chat) => chat.id === activeConversationId
      ),
    [conversations, activeConversationId]
  );

  /* =========================
     LOAD MESSAGES
  ========================= */
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeConversationId) {
        setMessages([]);
        finishConversationLoading();
        return;
      }

      if (skipNextMessagesLoadRef.current) {
        skipNextMessagesLoadRef.current = false;
        finishConversationLoading();
        return;
      }

      try {
        setConversationLoading(true);

        const response = await getMessages(
          activeConversationId
        );

        const incoming = response.messages || [];
        setMessages(incoming);
      } catch (err) {
        console.error(
          "Failed to load messages:",
          err
        );
      } finally {
        finishConversationLoading();
      }
    };

    loadMessages();
    // Intentionally depend only on activeConversationId.
    // Including context functions here can cause repeated reloads.
  }, [activeConversationId]);

  /* =========================
     ADD MESSAGE
  ========================= */
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = async (
    content,
    selectedEndpoint = endpoint
  ) => {
    if (!content?.trim() || loading) {
      return;
    }

    let conversationId = activeConversationId;
    const userPrompt = content.trim();

    /* Show user message immediately */
    addMessage({
      role: "user",
      content: userPrompt,
      createdAt: new Date().toISOString(),
    });

    /* Show typing immediately */
    setLoading(true);

    try {
      /* Create conversation only when needed */
      if (!conversationId) {
        skipNextMessagesLoadRef.current = true;

        conversationId = await createConversation(
          generateTitle(content)
        );

        if (!conversationId) {
          skipNextMessagesLoadRef.current = false;

          addMessage({
            role: "assistant",
            content: "Unable to create conversation.",
            createdAt: new Date().toISOString(),
          });

          return;
        }
      }

      const result = await sendPrompt(
        selectedEndpoint,
        {
          userId: user?.id,
          conversationId,
          prompt: userPrompt,
        }
      );

      addMessage({
        role: "assistant",
        content:
          result.data?.response ||
          result.message ||
          "Something went wrong",
        products: result.data?.products || [],
        createdAt: new Date().toISOString(),
      });

      await loadConversations();
    } catch (error) {
      console.error(error);

      addMessage({
        role: "assistant",
        content:
          error?.response?.data?.message ||
          "Unable to connect to AskDrip",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CLEAR LOCAL MESSAGES
  ========================= */
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        sendMessage,
        clearMessages,
        endpoint,
        setEndpoint,
        loading,
        activeConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
};
