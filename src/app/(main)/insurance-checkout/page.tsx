
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/temp_repo/src/components/ui/card';
import CheckoutForm from '@/src/components/CheckoutForm'; 

function CheckoutPage() {
    const searchParams = useSearchParams();
    const planName = searchParams.get('planName') || 'Unknown Plan';
    const price = searchParams.get('price') || '0';
    const provider = searchParams.get('provider') || 'Unknown Provider';

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Insurance Purchase</CardTitle>
                    <CardDescription>You are purchasing the <strong>{planName}</strong> plan from <strong>{provider}</strong>.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CheckoutForm amount={parseFloat(price)} />
                </CardContent>
            </Card>
        </div>
    );
}

export default function InsuranceCheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage />
        </Suspense>
    );
}
