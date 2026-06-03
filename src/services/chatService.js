import api from "./api";

const routes = {
  chat: "/chat",
  outfit: "/outfit",
  color: "/color-match",
  recommendation: "/recommendation",
};

export const sendPrompt = async (
  endpoint,
  {
    userId,
    conversationId,
    prompt,
  }
) => {
  const response = await api.post(
    routes[endpoint],
    {
      userId,
      conversationId,
      prompt,
    }
  );

  return response.data;
};