import React, { use, useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

function AddTransactionView({editTransaction = null, editReturn, onTransactionAdded }) {
    const [open, setOpen] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');

    useEffect(() => {
        setAccountName(localStorage.getItem('account_name') || '');
    }, [accountName]);
    
    const handleSubmit = (data: FormData) => {
        const formattedAmount = parseFloat(data.get('amount') as string).toFixed(2);

        if (transactionId) {
            const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            const transaction = transactions.find((transaction) => transaction.id === transactionId);

            if (transaction) {
                transaction.type = data.get('type') as string;
                transaction.name = data.get('transaction_name') as string;
                transaction.amount = formattedAmount;
                localStorage.setItem('transactions', JSON.stringify(transactions));
                setOpen(false);
                onTransactionAdded();
                toast.success('Transaction updated successfully');
            }
        } else {
            const transaction = {
                id: uuidv4().substr(0, 8),
                type: data.get('type'),
                name: data.get('transaction_name'),
                amount: formattedAmount,
            };
            const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            setOpen(false);
            onTransactionAdded();
            toast.success('Transaction added successfully');
        }
    };

    useEffect(() => {
        if (editTransaction !== null) {
            const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            const transaction = transactions.find((transaction) => transaction.id === editTransaction);
            if (transaction) {
                setTransactionId(editTransaction);
                setTransactionType(transaction.type);
                setTransactionName(transaction.name);
                setTransactionAmount(transaction.amount);
                setOpen(true);
            }
        }
    }, [editTransaction]);

    useEffect(() => {
        if (!open) {
            setTransactionId('');
            setTransactionType('');
            setTransactionName('');
            setTransactionAmount('');
            editReturn();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <PlusCircle size={50} className='text-white cursor-pointer bottom-10 sticky mx-auto' />
            </DialogTrigger>
            <DialogContent className="mx-auto text-neutral-950">
                <DialogHeader>
                    <DialogTitle>Add transaction</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit}>
                    <input type='hidden' name='account_name' value={accountName} />
                    <input type='hidden' name='id' value={transactionId} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-row items-center gap-4">
                            <Label htmlFor="type">
                            Transaction Type
                            </Label>
                            <Select 
                                name='type'
                                defaultValue={transactionType}
                                onValueChange={(value) => setTransactionType(value)}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Transaction Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-row items-center gap-4">
                            <Label htmlFor="transaction_name">
                            Name
                            </Label>
                            <Input
                            id="transaction_name"
                            name='transaction_name'
                            className="col-span-3"
                            value={transactionName}
                            onChange={(e) => setTransactionName(e.target.value)}
                            required
                            />
                        </div>
                        <div className="grid grid-row items-center gap-4">
                            <Label htmlFor="amount">
                            Amount
                            </Label>
                            <Input
                            id="amount"
                            name='amount'
                            type='text'
                            className="col-span-3"
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                            required
                        />
                        </div>
                    </div>
                    <Button className="w-full text-neutral-50 mt-5" size={"lg"} type="submit">
                        {transactionId ? 'Save' : 'Add'} Transaction
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTransactionView