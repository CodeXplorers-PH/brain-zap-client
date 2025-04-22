import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ZapChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userType, setUserType] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axiosPublic.get(`/userInfo/${user.email}`);
        setUserType(res?.data?.subscription);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, [axiosPublic, user]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      { from: "ai", text: "ZapAI is thinking..." },
    ]);
    setInput("");

    try {
      const response = await axiosPublic.post(`/zapAi/${user?.email}`, {
        message: userMessage,
      });

      const aiReply = response?.data?.response || "Something went wrong.";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: "ai", text: aiReply };
        return updated;
      });
    } catch (error) {
      console.error("ZapAI error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "ai",
          text: "Failed to get response from ZapAI.",
        };
        return updated;
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="w-80 h-96 p-4 shadow-2xl flex flex-col justify-between bg-[#1e1b3a]/95 text-white border-purple-600">
          <div className="flex justify-between items-center">
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

          <div className="flex-1 overflow-y-auto space-y-4 text-sm mb-1 pr-1">
            {messages?.length === 0 && (
              <div className="text-center text-white mt-20">
                Ask anything and get help from{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  ZapAI
                </span>{" "}
                🤖
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg w-fit break-words whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-purple-700 ml-auto text-right"
                    : "bg-purple-900 mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {userType === "Elite" ? (
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
              <Link to={"/checkout"}>
                <button className="mt-1 w-full rounded-lg bg-purple-700 hover:bg-purple-800 text-white py-1">
                  Upgrade to Elite
                </button>
              </Link>
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
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ZapChatWidget;
