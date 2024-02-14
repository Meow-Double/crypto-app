import { Layout, Spin } from 'antd';
import { AppContent, AppHeader, AppSider } from '../../components';
import { useContext } from 'react';
import { CryptoContext } from '../../context/crypto';

export const AppLayout = () => {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};
