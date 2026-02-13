'use client';

import { useEffect, useState } from 'react';
import { LocalStorage } from '../../lib/storage';
import { Asset } from '../../types';
import { AssetCalculations, Formatter } from '../../lib/utils';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function DashboardTab() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const loadedAssets = LocalStorage.getAssets();
    setAssets(loadedAssets);
  }, []);

  const totalValue = assets.reduce((sum, a) => sum + AssetCalculations.getCurrentValue(a), 0);
  const totalInvested = assets.reduce((sum, a) => sum + AssetCalculations.getTotalInvested(a), 0);
  const totalProfit = totalValue - totalInvested;
  const monthlyIncome = assets.reduce((sum, a) => sum + AssetCalculations.getMonthlyIncome(a), 0);
  const annualIncome = monthlyIncome * 12;

  // Pie chart data
  const assetsByType = assets.reduce((acc, asset) => {
    const value = AssetCalculations.getCurrentValue(asset);
    acc[asset.type] = (acc[asset.type] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(assetsByType).map(type => {
      const names: Record<string, string> = {
        'BRAZILIAN_STOCK': 'Ações',
        'FII': 'FIIs',
        'BITCOIN': 'Bitcoin',
        'CRYPTO': 'Cripto'
      };
      return names[type] || type;
    }),
    datasets: [{
      data: Object.values(assetsByType),
      backgroundColor: ['#7B2CBF', '#9D4EDD', '#C77DFF', '#E0AAFF'],
    }]
  };

  // Line chart - simulated growth
  const lineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Crescimento',
      data: [totalValue * 0.8, totalValue * 0.85, totalValue * 0.9, totalValue * 0.93, totalValue * 0.97, totalValue],
      borderColor: '#9D4EDD',
      backgroundColor: 'rgba(157, 78, 221, 0.1)',
      tension: 0.4
    }]
  };

  // Bar chart - monthly dividends
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const monthlyDividends = monthNames.map((_, index) => {
    return assets.reduce((sum, asset) => {
      if (asset.paymentMonths.includes(index + 1)) {
        return sum + (asset.quantity * asset.dividendPerShare);
      }
      return sum;
    }, 0);
  });

  const barData = {
    labels: monthNames,
    datasets: [{
      label: 'Dividendos',
      data: monthlyDividends,
      backgroundColor: '#7B2CBF',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF'
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#CCCCCC' },
        grid: { color: '#333' }
      },
      x: {
        ticks: { color: '#CCCCCC' },
        grid: { color: '#333' }
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Portfolio Value */}
      <div className="nexor-card">
        <p className="text-light-gray text-sm mb-1">Valor da Carteira</p>
        <p className="text-3xl font-bold mb-2">{Formatter.currency(totalValue)}</p>
        <p className={`text-sm ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {Formatter.currency(totalProfit)} ({Formatter.percentage(totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0)})
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="nexor-card">
          <p className="text-light-gray text-xs mb-1">Lucro/Prejuízo</p>
          <p className={`text-xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Formatter.currency(totalProfit)}
          </p>
        </div>
        <div className="nexor-card">
          <p className="text-light-gray text-xs mb-1">Renda Mensal</p>
          <p className="text-xl font-bold text-electric-purple">{Formatter.currency(monthlyIncome)}</p>
        </div>
      </div>

      {/* Annual Income */}
      <div className="nexor-card">
        <p className="text-light-gray text-sm mb-1">Renda Anual Estimada</p>
        <p className="text-2xl font-bold text-electric-purple">{Formatter.currency(annualIncome)}</p>
      </div>

      {/* Charts */}
      {assets.length > 0 && (
        <>
          <div className="nexor-card">
            <h3 className="text-lg font-semibold mb-4">Alocação</h3>
            <div style={{ height: '250px' }}>
              <Pie data={pieData} options={{ ...chartOptions, scales: undefined }} />
            </div>
          </div>

          <div className="nexor-card">
            <h3 className="text-lg font-semibold mb-4">Crescimento da Carteira</h3>
            <div style={{ height: '250px' }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          <div className="nexor-card">
            <h3 className="text-lg font-semibold mb-4">Dividendos Mensais</h3>
            <div style={{ height: '250px' }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </>
      )}

      {assets.length === 0 && (
        <div className="nexor-card text-center py-8">
          <p className="text-light-gray">Adicione seus primeiros ativos na aba "Ativos" para ver o dashboard completo!</p>
        </div>
      )}
    </div>
  );
}
