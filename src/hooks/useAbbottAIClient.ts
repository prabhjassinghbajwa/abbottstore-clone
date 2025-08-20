import { useState, useCallback } from 'react';

interface AIMessage {
    id: string;
    role: 'user' | 'assistant';
    content?: string;
    timestamp: Date;
    isLoading?: boolean;
    metadata?: {
        toolCalls?: string[];
        confidence?: number;
        sessionId?: string;
        contextSize?: number;
        customerEmail?: string;
        workflowCompleted?: boolean;
        products?: any[];
    };
}

interface AIState {
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
    messages: AIMessage[];
    aiEnabled: boolean;
    sessionId?: string;
}

// Helper function to extract customer email from message
const extractCustomerEmail = (message: string): string | undefined => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = message.match(emailRegex);
    return match ? match[0] : undefined;
};

const extractProductsForListing = (response: any): any[] => {
    if (!response.toolCalls || !response.toolCalls[0] || !response.toolCalls[0].result || !response.toolCalls[0].result.content || !response.toolCalls[0].result.content[0] || !response.toolCalls[0].result.content[0].products) {
        return [];
    }

    const products = response.toolCalls[0].result.content[0].products;
    const allProducts: any[] = [];

    // Add top pick if it exists
    if (products.topPick) {
        allProducts.push(products.topPick);
    }

    // Add recommendations if they exist
    if (products.recommendations && Array.isArray(products.recommendations)) {
        allProducts.push(...products.recommendations);
    }

    return allProducts;
};

const getServerUrl = () => {
    // Check if we're running in the browser
    if (typeof window !== 'undefined') {
        // If we're on the Firebase domain, use the Cloud Function
        if (window.location.hostname === 'gwa-bot.web.app') {
            console.log('🌐 Firebase domain detected - using Cloud Function');
            return 'https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/abbott-healthcare-bot-v4';
        }
        // If we're on localhost, use the local server
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('🏠 Localhost detected - using local server');
            return 'http://localhost:3002';
        }
    }

    // Fallback for server-side rendering
    const mode = process.env.NEXT_PUBLIC_BACKEND_MODE;
    console.log('🔧 Environment mode:', mode);

    switch (mode) {
        case 'firebase':
            return process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/abbott-healthcare-bot-v4';
        case 'local':
            return process.env.NEXT_PUBLIC_LOCAL_HTTP_URL || 'http://localhost:3002';
        default:
            console.log('⚠️ No mode specified, defaulting to Abbott Healthcare Bot v4');
            return 'https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/abbott-healthcare-bot-v4';
    }
};

