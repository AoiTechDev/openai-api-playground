"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../Button/Button";
import { createCompletion } from "@/app/actions/action";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Nutrition = {
  name: string;
  calories: number;
  protein_g: number;
  fat_total_g: number;
  carbohydrates_total_g: number;
};

const Form = () => {
  const [nutrition, setNutrition] = useState<Nutrition[]>([]);
  async function action(formData: FormData) {
    const prompt = formData.get("prompt");

    if (!prompt) {
      toast.error("Please enter a prompt");
    }

    const result = await createCompletion(prompt as string);
    if (result?.error) {
      toast.error(result.error);
    } else if (result.success) {
      setNutrition(result.success);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <form action={action}>
          <Input name="prompt" />
          <SubmitButton />
        </form>
      </CardContent>
      <CardFooter>
        <ul>
          <li>Name: {nutrition[0]?.name}</li>
          <li>Calories: {nutrition[0]?.calories}</li>
          <li>Carbs: {nutrition[0]?.carbohydrates_total_g}</li>
          <li>Protein: {nutrition[0]?.protein_g}</li>
          <li>Fat: {nutrition[0]?.fat_total_g}</li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default Form;
