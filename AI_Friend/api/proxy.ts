
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function handles all incoming requests from the frontend.
export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, payload } = request.body;

    try {
        let result: unknown;

        switch (action) {
            case 'chat': {
                 const { systemInstruction, history, message } = payload;
                 const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                    history,
                 });
                 const stream = await chat.sendMessageStream({ message });
                 response.setHeader('Content-Type', 'text/plain');
                 for await (const chunk of stream) {
                    response.write(chunk.text);
                 }
                 return response.end();
            }
            
            case 'generateField': {
                const { prompt } = payload;
                const genResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { temperature: 0.9 }
                });
                result = { text: genResponse.text.trim() };
                break;
            }

            case 'suggestReply': {
                const { prompt } = payload;
                const genResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { temperature: 0.8 }
                });
                result = { text: genResponse.text.trim() };
                break;
            }

            case 'generateImage': {
                const { prompt } = payload;
                const imageResponse = await ai.models.generateImages({
                    model: 'imagen-3.0-generate-002',
                    prompt: `digital anime art, masterpiece, high quality, ${prompt}`,
                    config: {
                        numberOfImages: 1,
                        outputMimeType: 'image/png',
                        aspectRatio: '1:1',
                    },
                });
                const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
                result = { image: `data:image/png;base64,${base64ImageBytes}` };
                break;
            }

            default:
                return response.status(400).json({ error: 'Invalid action' });
        }

        return response.status(200).json(result);

    } catch (error: unknown) {
        console.error(`Error in action '${action}':`, error);
        let errorMessage = 'An internal server error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return response.status(500).json({ error: errorMessage });
    }
}
