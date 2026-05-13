import { useState, useEffect, useRef } from 'react';
import { Send, Trash2, Loader, MessageCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { chatAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await chatAPI.getChatHistory();
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to fetch chat history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to UI immediately
    const tempUserMsg = {
      role: 'user',
      message: userMessage,
      createdAt: new Date(),
      _id: 'temp-' + Date.now(),
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(userMessage);
      
      // Remove temp message and add real messages
      setMessages(prev => [
        ...prev.filter(m => m._id !== tempUserMsg._id),
        response.data.userMessage,
        response.data.assistantMessage,
      ]);
    } catch (error) {
      toast.error('Failed to send message');
      // Remove temp message on error
      setMessages(prev => prev.filter(m => m._id !== tempUserMsg._id));
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all chat history?')) {
      return;
    }

    try {
      await chatAPI.clearHistory();
      setMessages([]);
      toast.success('Chat history cleared');
    } catch (error) {
      toast.error('Failed to clear chat history');
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mx-auto max-w-5xl flex flex-col min-h-[calc(100vh-2.5rem)]">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <Badge tone="brand" className="mb-4">
            <MessageCircle size={14} />
            Chat
          </Badge>
          <h1 className="page-header">Ask your notes</h1>
          <p className="text-ink-muted">Get answers grounded in your transcripts, summaries, and key points.</p>
        </div>
        {messages.length > 0 ? (
          <Button variant="secondary" onClick={handleClearHistory}>
            <Trash2 size={18} />
            Clear
          </Button>
        ) : null}
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        {loadingHistory ? (
          <div className="py-20 text-center">
            <Loader className="animate-spin text-brand-600 mx-auto mb-3" size={32} />
            <p className="text-ink-muted font-medium">Loading chat…</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 grid place-items-center p-10">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper-50 px-4 py-2 text-sm font-semibold text-ink">
                <Sparkles size={16} className="text-accent-gold" />
                Scholarly Q&A mode
              </div>
              <h3 className="text-2xl font-serif text-ink">Start a conversation</h3>
              <p className="mt-2 text-ink-muted leading-relaxed">
                Ask for summaries, reminders, or clarity on a concept. I’ll respond using your saved notes as context.
              </p>
              <div className="mt-6 rounded-lg border border-line bg-white p-5">
                <div className="text-sm font-semibold text-ink mb-3">Try asking</div>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li>“What assignments do I have coming up?”</li>
                  <li>“Summarize my lecture notes from this week.”</li>
                  <li>“What were the key points about neural networks?”</li>
                  <li>“What should I study for the exam?”</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 border ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white border-transparent shadow-soft'
                      : 'bg-white text-ink border-line shadow-[0_1px_0_rgba(17,24,39,0.06)]'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words leading-relaxed text-sm md:text-base">
                    {msg.message}
                  </p>
                  <p className={`text-[11px] mt-3 ${msg.role === 'user' ? 'text-white/75' : 'text-ink-muted'}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-line bg-paper-50 px-5 py-4 shadow-[0_1px_0_rgba(17,24,39,0.06)]">
                  <div className="flex items-center gap-3">
                    <Loader className="animate-spin text-brand-600" size={18} />
                    <span className="text-ink-muted font-medium">Thinking…</span>
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>
        )}
      </Card>

      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question…"
            className="input flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !inputMessage.trim()}>
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
