import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";

const ZapChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const userType = "elite";

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      { from: "ai", text: "ZapAI is thinking..." },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="w-80 h-96 p-4 shadow-2xl flex flex-col justify-between bg-[#1e1b3a]/95 text-white border-purple-600">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {" "}
              ZapAI
            </h2>
            <button
              variant="ghost"
              size="icon"
              className="text-white hover:text-purple-300"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-2 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[85%] break-words whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-purple-600 ml-auto text-right"
                    : "bg-purple-900 mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {userType === "elite" ? (
            <div className="relative">
              <textarea
                rows={1}
                placeholder="Ask ZapAI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="resize-none w-full pr-16 bg-purple-600/10 border text-white border-purple-600 focus-visible:ring-purple-500 rounded-md p-2"
                style={{
                  minHeight: "2.5rem",
                  maxHeight: "10rem",
                  overflowY: "auto",
                }}
              />
              <button
                className="absolute right-2 top-5 -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white text-sm px-3 py-1 rounded-md"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          ) : (
            <div className="text-center text-sm text-purple-300">
              🔒 Only <span className="font-semibold">Elite</span> users can
              access ZapAI.
              <br />
              <button className="mt-2 w-full bg-purple-700 hover:bg-purple-800 text-white">
                Upgrade to Elite
              </button>
            </div>
          )}
        </Card>
      )}

      {!isOpen && (
        <button
          className="rounded-full shadow-xl w-12 h-12 
               bg-gradient-to-br from-purple-800  to-violet-600 text-white flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ZapChatWidget;
