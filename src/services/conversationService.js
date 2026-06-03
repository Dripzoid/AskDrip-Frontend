import dripzoidApi from "./dripzoidApi";

/* =========================
   GET CONVERSATIONS
========================= */

export const getConversations =
  async () => {
    const response =
      await dripzoidApi.get(
        "/api/v1/askdrip/conversations"
      );

    return response.data;
  };

/* =========================
   CREATE CONVERSATION
========================= */

export const createConversationApi =
  async (
    title = "Untitled"
  ) => {
    const response =
      await dripzoidApi.post(
        "/api/v1/askdrip/conversations",
        {
          title,
        }
      );

    return response.data;
  };

/* =========================
   GET MESSAGES
========================= */

export const getMessages =
  async (
    conversationId
  ) => {
    const response =
      await dripzoidApi.get(
        `/api/v1/askdrip/conversations/${conversationId}/messages`
      );

    return response.data;
  };

/* =========================
   DELETE CONVERSATION
========================= */

export const deleteConversationApi =
  async (
    conversationId
  ) => {
    const response =
      await dripzoidApi.delete(
        `/api/v1/askdrip/conversations/${conversationId}`
      );

    return response.data;
  };

/* =========================
   RENAME CONVERSATION
========================= */

export const renameConversationApi =
  async (
    conversationId,
    title
  ) => {
    const response =
      await dripzoidApi.patch(
        `/api/v1/askdrip/conversations/${conversationId}`,
        {
          title,
        }
      );

    return response.data;
  };