'use client';

import React from 'react'
import { Separator } from '@/components/ui/separator';
import { Pencil, Trash } from 'lucide-react';

const listOfTransactions = [
    {
        type: 'income',
        title: 'Salary',
        amount: '10,000.00',
    },
    {
        type: 'income',
        title: 'Bonus',
        amount: '5,000.00',
    },
    {
        type: 'expenses',
        title: 'Rent',
        amount: '1,000.00',
    },
    {
        type: 'expenses',
        title: 'Groceries',
        amount: '500.00',
    },
    {
        type: 'expenses',
        title: 'Utilities',
        amount: '1,000.00',
    },
    {
        type: 'expenses',
        title: 'Entertainment',
        amount: '1,000.00',
    },
    {
        type: 'expenses',
        title: 'Transport',
        amount: '1,000.00',
    },
    {
        type: 'expenses',
        title: 'Health',
        amount: '1,000.00',
    },
    {
        type: 'expenses',
        title: 'Others',
        amount: '1,000.00',
    },
];

export default function page() {
    let accoutName = 'test';
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // if (localStorage.getItem('account_name')) {
    //     accoutName = localStorage.getItem('account_name') ?? '';
    // }

    return (
        <div className='flex flex-col items-center justify-items-center gap-4'>
            <div className='font-bold text-2xl lg:text-3xl leading-tight mt-10'>
                KIRABAKI
            </div>
            <div className='mx-6 text-sm text-neutral-400 text-center'>
                Available budget in {month} {year}
            </div>
            <div className='font-bold text-2xl lg:text-3xl leading-tight'>
                <span>+</span> 16,694.00
            </div>
            <div className='flex flex-col w-5/6 gap-4'>
                <div id="income" className='flex flex-row items-center justify-center whitespace-nowrap bg-neutral-800 text-white-foreground h-11 rounded-lg px-8 py-4 hover:border-green-400 hover:border-2 shadow-sm'>
                    <div className='basis-1/2 text-left text-sm font-light'>Income</div>
                    <div className='basis-1/2 text-right font-normal'><span className='text-green-400'>+</span> 21,312.00</div>
                </div>
                <div id="expenses" className='flex flex-row items-center justify-center whitespace-nowrap bg-neutral-800 text-white-foreground h-11 rounded-lg px-8 py-4 hover:border-red-400 hover:border-2 shadow-sm'>
                    <div className='basis-1/2 text-left text-sm font-light'>Expenses</div>
                    <div className='basis-1/2 text-right font-normal'><span className='text-red-400'>-</span> 4,618.00</div>
                </div>
            </div>
            <Separator className='bg-neutral-800 my-4' />
            {listOfTransactions.map((transaction, index) => (
                <>
                 <div key={index} className='flex flex-row items-center justify-between w-5/6 relative'>
                    <div className='text-md text-neutral-400 font-normal'>{transaction.title}</div>
                    <div className='group flex items-center hover:-translate-x-8 hover:transition-transform hover:duration-300'>
                        <div className='flex text-center justify-items-center text-md text-neutral-400 font-normal'>
                            {transaction.type === 'income' ? <span className='text-green-400 mr-2'>+</span> : <span className='text-red-400 mr-2'>-</span>}{transaction.amount}
                        </div>
                        <div className='text-md text-white cursor-pointer opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:ml-5 group-hover:duration-300'>
                            <Pencil size={20} />
                        </div>
                        <div className='text-md text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:ml-1 group-hover:duration-300'>
                            <Trash size={20} />
                        </div>
                    </div>
                </div>
                <Separator className='bg-neutral-800 my-0.5' />
                </>
            ))}
        </div>
    )
}
