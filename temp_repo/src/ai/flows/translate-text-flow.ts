import {- z -} from 'zod';
import { defineFlow } from 'genkit';

/**
 * @fileOverview A Genkit flow for translating text into a specified language.
 * Environment-aware logic for static export / Capacitor compatibility.
 */

const TranslateTextInputSchema = z.object({
  text: z.string(),
  targetLanguage: z.string(),
  sourceLanguage: z.string().optional(),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string(),
  detectedSourceLanguage: z.string().optional(),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

/**
 * Translates text. Environment-aware logic for static export / Capacitor.
 */
export async function translateText(
  input: TranslateTextInput
): Promise<TranslateTextOutput> {
  // Client-side / Capacitor guard
  if (typeof window !== 'undefined') {
    return { 
      translatedText: `[MOCK] ${input.text} translated to ${input.targetLanguage}`, 
      detectedSourceLanguage: 'English' 
    };
  }

  // Server-side logic (Node.js environment)
  try {
    const { ai } = await import('@/ai/genkit');

    const response = await ai.translate({
      text: input.text,
      targetLanguage: input.targetLanguage,
      sourceLanguage: input.sourceLanguage,
    });

    return { translatedText: response };
  } catch (error) {
    console.error('Translation synthesis node failure:', error);
    return { translatedText: input.text };
  }
}

defineFlow(
  {
    name: 'translateText',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  translateText
);
