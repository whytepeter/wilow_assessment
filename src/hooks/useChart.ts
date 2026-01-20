/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect } from 'react';
import { Chart as ChartJS, type ChartConfiguration, type ChartType } from 'chart.js';

interface UseChartProps<T extends ChartType> {
    type: T;
    labels: string[];
    datasets: any[];
    options: ChartConfiguration<T>['options'];
}


export const useChart = <T extends ChartType>({
    type,
    labels,
    datasets,
    options
}: UseChartProps<T>) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<ChartJS<T> | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create chart configuration
        const config: ChartConfiguration<T> = {
            type,
            data: { labels, datasets },
            options,
        };

        // Create chart instance
        chartInstanceRef.current = new ChartJS<T>(ctx, config);

        // Handle window resize
        const handleResize = () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [type, labels, datasets, options]);

    return { chartRef };
};
