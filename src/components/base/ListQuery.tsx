// Handles data fetching, loading, and error states

import React, { useState, useEffect, useCallback } from 'react';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

interface ListQueryProps<T> {
  queryFn: () => Promise<T>;
  renderView: (data: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  resourceName?: string;
}

export function ListQuery<T>({
  queryFn,
  renderView,
  loadingComponent,
  emptyComponent,
  resourceName = 'data'
}: ListQueryProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50 rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400" />
          <div className="text-slate-400 text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={fetchData}
        resourceName={resourceName}
      />
    );
  }

  if (!data) {
    if (emptyComponent) {
      return <>{emptyComponent}</>;
    }
    return (
      <EmptyState
        onAction={fetchData}
        resourceName={resourceName}
      />
    );
  }

  return <>{renderView(data)}</>;
}
