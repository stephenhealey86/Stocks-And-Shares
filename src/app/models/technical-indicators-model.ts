export interface TechnicalIndicatorsModel {
    technicalAnalysis: {
        count: {
            count: number;
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
