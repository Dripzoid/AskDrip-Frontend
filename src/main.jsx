import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ConversationProvider } from "./context/ConversationContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ConversationProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ConversationProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);