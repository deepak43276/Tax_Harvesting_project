import { Holding, CapitalGains } from '../types';

const holdingsData: Holding[] = [
  {
    "coin": "BTC",
    "coinName": "Bitcoin",
    "logo": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    "currentPrice": 55320.15,
    "totalHolding": 0.63776,
    "averageBuyPrice": 45000,
    "stcg": {
      "balance": 0.338,
      "gain": -3000
    },
    "ltcg": {
      "balance": 0.3,
      "gain": 2400
    }
  },
  {
    "coin": "ETH",
    "coinName": "Ethereum",
    "logo": "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    "currentPrice": 9324.21,
    "totalHolding": 5.6736,
    "averageBuyPrice": 1620.51,
    "stcg": {
      "balance": 2.332,
      "gain": 55320.15
    },
    "ltcg": {
      "balance": 3.345,
      "gain": 88239.29
    }
  },
  {
    "coin": "USDT",
    "coinName": "Tether",
    "logo": "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    "currentPrice": 1.15,
    "totalHolding": 3096.54,
    "averageBuyPrice": 1.12,
    "stcg": {
      "balance": 2011.23,
      "gain": -1200
    },
    "ltcg": {
      "balance": 902.47,
      "gain": 2400
    }
  },
  {
    "coin": "MATIC",
    "coinName": "Polygon",
    "logo": "https://assets.coingecko.com/coins/images/4713/large/polygon.png",
    "currentPrice": 2.13,
    "totalHolding": 2210,
    "averageBuyPrice": 1.82,
    "stcg": {
      "balance": 800,
      "gain": -1200
    },
    "ltcg": {
      "balance": 1400,
      "gain": 8200
    }
  },
  {
    "coin": "USDC",
    "coinName": "USDC",
    "logo": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    "currentPrice": 85.41,
    "totalHolding": 0.0015339999999994802,
    "averageBuyPrice": 1.5863185433764244,
    "stcg": {
      "balance": 0.0015339999999994802,
      "gain": 0.12858552735441697
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  // ... Add all other holdings data here
];

const capitalGainsData: CapitalGains = {
  "capitalGains": {
    "stcg": {
      "profits": 70200.88,
      "losses": 1548.53
    },
    "ltcg": {
      "profits": 5020,
      "losses": 3050
    }
  }
};

export const fetchHoldings = (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData);
    }, 500);
  });
};

export const fetchCapitalGains = (): Promise<CapitalGains> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsData);
    }, 500);
  });
}; 