import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH,USDT,USDC",
      {
        headers: {
          // #############################
          // NOTE I WILL NEVER SHARE API KEY
          // IN PRODUCTION WILL BE STORED IN .env
          // #############################
          "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
          Accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from CoinMarketCap");
    }

    const data = await response.json();
    
    // Transform the data to the format we need
    const transformedData = {
      status: data.status,
      data: Object.entries(data.data).map(([symbol, coinData]) => {
        const coin = (coinData as any)[0];
        return {
          name: getNameBySymbol(symbol),
          symbol: coin.symbol,
          price: coin.quote.USD.price,
          market_cap: coin.quote.USD.market_cap,
          volume_24h: coin.quote.USD.volume_24h,
          percent_change_24h: coin.quote.USD.percent_change_24h,
        };
      }),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from CoinMarketCap" },
      { status: 500 }
    );
  }
}

function getNameBySymbol(symbol: string): string {
  switch (symbol) {
    case "ETH":
      return "Ethereum";
    case "USDT":
      return "Tether";
    case "USDC":
      return "USD Coin";
    default:
      return symbol;
  }
}