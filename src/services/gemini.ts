
// src/services/gemini.ts

// In a real application, these would be calls to a secure backend that interacts with the Gemini API.
// This file contains mock functions that simulate the rich data output from Google Gemini 2.5.

export const synthesizeWeather = async (destination: string, startDate?: string, endDate?: string): Promise<any> => {
    console.log(`Synthesizing weather for ${destination}...`);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
        summary: `The weather in ${destination} is projected to be idyllic. Expect sun-drenched mornings and breezy afternoons, with cool evenings perfect for dining. There is a small chance of a brief shower on your second day.`,
        avgTemp: 24, humidity: 55, uvIndex: 8, chanceOfRain: 15, conditions: "Mostly Sunny",
    };
};

export const generateItinerary = async (destination: string, duration: number, vibe: string, interests: string[]): Promise<any> => {
    console.log(`Generating a "${vibe}" itinerary for ${destination} for ${duration} days...`);
    await new Promise(resolve => setTimeout(resolve, 2500));
    return {
        title: `An Unforgettable ${vibe} Adventure in ${destination}`,
        itinerary: [
            {
                day: 1, theme: "Arrival & Cultural Immersion",
                activities: [
                    { time: "14:00", title: "Arrive & Check-in", description: "Settle into your hotel.", location: { lat: 35.6895, lng: 139.6917 } },
                    { time: "16:00", title: "Shibuya Crossing", description: "Experience the world's busiest intersection.", estimatedCost: 0 },
                    { time: "19:00", title: "Dinner at a Traditional Izakaya", description: "Enjoy your first taste of authentic Japanese cuisine.", estimatedCost: 50, bookingLink: "https://example.com/booking?id=izakaya123" },
                ]
            },
            { day: 2, theme: "Art, History & Views", activities: [/* ... */] }
        ]
    };
};

export const getLandmarkLens = async (imageUrl: string): Promise<any> => {
    console.log(`Analyzing landmark from image...`);
    await new Promise(resolve => setTimeout(resolve, 2200));
    return {
        landmarkName: 'Eiffel Tower', 
        location: { city: 'Paris', country: 'France' }, 
        architect: 'Stephen Sauvestre', 
        yearCompleted: 1889,
        description: 'Originally built for the 1889 World\'s Fair, it has become a global cultural icon.',
        funFacts: ["The tower's height changes by up to 15 cm depending on the temperature.", "It was the world's tallest man-made structure for 41 years."]
    };
};

export const exploreMenu = async (imageUrl: string): Promise<any> => {
    console.log(`Analyzing menu from image...`);
    await new Promise(resolve => setTimeout(resolve, 2600));
    return {
        restaurantName: "Le Gourmet Français",
        items: [
            { name: "Coq au Vin", translation: "Chicken in Red Wine", description: "A classic French stew of chicken braised slowly in red wine.", ingredients: ["Chicken", "Red Wine", "Bacon"], aiRecommendation: "A must-try classic." },
            { name: "Bouillabaisse", translation: "Fish Stew", description: "A traditional Provençal fish stew from Marseille.", ingredients: ["Whitefish", "Shellfish", "Tomatoes"], aiRecommendation: "Perfect for seafood lovers." }
        ]
    };
};

export const getLocalLegends = async (location: {lat: number, lng: number}): Promise<any> => {
    console.log(`Finding local legends near ${location.lat}, ${location.lng}...`);
    await new Promise(resolve => setTimeout(resolve, 1800));
    return {
        title: "The Ghost of the Old Opera House",
        story: "They say that late at night, you can sometimes hear a faint, sorrowful aria drifting from the old opera house down the street...",
        historicalContext: "The Grand Opera House was the city's premier cultural venue from 1910 until it tragically burned down in 1932.",
        audioNarrationUrl: "/placeholder-audio.mp3"
    };
};

