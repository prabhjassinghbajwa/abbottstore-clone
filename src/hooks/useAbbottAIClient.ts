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

// Helper function to extract products from AI response
const extractProductsFromResponse = (response: any): any[] => {

    console.log('🔍 >>>>>>>>>>>Extracting products from response:', response);

    if (!response) return [];

    console.log('🔍 Extracting products from response:', response);

    // Check if response has products array
    if (Array.isArray(response.products)) {
        console.log('✅ Found products array with', response.products.length, 'items');
        return response.products;
    }

    // Check if response has product recommendations
    if (response.productRecommendations && Array.isArray(response.productRecommendations)) {
        console.log('✅ Found productRecommendations array with', response.productRecommendations.length, 'items');
        return response.productRecommendations;
    }

    // Check if response has items array
    if (response.items && Array.isArray(response.items)) {
        console.log('✅ Found items array with', response.items.length, 'items');
        return response.items;
    }

    // Check if response has recommendations array
    if (response.recommendations && Array.isArray(response.recommendations)) {
        console.log('✅ Found recommendations array with', response.recommendations.length, 'items');
        return response.recommendations;
    }

    // Check if response has suggestions array
    if (response.suggestions && Array.isArray(response.suggestions)) {
        console.log('✅ Found suggestions array with', response.suggestions.length, 'items');
        return response.suggestions;
    }

    // Try to parse products from message content if it's a string
    if (typeof response.message === 'string') {
        try {
            // Look for JSON-like structures in the message
            const jsonMatch = response.message.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                console.log('🔍 Parsed JSON from message:', parsed);
                if (parsed.products && Array.isArray(parsed.products)) {
                    console.log('✅ Found products in parsed JSON with', parsed.products.length, 'items');
                    return parsed.products;
                }
            }
        } catch (e) {
            console.log('⚠️ Failed to parse JSON from message:', e);
        }
    }

    // Check if the response itself is an array (might be products)
    if (Array.isArray(response)) {
        console.log('✅ Response is an array with', response.length, 'items');
        // Check if it looks like products
        if (response.length > 0 && response[0] && typeof response[0] === 'object') {
            const firstItem = response[0];
            if (firstItem.name || firstItem.title || firstItem.id) {
                console.log('✅ Array appears to contain products');
                return response;
            }
        }
    }

    // NEW: Parse MCP server response format
    if (response.content && Array.isArray(response.content)) {
        console.log('🔍 Found content array, checking for product data...');
        console.log('🔍 Content array length:', response.content.length);

        for (const contentItem of response.content) {
            console.log('🔍 Processing content item:', contentItem);
            if (contentItem.type === 'text' && contentItem.text) {
                console.log('🔍 Processing text content:', contentItem.text.substring(0, 200) + '...');

                // Try to extract products from the text content
                const extractedProducts = parseProductsFromText(contentItem.text);
                if (extractedProducts.length > 0) {
                    console.log('✅ Extracted products from text content:', extractedProducts.length);
                    return extractedProducts;
                }
            }
        }
    }

    // NEW: Check if response has a message field that contains the text
    if (response.message && typeof response.message === 'string') {
        console.log('🔍 Found message field, checking for products...');
        console.log('🔍 Message content:', response.message.substring(0, 200) + '...');

        const extractedProducts = parseProductsFromText(response.message);
        if (extractedProducts.length > 0) {
            console.log('✅ Extracted products from message field:', extractedProducts.length);
            return extractedProducts;
        }
    }

    console.log('❌ No products found in response');
    return [];
};

// Helper: Build compact markdown summary to include product matches in chat
const buildProductsMarkdown = (products: any[]): string => {
    if (!products || products.length === 0) return '';

    const lines: string[] = [];
    lines.push(`### Product Matches (${products.length})\n`);
    products.slice(0, 8).forEach((p: any, index: number) => {
        const name = p.name || p.title || `Product ${index + 1}`;
        const brand = p.brand ? ` • ${String(p.brand).toUpperCase()}` : '';
        const priceObj = typeof p.price === 'object' && p.price ? p.price : null;
        const priceVal = typeof p.price === 'number' ? p.price : priceObj?.value;
        const currency = priceObj?.currency || 'USD';
        const priceStr = typeof priceVal === 'number' ? ` — ${currency} ${priceVal.toFixed(2)}` : '';
        lines.push(`- ${name}${priceStr}${brand}`);
        if (p.description) {
            lines.push(`  \n  ${String(p.description).slice(0, 160)}\n`);
        }
    });
    lines.push('\nTip: You can refine the list (e.g., price, brand, age group).');
    return lines.join('\n');
};

