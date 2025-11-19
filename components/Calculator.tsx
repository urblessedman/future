import React, { useState } from 'react';
import { CalculatorInputs, CalculationResult } from '../types';
import { JAJANGMYEON_PRICE } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultCard } from './ResultCard';
import { Calculator as CalculatorIcon, CheckCircle2 } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    amount: 10000, // Default 100 million won (10,000 man-won)
    years: 20,
    inflationRate: 3.0,
  });

  // Helper: 금액 한글 변환 (예: 15000 -> 1억 5,000만원)
  const formatKoreanPreview = (val: number) => {
    if (!val) return "0원";
    const eok = Math.floor(val / 10000);
    const man = val % 10000;
    
    if (eok > 0) {
      return `${eok}억 ${man > 0 ? `${man.toLocaleString()}만` : ''}원`;
    }
    return `${man.toLocaleString()}만원`;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Logic
    // PV = FV / (1 + r)^n
    const futureValue = inputs.amount * 10000; // Convert man-won to won
    const rateDecimal = inputs.inflationRate / 100;
    const presentValue = futureValue / Math.pow(1 + rateDecimal, inputs.years);
    
    // Jajangmyeon Logic
    const currentBowls = Math.floor(futureValue / JAJANGMYEON_PRICE);
    const futureBowlsReal = Math.floor(presentValue / JAJANGMYEON_PRICE);

    setTimeout(() => {
      setResult({
        presentValue,
        futureValue,
        years: inputs.years,
        inflationRate: inputs.inflationRate,
        jajangmyeon: {
          currentPrice: JAJANGMYEON_PRICE,
          currentBowls,
          futureBowls: futureBowlsReal,
          lostBowls: currentBowls - futureBowlsReal
        }
      });
      setLoading(false);
      
      // Scroll to result
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 2500); // 2.5 seconds for better UX
  };

  const handleReset = () => {
    setResult(null);
    setInputs({
        amount: 10000,
        years: 20,
        inflationRate: 3.0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const INFLATION_PRESETS = [2.5, 3.0, 4.0, 5.0];

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <section id="calculator" className="w-full max-w-2xl mx-auto">
      {!loading && !result && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-brand-blue/10 p-3 rounded-full">
                 <CalculatorIcon className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">미래 화폐가치 계산기</h2>
                <p className="text-xs text-gray-400">물가상승률을 반영한 내 돈의 진짜 가치는?</p>
              </div>
            </div>
            
            <form onSubmit={handleCalculate} className="space-y-8">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  1. 미래에 받을 돈 (혹은 목표 금액)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.amount}
                    onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
                    onFocus={handleFocus}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-2xl font-bold text-brand-blue focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-right pr-16 placeholder-gray-300"
                    placeholder="0"
                    required
                    min="1"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">만원</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                   <p className="text-xs text-gray-400">예: 1억원은 10000 입력</p>
                   <p className="text-sm font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded">
                     {formatKoreanPreview(inputs.amount)}
                   </p>
                </div>
              </div>

              {/* Grid for Years and Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    2. 남은 기간 (년)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.years}
                      onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xl font-bold focus:ring-2 focus:ring-brand-blue outline-none transition-all text-right pr-12"
                      min="1"
                      max="100"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">년 후</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                    <span>3. 예상 물가상승률 (%)</span>
                  </label>
                  <div className="relative mb-3">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.inflationRate}
                      onChange={(e) => setInputs({ ...inputs, inflationRate: Number(e.target.value) })}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xl font-bold focus:ring-2 focus:ring-brand-blue outline-none transition-all text-right pr-12"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                  </div>
                  
                  {/* Chips for Quick Selection */}
                  <div className="flex gap-2 flex-wrap justify-end">
                    {INFLATION_PRESETS.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setInputs({ ...inputs, inflationRate: rate })}
                        className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                          inputs.inflationRate === rate
                            ? 'bg-brand-blue text-white border-brand-blue font-bold'
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 bg-brand-blue text-white text-xl font-black rounded-xl shadow-lg hover:bg-[#101650] transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                내 돈의 가치 확인하기
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner />}

      {result && (
        <div id="result-section">
          <ResultCard result={result} onReset={handleReset} />
        </div>
      )}
    </section>
  );
};