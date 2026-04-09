'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Compass, Eye, Map, Camera, Wand2 } from "lucide-react";

// Feature data array
const features = [
  {
    title: "AI Itinerary Generator",
    description: "Let our AI craft a personalized journey just for you.",
    link: "/itinerary-generator",
    icon: Compass
  },
  {
    title: "AR Wayfinding",
    description: "Navigate new cities with immersive augmented reality directions.",
    link: "/ar-wayfinding",
    icon: Map
  },
  {
    title: "VR Previews",
    description: "Step into destinations before you book with virtual reality tours.",
    link: "/vr-previews",
    icon: Eye
  },
  {
    title: "Explorer Quests",
    description: "Discover hidden gems by solving AI-generated riddles.",
    link: "/explorer-quests",
    icon: Compass
  },
  {
    title: "Vision AI Hub",
    description: "Identify landmarks and translate signs with your camera.",
    link: "/vision-ai-hub",
    icon: Camera
  },
  {
    title: "Postcard Studio",
    description: "Turn your travel photos into AI-generated works of art.",
    link: "/postcard-studio",
    icon: Wand2
  }
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Welcome to Aetheria
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your intelligent travel companion, powered by generative AI. Explore, discover, and plan your next adventure with tools that redefine the journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex-row items-center gap-4 pb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="mt-1">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end justify-between">
                  <Link href={feature.link} passHref legacyBehavior>
                    <Button className="w-full mt-4 group">
                      Get Started <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 md:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 Aetheria. All rights reserved. Travel smarter.</p>
      </footer>
    </div>
  );
}
