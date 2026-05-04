import { describe, it, expect } from 'vitest';
import { synthesizeWeather, generateItinerary, getLandmarkLens } from './gemini';

describe('Gemini Service Mocks', () => {
  it('synthesizeWeather returns weather data', async () => {
    const data = await synthesizeWeather('Tokyo');
    expect(data).toHaveProperty('summary');
    expect(data).toHaveProperty('avgTemp');
    expect(data.summary).toContain('Tokyo');
  });

  it('generateItinerary returns an itinerary object', async () => {
    const data = await generateItinerary('Paris', 3, 'Romantic', ['Food']);
    expect(data).toHaveProperty('title');
    expect(data.title).toContain('Romantic');
    expect(data.destination).toBe('Paris');
    expect(data.itinerary.length).toBeGreaterThan(0);
  });

  it('getLandmarkLens returns landmark info', async () => {
    const data = await getLandmarkLens('mock_image_url');
    expect(data.landmarkName).toBe('Eiffel Tower');
    expect(data.location.city).toBe('Paris');
  });
});
