### Aetheria Administrator Guide

Welcome, Admin! This guide provides an overview of the tools and features available to you in the Aetheria Admin Console. As an administrator, you have special privileges to manage the community, monitor the platform's health, and ensure a high-quality experience for all users.

#### **1. Accessing the Admin Console**

To access the console, navigate to the `/admin` path of the application after logging in with an account that has the `admin` role.

#### **2. Community Oversight**

This is the core section for managing the Aetheria community.

*   **User Management (`/admin` -> `User Management` tab):**
    *   **User Dashboard:** View a comprehensive list of all users on the platform. The dashboard is designed to be searchable and filterable, allowing you to find specific users quickly.
    *   **Profile Management:** Click the "Edit" button next to any user to open the profile editor. From here, you can modify user details, most importantly their role. You can promote trusted users to `admin`, assign the `partner` role to verified organizations, or demote users if necessary.

*   **Bounty Board Management:**
    *   Create, edit, and manage bounties available on the global Bounty Board.
    *   Define the rewards (e.g., XP, badges) and the completion criteria for each bounty.
    *   Review submissions from users and approve or deny them.

*   **Local Heroes Program:**
    *   Review applications from explorers who wish to become "Local Heroes."
    *   Manage the directory of approved Local Heroes, featuring them in specific destinations.

*   **Traveler's Guilds Management:**
    *   Oversee the creation of new guilds, with the power to approve or deny requests.
    *   Moderate content and discussions within guilds to maintain community standards.

*   **Scam Alert System:**
    *   Monitor user-submitted reports of potential scams.
    *   Create, update, and broadcast verified Scam Alerts to explorers in relevant geographical areas.

#### **3. AI & System Monitoring**

Given the deep integration of AI, this section is vital for monitoring performance and platform health.

*   **Analytics Dashboard (`/admin` -> `Analytics` tab):**
    *   **Key Metrics:** Get a real-time overview of platform activity. Key widgets include:
        *   **Daily Active Users:** Track user engagement.
        *   **Itineraries Generated:** See how often the core AI itinerary feature is being used.
        *   **Popular Destinations:** Identify trending cities and regions.
        *   **Most Used AI Features:** Understand which AI tools are most popular with users (e.g., AI Itinerary, Landmark Lens).
        *   **AI Model Usage:** Monitor the request volume for different underlying AI models like Gemini and Imagen.
        *   **Estimated AI Costs:** Keep track of spending associated with AI service usage.

*   **AI Performance Review:**
    *   Review the quality of outputs from various AI features.
    *   Flag and analyze suboptimal responses (e.g., inaccurate itinerary suggestions, nonsensical haikus) to aid in fine-tuning the AI models.

*   **System Logs:**
    *   Access a log viewer to monitor errors, warnings, and general activity from both the frontend and backend services. This is your first stop for debugging platform issues.

#### **4. Content Curation**

*   **Vibe Market Management (`/admin` -> `Vibe Market` tab):**
    *   **Vibe Editor:** Create new "vibes" or edit existing ones. Define their name, description, associated aesthetics (color palettes, music styles), and the experiences they include.
    *   **Market Curation:** Control the Vibe Market by featuring specific vibes, creating thematic collections (e.g., "Winter Wonderland Vibes"), and managing their visibility.

## Aetheria+ Subscription Strategy
Access handling is resolved by `src/hooks/usePremiumStatus.ts`. This hook monitors the Firestore `subscriptions` collection (global status) independently against the `premium_passes` collection (booking-specific).
If neither yields an active flag, premium restricted routes intercept the user with the `PremiumGate` UI preventing feature access.

## Navbar Autoscale Routine
The App's central DOM handles over 300 discrete mapped routes. The `Navbar.tsx` handles them elegantly using a keyword categorization schema, dynamically bundling them into collapsible categories. Make sure your `lucide-react` packages are strictly compatible when pushing generic categorizations.
