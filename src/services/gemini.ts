import { GoogleGenAI, Type } from "@google/genai";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

async function logSynthesis(type: string, description: string) {
  if (!auth.currentUser) return null;
  try {
    const docRef = await addDoc(collection(db, 'synthesis_logs'), {
      userId: auth.currentUser.uid,
      type,
      status: 'pending',
      description,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error logging synthesis:', error);
    return null;
  }
}

async function updateLogStatus(logId: string | null, status: 'completed' | 'failed') {
  if (!logId) return;
  try {
    await updateDoc(doc(db, 'synthesis_logs', logId), { status });
  } catch (error) {
    console.error('Error updating log status:', error);
  }
}

export async function generateItinerary(destination: string, duration: number, interests: string[], vibe?: string, startDate?: string, endDate?: string) {
  const logId = await logSynthesis('itinerary', `Synthesizing ${duration}-day ${vibe || ''} trip to ${destination}`);
  try {
    const model = "gemini-3-flash-preview";
    
    const prompt = `Generate a detailed ${duration}-day travel itinerary for ${destination} ${startDate ? `from ${startDate} to ${endDate}` : ''}. 
    Vibe: ${vibe || 'General'}.
    Interests: ${interests.join(', ')}.
    Include specific activities for morning, afternoon, and evening.
    Also calculate an estimated carbon footprint (in kg CO2) for the entire trip.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            destination: { type: Type.STRING },
            vibe: { type: Type.STRING },
            carbonFootprint: { type: Type.NUMBER },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  location: { type: Type.STRING },
                  time: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['flight', 'hotel', 'dining', 'sightseeing', 'transport'] }
                },
                required: ['id', 'title', 'description', 'location', 'time', 'type']
              }
            }
          },
          required: ['title', 'destination', 'carbonFootprint', 'activities']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function synthesizeWeather(destination: string, startDate?: string, endDate?: string) {
  const logId = await logSynthesis('weather', `Synthesizing weather for ${destination}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Synthesize a realistic weather forecast for ${destination} ${startDate ? `from ${startDate} to ${endDate}` : 'for the current season'}. 
    Provide a short summary and specific details like average temperature, humidity, and expected conditions.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            avgTemp: { type: Type.NUMBER },
            humidity: { type: Type.NUMBER },
            conditions: { type: Type.STRING }
          },
          required: ['summary', 'avgTemp', 'humidity', 'conditions']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generateFashionSuggestions(
  destination: string, 
  duration: number, 
  vibe: string, 
  bodyMeasurements: any,
  weatherInfo: string
) {
  const logId = await logSynthesis('tailor', `Synthesizing ${vibe} fashion for ${destination}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Generate a personalized fashion suggestion for a ${duration}-day trip to ${destination} with a "${vibe}" vibe. 
    Body Measurements: ${JSON.stringify(bodyMeasurements)}.
    Weather Context: ${weatherInfo}.
    
    Suggest 6 specific fashion items (clothing, accessories, footwear) that suit the body type, weather, and destination.
    For each item, specify if it's available for 'Buy' or 'Rent'.
    Include a 'price' (in USD) and a 'reason' why it fits the user's profile and the destination's climate.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            vibe: { type: Type.STRING },
            weatherSummary: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  name: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  availability: { type: Type.ARRAY, items: { type: Type.STRING, enum: ['buy', 'rent'] } },
                  reason: { type: Type.STRING },
                  color: { type: Type.STRING }
                },
                required: ['category', 'name', 'price', 'availability', 'reason', 'color']
              }
            }
          },
          required: ['title', 'vibe', 'weatherSummary', 'items']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generatePackingList(destination: string, duration: number, vibe: string) {
  const logId = await logSynthesis('tailor', `Synthesizing ${vibe} packing list for ${destination}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Generate a personalized packing list for a ${duration}-day trip to ${destination} with a "${vibe}" vibe. 
    Include clothing, gear, and essentials. 
    Categorize them into 'Clothing', 'Electronics', 'Toiletries', and 'Miscellaneous'.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            vibe: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  name: { type: Type.STRING },
                  quantity: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ['category', 'name', 'quantity', 'reason']
              }
            }
          },
          required: ['title', 'vibe', 'items']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generateVibeMarket(location: string) {
  const logId = await logSynthesis('vibe', `Synthesizing vibes for ${location}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Generate 4 distinct "travel vibes" for ${location}. 
    Each vibe should have a title, a short catchy description, a list of 3 key experiences, and a "mood" (e.g., 'Adventurous', 'Relaxed', 'Cyberpunk', 'Historical').`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            location: { type: Type.STRING },
            vibes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  experiences: { type: Type.ARRAY, items: { type: Type.STRING } },
                  mood: { type: Type.STRING },
                  price: { type: Type.STRING }
                },
                required: ['title', 'description', 'experiences', 'mood', 'price']
              }
            }
          },
          required: ['location', 'vibes']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generateImage(prompt: string) {
  const logId = await logSynthesis('image', `Synthesizing visual for: ${prompt.substring(0, 30)}...`);
  try {
    const model = "gemini-2.5-flash-image";
    
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        await updateLogStatus(logId, 'completed');
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    await updateLogStatus(logId, 'failed');
    return null;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generateVideo(prompt: string) {
  const logId = await logSynthesis('video', `Synthesizing cinematic for: ${prompt.substring(0, 30)}...`);
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(downloadLink!, {
      method: 'GET',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY || '',
      },
    });
    const blob = await response.blob();
    await updateLogStatus(logId, 'completed');
    return URL.createObjectURL(blob);
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function translateText(text: string, targetLanguage: string) {
  const logId = await logSynthesis('translation', `Synthesizing translation to ${targetLanguage}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Translate the following text to ${targetLanguage}. 
    Maintain the tone and context. 
    Text: "${text}"`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });

    await updateLogStatus(logId, 'completed');
    return response.text;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function generateLayoverOdyssey(city: string, durationHours: number) {
  const logId = await logSynthesis('layover', `Synthesizing ${durationHours}-hour odyssey in ${city}`);
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Generate a detailed ${durationHours}-hour layover itinerary for ${city}. 
    Include specific activities for every 2-3 hours.
    Focus on quick sightseeing and local food near the airport or city center.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['time', 'activity', 'description']
              }
            }
          },
          required: ['title', 'activities']
        }
      }
    });

    const result = JSON.parse(response.text);
    await updateLogStatus(logId, 'completed');
    return result;
  } catch (error) {
    await updateLogStatus(logId, 'failed');
    throw error;
  }
}

export async function chatWithRuth(message: string, history: { role: 'user' | 'model', parts: string }[], context?: string) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are Ruth, the Aetheria Smart Travel Assistant. You are helpful, sophisticated, and knowledgeable about global travel, sustainability, and logistics. 
      You help users plan trips, manage their eSIMs, and understand their carbon footprint.
      
      Current User Context:
      ${context || 'No specific context provided.'}
      
      Always be polite, concise, and professional. If the user asks about their balance or itineraries, use the provided context to answer.`,
    },
  });

  // Convert history to Gemini format
  const formattedHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.parts }]
  }));

  const response = await chat.sendMessage({
    message: message
  });

  return response.text;
}
