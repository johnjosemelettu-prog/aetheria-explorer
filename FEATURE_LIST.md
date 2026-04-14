
# Aetheria Explorer: Detailed Feature Breakdown

This document provides a comprehensive list of features available on each screen of the Aetheria Explorer application.

---

## 1. AI Itinerary Synthesizer

This is the central hub for trip planning and accessing the application's AI toolkit.

### Core Itinerary Features
- **Dynamic Itinerary Generation**: Creates a multi-day travel plan based on user inputs.
- **User Inputs**:
    - **Destination**: The city or location for the trip.
    - **Duration**: The length of the trip in days.
    - **Mood**: A desired "vibe" for the trip (e.g., "Mystical," "Adventurous") that influences the AI's suggestions.
- **Generated Itinerary Details**:
    - Provides a day-by-day breakdown.
    - Each day has a specific **Theme** (e.g., "Arrival & Cultural Immersion").
    - Each day includes a list of **Activities**, with details like:
        - Title
        - Description
        - Time
        - Estimated Cost
        - Type (e.g., sightseeing, dining)

### Modular AI Toolkit (Tabbed Interface)
A collection of advanced, on-demand AI modules to enhance the travel experience.

#### **VR (Virtual Reality) Modules**
- **Pre-Travel Scout**: Generates a virtual reality preview of the destination.
- **Virtual Hotel Tour**: Provides a VR walkthrough of a specific hotel.
- **Adventure Simulation**: Simulates high-adrenaline activities (e.g., Bungee Jumping) in VR.
- **Etiquette Training**: Offers VR-based cultural and etiquette lessons for the destination.
- **Historical Reenactment**: Allows the user to witness historical events in VR.
- **Time Machine**: Provides a VR experience of the destination in different historical eras.

#### **AR (Augmented Reality) Modules**
- **AR Time-Lapse**: Overlays historical versions of landmarks onto the real-world view.
- **AR Menu**: Translates and visualizes menu items in 3D AR.
- **AR Art Gallery**: Discovers and displays digital art installations in the user's physical location.
- **Architecture Deconstruction**: Analyzes a building's architecture and overlays informational graphics.

#### **Community Modules**
- **Local Heroes**: Connects travelers with knowledgeable locals for unique experiences.
- **Traveler's Guilds**: Allows users to find and join groups based on specific interests (e.g., "Foodie Guild").
- **Aetheria DAO**: Displays the status of the decentralized autonomous organization governing the platform.
- **Bounty Board**: Shows a list of challenges and tasks (bounties) for users to complete at the destination.

#### **Safety Modules**
- **Scam Alerts**: Provides real-time alerts for common tourist scams in the area.
- **Safety Corridors**: Maps and displays the safest, best-lit, and most populated routes for walking.
- **Get Me Home**: Calculates the fastest and safest routes back to the user's accommodation.

#### **Conceptual Modules**
- **Ancestry Trail**: Generates a personalized heritage tour based on the user's (conceptual) DNA data.
- **Drone Rental**: Allows users to rent and operate a virtual drone to capture aerial views.
- **Live Translation**: Provides real-time, two-way audio translation.
- **Memory Palace**: Creates a virtual space to store and revisit memories (photos, notes) from the trip.
- **Haiku Generator**: Generates an AI-written haiku based on a user-provided image.
- **Comic Strip Generator**: Creates a comic strip based on the events of a single itinerary day.

---

## 2. Vibe Market

A marketplace for browsing and acquiring curated travel "vibes."

- **Location Filtering**: Users can select a city (e.g., Tokyo, Paris) to see available vibes.
- **Vibe Cards**: Each vibe is presented on a card with the following features:
    - **Title**: The name of the vibe (e.g., "Cyberpunk Glow").
    - **Description**: A paragraph explaining the experience.
    - **Sample Experiences**: A list of 3-4 activities included in the vibe.
    - **Mood Icon**: A visual icon representing the mood (e.g., "Adventurous," "Relaxed").
    - **Conceptual Price**: A listed price in a cryptocurrency (e.g., ETH).
- **Dynamic Loading**: The marketplace content updates dynamically when a new location is selected.

---

## 3. Linguistic Synthesis

A dedicated tool for text translation.

- **Multi-Language Support**: Dropdown menu to select from a list of target languages (Japanese, French, German, etc.).
- **Text Input**: A large text area for users to enter the text they want to translate.
- **Translation Output**: A separate, read-only area displays the translated text.
- **Loading State**: A visual indicator shows when the translation is being processed.
- **Clear & Concise UI**: A focused, two-panel design for ease of use.

---

## 4. Quantum Souvenir

A "living" digital memento tied to a real-world location.

- **Dynamic Data Fetching**: Periodically fetches real-time weather data for its designated location.
- **Visual Weather Overlay**: The component's appearance changes to reflect the live weather (e.g., a blue tint for rain, a bright glow for sun).
- **Real-Time Information**: Displays the current weather condition and the time of the last successful data update.
- **Location Context**: Shows the name of the location the souvenir is "entangled" with.

---

## 5. Vision AI Hub (Conceptual)

A suite of features that use a device's camera to analyze and interpret the real world.

- **Landmark Lens**:
    - Identifies major landmarks from an image.
    - Provides historical and architectural details (architect, year completed, fun facts).
- **Menu Explorer**:
    - Scans a restaurant menu.
    - Translates item names.
    - Provides descriptions and lists of ingredients for dishes.
    - Offers AI-powered recommendations.
- **Street Art Decoder**:
    - Identifies a piece of street art.
    - Provides information on the artist, the artwork's story, and its cultural significance.
- **Souvenir Story**:
    - Analyzes an image of a physical souvenir (e.g., a figurine).
    - Provides the item's history and details about the artisan traditions behind its creation.

---

## 6. Subscription and Premium Features

### `usePremiumStatus` Hook
- A custom hook that checks if a user has premium access.
- It verifies against two conditions:
    - An active, top-level premium subscription.
    - An active "premium pass" that may be granted with a specific booking.
- The hook listens for changes in the user's authentication state and updates the premium status in real-time.

### `PremiumFeatureWrapper` Component
- A wrapper component that restricts access to its children to premium users only.
- It uses the `usePremiumStatus` hook to determine the user's access level.
- If the user is not premium, it displays a message indicating that the feature is for premium members.
- This allows for a modular and reusable way to protect premium features across the application.

### Booking-wise Subscriptions
- Users can gain temporary premium access through a "premium pass" associated with a booking.
- This provides a flexible way to offer premium features as part of a travel package.
- The `usePremiumStatus` hook automatically recognizes these passes and grants access accordingly.

### Update v2.5: Scaling 300
**301. Intelligent Navigational Sidebar**
Complete collapse restructuring resolving UI clutter for the 300-count feature repository, distributed across Contextual Categories.

**302. Hybrid Premium Accessibility (Aetheria+)**
Implementation of the `PremiumGate` shielding component overlay interacting natively with both global subscription snapshots and singular `premium_passes` configurations via `usePremiumStatus.ts`.

**303. Integrated Assurance Engine**
Comprehensive dynamic Travel Insurance selection module complete with a high-fidelity internal payment gateway. Transitions safely into mocked success routing upon input matching real booking evaluation parameters.
