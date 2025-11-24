import { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp } from 'lucide-react';

type Currency = 'BTC' | 'ETH' | 'USD' | 'BRL';

interface ExchangeRates {
  BTC: number;
  ETH: number;
  USD: number;
  BRL: number;
}

function App() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<Currency>('BTC');
  const [toCurrency, setToCurrency] = useState<Currency>('USD');
  const [result, setResult] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const rates: ExchangeRates = {
    BTC: 1,
    ETH: 0.0525,
    USD: 0.000024,
    BRL: 0.0001185,
  };

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const calculateConversion = () => {
    const numAmount = parseFloat(amount) || 0;
    const btcValue = numAmount / rates[fromCurrency];
    const convertedValue = btcValue * rates[toCurrency];
    setResult(convertedValue);
  };

  const handleSwap = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsAnimating(false);
    }, 300);
  };

  const getCurrencySymbol = (currency: Currency): string => {
    const symbols = {
      BTC: '₿',
      ETH: 'Ξ',
      USD: '$',
      BRL: 'R$',
    };
    return symbols[currency];
  };

  const getCurrencyName = (currency: Currency): string => {
    const names = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      USD: 'US Dollar',
      BRL: 'Real Brasileiro',
    };
    return names[currency];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-orange-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Calculadora Cripto</h1>
          <p className="text-blue-200">Converta entre Bitcoin, Ethereum, Dólar e Real</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
          <div className="space-y-4">
            <div className="bg-white/20 rounded-2xl p-5 transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-medium text-blue-100 mb-2">De</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-white/30 border-2 border-white/40 rounded-xl px-4 py-3 text-white text-lg font-semibold placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="0.00"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value as Currency)}
                  className="bg-white/30 border-2 border-white/40 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-orange-400 transition-colors cursor-pointer"
                >
                  <option value="BTC" className="bg-purple-900">₿ BTC</option>
                  <option value="ETH" className="bg-purple-900">Ξ ETH</option>
                  <option value="USD" className="bg-purple-900">$ USD</option>
                  <option value="BRL" className="bg-purple-900">R$ BRL</option>
                </select>
              </div>
              <p className="text-xs text-blue-200 mt-2">{getCurrencyName(fromCurrency)}</p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSwap}
                className={`bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full p-3 shadow-lg transform transition-all duration-300 hover:scale-110 ${
                  isAnimating ? 'rotate-180' : ''
                }`}
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/20 rounded-2xl p-5 transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-medium text-blue-100 mb-2">Para</label>
              <div className="flex gap-3">
                <div className="flex-1 bg-white/30 border-2 border-white/40 rounded-xl px-4 py-3 text-white text-lg font-semibold">
                  {result.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value as Currency)}
                  className="bg-white/30 border-2 border-white/40 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                >
                  <option value="BTC" className="bg-purple-900">₿ BTC</option>
                  <option value="ETH" className="bg-purple-900">Ξ ETH</option>
                  <option value="USD" className="bg-purple-900">$ USD</option>
                  <option value="BRL" className="bg-purple-900">R$ BRL</option>
                </select>
              </div>
              <p className="text-xs text-blue-200 mt-2">{getCurrencyName(toCurrency)}</p>
            </div>
          </div>

          <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-center text-sm text-blue-100">
              <span className="font-semibold">
                {getCurrencySymbol(fromCurrency)} 1 {fromCurrency}
              </span>
              {' = '}
              <span className="font-semibold text-orange-300">
                {getCurrencySymbol(toCurrency)}{' '}
                {(rates[toCurrency] / rates[fromCurrency]).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                })}
                {' '}{toCurrency}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-blue-200 text-sm">
          <p>Taxas simuladas para demonstração</p>
        </div>
      </div>
    </div>
  );
}

export default App;
