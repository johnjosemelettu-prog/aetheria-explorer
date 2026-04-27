import { Itinerary, UserProfile } from './types';

export interface Serendipity {
  id: string;
  name: string;
  description: string;
  location: string;
}

export interface CognitiveLoad {
  level: number;
  suggestions: string[];
}

export interface WhatIfScenario {
  scenario: string;
  itinerary: Itinerary;
}

export interface EmotionalAnalysis {
  vibe: string;
  analysis: string;
}

export interface MentorAdvice {
  traits: string[];
  advice: string;
}

export interface FoodPassport {
  preferences: string[];
  passport: string[];
}

export interface ABTest {
  itineraryA: Itinerary;
  itineraryB: Itinerary;
}

export interface TravelChallenge {
  vibe: string;
  challenge: string;
}

export interface DreamConcept {
  prompt: string;
  concept: string;
}

export interface HabitItinerary {
  itinerary: Itinerary;
  habits: string[];
}

export interface ARScene {
  location: string;
  scene: string;
}

export interface LocalHero {
  location: string;
  hero: UserProfile;
}

export interface GroupVibe {
  traits: string[];
  vibe: string;
}

export interface AmbassadorStatus {
  userId: string;
  status: string;
}

export interface TravelersGuild {
  vibe: string;
  guilds: string[];
}

export interface GlobalGift {
  recipientId: string;
  gift: any;
}

export interface ChronoQuest {
  location: string;
  quest: string;
}

export interface FactionWar {
  status: string;
}

export interface AchievementTree {
  userId: string;
  tree: any;
}

export interface BountyBoard {
  location: string;
  bounties: any[];
}

export interface DeriveMode {
  location: string;
  instructions: string;
}

export interface EscapeTheCity {
  location: string;
  plan: string;
}

export interface CultureCollector {
  location: string;
  missions: any[];
}

export interface Chronosync {
  timezone: string;
  plan: string;
}

export interface SouvenirShipper {
  items: any[];
  user: string;
  status: string;
}
