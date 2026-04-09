import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { ModelMessage } from 'ai';

const MODEL = google('models/gemini-1.5-flash-latest');

async function executeAI(prompt: string, json_mode: boolean = true) {
  const { text, usage, finishReason } = await streamText({
    model: MODEL,
    prompt: prompt,
    ...(json_mode && { experimental_mode: { json: true } }),
  });

  // Basic logging - consider a more robust logging solution
  console.log('AI Response Stats:', { usage, finishReason });

  return text;
}

export async function generatePersonalizedItinerary(destination: string, duration: number, interests: string[]) {
    const prompt = `
      You are a world-class travel planner AI. Your task is to generate a personalized travel itinerary.
      
      **User Request:**
      - **Destination:** ${destination}
      - **Duration:** ${duration} days
      - **Interests:** ${interests.join(', ')}
      
      **Your Task:**
      Create a detailed, day-by-day itinerary. For each day, provide a theme and a list of events. Each event should include a name, a time (e.g., "Morning", "9:00 AM - 11:00 AM", "Afternoon", "Evening"), a type (e.g., dining, activity, sightseeing, accommodation), and a brief, engaging description.
      
      **Output Format:**
      Return a JSON object with the following structure:
      {
        "destination": "<destination_name>",
        "duration": <duration_in_days>,
        "themes": ["<theme1>", "<theme2>", ...],
        "days": [
          {
            "day": <day_number>,
            "theme": "<daily_theme>",
            "events": [
              {
                "name": "<event_name>",
                "time": "<event_time>",
                "type": "<event_type>",
                "description": "<event_description>"
              },
              ...
            ]
          },
          ...
        ]
      }
    `;
    
    const response = await executeAI(prompt);
    return JSON.parse(response);
  }
  
export async function getARNavigationSteps(destination: string) {
  const prompt = `
    You are an AR navigation assistant. Generate a sequence of navigation steps 
    from a user's assumed current location to the specified destination.
    Keep the instructions simple, clear, and suitable for an AR overlay.

    **Destination:** ${destination}

    **Output Format:**
    Return a JSON object containing a list of navigation steps:
    {
      "steps": [
        {
          "instruction": "<Clear and concise instruction>",
          "distance": "<e.g., 50 meters>",
          "ar_overlay": {
            "type": "<arrow|path|highlight>",
            "direction": "<straight|left|right|up|down>"
          }
        },
        ...
      ]
    }
  `;

  const response = await executeAI(prompt);
  const parsed = JSON.parse(response);
  return parsed.steps;
}

export async function getVRDestinationPreview(destination: string) {
  const prompt = `
    You are a VR travel experience creator. 
    Generate a VR preview for the given destination.
    Find a high-quality, 360-degree panoramic image URL for the destination.

    **Destination:** ${destination}

    **Output Format:**
    Return a JSON object:
    {
      "title": "<Name of the Destination>",
      "description": "<A short, engaging description>",
      "imageUrl": "<URL to a 360-degree panoramic image>"
    }
  `;

  const response = await executeAI(prompt);
  return JSON.parse(response);
}

export async function generateExplorerQuest(city: string) {
  const prompt = `
    You are a master riddle-smith and travel guide. Create an "Explorer Quest" for a user in the specified city.
    The quest should be a series of 3-5 riddles that lead the user to famous landmarks or hidden gems.

    **City:** ${city}

    **Your Task:**
    Generate a quest with a title, a completion message, and a list of riddles. Each riddle should have:
    - A clever riddle text.
    - A clear, one-or-two-word answer (the name of the landmark).
    - A hint to help the user if they get stuck.

    **Output Format:**
    Return a JSON object:
    {
      "title": "The Secrets of ${city}",
      "completionMessage": "Congratulations, you've uncovered the heart of ${city}!",
      "riddles": [
        {
          "riddle": "<Riddle text about a landmark>",
          "answer": "<Landmark name>",
          "hint": "<A helpful hint>"
        },
        ...
      ]
    }
  `;
  
  const response = await executeAI(prompt);
  return JSON.parse(response);
}

export async function analyzeImageWithVision(imageDataUrl: string) {
    const prompt = `
      You are a helpful travel assistant with advanced vision capabilities. 
      Analyze the provided image and give a concise, helpful description. 
      If it's a landmark, name it and give a fun fact. If it's a menu, 
      suggest a popular dish. If it's a sign, translate it if it is not in English.
      Be creative and helpful.
    `;
    
    const messages: ModelMessage[] = [
      {
          role: 'user',
          content: [
              { type: 'text', text: prompt },
              { type: 'image', image: new URL(imageDataUrl) }
          ]
      }
  ];

    const { text } = await streamText({
        model: MODEL,
        messages
    });

    return text;
}

export async function generatePostcard(location: string, artStyle: string) {
  console.log(`Simulating postcard generation for ${location} in style ${artStyle}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // In a real app, you'd call a text-to-image API.
  // Here, we'll return a placeholder. Let's use the Paris image if relevant.
  if (location.toLowerCase().includes('eiffel') || location.toLowerCase().includes('paris')) {
    return '/vr/paris.jpg';
  }
  // Return a generic placeholder URL from unsplash
  return `https://source.unsplash.com/featured/?${encodeURIComponent(location)}`;
}

export async function generateAIArt(imageDataUrl: string, style: string) {
    const prompt = `
      You are an AI artist. Transform the user's image into a new piece of art based on the chosen style.
      **Style:** ${style}
    `;

    // This is a placeholder for a real image generation model.
    // In a real application, you would use a model like DALL-E or Stable Diffusion.
    // For this example, we'll return a stylized version of the original image or a placeholder.
    // This is a simplified simulation.
    const response = await new Promise(resolve => setTimeout(() => {
        // In a real implementation, you would make an API call to an image generation service.
        // Here, we just return the original image to simulate the process.
        resolve(imageDataUrl);
    }, 2000));

    return response as string;
}
