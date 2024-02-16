import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { formatNumber } from '@/lib/utils';

function SummaryView({ listOfTransactions }) {
    
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expensesTotal, setExpensesTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    useEffect(() => {
        let income = 0;
        let expenses = 0;
        listOfTransactions.forEach((transaction) => {
            if (transaction.type === 'income') {
                income += parseFloat(transaction.amount);
            } else {
                expenses += parseFloat(transaction.amount);
            }
        });
        setIncomeTotal(income);
        setExpensesTotal(expenses);
        setFinalAmount(income - expenses);
    }, [listOfTransactions]);

    return (
        <div className='w-5/6 lg:max-w-screen-sm flex flex-col items-center justify-center text-center gap-4'>
            <div className='font-bold text-2xl lg:text-3xl leading-tight'>
                {formatNumber(finalAmount)}
            </div>
            <div className='flex flex-col w-5/6 gap-4'>
                <div id="income" className='flex flex-row items-center justify-center whitespace-nowrap bg-neutral-800 text-white-foreground h-11 rounded-lg px-8 py-4 hover:border-green-400 hover:border-2 shadow-sm'>
                    <div className='basis-1/2 text-left text-sm font-light'>Income</div>
                    <div className='basis-1/2 text-right font-normal'><span className='text-green-400'>+</span> {formatNumber(incomeTotal)}</div>
                </div>
                <div id="expenses" className='flex flex-row items-center justify-center whitespace-nowrap bg-neutral-800 text-white-foreground h-11 rounded-lg px-8 py-4 hover:border-red-400 hover:border-2 shadow-sm'>
                    <div className='basis-1/2 text-left text-sm font-light'>Expenses</div>
                    <div className='basis-1/2 text-right font-normal'><span className='text-red-400'>-</span> {formatNumber(expensesTotal)}</div>
                </div>
            </div>
            <Separator className='bg-neutral-800 my-4' />
        </div>
    )
}

export default SummaryView