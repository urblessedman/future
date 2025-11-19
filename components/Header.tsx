
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 backdrop-blur-md bg-white/90">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-center md:justify-start relative">
        {/* Reload on click */}
        <div 
          className="flex items-center gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.location.reload()}
          title="새로고침 (초기화)"
        >
          <ShieldCheck className="w-6 h-6 text-brand-blue" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-brand-blue tracking-tight">
                미래 화폐가치 계산기
              </h1>
              <span className="bg-blue-50 text-brand-blue text-[10px] px-1.5 py-0.5 rounded font-medium border border-blue-100">
                Beta
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
