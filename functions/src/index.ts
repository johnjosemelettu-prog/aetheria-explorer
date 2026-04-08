import * as functions from "firebase-functions/v1";
import {SpeechClient} from "@google-cloud/speech";
import {TextToSpeechClient} from "@google-cloud/text-to-speech";
import {GoogleGenerativeAI} from "@google/generative-ai";

// Initialize clients
const speechClient = new SpeechClient();
const ttsClient = new TextToSpeechClient();

// Initialize Gemini lazily inside the functions to avoid top-level
// deployment errors when the env variable is not present during build.
const getGenAI = () => {
  const geminiApiKey = process.env.GEMINI_API_KEY as string | undefined;
  if (!geminiApiKey) {
    throw new Error(
      "Gemini API key not configured. " +
      "Ensure GEMINI_API_KEY environment variable is set."
    );
  }
  return new GoogleGenerativeAI(geminiApiKey);
};

// --- Interfaces for Callable Function Data ---

interface SpeechToTextData {
  audioBytes: string;
  languageCode?: string;
}

interface TranslateTextData {
  text: string;
  targetLanguage: string;
}

interface TextToSpeechData {
  text: string;
  languageCode: string;
}

// Function to convert speech to text
export const speechToText = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    // Check authentication if needed
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    // Assert data to the expected interface
    const requestData = data as SpeechToTextData;
    const {audioBytes, languageCode = "en-US"} = requestData;

    if (!audioBytes) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Audio bytes are required."
      );
    }

    const audio = {content: audioBytes};
    const config = {
      encoding: "LINEAR16" as const, // Assuming LINEAR16, adjust if your audio
      // format is different
      sampleRateHertz: 16000, // Adjust to your audio sample rate
      languageCode: languageCode,
    };
    const speechRequest = {audio: audio, config: config};

    try {
      const [response] = await speechClient.recognize(speechRequest);
      const transcription = response.results
        ?.map((result) => result.alternatives?.[0]?.transcript)
        .join("\n");

      return {transcription: transcription || ""};
    } catch (error: unknown) {
      console.error("Speech-to-Text error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to convert speech to text.",
        (error as Error).message
      );
    }
  }
);

// Function to translate text using Gemini
export const translateText = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    // Assert data to the expected interface
    const requestData = data as TranslateTextData;
    const {text, targetLanguage} = requestData;

    if (!text || !targetLanguage) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Text and targetLanguage are required."
      );
    }

    try {
      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({model: "gemini-pro"});
      const prompt =
        `Translate the following text to ${targetLanguage}: "${text}"`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const translatedText = response.text();

      return {translatedText: translatedText || ""};
    } catch (error: unknown) {
      console.error("Gemini Translation error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to translate text using Gemini.",
        (error as Error).message
      );
    }
  }
);

// Function to convert text to speech
export const textToSpeech = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    // Assert data to the expected interface
    const requestData = data as TextToSpeechData;
    const {text, languageCode} = requestData;

    if (!text || !languageCode) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Text and languageCode are required."
      );
    }

    const ttsRequest = {
      input: {text: text},
      voice: {languageCode: languageCode, ssmlGender: "NEUTRAL" as const},
      audioConfig: {audioEncoding: "MP3" as const},
    };

    try {
      const [response] = await ttsClient.synthesizeSpeech(ttsRequest);
      // The audio content is a base64 encoded string
      const audioContent = response.audioContent?.toString("base64");

      return {audioContent: audioContent || ""};
    } catch (error: unknown) {
      console.error("Text-to-Speech error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to convert text to speech.",
        (error as Error).message
      );
    }
  }
);
