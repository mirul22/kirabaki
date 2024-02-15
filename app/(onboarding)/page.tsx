'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const onboardingContents = [
  {
    pages: [
      { title: "Kirabaki", subtitle: "Your smart budget companion", text: "Unleash financial freedom with Kirabaki today!"},
    ],
    buttonText: "Start",
  },
  {
    pages: [
      { title: "Your Data && Your Control", subtitle: "We keep things simple – no sign-in details.", text: "Your financial info stays securely on your device." },
    ],
    buttonText: "Next",
  },
  {
    pages: [
      { title: "Effortless && Money Management", subtitle: "Easily track your spending and earnings.",  text: "Kirabaki is designed for simplicity, making your financial journey a breeze." },
    ],
    buttonText: "Let's get started!",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const { pages, buttonText } = onboardingContents[currentPage];

  const handleButtonClick = () => {
    if (currentPage < onboardingContents.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push('/get_started')
      // setCurrentPage(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center text-center w-full h-screen overflow-hidden justify-between">
      <div className="mt-12 w-5/6">
        {pages.map((page, index) => (
            <div key={index} className='space-y-2'>
                <div className='font-extrabold text-5xl lg:text-6xl leading-tight'>
                    {page.title?.split('&&').map((word, index) => (
                        <div key={index}>{word}</div>
                    ))}
                </div>
                <div className='mx-6 text-lg text-gray-200'>
                    {page.subtitle?.split('&&').map((word, index) => (
                        <div key={index}>{word}</div>
                    ))}
                </div>
            </div>
        ))}
      </div>
      <div className='my-8 w-5/6'>
        {pages.map((page, index) => (
            <div key={index} className='mb-10'>
                <div className="text-md">
                    {page.text?.split('&&').map((word, index) => (
                        <div key={index}>{word}</div>
                    ))}
                </div>
            </div>
        ))}
        <Button className="w-full" size={'lg'} onClick={handleButtonClick}>
            {buttonText}
        </Button>
      </div>
    </div>
  );
}
