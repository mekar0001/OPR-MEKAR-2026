
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK with the API key from environment variables.
// Always use the named parameter and refer to process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeReport = async (aktiviti: string, rumusan: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sila analisis dan berikan cadangan penambahbaikan untuk rumusan laporan program sekolah berikut. 
      Aktiviti: ${aktiviti}
      Rumusan Asal: ${rumusan}
      
      Berikan respon dalam format JSON dengan kunci: 'analysis' (ringkasan impak) dan 'suggestions' (cadangan penambahbaikan ayat agar lebih profesional).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            suggestions: { type: Type.STRING }
          },
          required: ["analysis", "suggestions"]
        }
      }
    });

    // Access the .text property directly as per coding guidelines (it's a getter).
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const suggestProgramIdea = async (unit: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Berikan 3 idea program inovatif untuk ${unit} di sebuah sekolah menengah. Sila berikan dalam format JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });
    // Access the .text property directly.
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
