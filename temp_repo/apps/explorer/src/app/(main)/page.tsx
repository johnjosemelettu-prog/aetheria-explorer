'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Compass,
  Wand2,
  Camera,
  Images,
  Eye,
  Route,
  Users,
  Music,
  ChefHat,
  Ghost,
  GalleryVertical,
  Sparkles,
  Plane,
  Bed,
  MessageSquare,
  MessageCircle,
  Briefcase,
  AlertTriangle,
  Leaf,
} from "lucide-react";

const features = [
  {
    title: "AI Itinerary Generator",
    description: "Craft your perfect trip with a personalized, AI-powered itinerary.",
    icon: Wand2,
    path: "/itinerary-generator",
    color: "text-purple-500",
  },
  {
    title: "AR Wayfinding",
    description: "Navigate cities with immersive augmented reality overlays.",
    icon: Route,
    path: "/ar-wayfinding",
    color: "text-green-500",
  },
  {
    title: "VR Destination Previews",
    description: "Step into stunning 360° previews of your next destination.",
    icon: Eye,
    path: "/vr-previews",
    color: "text-blue-500",
  },
  {
    title: "Explorer Quests",
    description: "Discover hidden gems by embarking on an AI-generated scavenger hunt.",
    icon: Compass,
    path: "/explorer-quests",
    color: "text-orange-500",
  },
  {
    title: "Vision AI Hub",
    description: "Use your camera to decode street art, menus, and more.",
    icon: Camera,
    path: "/vision-ai-hub",
    color: "text-red-500",
  },
  {
    title: "Postcard Studio",
    description: "Turn your travel photos into unique AI-generated art pieces.",
    icon: Images,
    path: "/postcard-studio",
    color: "text-yellow-500",
  },
  {
    title: "Heritage Mirror",
    description: "See historical landmarks as they were in their glory days.",
    icon: Users,
    path: "/heritage-mirror",
    color: "text-indigo-500",
  },
  {
    title: "Trip Soundtrack Generator",
    description: "Create a unique soundtrack for your travels.",
    icon: Music,
    path: "/trip-soundtrack-generator",
    color: "text-pink-500",
  },
  {
    title: "AI-Assisted Culinary Creator",
    description: "Design your own meals based on local ingredients.",
    icon: ChefHat,
    path: "/culinary-creator",
    color: "text-green-500",
  },
  {
    title: "'Meet My Travel Twin' Social Feature",
    description: "Connect with travelers who share your interests.",
    icon: Users,
    path: "/travel-twin",
    color: "text-teal-500",
  },
  {
    title: "AR Ghost Tours",
    description: "Explore haunted locations with a spooky AR guide.",
    icon: Ghost,
    path: "/ar-ghost-tours",
    color: "text-gray-500",
  },
  {
    title: "AI-Curated Digital Art Exhibitions",
    description: "Visit virtual art galleries with AI-selected pieces.",
    icon: GalleryVertical,
    path: "/digital-art-exhibitions",
    color: "text-cyan-500",
  },
  {
    title: "AI Spontaneity Engine",
    description: "Get spontaneous suggestions for your trip.",
    icon: Sparkles,
    path: "/spontaneity-engine",
    color: "text-amber-500",
  },
  {
    title: "Layover Odyssey Generator",
    description: "Turn your layover into a mini-adventure.",
    icon: Plane,
    path: "/layover-odyssey-generator",
    color: "text-lime-500",
  },
  {
    title: "Biometric Jet Lag Sync",
    description: "Adjust your sleep schedule to your destination's time zone.",
    icon: Bed,
    path: "/biometric-jet-lag-sync",
    color: "text-blue-500",
  },
  {
    title: "AI Haggling Coach",
    description: "Learn how to haggle like a local.",
    icon: MessageSquare,
    path: "/ai-haggling-coach",
    color: "text-fuchsia-500",
  },
  {
    title: "'Local Pal' AI Chatbot",
    description: "Get tips and advice from a local AI.",
    icon: MessageCircle,
    path: "/local-pal-ai-chatbot",
    color: "text-violet-500",
  },
  {
    title: "Dynamic Packing List Adjuster",
    description: "Get a packing list that adjusts to your trip's weather.",
    icon: Briefcase,
    path: "/dynamic-packing-list-adjuster",
    color: "text-rose-500",
  },
  {
    title: "Personalized Safety Alerts",
    description: "Get safety alerts tailored to your location.",
    icon: AlertTriangle,
    path: "/personalized-safety-alerts",
    color: "text-red-500",
  },
  {
    title: "'Mindful Travel' Meditation Series",
    description: "Find your inner peace with a series of guided meditations.",
    icon: Leaf,
    path: "/mindful-travel-meditation-series",
    color: "text-emerald-500",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome, Explorer</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Aetheria is at your fingertips. What adventure will you choose today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200"
            onClick={() => handleCardClick(feature.path)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <feature.icon className={`h-10 w-10 ${feature.color}`} />
              <div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-1">{feature.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
