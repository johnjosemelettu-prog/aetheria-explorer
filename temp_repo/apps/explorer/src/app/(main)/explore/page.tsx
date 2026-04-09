'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Eye, Compass, Camera } from "lucide-react";

const features = [
  {
    title: "VR Previews 🕶️",
    description: "Vibe check destinations before you even book.",
    link: "/vr-previews",
    icon: Eye
  },
  {
    title: "Explorer Quests 🕵️‍♀️",
    description: "Solve AI riddles and uncover hidden gems. It's a vibe.",
    link: "/explorer-quests",
    icon: Compass
  },
  {
    title: "Vision AI Hub 📸",
    description: "Instantly ID landmarks and translate signs with your cam.",
    link: "/vision-ai-hub",
    icon: Camera
  }
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Explore More Features
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Discover even more ways to enhance your travels with our AI-powered tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col overflow-hidden bg-card/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex-row items-center gap-4 pb-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-1 font-body text-foreground/80">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end justify-between">
                  <Link href={feature.link} passHref legacyBehavior>
                    <Button className="w-full mt-4 group bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg py-6 rounded-xl hover:scale-105 transition-transform duration-300">
                      Let's Go! <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="py-8 px-4 md:px-8 text-center text-sm text-muted-foreground font-body">
        <p>Aetheria © 2024. Travel Smarter, Not Harder. ✨</p>
      </footer>
    </div>
  );
}
