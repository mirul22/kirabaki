'use client';

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

export default function GetStarted() {

    const handleSubmit = (data: FormData) => {
        if (data.get("account_name") === "") {
            toast.error("Please enter a name for your account");
        } else {
            localStorage.setItem("account_name", data.get("account_name") as string);
        }
    };
  
    return (
      <div className="flex flex-row items-center justify-center h-full">
        <Card>
            <CardHeader>
                <CardTitle>Name Your Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="account_name">Name</Label>
                        <Input id="account_name" name="account_name" placeholder="My budget for February..." />
                        </div>
                    </div>
                    
                    <Button className="w-full text-neutral-50 mt-5" size={"lg"} type="submit">
                        Start
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
    );
  }