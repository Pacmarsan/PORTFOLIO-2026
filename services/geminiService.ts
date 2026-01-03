
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { MotionResponse } from "../types";

// Initialize AI with process.env.API_KEY directly as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMotion = async (prompt: string): Promise<MotionResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            elements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  count: { type: Type.NUMBER },
                  color: { type: Type.STRING },
                  label: { type: Type.STRING }
                },
                required: ["id", "type", "count", "color"]
              }
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  targets: { type: Type.STRING },
                  translateX: { type: Type.STRING },
                  translateY: { type: Type.STRING },
                  scale: { type: Type.STRING },
                  rotate: { type: Type.STRING },
                  opacity: { type: Type.STRING },
                  backgroundColor: { type: Type.STRING },
                  borderRadius: { type: Type.STRING },
                  duration: { type: Type.NUMBER },
                  delay: { type: Type.STRING },
                  easing: { type: Type.STRING },
                  direction: { type: Type.STRING },
                  loop: { type: Type.BOOLEAN }
                },
                required: ["targets"]
              }
            }
          },
          required: ["explanation", "elements", "steps"]
        }
      }
    });

    // Directly access the text property as a getter, not a method
    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as MotionResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
