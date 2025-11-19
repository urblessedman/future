
import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID, ADS_SLOT_TOP, ADS_SLOT_RESULT, ADS_SLOT_CONTENT } from '../constants';

interface AdPlaceholderProps {
  position: 'top' | 'result' | 'content';
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
  let slotId = '';
  let containerStyle = '';
  let label = '';
  let minHeight = '';

  // 위치별 스타일 및 슬롯 ID 매핑
  switch (position) {
    case 'top':
      slotId = ADS_SLOT_TOP;
      containerStyle = 'w-full max-w-3xl mx-auto my-6 min-h-[100px]';
      label = '상단 배너 (수평형)';
      minHeight = '100px';
      break;
    case 'result':
      slotId = ADS_SLOT_RESULT;
      containerStyle = 'w-full max-w-[336px] mx-auto my-8 min-h-[280px]'; // 모바일 친화적 사각형
      label = '결과 화면 (사각형 300x250)';
      minHeight = '280px';
      break;
    case 'content':
      slotId = ADS_SLOT_CONTENT;
      containerStyle = 'w-full max-w-3xl mx-auto my-10 min-h-[120px]';
      label = '콘텐츠 인피드 (네이티브)';
      minHeight = '120px';
      break;
  }

  const isAdEnabled = Boolean(ADSENSE_CLIENT_ID && slotId);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isAdEnabled && !isLoadedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoadedRef.current = true;
      } catch (e) {
        console.error("AdSense Push Error:", e);
      }
    }
  }, [isAdEnabled, position]);

  if (isAdEnabled) {
    return (
      <div className={`${containerStyle} flex justify-center overflow-hidden bg-gray-50`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: minHeight }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={position === 'result' ? 'rectangle' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 개발용 Placeholder (ID 미설정 시 노출)
  return (
    <div className={`${containerStyle} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4`}>
      <span className="text-gray-500 font-bold text-sm">
        [광고: {label}]
      </span>
      <span className="text-xs text-gray-400 mt-1">
        constants.ts에 ID를 입력하면<br/>실제 광고가 송출됩니다.
      </span>
    </div>
  );
};
