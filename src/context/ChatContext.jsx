import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth }
  from "./AuthContext";

import { useConversations }
  from "./ConversationContext";

import { sendPrompt }
  from "../services/chatService";

import {
  getMessages,
} from "../services/conversationService";

const ChatContext =
  createContext();

const generateTitle = (
  text
) => {
  const cleaned = text
    .trim()
    .replace(/\s+/g, " ");

  return cleaned
    .split(" ")
    .slice(0, 4)
    .map(
      (word) =>
        word.charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

export const ChatProvider = ({
  children,
}) => {

  const {
    user,
  } = useAuth();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    messages,
    setMessages,
  ] = useState([]);

  const [
    endpoint,
    setEndpoint,
  ] = useState("chat");

const {
  conversations,

  activeConversationId,

  createConversation,

  loadConversations,

  setConversationLoading,

  finishConversationLoading,
} = useConversations();

  const activeConversation =
    useMemo(
      () =>
        conversations.find(
          (chat) =>
            chat.id ===
            activeConversationId
        ),
      [
        conversations,
        activeConversationId,
      ]
    );
/* =========================
   LOAD MESSAGES
========================= */

useEffect(() => {

  const loadMessages =
    async () => {

      if (
        !activeConversationId
      ) {
        setMessages([]);
        finishConversationLoading();
        return;
      }

      try {

        setConversationLoading(
          true
        );

        const response =
          await getMessages(
            activeConversationId
          );

        const incoming =
          response.messages || [];

        setMessages(
          incoming
        );

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

}, [
  activeConversationId
]);
  /* =========================
     ADD MESSAGE
  ========================= */

  const addMessage =
    (message) => {

      setMessages(
        (prev) => [
          ...prev,
          message,
        ]
      );

    };

  /* =========================
     SEND MESSAGE
  ========================= */

const sendMessage = async (
  content,
  selectedEndpoint = endpoint
) => {
  if (
    !content?.trim() ||
    loading
  ) {
    return;
  }

  const isNewConversation =
    !activeConversationId;

  let conversationId =
    activeConversationId;

  if (!conversationId) {
    conversationId =
      await createConversation(
        generateTitle(content)
      );

    if (!conversationId) {
      return;
    }
  }

  const userPrompt =
    content.trim();

  addMessage({
    role: "user",
    content: userPrompt,
    createdAt:
      new Date().toISOString(),
  });

  setLoading(true);

  try {
    const result =
      await sendPrompt(
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

      products:
        result.data?.products ||
        [],

      createdAt:
        new Date().toISOString(),
    });

    /*
      IMPORTANT:
      Refresh ONLY for the first message
      of a newly created conversation.
    */

    if (
  isNewConversation
) {
  try {

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          300
        )
    );

    const response =
      await getMessages(
        conversationId
      );

    if (
      response.messages?.length
    ) {
      setMessages(
        response.messages
      );
    }

  } catch (err) {

    console.error(
      "Failed to refresh first conversation messages:",
      err
    );

  }
}

    await loadConversations();

  } catch (error) {
    console.error(error);

    addMessage({
      role: "assistant",

      content:
        error?.response
          ?.data?.message ||
        "Unable to connect to AskDrip",

      createdAt:
        new Date().toISOString(),
    });

  } finally {
    setLoading(false);
  }
};

  /* =========================
     CLEAR LOCAL MESSAGES
  ========================= */

  const clearMessages =
    () => {

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

export const useChat =
  () => {

    const context =
      useContext(
        ChatContext
      );

    if (!context) {
      throw new Error(
        "useChat must be used inside ChatProvider"
      );
    }

    return context;

  };