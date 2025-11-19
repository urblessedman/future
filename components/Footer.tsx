import React from 'react';
import { PARENT_SITE_URL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-8 mt-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm mb-2">
          Operated by <a href={PARENT_SITE_URL} target="_blank" rel="noreferrer" className="font-bold text-white hover:underline">슬기로운 보험생활</a>
        </p>
        <p className="text-xs text-gray-500 mb-4">
          © 2025 Smart KR Insurance. All rights reserved.
        </p>
        <div className="text-[10px] text-gray-500 border-t border-gray-700 pt-4 leading-relaxed">
          <p>
            본 계산기는 물가상승률에 따른 화폐가치 변화를 이해하기 위한 시뮬레이션 도구입니다.
            실제 미래 물가나 금리는 다양한 경제 변수에 따라 달라질 수 있으며, 
            이 결과는 법적 효력이 없음을 알려드립니다.
          </p>
        </div>
      </div>
    </footer>
  );
};