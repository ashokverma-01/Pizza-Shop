import { Send } from "lucide-react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import AppContext from "../../context/AppContext";

const Messenger = () => {
  const { isMessenger } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "other" },
    { text: "I'm good! How about you?", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput("");
    }
  };

  if (!isMessenger) return null;

  return (
    <div
      className="messenger-container"
      style={{
        width: "400px",
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 1000,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: isOpen ? "block" : "none",
      }}
    >
      {/* Header */}
      <div
        className="chat-header d-flex align-items-center justify-content-between p-3"
        style={{ backgroundColor: "#1e1e2f", color: "white" }}
      >
        <span className="font-semibold text-lg">Chat</span>
        <Button
          onClick={() => setIsOpen(false)}
          style={{
            minWidth: "32px",
            height: "32px",
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#ff4d4f",
          }}
        >
          ✖
        </Button>
      </div>

      {/* Messages */}
      <div
        className="chat-messages p-3"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <div
              key={index}
              className={`message p-2 rounded-lg mb-2 ${
                msg.sender === "me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.text}
            </div>
          ))}
      </div>

      {/* Input Box */}
      <div
        className="chat-input d-flex p-3 border-t"
        style={{ gap: "8px", backgroundColor: "white" }}
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, border: "1px solid #ccc", borderRadius: "8px" }}
        />
        <Button
          onClick={sendMessage}
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            borderRadius: "8px",
            minWidth: "50px",
          }}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default Messenger;
