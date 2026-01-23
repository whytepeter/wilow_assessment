
import React from 'react';
import { LineChart } from './charts/LineChart';
import type { LineChartDataset } from './charts/LineChart';
import type { ChartData } from '@/types/chart.types';

interface AdSpendChartProps {
    data: ChartData;
}

export const AdSpendChart: React.FC<AdSpendChartProps> = ({ data }) => {
    const labels = data.data.map(d => d.date);

    const datasets: LineChartDataset[] = [
        {
            label: '2024 Ad Spend',
            data: data.data.map(d => d["2024"]),
            borderColor: '#3841fc',
            backgroundColor: 'rgba(56, 65, 252, 0.1)',
        },
        {
            label: '2025 Ad Spend',
            data: data.data.map(d => d["2025"]),
            borderColor: '#f6791f',
            backgroundColor: 'rgba(246, 121, 31, 0.1)',
        }
    ];

    // Customizable options 
    const options = {
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    color: '#475569',
                    font: {
                        size: 14,
                        weight: 400,
                    },
                },
            },
        },
    };


    return (
        <LineChart
            labels={labels}
            datasets={datasets}
            title="Ad Spend Comparison"
            description="Year-over-year performance (Jan 1-30)"
            yAxisPrefix="$"
            options={options}
        />
    );
};
