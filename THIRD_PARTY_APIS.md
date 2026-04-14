# Third-Party API Integrations

This document outlines the third-party APIs used throughout the Aetheria Explorer application.

## 1. Google Gemini

- **Purpose**: Used for all generative AI tasks, including itinerary synthesis, vibe creation, and powering the various AI modules in the toolkit.
- **Location**: Implemented in the back-end, with the front-end making requests to it. The primary service is located in `src/services/gemini.ts`.

## 2. Firebase

- **Purpose**: Serves as the primary back-end infrastructure, handling authentication, database (Firestore), and cloud functions.
- **Location**: The Firebase configuration and core services are initialized in `src/lib/firebase.ts`.

## 3. Stripe

- **Purpose**: Manages all payment processing, including subscriptions, premium passes, and other in-app purchases.
- **Location**: A server-side function for creating payment intents is located at `pages/api/create-payment-intent.ts`.

## 4. Weather API (Unspecified)

- **Purpose**: Provides real-time weather data for the Quantum Souvenir feature.
- **Location**: This is a conceptual API, and a specific provider has not yet been implemented.

## 5. Vision AI API (Unspecified)

- **Purpose**: Powers the Vision AI Hub, which includes landmark recognition, menu scanning, and other computer vision tasks.
- **Location**: This is a conceptual API, and a specific provider has not yet been implemented. The request for camera permissions in `metadata.json` indicates the intent to use such an API.
