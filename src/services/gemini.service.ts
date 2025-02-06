import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined');
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateAIResponse(message: string) {
  try {
    if (!message) throw new Error('Message is required');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(message);

    return result.response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate response');
  }
}
