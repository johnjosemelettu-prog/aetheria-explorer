
import { RecommendWardrobeInput, RecommendWardrobeOutput } from './wardrobe-schemas';

export async function recommendWardrobe(input: RecommendWardrobeInput): Promise<RecommendWardrobeOutput> {
  console.log('recommendWardrobe called with:', input);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    summary: "This is a mock summary. The real AI would provide a detailed summary of the recommended wardrobe based on your inputs.",
    packingList: [
      {
        outfitName: "Casual Explorer",
        items: [
          { itemName: "Vintage Tee", description: "A comfortable and stylish tee.", imageHint: "t-shirt", category: "Tops" },
          { itemName: "Slim-fit Jeans", description: "Versatile jeans for any occasion.", imageHint: "jeans", category: "Bottoms" },
          { itemName: "Classic Sneakers", description: "Comfortable sneakers for walking.", imageHint: "sneakers", category: "Footwear" },
        ],
      },
      {
        outfitName: "Business Casual",
        items: [
          { itemName: "Button-down Shirt", description: "A crisp, professional shirt.", imageHint: "shirt", category: "Tops" },
          { itemName: "Chinos", description: "Smart and comfortable trousers.", imageHint: "chinos", category: "Bottoms" },
          { itemName: "Leather Loafers", description: "Elegant and comfortable shoes.", imageHint: "loafers", category: "Footwear" },
        ],
      },
    ],
  };
}
