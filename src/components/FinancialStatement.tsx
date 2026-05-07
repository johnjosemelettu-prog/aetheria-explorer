
import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

// This should match the structure in Firestore from WalletPage.tsx and EsimPurchase.tsx
export interface WalletTransaction {
    id: string;
    userId: string;
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    category: string;
    timestamp: Timestamp;
    status: 'completed' | 'pending' | 'failed';
}


const FinancialStatement: React.FC = () => {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc')
        );
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
          setTransactions(txs);
          setLoading(false);
        });
    
        return () => unsubscribe();
    }, [currentUser]);


    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };
    
    if (loading) {
        return <p>{t('auto.auto_loading_statement____1253')}</p>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('auto.auto_financial_statement_1252')}</CardTitle>
                <CardDescription>{t('auto.auto_a_detailed_report_of_1251')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('auto.auto_date_1250')}</TableHead>
                            <TableHead>{t('auto.auto_description_1249')}</TableHead>
                            <TableHead>{t('auto.auto_category_1248')}</TableHead>
                            <TableHead className="text-right">{t('auto.auto_amount_1247')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{formatDate(tx.timestamp.toDate())}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell><Badge variant="outline">{tx.category}</Badge></TableCell>
                                    <TableCell className={`text-right font-medium ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}
                                        {formatCurrency(tx.amount)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    {t('auto.auto_no_transactions_foun_1246')}
                                                                        </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default FinancialStatement;
