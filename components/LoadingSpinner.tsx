import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState("데이터 분석 중...");
  
  const messages = [
    "과거 30년 물가 데이터 대조 중...",
    "짜장면 가격 변동률 계산 중...",
    "화폐 가치 하락폭 분석 중...",
    "미래 구매력 시뮬레이션 중..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-8 h-8 text-brand-blue opacity-50" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-500 text-sm">잠시만 기다려주세요.</p>
    </div>
  );
};