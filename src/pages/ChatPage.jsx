import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  return (
    <main
      className="
        min-w-0
        flex-1
        overflow-hidden
        bg-background
        text-foreground
        transition-colors
        duration-300
      "
    >
      <ChatWindow />
    </main>
  );
}