export const searchInsurancePlans = async (destination: string, duration: number, coverageNeeds: string[]): Promise<any> => {
    console.log(`Searching for insurance plans for ${destination}...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return [
        { id: 'plan_premium_123', name: "Wanderer's Shield - Premium", provider: 'Global Travel Assurance', price: 150.75, features: ['Comprehensive medical', 'Trip cancellation', 'Adventure sports coverage'], aiSummary: 'A comprehensive plan for maximum peace of mind.' },
        { id: 'plan_standard_456', name: "Explorer's Net - Standard", provider: 'SafeJourney Partners', price: 85.50, features: ['Balanced medical', 'Baggage loss', 'Rental car protection'], aiSummary: 'A popular choice for leisure and business travelers.' }
    ];
};

export const generateExplorerQuest = async (destination: string): Promise<any> => {
    console.log(`Generating Explorer Quest for ${destination}...`);
    await new Promise(resolve => setTimeout(resolve, 2800));
    return {
        title: `The Secret of the Seine: A Parisian Quest`,
        theme: "A scavenger hunt to uncover a hidden message left by a secret society along the banks of the Seine.",
        waypoints: [
            { name: "The Whispering Bookstore", riddle: "I have no voice, but I speak in volumes. Find me where stories sleep.", location: { lat: 48.853, lng: 2.348 } },
            { name: "The Artist's Bridge", riddle: "I am a canvas of love, locked away with a key. Where lovers leave their mark, you will find me.", location: { lat: 48.858, lng: 2.337 } },
            { name: "The Sun King's Garden", riddle: "My owner commanded the sun, but I offer shade. Find the geometric patterns I have laid.", location: { lat: 48.863, lng: 2.326 } }
        ]
    };
};

export const decodeStreetArt = async (imageUrl: string): Promise<any> => {
    console.log('Decoding street art from image...');
    await new Promise(resolve => setTimeout(resolve, 2400));
    return {
        artist: "Invader",
        artworkTitle: "PA_1452",
        story: "This piece is part of the 'Space Invaders' project, where a French artist known as Invader installs mosaic tile art in cities around the world. Each piece is a playful nod to early video game culture.",
        culturalSignificance: "The project is a commentary on the pervasive nature of technology and digital culture in our physical spaces."
    };
};

export const getSouvenirStory = async (imageUrl: string): Promise<any> => {
    console.log('Uncovering story of souvenir...');
    await new Promise(resolve => setTimeout(resolve, 2100));
    return {
        name: "Maneki-neko (Beckoning Cat)",
        history: "A common Japanese figurine which is believed to bring good luck to the owner. It is first recorded to have appeared during the later part of the Edo period in Japan.",
        artisanTradition: "Traditionally made from ceramic, modern versions can be found in a variety of materials. The cat's raised paw, color, and adornments all carry specific meanings."
    };
};

export const generatePostcard = async (userImage: string, style: string): Promise<any> => {
    console.log(`Generating postcard in the style of ${style}...`);
    await new Promise(resolve => setTimeout(resolve, 3200));
    return {
        postcardUrl: `/placeholder-postcard-${style.toLowerCase().replace(' ', '-')}.webp`,
        narrative: `A beautiful moment from your travels, reimagined in the iconic style of ${style}.`
    };
};


// ... (other functions remain the same)
export const generateFashionSuggestions = async (
    destination: string,
    duration: number,
    vibe: string,
    measurements: any,
    weatherInfo: string
): Promise<any> => {
    console.log(`Generating fashion for ${destination} with a ${vibe} vibe...`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    return {
        title: `Your ${vibe} Wardrobe for ${destination}`,
        vibe: vibe,
        weatherSummary: weatherInfo,
        items: [
            { category: 'Outerwear', name: 'Tech-Chic Trench Coat', price: 250, availability: ['buy', 'rent'], reason: 'A versatile piece for fluctuating temperatures, blending style with functionality.' },
            { category: 'Top', name: 'Graphene-Weave T-Shirt', price: 80, availability: ['buy'], reason: 'Lightweight, breathable, and adaptable to both day and night adventures.' },
            { category: 'Bottom', name: 'Smart-Fabric Cargo Pants', price: 150, availability: ['buy', 'rent'], reason: 'Equipped with ample storage and a comfortable fit for urban exploration.' },
            { category: 'Footwear', name: 'Cyber-Laced Urban Runners', price: 180, availability: ['buy'], reason: 'Designed for comfort and traction on varied city terrains, from ancient cobblestones to modern pavements.' },
        ],
    };
};
export const generateHeritageImage = async (
    userImage: string, // This would be the image data
    destination: string
): Promise<any> => {
    console.log(`Generating heritage image for destination: ${destination}`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call

    if (destination.toLowerCase().includes("kyoto")) {
        return {
            imageUrl: '/placeholder-kimono.webp', // A placeholder image path
            outfitName: 'Traditional Kimono',
            narrative: 'The kimono (着物) is a traditional Japanese garment and the national dress of Japan. The kimono is a T-shaped, wrapped-front garment with square sleeves and a rectangular body, and is worn left side wrapped over right, unless the wearer is deceased. The kimono is traditionally worn with an obi, and is commonly worn with traditional footwear (especially zōri or geta) and split-toe socks (tabi).'
        };
    }

    return {
        imageUrl: '/placeholder-generic.webp',
        outfitName: 'Historical Attire',
        narrative: 'This traditional attire is representative of the rich history and culture of the region, often worn during festivals and ceremonies.'
    };
};
export const generateVideo = async (itinerary: any): Promise<any> => {
    console.log('Generating cinematic preview...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
        videoUrl: '/placeholder-video.mp4'
    };
};
export const generateLayoverOdyssey = async (duration: number, interests: string[]): Promise<any> => {
    console.log(`Generating a layover odyssey for ${duration} hours with interests in ${interests.join(', ')}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        title: 'Layover Adventure',
        activities: [
            'Grab a quick bite at a famous local spot.',
            'Visit a museum near the airport.',
            'Do some last-minute souvenir shopping.',
        ]
    };
};
export const translateText = async (text: string, targetLanguage: string): Promise<any> => {
    console.log(`Translating "${text}" to ${targetLanguage}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        translatedText: `[Translated] ${text}`
    };
};
export const chatWithRuth = async (message: string): Promise<any> => {
    console.log(`Chatting with Ruth: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        response: 'Hello! I am Ruth, your AI assistant. How can I help you today?'
    };
};
export const generateVibeMarket = async (vibe: string): Promise<any> => {
    console.log(`Generating vibe market for ${vibe}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        title: `Vibe Market: ${vibe}`,
        items: [
            { name: 'Vibe-related product 1', price: 50 },
            { name: 'Vibe-related product 2', price: 75 },
        ]
    };
};
export const generateImage = async (prompt: string): Promise<any> => {
    console.log(`Generating image for prompt: ${prompt}`);
    await new Promise(resolve => setTimeout(resolve, 2500));
    return {
        imageUrl: '/placeholder-image.webp'
    };
};
export const getCulturalPulse = async (destination: string): Promise<any> => {
    console.log(`Getting cultural pulse for ${destination}...`);
    await new Promise(resolve => setTimeout(resolve, 1800));
    return {
        title: `Cultural Pulse: ${destination}`,
        insights: [
            'Emerging art scene in the warehouse district.',
            'Fusion cuisine is the talk of the town.',
            'Live traditional music performances every weekend in the old square.'
        ]
    };
};
export const getChronosLens = async (location: string): Promise<any> => {
    console.log(`Generating historical view of ${location}...`);
    await new Promise(resolve => setTimeout(resolve, 2800));
    return {
        imageUrl: '/placeholder-historical.webp',
        description: `A glimpse into ${location} as it stood in the early 1900s, showcasing its bustling streets and early automobiles.`
    };
};
