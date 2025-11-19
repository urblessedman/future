
import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID, ADS_SLOT_TOP, ADS_SLOT_RESULT, ADS_SLOT_CONTENT } from '../constants';

interface AdPlaceholderProps {
  position: 'top' | 'result' | 'content';
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
  let slotId = '';
  let label = '';
  
  // 1. 确定 Slot ID 和 标签
  switch (position) {
    case 'top':
      slotId = ADS_SLOT_TOP;
      label = '상단 배너';
      break;
    case 'result':
      slotId = ADS_SLOT_RESULT;
      label = '결과 화면 (300x250)';
      break;
    case 'content':
      slotId = ADS_SLOT_CONTENT;
      label = '콘텐츠 인피드';
      break;
  }

  const isAdEnabled = Boolean(ADSENSE_CLIENT_ID && slotId);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // 只有当组件挂载且开启广告时，才推送广告请求
    if (isAdEnabled && !isLoadedRef.current) {
      try {
        // 检查是否存在该元素，防止 React 快速重渲染导致的重复 push
        const adElement = document.getElementById(`ad-slot-${position}`);
        if (adElement && adElement.innerHTML === "") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isLoadedRef.current = true;
        }
      } catch (e) {
        console.error("AdSense Push Error:", e);
      }
    }
  }, [isAdEnabled, position]);

  if (!isAdEnabled) {
    // 开发模式占位符
    return (
      <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4 min-h-[100px]">
        <span className="text-gray-500 font-bold text-sm">[광고: {label}]</span>
        <span className="text-xs text-gray-400 mt-1">ID 미설정</span>
      </div>
    );
  }

  // 2. 根据位置渲染不同类型的广告代码 (核心修复)
  
  // A. 结果页 (Result): 强制固定尺寸 (Fixed 300x250)
  // 这是为了防止容器坍塌导致广告不显示
  if (position === 'result') {
    return (
      <div className="flex justify-center my-6">
        <ins
          id={`ad-slot-${position}`}
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '300px', height: '250px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-full-width-responsive="false" 
        ></ins>
      </div>
    );
  }

  // B. 其他 (Top, Content): 响应式 (Responsive)
  return (
    <div className={`w-full flex justify-center overflow-hidden bg-gray-50 ${position === 'top' ? 'my-4' : 'my-8'}`}>
      <ins
        id={`ad-slot-${position}`}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: position === 'top' ? '100px' : '120px' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
