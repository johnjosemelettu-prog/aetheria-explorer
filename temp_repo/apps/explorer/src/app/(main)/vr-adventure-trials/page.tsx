'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function VRAdventureTrialsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive VR Adventure Trials
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Try before you fly. Experience interactive VR slices of adventures like rock climbing, kayaking, and more before you book.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
