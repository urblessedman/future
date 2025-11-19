import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Calculator } from './components/Calculator';
import { InfoSection } from './components/InfoSection';
import { AdPlaceholder } from './components/AdPlaceholder';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      
      <main className="flex-grow w-full px-4 py-8 mx-auto max-w-3xl">
        {/* Ad Top */}
        <AdPlaceholder position="top" />
        
        {/* Hero Text - More engaging copy */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-5xl font-black text-brand-blue mb-4 leading-tight tracking-tight">
            20년 뒤 1억 원,<br/>
            <span className="text-brand-red">휴지조각</span>이 될까?
          </h2>
          <p className="text-gray-600 text-base md:text-lg break-keep leading-relaxed max-w-xl mx-auto">
            물가상승률은 당신의 보험금과 노후 자금을 조용히 갉아먹습니다.<br className="hidden md:block"/>
            <strong>짜장면 지수</strong>로 당신의 미래 구매력을 지금 확인하세요.
          </p>
        </div>

        {/* Calculator Core */}
        <Calculator />

        {/* SEO Content Section */}
        <InfoSection />
        
      </main>

      <Footer />
    </div>
  );
}

export default App;