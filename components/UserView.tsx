import React, { useEffect, useState } from 'react';
import TransactionView from '@/components/TransactionView';

function UserView() {
    const [listOfTransactions, setListOfTransactions] = useState([]);

    useEffect(() => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setListOfTransactions(transactions);
    }, []);

    const handleTransactionAdded = () => {
        const updatedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setListOfTransactions(updatedTransactions);
    };

    return (
        <TransactionView onTransactionAdded={handleTransactionAdded} />
    );
}

export default UserView;