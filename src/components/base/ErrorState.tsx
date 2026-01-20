/**
 * ErrorState Component
 * Displays error message with retry functionality
 */

import React from 'react';

interface ErrorStateProps {
    error: string;
    onRetry?: () => void;
    resourceName?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    error,
    onRetry,
    resourceName = 'data'
}) => {
    return (
        <div className="w-full h-80 flex items-center justify-center bg-white rounded-lg border border-red-200">
            <div className="flex flex-col items-center gap-3 px-4 text-center max-w-md">
                {/* Error icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-red-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error message */}
                <div>
                    <p className="text-red-900 font-medium mb-1">
                        Error loading {resourceName}
                    </p>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>

                {/* Retry button */}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-2 px-4 py-2 bg-red-800 text-white text-sm font-medium rounded-md hover:bg-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};
