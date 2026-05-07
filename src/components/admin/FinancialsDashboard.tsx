
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { financialData } from '../../data/financials';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";

const FinancialsDashboard: React.FC = () => {
    const { t } = useTranslation();
    const availableMonths = Object.keys(financialData);
    const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
    const data = financialData[selectedMonth];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{t('auto.auto_financials_3078')}</CardTitle>
                    <CardDescription>{t('auto.auto_monthly_income_and_e_3077')}</CardDescription>
                </div>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('auto.auto_select_a_month_3076')} />
                    </SelectTrigger>
                    <SelectContent>
                        {availableMonths.map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Income */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">{t('auto.auto_income_3075')}</CardTitle>
                                <CardDescription className="text-green-500 font-bold text-2xl">{formatCurrency(data.income.total)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>{t('auto.auto_subscriptions_3074')}</span> <span>{formatCurrency(data.income.subscriptions)}</span></div>
                                    <div className="flex justify-between"><span>{t('auto.auto_one_time_purchases_3073')}</span> <span>{formatCurrency(data.income.oneTimePurchases)}</span></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Expenses */}
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">{t('auto.auto_expenses_3072')}</CardTitle>
                                <CardDescription className="text-red-500 font-bold text-2xl">{formatCurrency(data.expenses.total)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="font-semibold">{t('auto.auto_api_3071')}</div>
                                <div className="flex justify-between text-sm"><span>{t('auto.auto_google_maps_3070')}</span> <span>{formatCurrency(data.expenses.api.googleMaps)}</span></div>
                                <div className="flex justify-between text-sm mb-2"><span>{t('auto.auto_weather_api_3069')}</span> <span>{formatCurrency(data.expenses.api.weatherApi)}</span></div>

                                <div className="font-semibold">{t('auto.auto_ai_3068')}</div>
                                <div className="flex justify-between text-sm"><span>{t('auto.auto_gemini_3067')}</span> <span>{formatCurrency(data.expenses.ai.gemini)}</span></div>
                                <div className="flex justify-between text-sm"><span>{t('auto.auto_imagen_3066')}</span> <span>{formatCurrency(data.expenses.ai.imagen)}</span></div>
                            </CardContent>
                        </Card>

                        {/* Net */}
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">{t('auto.auto_net_3065')}</CardTitle>
                                <CardDescription className={`${data.net >= 0 ? 'text-green-500' : 'text-red-500'} font-bold text-2xl`}>
                                    {formatCurrency(data.net)}
                                </CardDescription>
                            </CardHeader>
                             <CardContent>
                                <p className="text-sm text-gray-500">{t('auto.auto_total_income___total_3064')}</p>
                            </CardContent>
                        </Card>
                    </div>
                ) : <p>{t('auto.auto_please_select_a_mont_3063')}</p>}
            </CardContent>
        </Card>
    );
};

export default FinancialsDashboard;
