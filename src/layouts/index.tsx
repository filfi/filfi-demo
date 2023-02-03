import { Outlet } from '@umijs/max';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useWallet from '@/hooks/useWallet';
import { useMount } from 'ahooks';

const BasicLayout: React.FC = () => {
  const { wallet, fetchWallet } = useWallet();

  useMount(() => {
    if (wallet) {
      fetchWallet();
    }
  });

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default BasicLayout;
