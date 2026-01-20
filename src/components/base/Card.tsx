import React from 'react';

interface CardProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
    return (
        <div className="w-full p-4 sm:p-6 bg-white rounded-xl border border-slate-200">
            {(title || description) && (
                <div className="mb-4">
                    {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
                    {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
};