// NEW: Parse products from MCP server text response
const parseProductsFromText = (text: string): any[] => {
    const products: any[] = [];

    try {
        console.log('🔍 Parsing text for products:', text.substring(0, 200) + '...');

        // Pattern 1: Look for "Top Recommendation" section
        const topRecommendationMatch = text.match(/\*\*Product Name:\*\* ([^\n]+)/);
        if (topRecommendationMatch) {
            console.log('🔍 Found top recommendation:', topRecommendationMatch[1]);

            const productName = topRecommendationMatch[1].trim();

            // Extract product code
            const productCodeMatch = text.match(/\*\*Product Code:\*\* ([^\n]+)/);
            const productCode = productCodeMatch ? productCodeMatch[1].trim() : 'sim-top-1';

            // Extract description
            const descriptionMatch = text.match(/\*\*Description:\*\* ([^\n]+)/);
            const description = descriptionMatch ? descriptionMatch[1].trim() : '';

            // Extract brand
            const brandMatch = text.match(/\*\*Brand:\*\* ([^\n]+)/);
            const brand = brandMatch ? brandMatch[1].trim() : 'SIMILAC';

            // Extract age group
            const ageGroupMatch = text.match(/\*\*Age Group:\*\* ([^\n]+)/);
            const ageGroup = ageGroupMatch ? ageGroupMatch[1].trim() : 'Infant';

            // Extract form
            const formMatch = text.match(/\*\*Form:\*\* ([^\n]+)/);
            const form = formMatch ? formMatch[1].trim() : 'Powder';

            // Create product object
            const product = {
                id: productCode,
                name: productName,
                description: description,
                price: { value: 29.99, currency: 'USD' }, // Default price
                category: ageGroup || 'Infant Nutrition',
                brand: brand,
                images: [`/images/brand-${brand.toLowerCase()}.svg`],
                sku: productCode,
                form: form
            };

            products.push(product);
            console.log('✅ Added top recommendation product:', product);
        }

        // Pattern 2: Look for "Alternative Options" section
        const alternativeSection = text.match(/### 🔄 \*\*Alternative Options\*\*([\s\S]*?)(?=###|$)/);
        if (alternativeSection) {
            console.log('🔍 Found alternative options section');

            const alternativesText = alternativeSection[1];
            console.log('🔍 Alternatives text:', alternativesText.substring(0, 300) + '...');

            // Look for numbered alternative products (1., 2., 3., etc.)
            const alternativeMatches = alternativesText.match(/\d+\. \*\*Product Name:\*\* ([^\n]+)/g);
            if (alternativeMatches) {
                console.log('🔍 Found alternative products:', alternativeMatches.length);

                alternativeMatches.forEach((match, index) => {
                    const productName = match.replace(/\d+\. \*\*Product Name:\*\* /, '').trim();
                    console.log(`🔍 Processing alternative ${index + 1}:`, productName);

                    // Extract corresponding product code - look for the next Product Code after this product name
                    let productCode = `sim-alt-${index + 1}`;
                    const productCodeMatches = alternativesText.match(/\*\*Product Code:\*\* ([^\n]+)/g);
                    if (productCodeMatches && productCodeMatches[index]) {
                        productCode = productCodeMatches[index].replace(/\*\*Product Code:\*\* /, '').trim();
                    }

                    // Extract description - look for the next Description after this product name
                    let description = 'Similac infant formula product';
                    const descriptionMatches = alternativesText.match(/\*\*Description:\*\* ([^\n]+)/g);
                    if (descriptionMatches && descriptionMatches[index]) {
                        description = descriptionMatches[index].replace(/\*\*Description:\*\* /, '').trim();
                    }

                    // Create product object
                    const product = {
                        id: productCode,
                        name: productName,
                        description: description,
                        price: { value: 24.99 + (index * 2), currency: 'USD' }, // Varying prices
                        category: 'Infant Nutrition',
                        brand: 'SIMILAC',
                        images: ['/images/brand-similac.svg'],
                        sku: productCode
                    };

                    products.push(product);
                    console.log('✅ Added alternative product:', product);
                });
            } else {
                console.log('⚠️ No numbered alternative products found, trying different pattern...');

                // Fallback: Look for any Product Name patterns in the alternatives section
                const fallbackMatches = alternativesText.match(/\*\*Product Name:\*\* ([^\n]+)/g);
                if (fallbackMatches) {
                    console.log('🔍 Found fallback alternative products:', fallbackMatches.length);

                    fallbackMatches.forEach((match, index) => {
                        const productName = match.replace(/\*\*Product Name:\*\* /, '').trim();

                        // Skip if we already have this product
                        if (products.some(p => p.name === productName)) {
                            return;
                        }

                        // Extract corresponding product code
                        let productCode = `sim-fallback-${index + 1}`;
                        const productCodeMatch = alternativesText.match(/\*\*Product Code:\*\* ([^\n]+)/);
                        if (productCodeMatch) {
                            productCode = productCodeMatch[1].trim();
                        }

                        // Create product object
                        const product = {
                            id: productCode,
                            name: productName,
                            description: 'Similac infant formula product',
                            price: { value: 22.99 + (index * 1.5), currency: 'USD' },
                            category: 'Infant Nutrition',
                            brand: 'SIMILAC',
                            images: ['/images/brand-similac.svg'],
                            sku: productCode
                        };

                        products.push(product);
                        console.log('✅ Added fallback alternative product:', product);
                    });
                }
            }
        }

        // Pattern 3: Look for any other product mentions in the text
        const nameRegex = /(\n|^)\s*(?:\d+\.\s*)?(?:[-•]\s*)?\*\*Product Name:\*\*\s*([^\n]+)\s*/g;
        const nameMatches: { name: string; start: number; end: number }[] = [];
        let m: RegExpExecArray | null;
        while ((m = nameRegex.exec(text)) !== null) {
            nameMatches.push({ name: m[2].trim(), start: m.index, end: nameRegex.lastIndex });
        }
        if (nameMatches.length) {
            console.log('🔍 Found product name blocks:', nameMatches.length);
            for (let i = 0; i < nameMatches.length; i++) {
                const blockStart = nameMatches[i].end;
                const blockEnd = i < nameMatches.length - 1 ? nameMatches[i + 1].start : text.length;
                const block = text.slice(blockStart, blockEnd);
                const productName = nameMatches[i].name;

                if (products.some(p => p.name === productName)) continue;

                const codeMatch = block.match(/\*\*Product Code:\*\*\s*([^\n]+)/);
                const descMatch = block.match(/\*\*Description:\*\*\s*([^\n]+)/);
                const brandMatch = block.match(/\*\*Brand:\*\*\s*([^\n]+)/);

                const code = codeMatch ? codeMatch[1].trim() : `auto-${i + 1}`;
                const brand = brandMatch ? brandMatch[1].trim().toUpperCase() : 'SIMILAC';
                const description = descMatch ? descMatch[1].trim() : 'Abbott product';

                const product = {
                    id: code,
                    name: productName,
                    description,
                    price: { value: 19.99 + i, currency: 'USD' },
                    category: 'Infant Nutrition',
                    brand,
                    images: [`/images/brand-${brand.toLowerCase()}.svg`],
                    sku: code
                };
                products.push(product);
                console.log('✅ Added parsed product from generic matcher:', product);
            }
        }

        // Pattern 4: Look for any other structured product information
        const structuredProductMatches = text.match(/(?:Product|Item|Option)\s*\d*[:\-]\s*([^\n]+)/gi);
        if (structuredProductMatches && structuredProductMatches.length > 0) {
            console.log('🔍 Found structured product matches:', structuredProductMatches.length);

            structuredProductMatches.forEach((match, index) => {
                const productName = match.replace(/(?:Product|Item|Option)\s*\d*[:\-]\s*/i, '').trim();

                // Skip if we already have this product or if it's too short
                if (products.some(p => p.name === productName) || productName.length < 10) {
                    return;
                }

                // Create product object
                const product = {
                    id: `sim-structured-${index + 1}`,
                    name: productName,
                    description: 'Similac product from structured text',
                    price: { value: 18.99 + (index * 0.5), currency: 'USD' },
                    category: 'Infant Nutrition',
                    brand: 'SIMILAC',
                    images: ['/images/brand-similac.svg'],
                    sku: `sim-structured-${index + 1}`
                };

                products.push(product);
                console.log('✅ Added structured product:', product);
            });
        }

        console.log('✅ Total products parsed from text:', products.length);
        return products;

    } catch (error) {
        console.error('❌ Error parsing products from text:', error);
        return [];
    }
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
            const products = extractProductsFromResponse(aiResponse);

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
            const products = extractProductsFromResponse(aiResponse);

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
