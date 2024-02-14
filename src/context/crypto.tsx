import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils';

export const CryptoContext: React.Context<any> = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

const mapAssets = (assets, result) => {
  return assets.map((asset) => {
    const coin = result.find((c) => c.id === asset.id);
    return {
      grow: asset.price < coin.price,
      growPercent: percentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      name: coin.name,
      ...asset,
    };
  });
};

export function CryptoContextProveder({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  const addAsset = (newAsset) => {
    setAssets((prevState) => mapAssets([...prevState, newAsset], crypto));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    })();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export const useCrypto = () => {
  return useContext(CryptoContext);
};
