import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto';
import { CoinInfoModal } from '../CoinInfoModal';
import { AddAssetForm } from '../AddAssetForm';

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState({});

  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prevState) => !prevState);
      }
    };
    document.addEventListener('keypress', keypress);

    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const handleSelect = (value: string) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };
  return (
    <Layout.Header style={headerStyle}>
      <Select
        // mode="multiple"
        style={{ width: 250 }}
        onSelect={handleSelect}
        open={select}
        value="press / yo open"
        onClick={() => setSelect((prevState) => !prevState)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button onClick={() => setDrawer(true)} type="primary">
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={false}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        width={600}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
};
