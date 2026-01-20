
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend,
    type ChartOptions
} from 'chart.js';
import { useChart } from '@/hooks/useChart';
import { deepMerge, getBarChartDefaultOptions } from './utils';
import { Card } from '../base/Card';

// Register Chart.js components for bar charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
);

export interface BarChartDataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderRadius?: number;
}

export interface BarChartProps {
    labels: string[];
    datasets: BarChartDataset[];
    title?: string;
    description?: string;
    height?: string;
    yAxisPrefix?: string;
    horizontal?: boolean;
    stacked?: boolean;
    options?: Partial<ChartOptions<'bar'>>;
}

/**
 * Apply default dataset styles for bar charts
 */
const applyDatasetDefaults = (dataset: BarChartDataset) => ({
    ...dataset,
    borderColor: dataset.borderColor || '#6366f1',
    backgroundColor: dataset.backgroundColor || 'rgba(99, 102, 241, 0.8)',
    borderWidth: dataset.borderWidth ?? 1,
    borderRadius: dataset.borderRadius ?? 4,
});

export const BarChart: React.FC<BarChartProps> = ({
    labels,
    datasets,
    title,
    description,
    height = 'h-80',
    yAxisPrefix = '',
    horizontal = false,
    stacked = false,
    options: customOptions
}) => {
    // Apply defaults to datasets
    const styledDatasets = datasets.map(applyDatasetDefaults);

    // Merge options
    const defaultOptions = getBarChartDefaultOptions(yAxisPrefix, horizontal, stacked);
    const finalOptions = customOptions
        ? deepMerge(defaultOptions, customOptions)
        : defaultOptions;

    // Use chart hook
    const { chartRef } = useChart({
        type: 'bar',
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
