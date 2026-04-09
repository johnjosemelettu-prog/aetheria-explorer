
// @ts-nocheck
"use client";

import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchInsurance } from '@/services/gemini';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
});

const InsuranceBookingView = () => {
  const router = useRouter();
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      duration: 7,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const plans = await searchInsurance(values.destination, values.duration);
      setInsurancePlans(plans);
    } catch (err) {
      setError('Failed to fetch insurance plans. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelection = (plan) => {
    const query = new URLSearchParams({
      planName: plan.planName,
      price: plan.price.toString(),
      provider: plan.provider,
    }).toString();
    router.push(`/insurance-checkout?${query}`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Travel Insurance</CardTitle>
        <CardDescription>
          Find the best insurance plans for your trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="destination"
                control={methods.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" {...field} placeholder="e.g., Paris, France" />
                  </div>
                )}
              />
              <Controller
                name="duration"
                control={methods.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input id="duration" type="number" {...field} />
                  </div>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Search Insurance
            </Button>
          </form>
        </FormProvider>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {insurancePlans.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Available Plans</h3>
            <div className="mt-4 grid gap-4">
              {insurancePlans.map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{plan.planName}</CardTitle>
                    <CardDescription>{plan.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <div className="font-semibold text-2xl">${plan.price}</div>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                    <Button onClick={() => handlePlanSelection(plan)} className="mt-4">
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceBookingView;
