'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAbbottAIClient } from '@/hooks/useAbbottAIClient';

interface AIChatInterfaceProps {
    onProductsFound: (products: any[]) => void;
}

export default function AIChatInterface({ onProductsFound }: AIChatInterfaceProps) {
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Debug logging for onProductsFound
    console.log('AIChatInterface onProductsFound callback:', onProductsFound);
    console.log('AIChatInterface onProductsFound type:', typeof onProductsFound);

    // Use the custom hook for AI functionality
    const {
        messages,
        isConnected,
        isConnecting,
        error,
        connect,
        disconnect,
        sendChatMessage,
        sendImageMessage,
        clearMessages
    } = useAbbottAIClient();

    // Debug logging for messages
    console.log('AIChatInterface messages:', messages);
    console.log('AIChatInterface messages length:', messages?.length);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Auto-connect when component mounts
        if (!isConnected && !isConnecting) {
            connect();
        }
    }, [isConnected, isConnecting, connect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isConnecting) return;

        const messageToSend = inputValue.trim();
        console.log('Sending message:', messageToSend);

        try {
            // Clear input immediately for better UX
            setInputValue('');

            await sendChatMessage(messageToSend, onProductsFound);
        } catch (error) {
            console.error('Error sending message:', error);
            // Restore the message if there was an error
            setInputValue(messageToSend);
        }
    };

    const handleImageSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Identify the first user message so we can style it like a large headline
    const firstUserMessageId = messages.find((m) => m.role === 'user')?.id;

    // Uniform markdown rendering so headings do not appear oversized
    const markdownComponents: any = {
        h1: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        h2: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        h3: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        h4: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        h5: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        h6: ({ children }: any) => (
            <p className="text-[15px] font-semibold text-gray-800 mb-2">{children}</p>
        ),
        p: ({ children }: any) => (
            <p className="text-[15px] text-gray-700 leading-6 mb-2 last:mb-0">{children}</p>
        ),
        ul: ({ children }: any) => (
            <ul className="list-disc pl-5 space-y-0.5 text-[15px] text-gray-700 mb-2 last:mb-0">{children}</ul>
        ),
        ol: ({ children }: any) => (
            <ol className="list-decimal pl-5 space-y-0.5 text-[15px] text-gray-700 mb-2 last:mb-0">{children}</ol>
        ),
        li: ({ children }: any) => <li className="text-[15px] text-gray-700">{children}</li>,
        a: ({ href, children }: any) => (
            <a href={href} className="text-blue-600 underline hover:text-blue-700">{children}</a>
        ),
        strong: ({ children }: any) => (
            <strong className="font-semibold text-gray-800">{children}</strong>
        ),
        em: ({ children }: any) => <em className="italic">{children}</em>,
        code: ({ children }: any) => (
            <code className="px-1 py-0.5 rounded bg-gray-100 text-[13px]">{children}</code>
        ),
        pre: ({ children }: any) => (
            <pre className="p-2.5 rounded bg-gray-100 overflow-x-auto text-[13px] mb-2">{children}</pre>
        ),
        table: ({ children }: any) => (
            <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }: any) => (
            <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }: any) => (
            <tbody className="bg-white">{children}</tbody>
        ),
        th: ({ children }: any) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900 bg-gray-50">
                {children}
            </th>
        ),
        td: ({ children }: any) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">
                {children}
            </td>
        ),
        tr: ({ children }: any) => (
            <tr className="hover:bg-gray-50">{children}</tr>
        )
    };

    return (
        <div className="flex flex-col h-full bg-white">

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3 max-w-[560px]">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    {/* Show suggested questions only when no messages exist */}
                    {messages.length === 0 && !isConnecting && (
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base leading-relaxed">
                                I've helped many customers find the right Abbott products for their health goals.
                                Plus, I can recommend products with features and benefits that match your specific needs.
                                Quick access to categories like supplements, infant nutrition, and therapeutic products
                                can come in handy for your health journey!
                            </p>

                            <div className="space-y-2">
                                <p className="text-gray-900 font-medium text-sm">
                                    Are there any specific health needs you have in mind?
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Chat messages */}
                    {messages.filter(message => !message.isLoading || message.content).map((message) => (
                        <div key={message.id} className="flex items-start gap-2.5">
                            <div className="mt-1 text-gray-500 flex-shrink-0">
                                {message.role === 'assistant' ? (
                                    <Bot className="w-4 h-4" />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                            </div>
                            <div className="flex-1">
                                {message.role === 'user' && (
                                    <div className={`${message.id === firstUserMessageId
                                        ? 'text-[22px] sm:text-[24px] md:text-[26px] font-medium tracking-tight leading-tight text-gray-900'
                                        : 'text-[16px] font-semibold leading-relaxed text-gray-900'
                                        }`}>
                                        {message.content}
                                    </div>
                                )}
                                {message.role === 'assistant' && (
                                    <div className="text-[15px] text-gray-700 leading-7">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={markdownComponents}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isConnecting && (
                        <div className="mb-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Connecting...</span>
                            </div>
                        </div>
                    )}

                    {/* Show loading message for AI thinking - only when not connecting */}
                    {!isConnecting && messages.some(msg => msg.isLoading) && (
                        <div className="mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                                <span className='text-lg'>Thinking...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Form */}
            <div className="p-6 border-t bg-gray-50">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask anything"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                            disabled={isConnecting}
                        />
                        <button
                            type="submit"
                            disabled={isConnecting || !inputValue.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
