import { type FC } from 'react';

import { CryptoContextProveder } from './context/crypto';
import { AppLayout } from './components/layout/AppLayout';

export const App: FC = () => {
  return (
    <CryptoContextProveder>
      <AppLayout />
    </CryptoContextProveder>
  );
};
