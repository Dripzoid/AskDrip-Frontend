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
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [endpoint, setEndpoint] = useState("chat");

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

  // Prevent the "conversation created" effect from overwriting
  // the optimistic first user message while the first send is in flight.
  const suppressConversationReloadRef = useRef(false);

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

      // During the first message of a newly created conversation,
      // we already show the optimistic user message locally.
      // Skip the immediate reload so it does not wipe that message.
      if (suppressConversationReloadRef.current) {
        finishConversationLoading();
        return;
      }

      try {
        setConversationLoading(true);

        const response = await getMessages(activeConversationId);
        const incoming = response.messages || [];

        setMessages(incoming);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        finishConversationLoading();
      }
    };

    loadMessages();
  }, [
    activeConversationId,
    setConversationLoading,
    finishConversationLoading,
  ]);

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

    const userPrompt = content.trim();
    const isNewConversation = !activeConversationId;

    // Show user message immediately.
    addMessage({
      role: "user",
      content: userPrompt,
      createdAt: new Date().toISOString(),
    });

    // Show typing indicator immediately.
    setLoading(true);

    let conversationId = activeConversationId;

    try {
      // Create the conversation in the background for first-time chats.
      // We still need the ID before calling sendPrompt, but the UI is already responsive.
      if (!conversationId) {
        suppressConversationReloadRef.current = true;

        conversationId = await createConversation(
          generateTitle(userPrompt)
        );

        if (!conversationId) {
          throw new Error("Failed to create conversation");
        }
      }

      const result = await sendPrompt(selectedEndpoint, {
        userId: user?.id,
        conversationId,
        prompt: userPrompt,
      });

      addMessage({
        role: "assistant",
        content:
          result.data?.response ||
          result.message ||
          "Something went wrong",
        products: result.data?.products || [],
        createdAt: new Date().toISOString(),
      });

      /*
        For the first message in a new conversation,
        refresh from the server so the local optimistic messages
        are replaced by the persisted conversation data.
      */
      if (isNewConversation) {
        try {
          const response = await getMessages(conversationId);

          if (response.messages?.length) {
            setMessages(response.messages);
          }
        } catch (err) {
          console.error(
            "Failed to refresh first conversation messages:",
            err
          );
        } finally {
          suppressConversationReloadRef.current = false;
        }
      }

      await loadConversations();
    } catch (error) {
      console.error(error);

      // Release the lock if conversation creation failed
      suppressConversationReloadRef.current = false;

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
