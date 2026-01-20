
import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    DoughnutController,
    Title,
    Tooltip,
    Legend,
    type ChartOptions
} from 'chart.js';
import { useChart } from '@/hooks/useChart';
import { deepMerge, getDoughnutChartDefaultOptions, DEFAULT_COLORS } from './utils';
import { Card } from '../base/Card';

// Register Chart.js components for doughnut charts
ChartJS.register(
    ArcElement,
    DoughnutController,
    Title,
    Tooltip,
    Legend
);

export interface DoughnutChartDataset {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string | string[];
    borderWidth?: number;
}

export interface DoughnutChartProps {
    labels: string[];
    datasets: DoughnutChartDataset[];
    title?: string;
    description?: string;
    height?: string;
    cutout?: string | number;
    options?: Partial<ChartOptions<'doughnut'>>;
}

/**
 * Apply default dataset styles for doughnut charts
 */
const applyDatasetDefaults = (dataset: DoughnutChartDataset) => ({
    ...dataset,
    backgroundColor: dataset.backgroundColor || DEFAULT_COLORS,
    borderColor: dataset.borderColor || '#ffffff',
    borderWidth: dataset.borderWidth ?? 2,
});

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
    labels,
    datasets,
    title,
    description,
    height = 'h-80',
    cutout,
    options: customOptions
}) => {
    // Apply defaults to datasets
    const styledDatasets = datasets.map(applyDatasetDefaults);

    // Merge options
    const defaultOptions = getDoughnutChartDefaultOptions(cutout);
    const finalOptions = customOptions
        ? deepMerge(defaultOptions, customOptions)
        : defaultOptions;

    // Use chart hook
    const { chartRef } = useChart({
        type: 'doughnut',
        labels,
        datasets: styledDatasets,
        options: finalOptions
    });

    return (
        <Card title={title} description={description}>
            <div className={`w-full ${height}`}>
                <canvas ref={chartRef} />
            </div>
        </Card>
    );
};
