export interface TechnicalIndicatorsModel {
    technicalAnalysis: {
        count: {
            buy: number;
            neutral: number;
            sell: number
        };
        signal: string;
    };
    trend: {
        adx: number;
        trending: boolean;
    };
}
