/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartOptions } from 'chart.js';

// Recursively merges source object into target object
export const deepMerge = (target: any, source: any): any => {
    if (!source) return target;

    const output = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = output[key];

        if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) && targetValue) {
            output[key] = deepMerge(targetValue, sourceValue);
        } else if (sourceValue !== undefined) {
            output[key] = sourceValue;
        }
    }

    return output;
};

// Default color palette for charts
export const DEFAULT_COLORS = [
    '#6366f1', // indigo
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
];

// Shared tooltip style configuration
const BASE_TOOLTIP_STYLES = {
    backgroundColor: '#ffffff',
    titleColor: '#0f172a',
    bodyColor: '#475569',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    cornerRadius: 12,
    padding: 12,
    bodySpacing: 6,
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8,
    usePointStyle: true,
    titleFont: { size: 13, weight: 'bold' as const },
    bodyFont: { size: 13 },
};

//Default options for Line Charts
export const getLineChartDefaultOptions = (yAxisPrefix: string = ''): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 16,
                font: { size: 13, weight: 500 },
                color: '#64748b',
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        tooltip: {
            ...BASE_TOOLTIP_STYLES,
            callbacks: {
                title: (items: any) => items[0]?.label || '',
                label: (context: any) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y;
                    if (value === null) return label;
                    return `${label}: ${yAxisPrefix}${value.toLocaleString()}`;
                },
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 },
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
            },
        },
        y: {
            beginAtZero: false,
            grid: { color: '#f1f5f9' },
            border: { display: false },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 },
                padding: 8,
                callback: (value: any) => value !== null ? `${yAxisPrefix}${value}` : '',
            },
        },
    },
});

//Default options for Bar Charts
export const getBarChartDefaultOptions = (
    yAxisPrefix: string = '',
    horizontal: boolean = false,
    stacked: boolean = false
): ChartOptions<'bar'> => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 16,
                font: { size: 13, weight: 500 },
                color: '#64748b',
                usePointStyle: true,
                pointStyle: 'rect',
            },
        },
        tooltip: {
            ...BASE_TOOLTIP_STYLES,
            callbacks: {
                title: (items: any) => items[0]?.label || '',
                label: (context: any) => {
                    const label = context.dataset.label || '';
                    const value = horizontal ? context.parsed.x : context.parsed.y;
                    if (value === null) return label;
                    return `${label}: ${yAxisPrefix}${value.toLocaleString()}`;
                },
            },
        },
    },
    scales: {
        x: {
            stacked,
            grid: { display: horizontal },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 },
                callback: horizontal ? (value: any) => `${yAxisPrefix}${value}` : undefined,
            },
        },
        y: {
            stacked,
            beginAtZero: true,
            grid: { color: horizontal ? '#f1f5f9' : undefined, display: !horizontal },
            border: { display: false },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 },
                padding: 8,
                callback: !horizontal ? (value: any) => `${yAxisPrefix}${value}` : undefined,
            },
        },
    },
});

//Default options for Doughnut Charts
export const getDoughnutChartDefaultOptions = (cutout?: string | number): ChartOptions<'doughnut'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 16,
                font: { size: 13, weight: 500 },
                color: '#64748b',
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        tooltip: {
            ...BASE_TOOLTIP_STYLES,
            callbacks: {
                label: (context: any) => {
                    const label = context.label || '';
                    const value = context.parsed;
                    if (value === null) return label;

                    // Calculate percentage
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((acc: number, val: number) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1);

                    return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                },
            },
        },
    },
    cutout: cutout ?? '70%',
});
