'use client';

import React from 'react'
import UserView from '@/components/UserView';
import ResetView from '@/components/ResetView';

export default function page() {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return (
        <>
        <div className='flex flex-col items-center justify-items-center gap-4 w-full min-h-screen'>
            <ResetView />
            <div className='font-bold text-2xl lg:text-3xl leading-tight mt-10'>
                KIRABAKI
            </div>
            <div className='mx-6 text-sm text-neutral-400 text-center'>
                Available budget in {month} {year}
            </div>
            <UserView />
        </div>
        </>
    )
}
