import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { api } from '../services/api';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! I am your AI Business Assistant. How can I help you today? You can ask me to analyze data, summarize documents, or query inventory.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'human', content: userMessage }]);
        setLoading(true);

        try {
            // Dummy response for frontend interaction until backend is hooked up and FAISS/OpenAI keys are provided.
            // In a real environment, you'd post to: await api.post('/agent/chat', { query: userMessage, chat_history: [] });
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: `I have analyzed your request regarding "${userMessage}". Based on the business context, I recommend reviewing the latest sales report. Is there anything specific you would like me to fetch?` }]);
                setLoading(false);
            }, 1000);

        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error connecting to the agent.' }]);
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] md:h-screen p-4 md:p-8 flex flex-col max-w-5xl mx-auto animate-fade-in text-left">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="text-brand-400" /> AI Agent
                    </h1>
                    <p className="text-slate-400 mt-1">Chat securely with your enterprise data</p>
                </div>
            </div>

            <div className="flex-1 glass-card flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'human' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'human' ? 'bg-brand-600' : 'bg-slate-700'}`}>
                                {msg.role === 'human' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-brand-300" />}
                            </div>
                            <div className={`max-w-[75%] p-4 rounded-2xl ${msg.role === 'human'
                                    ? 'bg-brand-600 text-white rounded-tr-none'
                                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                <Bot className="w-6 h-6 text-brand-300" />
                            </div>
                            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>

                <div className="p-4 bg-slate-900/50 border-t border-dark-border">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the AI agent..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-6 pr-16 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-brand-500 hover:bg-brand-400 disabled:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatAssistant;
