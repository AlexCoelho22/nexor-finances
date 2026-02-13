'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '../../lib/storage';
import { Asset, AssetType, PaymentFrequency } from '../../types';
import { AssetCalculations, Formatter, generateId, UserLevel } from '../../lib/utils';

interface AssetsTabProps {
  user: any;
  setUser: (user: any) => void;
}

export default function AssetsTab({ user, setUser }: AssetsTabProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = () => {
    const loadedAssets = LocalStorage.getAssets();
    setAssets(loadedAssets);
  };

  const handleAddAsset = (asset: Omit<Asset, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const newAsset: Asset = {
      ...asset,
      id: generateId(),
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };

    const updatedAssets = [...assets, newAsset];
    LocalStorage.saveAssets(updatedAssets);
    setAssets(updatedAssets);
    setShowAddModal(false);

    // Award points
    if (user) {
      const updatedUser = { ...user, nexorPoints: user.nexorPoints + 10 };
      updatedUser.level = UserLevel.checkLevelUp(updatedUser.nexorPoints, updatedUser.level);
      LocalStorage.saveUser(updatedUser);
      setUser(updatedUser);
      alert('+10 NΞXOR Points!');
    }
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm('Excluir este ativo?')) {
      const updatedAssets = assets.filter(a => a.id !== id);
      LocalStorage.saveAssets(updatedAssets);
      setAssets(updatedAssets);
      setSelectedAsset(null);
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setShowAddModal(true)} className="nexor-button w-full">
        Adicionar Ativo
      </button>

      {assets.map(asset => (
        <div key={asset.id} onClick={() => setSelectedAsset(asset)} className="nexor-card cursor-pointer hover:bg-opacity-80 transition-all">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{asset.name}</h3>
              <p className="text-sm text-light-gray">{asset.ticker}</p>
            </div>
            <p className="text-lg font-semibold text-electric-purple">
              {Formatter.currency(AssetCalculations.getCurrentValue(asset))}
            </p>
          </div>
          <p className={`text-sm ${AssetCalculations.getProfitLossAbsolute(asset) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Formatter.currency(AssetCalculations.getProfitLossAbsolute(asset))} 
            ({Formatter.percentage(AssetCalculations.getProfitLossPercentage(asset))})
          </p>
        </div>
      ))}

      {assets.length === 0 && (
        <div className="nexor-card text-center py-8 text-light-gray">
          Nenhum ativo cadastrado. Adicione seu primeiro investimento!
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddModal && <AddAssetModal onClose={() => setShowAddModal(false)} onAdd={handleAddAsset} />}

      {/* Asset Details Modal */}
      {selectedAsset && (
        <AssetDetailsModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onDelete={handleDeleteAsset}
        />
      )}
    </div>
  );
}

// Add Asset Modal Component
function AddAssetModal({ onClose, onAdd }: { onClose: () => void, onAdd: (asset: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    type: AssetType.BRAZILIAN_STOCK,
    quantity: 0,
    avgPrice: 0,
    currentPrice: 0,
    dividendPerShare: 0,
    paymentFrequency: PaymentFrequency.MONTHLY,
    paymentMonths: [1],
    notes: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.ticker || formData.quantity <= 0) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card-bg rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Adicionar Ativo</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nome do Ativo"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="nexor-input w-full"
          />

          <input
            type="text"
            placeholder="Ticker"
            value={formData.ticker}
            onChange={e => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
            className="nexor-input w-full"
          />

          <select
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value as AssetType })}
            className="nexor-input w-full"
          >
            <option value={AssetType.BRAZILIAN_STOCK}>Ações Brasileiras</option>
            <option value={AssetType.FII}>FIIs</option>
            <option value={AssetType.BITCOIN}>Bitcoin</option>
            <option value={AssetType.CRYPTO}>Outras Criptomoedas</option>
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={formData.quantity || ''}
            onChange={e => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
            className="nexor-input w-full"
          />

          <input
            type="number"
            placeholder="Preço Médio"
            value={formData.avgPrice || ''}
            onChange={e => setFormData({ ...formData, avgPrice: parseFloat(e.target.value) || 0 })}
            className="nexor-input w-full"
            step="0.01"
          />

          <input
            type="number"
            placeholder="Preço Atual"
            value={formData.currentPrice || ''}
            onChange={e => setFormData({ ...formData, currentPrice: parseFloat(e.target.value) || 0 })}
            className="nexor-input w-full"
            step="0.01"
          />

          <input
            type="number"
            placeholder="Dividendo por Cota"
            value={formData.dividendPerShare || ''}
            onChange={e => setFormData({ ...formData, dividendPerShare: parseFloat(e.target.value) || 0 })}
            className="nexor-input w-full"
            step="0.01"
          />

          <select
            value={formData.paymentFrequency}
            onChange={e => setFormData({ ...formData, paymentFrequency: e.target.value as PaymentFrequency })}
            className="nexor-input w-full"
          >
            <option value={PaymentFrequency.MONTHLY}>Mensal</option>
            <option value={PaymentFrequency.QUARTERLY}>Trimestral</option>
            <option value={PaymentFrequency.SEMIANNUAL}>Semestral</option>
            <option value={PaymentFrequency.ANNUAL}>Anual</option>
          </select>

          <div className="flex gap-2">
            <button onClick={handleSubmit} className="nexor-button flex-1">Salvar</button>
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-2xl flex-1">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Asset Details Modal
function AssetDetailsModal({ asset, onClose, onDelete }: { asset: Asset, onClose: () => void, onDelete: (id: string) => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card-bg rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{asset.name}</h2>

        <div className="space-y-2 text-sm">
          <p><span className="text-light-gray">Ticker:</span> {asset.ticker}</p>
          <p><span className="text-light-gray">Quantidade:</span> {Formatter.number(asset.quantity)}</p>
          <p><span className="text-light-gray">Preço Médio:</span> {Formatter.currency(asset.avgPrice)}</p>
          <p><span className="text-light-gray">Preço Atual:</span> {Formatter.currency(asset.currentPrice)}</p>
          <hr className="border-gray-700" />
          <p><span className="text-light-gray">Total Investido:</span> {Formatter.currency(AssetCalculations.getTotalInvested(asset))}</p>
          <p><span className="text-light-gray">Valor Atual:</span> {Formatter.currency(AssetCalculations.getCurrentValue(asset))}</p>
          <p className={AssetCalculations.getProfitLossAbsolute(asset) >= 0 ? 'text-green-500' : 'text-red-500'}>
            <span className="text-light-gray">Lucro/Prejuízo:</span> {Formatter.currency(AssetCalculations.getProfitLossAbsolute(asset))} 
            ({Formatter.percentage(AssetCalculations.getProfitLossPercentage(asset))})
          </p>
          <hr className="border-gray-700" />
          <p><span className="text-light-gray">Renda Mensal:</span> {Formatter.currency(AssetCalculations.getMonthlyIncome(asset))}</p>
          <p><span className="text-light-gray">Renda Anual:</span> {Formatter.currency(AssetCalculations.getAnnualIncome(asset))}</p>
          <p><span className="text-light-gray">Dividend Yield:</span> {Formatter.percentage(AssetCalculations.getDividendYield(asset))}</p>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="nexor-button flex-1">Fechar</button>
          <button onClick={() => onDelete(asset.id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl flex-1">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
