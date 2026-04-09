
import { z } from 'zod';

export const RecommendedItemSchema = z.object({
  itemName: z.string(),
  description: z.string(),
  imageHint: z.string(),
  category: z.string(),
});

export type RecommendedItem = z.infer<typeof RecommendedItemSchema>;

export const OutfitSchema = z.object({
    outfitName: z.string(),
    items: z.array(RecommendedItemSchema),
});

export const RecommendWardrobeOutputSchema = z.object({
  summary: z.string(),
  packingList: z.array(OutfitSchema),
});

export type RecommendWardrobeOutput = z.infer<typeof RecommendWardrobeOutputSchema>;

export const RecommendWardrobeInputSchema = z.object({
  fitPreference: z.string(),
  sensitivities: z.array(z.string()),
  styleVibe: z.object({
    lovedLooks: z.array(z.string()),
    passedLooks: z.array(z.string()),
  }),
  brandAffinities: z.array(z.string()),
  tripContext: z.object({
    destination: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    predictedWeather: z.string(),
    luggageLevel: z.string(),
    events: z.array(z.object({
      name: z.string(),
      dressCode: z.string(),
    })),
  }),
  language: z.string(),
});

export type RecommendWardrobeInput = z.infer<typeof RecommendWardrobeInputSchema>;
