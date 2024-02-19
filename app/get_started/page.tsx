'use client';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { track } from '@vercel/analytics';

export default function GetStarted() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('account_name')) {
                router.push('/budget', { scroll: false });
            }
        }
      }, [router]);
      
    const handleSubmit = (data: FormData) => {
        if (data.get("account_name") === "") {
            toast.error("Please enter a name for your account");
        } else {
            if (typeof window !== 'undefined') {
                track('Add Account');
                localStorage.setItem("account_name", data.get("account_name") as string);
                router.push('/budget', { scroll: false })
            }
        }
    };

    if (typeof window !== 'undefined') {
        if (localStorage.getItem("account_name")) {
            return (
                <div className="flex flex-col items-center justify-items-center text-center w-full justify-between  min-h-screen">
                    <div className="mt-12 w-5/6">
                        <div className='mx-6 my-4 text-2xl text-neutral-200'>
                            Welcome
                        </div>
                        <div className='font-extrabold text-5xl lg:text-6xl leading-tight'>
                            {localStorage.getItem("account_name")}
                        </div>
                        <div className='mx-6 my-4 text-lg text-neutral-200'>
                            Thanks for using Kirabaki!
                        </div>
                    </div>
                </div>
            )
        }
    }
  
    return (
      <div className="flex flex-row items-center justify-center h-full w-5/6 lg:max-w-screen-sm mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>What is your name</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="account_name">Name</Label>
                        <Input id="account_name" name="account_name" placeholder="Amirul" />
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