
import React from 'react';

interface EmptyStateProps {
    message?: string;
    description?: string;
    onAction?: () => void;
    actionLabel?: string;
    resourceName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    message,
    description,
    onAction,
    actionLabel = 'Refresh',
    resourceName = 'data'
}) => {
    const defaultMessage = `No ${resourceName} available`;
    const defaultDescription = `There is currently no ${resourceName} to display.`;

    return (
        <div className="w-full h-80 flex items-center justify-center bg-white rounded-lg border border-slate-200">
            <div className="flex flex-col items-center gap-3 px-4 text-center max-w-md">
                {/* Empty state icon */}
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>

                {/* Empty state message */}
                <div>
                    <p className="text-slate-900 font-medium mb-1">
                        {message || defaultMessage}
                    </p>
                    <p className="text-slate-600 text-sm">
                        {description || defaultDescription}
                    </p>
                </div>

                {/* Action button */}
                {onAction && (
                    <button
                        onClick={onAction}
                        className="mt-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-md hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
};
