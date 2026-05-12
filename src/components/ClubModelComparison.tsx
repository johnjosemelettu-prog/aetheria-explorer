
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { useTranslation } from "react-i18next";

const comparisonData = [
  {
    feature: 'Primary Value',
    countryWise: 'National Pride & Large Events',
    regionWise: 'Niche Interests & Local Secrets',
  },
  {
    feature: 'Event Scale',
    countryWise: 'Large Scale (Concerts, Holidays)',
    regionWise: 'Boutique (Workshops, Pop-ups)',
  },
  {
    feature: 'Networking',
    countryWise: 'Broad Professional/Social',
    regionWise: 'High-Intensity Local Interest',
  },
  {
    feature: 'Reward Style',
    countryWise: 'Airline/Rail Partnerships',
    regionWise: 'Local Merchant Discounts',
  },
];

const ClubModelComparison: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle>{t('auto.auto_our_club_philosophy_154')}</CardTitle>
                <CardDescription>{t('auto.auto_we_focus_on_depth_ov_153')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-4">{t('auto.auto_feature_152')}</th>
                                <th className="p-4">{t('auto.auto_country_wise_focus_151')}</th>
                                <th className="p-4 font-bold text-blue-600">{t('auto.auto_region_wise_focus__o_150')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row) => (
                                <tr key={row.feature} className="border-b dark:border-gray-700">
                                    <td className="p-4 font-semibold">{row.feature}</td>
                                    <td className="p-4">{row.countryWise}</td>
                                    <td className="p-4 font-bold">{row.regionWise}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default ClubModelComparison;
