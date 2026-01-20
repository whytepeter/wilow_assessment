## Overview

A single line chart comparing ad spend, year over year (2024 vs 2025).

## 🌐 Live Demo

**[View Live App](https://your-app-url.vercel.app)**

## ✨ Features

- 📊 **Multiple Chart Types** - Line, Bar, and Doughnut charts
- 🎨 **Modern UI** - Clean design with rounded tooltips and consistent styling
- 📱 **Fully Responsive** - Works seamlessly from 320px to 1440px
- 🔒 **Type Safe** - Full TypeScript coverage
- ⚡ **Smart Loading** - Built-in loading and error states
- 🧩 **Reusable Components** - Modular, composable architecture

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── base/
│   │   ├── Card.tsx              # Reusable card wrapper
│   │   ├── EmptyState.tsx        # Empty state UI
│   │   ├── ErrorState.tsx        # Error state UI
│   │   └── ListQuery.tsx         # Data fetching wrapper
│   ├── charts/
│   │   ├── LineChart.tsx         # Line chart component
│   │   ├── BarChart.tsx          # Bar chart component
│   │   ├── DoughnutChart.tsx     # Doughnut chart component
│   │   ├── ChartSkeletonLoader.tsx
│   │   └── utils.ts              # Shared chart utilities
│   └── AdSpendChart.tsx          # Ad spend visualization
├── hooks/
│   └── useChart.ts               # Chart instance management
├── services/
│   └── adSpend.service.ts        # Data fetching service
├── types/
│   └── chart.types.ts            # TypeScript definitions
└── App.tsx
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chart.js** - Chart rendering
- **Tailwind CSS** - Styling

## 📊 Chart Components

### Line Chart

```tsx
<LineChart
  labels={["Jan 1", "Jan 2", "Jan 3"]}
  datasets={[
    { label: "2024", data: [100, 200, 150] },
    { label: "2025", data: [120, 220, 180] },
  ]}
  title="Ad Spend Comparison"
  yAxisPrefix="$"
/>;
```

### Bar Chart

```tsx
<BarChart
  labels={["Q1", "Q2", "Q3", "Q4"]}
  datasets={[
    { label: "Revenue", data: [12000, 19000, 15000, 25000] },
  ]}
  title="Quarterly Revenue"
/>;
```

### Doughnut Chart

```tsx
<DoughnutChart
  labels={["Direct", "Organic", "Referral"]}
  datasets={[
    { data: [300, 150, 100] },
  ]}
  title="Traffic Sources"
/>;
```

### Data Fetching with ListQuery

Handles loading, error, and success states automatically:

```tsx
<ListQuery
  queryFn={fetchAdSpendData}
  renderView={(data) => <AdSpendChart data={data} />}
  loadingComponent={<ChartSkeletonLoader />}
  resourceName="ad spend data"
/>;
```

## 📝 License

This project is part of a technical assessment.
