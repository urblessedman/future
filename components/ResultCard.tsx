import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { PARENT_SITE_URL } from '../constants';
import { TrendingDown, Utensils, ArrowRight, Share2, RefreshCw, Check, AlertTriangle } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';

interface ResultCardProps {
  result: CalculationResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatKoreanCurrency = (amount: number) => {
    if (amount >= 100000000) {
      const eok = Math.floor(amount / 100000000);
      const remainder = Math.round((amount % 100000000) / 10000);
      return `${eok}억 ${remainder > 0 ? `${remainder.toLocaleString()}만` : ''}원`;
    }
    return `${Math.round(amount / 10000).toLocaleString()}만원`;
  };

  const handleShare = async () => {
    const title = "내 돈의 미래 가치는?";
    const text = `[충격 결과] ${result.years}년 뒤 ${formatKoreanCurrency(result.futureValue)}의 가치는 현재 약 ${formatKoreanCurrency(result.presentValue)} 수준입니다. 😱\n짜장면 지수로 확인해보세요!`;
    const url = window.location.href;
    const shareData = { title, text, url };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return; 
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Share failed:', err);
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard failed', err);
      alert('URL 복사에 실패했습니다.');
    }
  };

  // Calculate Percentages for Bar Graph
  const lossAmount = result.futureValue - result.presentValue;
  const lossPercentage = Math.round((lossAmount / result.futureValue) * 100);
  const retainPercentage = 100 - lossPercentage;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-700 border border-gray-100">
      
      {/* Result Header */}
      <div className="bg-brand-blue p-8 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600 to-brand-blue opacity-50"></div>
        
        {/* Warning Badge */}
        <div className="relative z-10 flex justify-center mb-4">
          <div className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce-slow">
            <AlertTriangle className="w-3 h-3" />
            구매력 -{lossPercentage}% 감소 경고
          </div>
        </div>

        <div className="relative z-10">
            <h3 className="text-blue-100 text-lg font-medium mb-2">
            {result.years}년 뒤 <span className="text-white font-bold border-b border-blue-400 pb-0.5">{formatKoreanCurrency(result.futureValue)}</span>의 실질 가치
            </h3>
            <div className="flex items-center justify-center gap-3 my-5">
              <TrendingDown className="w-10 h-10 text-red-400" />
              <span className="text-5xl md:text-6xl font-black tracking-tighter drop-shadow-lg">
                  {formatKoreanCurrency(result.presentValue)}
              </span>
            </div>
            
            {/* Visual Bar Graph */}
            <div className="max-w-sm mx-auto mt-6">
              <div className="flex justify-between text-xs text-blue-200 mb-1 font-medium">
                <span>남은 가치 ({retainPercentage}%)</span>
                <span className="text-red-300">증발한 가치 ({lossPercentage}%)</span>
              </div>
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden flex backdrop-blur-sm ring-1 ring-white/30">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500" 
                  style={{ width: `${retainPercentage}%` }}
                />
                <div 
                  className="h-full bg-transparent" // The rest is empty/background
                  style={{ width: `${lossPercentage}%` }}
                />
              </div>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Jajangmyeon Index */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-6 relative overflow-hidden shadow-sm">
          <div className="absolute -right-6 -top-6 opacity-10 rotate-12">
             <Utensils className="w-48 h-48 text-orange-900" />
          </div>
          
          <div className="flex items-center gap-2 mb-5 relative z-10">
            <div className="bg-orange-100 p-2 rounded-full shadow-sm">
              <Utensils className="w-5 h-5 text-orange-600" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">짜장면 지수 (Jajangmyeon Index)</h4>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center border-b border-orange-200/50 pb-3">
              <span className="text-gray-600 font-medium">지금 주문하면</span>
              <span className="font-bold text-gray-900 text-lg">{result.jajangmyeon.currentBowls.toLocaleString()} 그릇</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600 font-medium">{result.years}년 뒤 주문하면</span>
              <span className="font-bold text-brand-red text-2xl">{result.jajangmyeon.futureBowls.toLocaleString()} 그릇</span>
            </div>
            
            <div className="bg-white/90 rounded-lg p-4 text-center text-sm text-gray-700 shadow-sm border border-orange-100 mt-2">
              가만히 있었을 뿐인데 짜장면 <br/>
              <strong className="text-brand-red text-xl font-black">{result.jajangmyeon.lostBowls.toLocaleString()} 그릇</strong>을 도둑맞았습니다.
            </div>
          </div>
        </div>

        {/* High Value Ad Zone (Rectangle) */}
        <div className="border-t border-b border-gray-100 py-6 mb-8 bg-gray-50/50 rounded-lg">
            <AdPlaceholder position="result" />
        </div>

        {/* CTA & Share Section */}
        <div className="space-y-5">
          <div className="text-center">
             <p className="text-gray-800 mb-3 font-bold text-lg">
                 사라지는 내 돈, 이대로 두시겠습니까?
             </p>
             
             <a 
              href={PARENT_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full block text-center py-4 px-6 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
             >
              <div className="flex items-center justify-center gap-2">
                <span>내 자산 방어 솔루션 확인하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
             </a>
             <p className="text-xs text-gray-400 mt-2">
                * 슬기로운 보험생활의 전문가는 다릅니다.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
                onClick={handleShare}
                className={`flex items-center justify-center gap-2 py-3.5 px-4 border rounded-lg font-medium transition-all duration-200 shadow-sm ${
                  isCopied 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    복사 완료!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    공유하기
                  </>
                )}
            </button>
            <button 
                onClick={onReset}
                className="flex items-center justify-center gap-2 py-3.5 px-4 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
                <RefreshCw className="w-4 h-4" />
                다시 계산
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};