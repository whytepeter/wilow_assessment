
import { AdSpendChart } from './components/AdSpendChart';
import { ListQuery } from './components/base/ListQuery';
import { ChartSkeletonLoader } from './components/charts/ChartSkeletonLoader';

import { fetchAdSpendData } from './services';
// import { fetchAdSpendDataWithError } from './services'; // Uncomment to test error state

function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600">
            Monitor your advertising spend and performance metrics
          </p>
        </header>

        <main>
          <ListQuery
            queryFn={fetchAdSpendData}
            renderView={(data) => <AdSpendChart data={data} />}
            loadingComponent={<ChartSkeletonLoader />}
            resourceName="ad spend data"
          />
        </main>
      </div>
    </div>
  );
}

export default App;
