interface MessageProperties {
    text_color: string;
    background_color: string;
    edited: boolean;
    source: {
        id: string;
        display_name: string;
        source: string;
    };
    icon: string;
    allow_markdown: boolean;
    state: string;
    targets: any[];
}

interface MessageData {
    timestamp: string;
    sender: string;
    sender_name: string;
    session_id: string;
    text: string;
    files: any[];
    error: boolean;
    edit: boolean;
    properties: MessageProperties;
    category: string;
    content_blocks: any[];
    id: string;
    flow_id: string;
}

interface LangflowResponse {
    session_id: string;
    outputs: Array<{
        inputs: {
            input_value: string;
        };
        outputs: Array<{
            results: {
                message: {
                    data: MessageData;
                    text: string;
                };
            };
            artifacts:{
                stream_url: string;
            };
            outputs: {
                message: {
                    message: MessageData;
                };
            };
        }>;
    }>;
}

interface Tweaks {
    [key: string]: object;
}

class LangflowClient {
    private baseURL: string;
    private applicationToken: string;

    // constructor(baseURL: string, applicationToken: string) {
    constructor(applicationToken: string) {
        this.baseURL = "";
        this.applicationToken = applicationToken;
    }

    async post(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<any> {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }

    async initiateSession(
        flowId: string,
        langflowId: string,
        inputValue: string,
        inputType: string = 'chat',
        outputType: string = 'chat',
        stream: boolean = false,
        tweaks: Tweaks = {}
    ): Promise<LangflowResponse> {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(
        streamUrl: string,
        onUpdate: (data: any) => void,
        onClose: (message: string) => void,
        onError: (error: any) => void
    ): EventSource {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = (event: Event) => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(
        flowIdOrName: string,
        langflowId: string,
        inputValue: string,
        inputType: string = 'chat',
        outputType: string = 'chat',
        tweaks: Tweaks = {},
        stream: boolean = false,
        onUpdate?: (data: any) => void,
        onClose?: (message: string) => void,
        onError?: (error: any) => void
    ): Promise<LangflowResponse | void> {
        try {
            const initResponse = await this.initiateSession(
                flowIdOrName,
                langflowId,
                inputValue,
                inputType,
                outputType,
                stream,
                tweaks
            );
            console.log('Init Response:', initResponse);
            
            if (stream && 
                initResponse?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url && 
                onUpdate && 
                onClose && 
                onError
            ) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts?.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            if (onError) onError('Error initiating session');
        }
    }
}

async function processMessage(inputText: string): Promise<string> {
    console.log('Processing message:', inputText);

    const flowIdOrName = 'f47fb1a3-e12e-45f2-a387-09cb29695f85';
    const langflowId = '15be5860-2f15-4bc4-9eb2-583bafd47a34';
    const applicationToken = import.meta.env.VITE_ASTRA_APP_TOKEN as string;
    
    const langflowClient = new LangflowClient(
        // 'https://api.langflow.astra.datastax.com',
        applicationToken
    );

    try {
        const tweaks: Tweaks = {
            "SplitText-ddzPj": {},
            "AstraDB-FsN5Z": {},
            "File-p2XBU": {},
            "Google Generative AI Embeddings-b9AMf": {},
            "ParseData-QbjSv": {},
            "GoogleGenerativeAIModel-IA9Ie": {},
            "Prompt-7gh2H": {},
            "ChatInput-EtIiA": {},
            "TextOutput-kedLv": {},
            "ChatOutput-yVFTv": {}
        };

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputText,
            'chat',
            'chat',
            tweaks,
            false
        ) as LangflowResponse;

        if (response?.outputs?.[0]?.outputs?.[0]?.results?.message?.data?.text) {
            const outputText = response.outputs[0].outputs[0].results.message.data.text;
            // Remove the markdown code block syntax and extra newlines
            const cleanedText = outputText.replace(/```/g, '').replace(/json/g,'').trim();
            console.log("Output received:", cleanedText);
            return cleanedText;
        }
        throw new Error('No valid response received');
    } catch (error) {
        console.error('Error in processMessage:', error instanceof Error ? error.message : String(error));
        throw error;
    }
}

export { LangflowClient, processMessage };
