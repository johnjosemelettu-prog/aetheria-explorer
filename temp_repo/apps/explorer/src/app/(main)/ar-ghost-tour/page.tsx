'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ARGhostTourPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              AR Ghost Tour
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              The spooky side of travel. Embark on AR-guided ghost tours, with chilling tales and ghostly apparitions at haunted locations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
