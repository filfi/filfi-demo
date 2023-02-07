import { useState } from 'react';
import { useMount } from 'ahooks';
import { Outlet } from '@umijs/max';
import { createPortal } from 'react-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useWallet from '@/hooks/useWallet';
import { mountPortal, unmountPortal } from '@/helpers/app';

function getDom() {
  let dom = document.querySelector('#portal');

  if (!dom) {
    dom = document.createElement('div');
    dom.setAttribute('id', 'portal');
    document.body.appendChild(dom);
  }

  return dom;
}

function removeDom() {
  const dom = document.querySelector('#portal');

  if (dom?.childElementCount === 0) {
    document.querySelector('#portal')?.remove();
  }
}

const BasicLayout: React.FC = () => {
  const { wallet, fetchWallet } = useWallet();
  const [node, setNode] = useState<React.ReactNode>();

  useMount(() => {
    // @ts-ignore
    mountPortal.current = (node: React.ReactNode) => {
      setNode(node);
    };

    // @ts-ignore
    unmountPortal.current = () => {
      setNode(undefined);

      setTimeout(removeDom, 1000 / 60);
    };

    if (wallet) {
      fetchWallet();
    }
  });

  return (
    <>
      <Header />

      <main className="ff-layout-main">
        <Outlet />
      </main>

      <Footer />

      {node && createPortal(node, getDom())}
    </>
  );
};

export default BasicLayout;