export const useAbbottAIClient = (serverUrl = getServerUrl()) => {
    const [state, setState] = useState<AIState>({
        isConnected: false,
        isConnecting: false,
        error: null,
        messages: [],
        aiEnabled: true,
        sessionId: undefined,
    });

    const connect = useCallback(async () => {
        console.log('🔌 Attempting to connect to Abbott Healthcare Bot v4 at:', serverUrl);

        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            console.log('🏥 Testing Abbott Healthcare Bot v4 health...');

            // Test connection with health check
            const healthResponse = await fetch(`${serverUrl}/health`);

            if (!healthResponse.ok) {
                throw new Error(`Abbott Healthcare Bot v4 health check failed: ${healthResponse.status}`);
            }

            const healthData = await healthResponse.json();
            console.log('🏥 Health data:', healthData);

            // For Cloud Function, we don't need MCP initialization - just test the chat endpoint
            if (serverUrl.includes('cloudfunctions.net')) {
                console.log('☁️ Cloud Function detected - skipping MCP initialization');
                setState(prev => ({
                    ...prev,
                    isConnected: true,
                    isConnecting: false,
                    sessionId: `abbott_bot_${Date.now()}`
                }));
                console.log('✅ Abbott Healthcare Bot v4 connection established successfully');
                return;
            }

            // Initialize MCP session (only for local server)
            console.log('🔄 Initializing MCP session...');
            const initResponse = await fetch(`${serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/event-stream'
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: '1',
                    method: 'initialize',
                    params: {
                        protocolVersion: '2024-11-05',
                        capabilities: {
                            tools: {}
                        },
                        clientInfo: {
                            name: 'Abbott Store AI Client',
                            version: '1.0.0'
                        }
                    }
                })
            });

            if (!initResponse.ok) {
                throw new Error(`Failed to initialize MCP session: ${initResponse.status}`);
            }

            // Get session ID from response headers
            const sessionId = initResponse.headers.get('mcp-session-id') ||
                initResponse.headers.get('Mcp-Session-Id') ||
                `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // For local server, we don't need to parse the SSE response for initialization
            // Just check if we got a session ID
            if (!sessionId) {
                throw new Error('No session ID received from MCP server');
            }

            console.log('✅ Setting connection state to true');
            setState(prev => ({
                ...prev,
                isConnected: true,
                isConnecting: false,
                error: null,
                aiEnabled: true,
                sessionId: sessionId
            }));
            console.log('✅ MCP connection established successfully with session:', sessionId);

        } catch (error) {
            console.error('❌ Abbott Healthcare Bot v4 connection error:', error);
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Connection failed',
                isConnecting: false,
                isConnected: false
            }));
        }
    }, [serverUrl]);

    const disconnect = useCallback(() => {
        console.log('�� Disconnecting from Abbott Healthcare Bot v4...');
        setState(prev => ({
            ...prev,
            isConnected: false,
            isConnecting: false,
            sessionId: undefined
        }));
    }, []);

    const sendChatMessage = useCallback(async (message: string, onProductsFound?: (products: any[]) => void) => {
        try {
            // Add user message immediately
            const userMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'user',
                content: message,
                timestamp: new Date(),
            };

            setState(prev => ({
                ...prev,
                messages: [...prev.messages, userMessage]
            }));

            // Add loading assistant message
            const loadingMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                timestamp: new Date(),
                isLoading: true,
            };

            setState(prev => ({
                ...prev,
                messages: [...prev.messages, loadingMessage]
            }));

            // Extract customer email from message
            const customerEmail = extractCustomerEmail(message);

            console.log('🤖 Processing message with AI brain:', { message, customerEmail, sessionId: state.sessionId });

            // Use AI brain via chat API instead of direct MCP calls
            const response = await fetch(`${serverUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    customerEmail,
                    sessionId: state.sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Handle both old and new response formats
            let aiResponse;
            if (data.success && data.response) {
                // New format: { success: true, response: {...} }
                aiResponse = data.response;
                console.log('🔍 Using new response format');
            } else if (data.message) {
                // Old format: { message: "...", toolCalls: 0, ... }
                aiResponse = data;
                console.log('🔍 Using old response format');
            } else {
                throw new Error(data.error || 'Failed to process message');
            }

            console.log('🔍 Complete AI response structure:', JSON.stringify(aiResponse, null, 2));

            // Handle different response formats
            let responseContent = '';
            if (typeof aiResponse.message === 'string') {
                responseContent = aiResponse.message;
            } else if (aiResponse.message && typeof aiResponse.message === 'object') {
                // If message is an object, extract the content
                responseContent = aiResponse.message.message || aiResponse.message.content || JSON.stringify(aiResponse.message);
            } else {
                responseContent = 'I received your message but couldn\'t process it properly.';
            }

            // Extract products from the response
            const products = extractProductsForListing(aiResponse);

            console.log('🔍 Products extracted:', products);
            console.log('🔍 Products length:', products?.length);
            console.log('🔍 onProductsFound callback:', onProductsFound);
            console.log('🔍 onProductsFound type:', typeof onProductsFound);

            // Show the AI's narrative only; products will render in the right panel
            const simplifiedChatResponse = responseContent.trim();

            console.log('✅ AI brain response received:', {
                message: simplifiedChatResponse.substring(0, 100) + '...',
                toolCalls: aiResponse.toolCalls?.length || 0,
                confidence: aiResponse.confidence,
                workflowCompleted: aiResponse.workflowCompleted,
                productsFound: products.length
            });

            // Replace loading message with simplified AI response
            const assistantMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: simplifiedChatResponse,
                timestamp: new Date(),
                metadata: {
                    toolCalls: Array.isArray(aiResponse.toolCalls) ? aiResponse.toolCalls.map((tc: any) => tc.name) : [],
                    confidence: aiResponse.confidence,
                    sessionId: aiResponse.sessionId,
                    contextSize: Array.isArray(aiResponse.toolCalls) ? aiResponse.toolCalls.length : 0,
                    customerEmail: customerEmail,
                    workflowCompleted: aiResponse.workflowCompleted,
                    products: products
                }
            };

            setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                    msg.isLoading ? assistantMessage : msg
                )
            }));

            // If products were found, call the callback to update the product listing
            if (products.length > 0 && onProductsFound) {
                console.log('🚀 Calling onProductsFound with products:', products);
                onProductsFound(products);
            } else {
                console.log('⚠️ Not calling onProductsFound - products:', products?.length, 'callback:', !!onProductsFound);
            }

            console.log('✅ AI flow completed successfully:', {
                toolCalls: aiResponse.toolCalls?.length || 0,
                confidence: aiResponse.confidence,
                sessionId: aiResponse.sessionId,
                workflowCompleted: aiResponse.workflowCompleted,
                productsFound: products.length
            });

        } catch (error) {
            console.error('❌ AI processing error:', error);

            // Replace loading message with error
            const errorMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
                timestamp: new Date(),
            };

            setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                    msg.isLoading ? errorMessage : msg
                )
            }));
        }
    }, [serverUrl, state.sessionId]);

    const sendImageMessage = useCallback(async (imageData: string, imageName: string, imageType: string, userPrompt?: string, onProductsFound?: (products: any[]) => void) => {
        try {
            // Add user message with image preview
            const userMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'user',
                content: userPrompt ? `📸 [Image: ${imageName}] ${userPrompt}` : `📸 [Image: ${imageName}]`,
                timestamp: new Date(),
            };

            setState(prev => ({
                ...prev,
                messages: [...prev.messages, userMessage]
            }));

            // Add loading assistant message
            const loadingMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: '🔍 Analyzing image with AI...',
                timestamp: new Date(),
                isLoading: true,
            };

            setState(prev => ({
                ...prev,
                messages: [...prev.messages, loadingMessage]
            }));

            console.log('🔍 Processing image with AI brain:', {
                imageName,
                imageType,
                userPrompt,
                sessionId: state.sessionId,
                imageSize: Math.round(imageData.length * 0.75 / 1024) + 'KB'
            });

            // ALWAYS use HTTP API for image uploads, regardless of connection status
            const apiUrl = `${serverUrl}/api/chat`;
            console.log('🔗 Using HTTP API for image upload:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userPrompt || `Analyze this image: ${imageName}`,
                    imageData,
                    imageType,
                    imageName,
                    sessionId: state.sessionId
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ HTTP Error Response:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log('📡 API Response:', data);

            // Handle both old and new response formats
            let aiResponse;
            if (data.success && data.response) {
                // New format: { success: true, response: {...} }
                aiResponse = data.response;
            } else if (data.message) {
                // Old format: { message: "...", toolCalls: 0, ... }
                aiResponse = data;
            } else {
                console.error('❌ API Error:', data.error);
                throw new Error(data.error || 'Failed to process image');
            }

            // Handle different response formats
            let responseContent = '';
            if (typeof aiResponse.message === 'string') {
                responseContent = aiResponse.message;
            } else if (aiResponse.message && typeof aiResponse.message === 'object') {
                // If message is an object, extract the content
                responseContent = aiResponse.message.message || aiResponse.message.content || JSON.stringify(aiResponse.message);
            } else {
                responseContent = 'I received your image but couldn\'t process it properly.';
            }

            // Extract products from the response
            const products = extractProductsForListing(aiResponse);

            // Show the AI's narrative only; products will render in the right panel
            const simplifiedChatResponse = responseContent.trim();

            console.log('✅ AI image analysis completed:', {
                message: simplifiedChatResponse.substring(0, 100) + '...',
                toolCalls: aiResponse.toolCalls?.length || 0,
                confidence: aiResponse.confidence,
                workflowCompleted: aiResponse.workflowCompleted,
                productsFound: products.length
            });

            // Replace loading message with simplified AI response
            const assistantMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: simplifiedChatResponse,
                timestamp: new Date(),
                metadata: {
                    toolCalls: Array.isArray(aiResponse.toolCalls) ? aiResponse.toolCalls.map((tc: any) => tc.name) : [],
                    confidence: aiResponse.confidence,
                    sessionId: aiResponse.sessionId,
                    contextSize: Array.isArray(aiResponse.toolCalls) ? aiResponse.toolCalls.length : 0,
                    customerEmail: undefined,
                    workflowCompleted: aiResponse.workflowCompleted,
                    products: products
                }
            };

            setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                    msg.isLoading ? assistantMessage : msg
                )
            }));

            // If products were found, call the callback to update the product listing
            if (products.length > 0 && onProductsFound) {
                onProductsFound(products);
            }

            console.log('✅ AI image analysis flow completed successfully:', {
                toolCalls: aiResponse.toolCalls?.length || 0,
                confidence: aiResponse.confidence,
                sessionId: aiResponse.sessionId,
                workflowCompleted: aiResponse.workflowCompleted,
                productsFound: products.length
            });

        } catch (error) {
            console.error('❌ AI image processing error:', error);

            // Replace loading message with error
            const errorMessage: AIMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `I apologize, but I encountered an error analyzing your image: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again with a different image.`,
                timestamp: new Date(),
            };

            setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                    msg.isLoading ? errorMessage : msg
                )
            }));
        }
    }, [serverUrl, state.sessionId]);

    const addMessage = useCallback((message: Omit<AIMessage, 'id' | 'timestamp'>) => {
        const newMessage: AIMessage = {
            ...message,
            id: crypto.randomUUID(),
            timestamp: new Date(),
        };

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage]
        }));
    }, []);

    const clearMessages = useCallback(() => {
        setState(prev => ({
            ...prev,
            messages: []
        }));
    }, []);

    const getMessages = useCallback(() => {
        return state.messages;
    }, [state.messages]);

    // Mock methods for compatibility
    const getSession = useCallback((sessionId: string) => {
        return {
            sessionId: state.sessionId || sessionId,
            messages: state.messages,
            customerEmail: state.messages.find(m => m.metadata?.customerEmail)?.metadata?.customerEmail,
            createdAt: new Date(),
            lastActivity: new Date(),
            workflowSteps: []
        };
    }, [state.messages, state.sessionId]);

    const getAllSessions = useCallback(() => {
        return [getSession('default')];
    }, [getSession]);

    const clearSession = useCallback((sessionId: string) => {
        clearMessages();
        return true;
    }, [clearMessages]);

    const getToolsCount = useCallback(() => {
        return 31; // Hardcoded for now
    }, []);

    const getActiveSessionsCount = useCallback(() => {
        return state.sessionId ? 1 : 0;
    }, [state.sessionId]);

    const isOpenAIAvailable = useCallback(() => {
        return true; // Hardcoded for now
    }, []);

    return {
        // State
        isConnected: state.isConnected,
        isConnecting: state.isConnecting,
        error: state.error,
        messages: state.messages,
        aiEnabled: state.aiEnabled,
        sessionId: state.sessionId,
        serverUrl,

        // Actions
        connect,
        disconnect,
        sendChatMessage,
        sendImageMessage,
        addMessage,
        clearMessages,
        getMessages,

        // MCP Client methods
        getSession,
        getAllSessions,
        clearSession,
        getToolsCount,
        getActiveSessionsCount,
        isOpenAIAvailable,
    };
};
