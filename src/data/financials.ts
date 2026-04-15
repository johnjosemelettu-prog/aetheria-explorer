
export interface FinancialData {
    income: {
        subscriptions: number;
        oneTimePurchases: number;
        total: number;
    };
    expenses: {
        api: {
            googleMaps: number;
            weatherApi: number;
            total: number;
        };
        ai: {
            gemini: number;
            imagen: number;
            total: number;
        };
        total: number;
    };
    net: number;
}

export const financialData: { [key: string]: FinancialData } = {
    "November 2023": {
        income: {
            subscriptions: 12000,
            oneTimePurchases: 3500,
            total: 15500,
        },
        expenses: {
            api: {
                googleMaps: 800,
                weatherApi: 350,
                total: 1150,
            },
            ai: {
                gemini: 4200,
                imagen: 1800,
                total: 6000,
            },
            total: 7150,
        },
        net: 8350,
    },
    "October 2023": {
        income: {
            subscriptions: 11500,
            oneTimePurchases: 3200,
            total: 14700,
        },
        expenses: {
            api: {
                googleMaps: 750,
                weatherApi: 320,
                total: 1070,
            },
            ai: {
                gemini: 3800,
                imagen: 1600,
                total: 5400,
            },
            total: 6470,
        },
        net: 8230,
    },
     "September 2023": {
        income: {
            subscriptions: 11000,
            oneTimePurchases: 2800,
            total: 13800,
        },
        expenses: {
            api: {
                googleMaps: 700,
                weatherApi: 300,
                total: 1000,
            },
            ai: {
                gemini: 3500,
                imagen: 1500,
                total: 5000,
            },
            total: 6000,
        },
        net: 7800,
    },
};
