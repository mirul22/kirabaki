import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from 'lucide-react';
import AddTransactionView from '@/components/AddTransactionView';
import { formatNumber } from '@/lib/utils';
import SummaryView from './SummaryView';

interface Transaction {
    id: string;
    type: string;
    name: string;
    amount: number;
}

function TransactionView({ onTransactionAdded }: { onTransactionAdded: () => void }) {
    
    const [listOfTransactions, setListOfTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState('');

    useEffect(() => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setListOfTransactions(transactions);
    }, []);

    const handleTransactionAdded = () => {
        const updatedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setListOfTransactions(updatedTransactions);
    };

    const handleEditTransaction = (id: string) => {
        setSelectedTransaction(id);
    };

    const handleDeleteTransaction = (id: string) => {
        const updatedTransactions = [...listOfTransactions];
        const transaction = updatedTransactions.find((transaction: { id: string }) => transaction.id === id);
        if (transaction) {
            const index = updatedTransactions.indexOf(transaction);
            updatedTransactions.splice(index, 1);
            setListOfTransactions(updatedTransactions);
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        }
    };

    const handleReturnEdit = () => {
        setSelectedTransaction('');
    }

    return (
        <>
        <SummaryView listOfTransactions={listOfTransactions} />
        <div className='w-5/6 lg:max-w-screen-sm'>
            {listOfTransactions.map((transaction: Transaction) => (
            <div key={transaction.id} className='flex flex-row items-center justify-between relative border-b-neutral-800 border-b-2 p-4'>
                <div className='text-md text-neutral-400 font-normal'>{(transaction as { name: string }).name}</div>
                <div className='group flex items-center hover:-translate-x-8 hover:transition-transform hover:duration-300'>
                    <div className='flex text-center justify-items-center text-md text-neutral-400 font-normal'>
                        {transaction.type === 'income' ? <span className='text-green-400 mr-2'>+</span> : <span className='text-red-400 mr-2'>-</span>}{formatNumber(transaction.amount)}
                    </div>
                    <div className='text-md text-white cursor-pointer hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:ml-5 group-hover:duration-300'>
                        <Pencil size={20} onClick={() => handleEditTransaction(transaction.id)} />
                    </div>
                    <div className='text-md text-red-500 cursor-pointer hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:ml-1 group-hover:duration-300'>
                        <Trash size={20} onClick={() => handleDeleteTransaction(transaction.id)} />
                    </div>
                </div>
            </div>
            ))}
            <AddTransactionView
                editTransaction={selectedTransaction}
                editReturn={handleReturnEdit}
                onTransactionAdded={handleTransactionAdded}
            />
        </div>
        </>
    )
}

export default TransactionView