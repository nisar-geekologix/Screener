'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { useParams } from 'next/navigation'; 

function TradingViewWidget() {
  const container = useRef();
  const { symbol } = useParams(); 
  const [symbolState, setSymbolState] = useState(null);

  useEffect(() => {
    if (symbol) {
      setSymbolState(symbol); 
    }
  }, [symbol]);

  useEffect(() => {
    if (symbolState && container.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NSE:${symbolState}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.innerHTML = '';  
      container.current.appendChild(script); 
    }
  }, [symbolState]);

  if (!symbolState) {
    return (
      <div className="min-h-screen flex flex-col items-center pt-20">
        <h1 className="text-4xl font-semibold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-gray-800 py-10">
        Stock Analysis for {symbolState}
      </h1>

      {/* TradingView Chart container */}
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "500px", width: "100%" }} 
      >
        <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);


