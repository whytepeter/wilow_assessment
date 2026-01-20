/**
 * LineChart Component
 * Configurable line chart with sensible defaults
 */

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartOptions
} from 'chart.js';
import { useChart } from '@/hooks/useChart';
import { deepMerge, getLineChartDefaultOptions } from './utils';
import { Card } from '../base/Card';

// Register Chart.js components for line charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    Filler
);

export interface LineChartDataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
    fill?: boolean;
}

export interface LineChartProps {
    labels: string[];
    datasets: LineChartDataset[];
    title?: string;
    description?: string;
    height?: string;
    yAxisPrefix?: string;
    options?: Partial<ChartOptions<'line'>>;
}

/**
 * Apply default dataset styles for line charts
 */
const applyDatasetDefaults = (dataset: LineChartDataset) => ({
    ...dataset,
    borderColor: dataset.borderColor || '#6366f1',
    backgroundColor: dataset.backgroundColor || 'rgba(99, 102, 241, 0.1)',
    borderWidth: 2,
    tension: dataset.tension ?? 0.4,
    pointRadius: 0,
    pointHoverRadius: 4,
    pointHoverBackgroundColor: dataset.borderColor || '#6366f1',
    pointHoverBorderColor: '#ffffff',
    pointHoverBorderWidth: 2,
});

export const LineChart: React.FC<LineChartProps> = ({
    labels,
    datasets,
    title,
    description,
    height = 'h-80',
    yAxisPrefix = '',
    options
}) => {
    // Apply defaults to datasets
    const styledDatasets = datasets.map(applyDatasetDefaults);

    // Merge options
    const defaultOptions = getLineChartDefaultOptions(yAxisPrefix);
    const finalOptions = options
        ? deepMerge(defaultOptions, options)
        : defaultOptions;

    // Use chart hook
    const { chartRef } = useChart({
        type: 'line',
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
