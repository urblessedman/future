
export interface CalculatorInputs {
  amount: number; // In Man-won (10,000 KRW)
  years: number;
  inflationRate: number;
}

export interface CalculationResult {
  presentValue: number; // The actual calculated PV
  futureValue: number; // The nominal FV (user input)
  years: number;
  inflationRate: number;
  jajangmyeon: {
    currentPrice: number;
    currentBowls: number; // How many you can buy today with that amount
    futureBowls: number; // How many you can buy in future with that nominal amount (adjusted for purchasing power)
    lostBowls: number;
  };
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
