import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useAxiosSecure from '@/hooks/useAxiosSecure';

import { MessageCircle, X, Send, Zap } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const ZapChatWidget = () => {
  const { user, userType } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const axiosSecure = useAxiosSecure();
  const bottomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Entrance animation for chat window
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.classList.remove('scale-95', 'opacity-0');
      chatContainerRef.current.classList.add('scale-100', 'opacity-100');
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setIsTyping(true);
    setInput('');

    try {
      const response = await axiosSecure.post(`/zapAi`, {
        message: userMessage,
      });

      const aiReply = response?.data?.response || 'Something went wrong.';
      setIsTyping(false);
      setMessages(prev => [...prev, { from: 'ai', text: aiReply }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          from: 'ai',
          text: 'Failed to get response from ZapAI. Please try again later.',
        },
      ]);
    }
  };

  const closeChat = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.classList.remove('scale-100', 'opacity-100');
      chatContainerRef.current.classList.add('scale-95', 'opacity-0');
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="w-80 md:w-96 h-[32rem] transition-all duration-300 scale-95 opacity-0"
        >
          <Card className="relative h-full rounded-2xl overflow-hidden border border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 p-[2px] shadow-2xl shadow-indigo-500/20">
            <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-2xl flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md shadow-violet-500/30">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                      ZapAI
                    </h2>
                    <div className="flex items-center mt-0.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div
                className={`flex-1 ${
                  messages.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'
                } p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent`}
              >
                {messages?.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/20 animate-pulse-slow">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                        Welcome to ZapAI
                      </h3>
                      <p className="text-gray-400 max-w-xs">
                        Ask me anything about your documents, data, or just chat
                        with me!
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.from === 'user' ? 'justify-end' : 'justify-start'
                    } ${idx === messages.length - 1 ? 'animate-fade-in' : ''}`}
                  >
                    {msg.from === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/20">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-md break-words whitespace-pre-wrap ${
                        msg.from === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none'
                          : 'bg-gray-800/80 text-gray-200 rounded-tl-none backdrop-blur-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.from === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
                        <span className="text-white text-xs font-bold">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2 justify-start animate-fade-in">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/20">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-800/80 text-gray-200 rounded-2xl rounded-tl-none backdrop-blur-sm p-4 shadow-md">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input or Upgrade Prompt */}
              {userType === 'Elite' ? (
                <div className="p-4 bg-gray-900/90 border-t border-gray-800/80 backdrop-blur-md">
                  <div className="relative flex items-end gap-2">
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      placeholder="Ask ZapAI..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="w-full pr-12 bg-gray-800/70 border border-gray-700/50 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-sm resize-none py-3 px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                      style={{
                        minHeight: '2.75rem',
                        maxHeight: '10rem',
                        overflowY: 'auto',
                      }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className={`absolute right-3 bottom-2.5 p-1.5 rounded-lg transition-all duration-200 ${
                        input.trim()
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-md hover:shadow-indigo-500/30 hover:scale-105'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 border-t border-gray-800/80 bg-gray-900/90 backdrop-blur-md">
                  <div className="text-center space-y-3">
                    <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 rounded-xl p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 text-indigo-300 mr-1.5" />
                        <span className="text-indigo-300 font-semibold">
                          Elite Feature
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Unlock ZapAI and other premium features with an Elite
                        subscription.
                      </p>
                    </div>
                    <Link to="/checkout" className="block">
                      <button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 font-medium transition-all duration-300 shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 hover:scale-[1.02]">
                        Upgrade to Elite
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          className="rounded-full shadow-2xl w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></span>
        </button>
      )}
    </div>
  );
};

export default ZapChatWidget;
