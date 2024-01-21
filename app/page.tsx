'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCompletion } from "./actions/action";

export default function Home() {
  async function action(formData: FormData) {
     const prompt = formData.get('prompt')

    //  if(!prompt){
    //   toast.error("Please enter a prompt")
    //  }

     const result = await createCompletion(prompt as string)
     if(result?.error){
      toast.error(result.error)
     }
     else if(result.success){
      console.log(result.success)
     }



   
  }
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <form action={action}>
            <Input name="prompt"/>
            <Button variant="outline">Add</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
