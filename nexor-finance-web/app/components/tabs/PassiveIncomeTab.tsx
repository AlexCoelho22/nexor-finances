'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '../../lib/storage';
import { Asset } from '../../types';
import { AssetCalculations, Formatter } from '../../lib/utils';

export default function PassiveIncomeTab() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [reinvest, setReinvest] = useState(false);

  useEffect(() => {
    setAssets(LocalStorage.getAssets());
  }, []);

  const monthlyIncome = assets.reduce((sum, a) => sum + AssetCalculations.getMonthlyIncome(a), 0);

  // Calcular próximos pagamentos
  const nextPayments = assets.flatMap(asset => 
    asset.paymentMonths.map(month => ({
      assetName: asset.name,
      month,
      value: asset.quantity * asset.dividendPerShare
    }))
  ).sort((a, b) => a.month - b.month).slice(0, 5);

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Projeção com/sem reinvestimento
  const calculateProjection = (months: number) => {
    if (!reinvest) return monthlyIncome * months;
    
    // Juros compostos: M = C × (1 + i)^t
    let capital = monthlyIncome;
    const rate = 0.005; // 0.5% ao mês
    
    for (let i = 1; i < months; i++) {
      capital = capital * (1 + rate) + monthlyIncome;
    }
    return capital;
  };

  return (
    <div className="space-y-4">
      <div className="nexor-card">
        <h3 className="text-lg font-semibold mb-4">Próximos Pagamentos</h3>
        {nextPayments.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
            <div>
              <p className="font-semibold text-sm">{p.assetName}</p>
              <p className="text-xs text-light-gray">{monthNames[p.month - 1]}</p>
            </div>
            <p className="text-electric-purple font-semibold">{Formatter.currency(p.value)}</p>
          </div>
        ))}
        {nextPayments.length === 0 && <p className="text-light-gray text-sm">Nenhum pagamento agendado</p>}
      </div>

      <div className="nexor-card">
        <h3 className="text-lg font-semibold mb-4">Projeção</h3>
        
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={reinvest}
            onChange={e => setReinvest(e.target.checked)}
            className="w-5 h-5"
          />
          <span>Reinvestir Dividendos (0,5% a.m.)</span>
        </label>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-light-gray">1 Ano:</span>
            <span className="font-semibold">{Formatter.currency(calculateProjection(12))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">3 Anos:</span>
            <span className="font-semibold">{Formatter.currency(calculateProjection(36))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">5 Anos:</span>
            <span className="font-semibold">{Formatter.currency(calculateProjection(60))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">10 Anos:</span>
            <span className="font-semibold text-electric-purple">{Formatter.currency(calculateProjection(120))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
