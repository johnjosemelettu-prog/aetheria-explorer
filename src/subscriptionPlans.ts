
export const TIERS = {
  FREE: 'free',
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  EXPLORER: 'explorer',
  CREATOR: 'creator',
  VISIONARY: 'visionary',
};

export const plans = {
  [TIERS.FREE]: {
    name: 'Free',
    features: [],
    pages: [],
  },
  [TIERS.BRONZE]: {
    name: 'Bronze',
    features: ['AIItinerary', 'AIPackingListGenerator', 'CurrencyExchangeTracker'],
    pages: ['/itinerary'],
  },
  [TIERS.SILVER]: {
    name: 'Silver',
    features: [
      'AIItinerary',
      'AIPackingListGenerator',
      'CurrencyExchangeTracker',
      'AITravelBuddyMatcher',
      'ARWayfinding',
      'LanguageExchangeMatch',
    ],
    pages: ['/itinerary', '/community'],
  },
  [TIERS.GOLD]: {
    name: 'Gold',
    features: [
      'AIItinerary',
      'AIPackingListGenerator',
      'CurrencyExchangeTracker',
      'AITravelBuddyMatcher',
      'ARWayfinding',
      'LanguageExchangeMatch',
      'AIFoodPairingRecommender',
      'ARGhostTours',
      'CarbonFootprintTracker',
    ],
    pages: ['/itinerary', '/community', '/culinary'],
  },
  [TIERS.PLATINUM]: {
    name: 'Platinum',
    features: [
      'AIItinerary',
      'AIPackingListGenerator',
      'CurrencyExchangeTracker',
      'AITravelBuddyMatcher',
      'ARWayfinding',
      'LanguageExchangeMatch',
      'AIFoodPairingRecommender',
      'ARGhostTours',
      'CarbonFootprintTracker',
      'AIEthicalTravelAssistant',
      'DigitalDetoxMode',
      'TranslationEarbuds',
    ],
    pages: ['/itinerary', '/community', '/culinary', '/wellness'],
  },
  [TIERS.EXPLORER]: {
    name: 'Explorer',
    features: [
      'AIItinerary',
      'ARWayfinding',
      'AILocalEtiquetteGuide',
      'ScenicRoutePlanner',
      'OffTheBeatenPathSuggestions',
    ],
    pages: ['/itinerary', '/explore'],
  },
  [TIERS.CREATOR]: {
    name: 'Creator',
    features: [
      'AIVlogGenerator',
      'AIPhotoEditor',
      'AITravelBlogger',
      'PostcardStudio',
      'MemeMyTrip',
    ],
    pages: ['/studio', '/blog'],
  },
  [TIERS.VISIONARY]: {
    name: 'Visionary',
    features: ['All'],
    pages: ['All'],
  },
};

export const getPlanFeatures = (planId: string) => {
  return plans[planId]?.features || [];
};

export const getPlanPages = (planId: string) => {
  return plans[planId]?.pages || [];
};
