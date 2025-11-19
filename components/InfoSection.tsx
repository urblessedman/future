
import React, { useState } from 'react';
import { TrendingUp, HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldAlert } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';

export const InfoSection: React.FC = () => {
  return (
    <section className="mt-12 px-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center border-b border-gray-100 pb-8">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-sm font-bold mb-3">
            <BookOpen className="w-4 h-4" />
            금융 상식 & 팩트 체크
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3 break-keep">
            30년 뒤 1억 원, 왜 <span className="text-brand-red">4천만 원</span>이 될까요?
          </h3>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            인플레이션은 '보이지 않는 세금'입니다. <br className="hidden md:block"/>
            당신이 잠든 사이에도 돈의 가치는 떨어지고 있습니다. 전문가들이 말하는 불편한 진실을 확인하세요.
          </p>
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Inflation */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">내 돈이 녹고 있다 (인플레이션의 공포)</h4>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  자본주의 사회에서 물가는 필연적으로 상승합니다. 
                  매년 물가가 3%씩 오른다면, <strong>20년 뒤 화폐가치는 약 55%로 반토막</strong> 납니다. 
                  지금의 1억 원이 30년 뒤에도 같은 구매력을 가질 것이라는 착각, 
                  그것이 바로 노후 빈곤으로 가는 지름길입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Insurance Reality */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <ShieldAlert className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">종신보험 1억 가치의 진실</h4>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  과거에는 "사망보험금 1억"이면 집 한 채를 샀지만, 지금은 전세금도 부족합니다. 
                  30년 뒤엔 어떨까요? <strong>고정금리형 상품이나 단순 적금</strong>만으로는 
                  물가상승률을 따라잡지 못해 실질 자산이 마이너스가 되는 '마이너스 재테크'를 하게 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Ad Zone */}
        <div className="py-2">
            <AdPlaceholder position="content" />
        </div>

        {/* FAQ Section (Accordion Style for Long-tail Keywords) */}
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand-blue" />
            자주 묻는 질문 (FAQ)
          </h4>
          
          <div className="space-y-4">
            <FAQItem 
              question="Q. 1억 원의 현재 가치는 어떻게 계산하나요?"
              answer="미래가치(FV)를 (1 + 물가상승률)^기간 으로 나누면 현재가치(PV)가 나옵니다. 이 계산기를 사용하면 복잡한 공학용 계산기 없이도 즉시 결과를 확인할 수 있습니다."
            />
            <FAQItem 
              question="Q. 물가상승률 방어는 어떻게 해야 하나요?"
              answer="현금 비중을 줄이고 실물 자산, 주식, 혹은 변동 금리가 적용되는 금융 상품 등으로 포트폴리오를 다각화해야 합니다. 특히 장기 상품인 보험의 경우, 화폐가치 하락을 고려한 '리모델링'이 필수적입니다."
            />
            <FAQItem 
              question="Q. '짜장면 지수'가 뭔가요?"
              answer="빅맥 지수처럼 이해하기 쉬운 물가 지표입니다. 1990년 짜장면 가격(약 1,000원)과 현재(약 7,000원)를 비교하면 물가가 약 7배 올랐음을 체감할 수 있습니다. 내 돈의 구매력이 얼마나 줄어들지 보여주는 직관적인 척도입니다."
            />
            <FAQItem 
              question="Q. 지금 가입한 연금저축, 노후에 충분할까요?"
              answer="대부분 부족합니다. 국민연금과 개인연금 예상 수령액을 합쳐도, 20~30년 뒤의 물가를 반영하면 현재 생활비의 절반 수준에도 못 미칠 수 있습니다. 지금 바로 계산기로 확인하고 대책을 세워야 합니다."
            />
          </div>
        </div>

      </div>
    </section>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-bold text-gray-700">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      <div 
        className={`bg-gray-50 px-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};