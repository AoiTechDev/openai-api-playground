"use server";
  
type Nutrition = {
    name: string;
    calories: number;
    protein_g: number;
    fat_total_g: number;
    carbohydrates_total_g: number;
  };
  
  type NutritionResponse = {
    error?: string;
    success?: Nutrition[];
  };
  
export async function createCompletion(prompt: string): Promise<NutritionResponse> {
  if (!prompt) {
    return { error: "prompt is required" };
  }

  const res = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${prompt}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.NINJA_API_KEY || "",
      },
    }
  ).then((res) => {
    return res.json();
  });

  return { success: res };
}
