
import React from 'react';

export const ChartSkeletonLoader: React.FC = () => {
    return (
        <div className="w-full p-4 sm:p-6 bg-white rounded-xl border border-slate-200">
            {/* Header skeleton */}
            <div className="mb-4">
                <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
            </div>

            {/* Chart area skeleton */}
            <div className="w-full h-80 relative">
                {/* Legend skeleton */}
                <div className="absolute top-0 right-0 flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-200 rounded-full animate-pulse" />
                        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-200 rounded-full animate-pulse" />
                        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                    </div>
                </div>

                {/* Y-axis labels skeleton */}
                <div className="absolute left-0 top-12 bottom-8 flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-3 w-10 bg-slate-100 rounded animate-pulse" />
                    ))}
                </div>

                {/* Chart lines skeleton */}
                <div className="absolute left-16 right-0 top-12 bottom-8 flex items-end justify-between gap-2">
                    {/* Animated line chart bars/points */}
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                            {/* Data point 1 */}
                            <div
                                className="w-full bg-indigo-200 rounded-t animate-pulse"
                                style={{
                                    height: `${30 + Math.sin(i * 0.5) * 20}%`,
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* X-axis labels skeleton */}
                <div className="absolute left-16 right-0 bottom-0 flex justify-between">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-3 w-12 bg-slate-100 rounded animate-pulse" />
                    ))}
                </div>

                {/* Grid lines */}
                <div className="absolute left-16 right-0 top-12 bottom-8 flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-px w-full bg-slate-100" />
                    ))}
                </div>
            </div>

            {/* Loading pulse overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
        </div>
    );
};
