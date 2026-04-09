"use client";

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
