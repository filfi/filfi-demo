import renderHTML from 'react-render-html';
import { FormattedMessage, history, useIntl } from '@umijs/max';

import useWallet from '@/hooks/useWallet';
import { ReactComponent as Filecoin } from './imgs/filecoin.svg';

export default function Welcome() {
  const { formatMessage } = useIntl();
  const { wallet, connect } = useWallet();

  const go = async (path: string) => {
    if (!wallet) {
      await connect();
    }

    history.push(path);
  };

  return (
    <div className="container text-center">
      <div className="display-2">
        <Filecoin />
        <h2 className="d-inline display-2 fw-bold align-middle">
          <FormattedMessage id="pages.home.hero.title" />
        </h2>
      </div>
      <h4 className="mb-4">
        <FormattedMessage id="pages.home.hero.desc" />
      </h4>
      <div className="py-4">
        <div className="row g-3 g-xl-4">
          <div className="col-12 col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
            <div className="d-flex gap-3 gap-xl-4 text-center">
              <div
                className="card flex-fill border-0 rounded-3 shadow text-reset"
                style={{ backgroundColor: '#E6EEFA' }}
              >
                <div className="card-body py-4">
                  <h4 className="card-title mb-4 fw-bold">
                    <FormattedMessage id="pages.home.borrow.title" />
                  </h4>
                  <p className="card-text mb-3">
                    {renderHTML(formatMessage({ id: 'pages.home.borrow.rate' }))}
                    <span className="text-success"> 18.2%</span>
                  </p>
                  <button className="btn btn-dark btn-lg rounded-pill" type="button" style={{ width: 242 }} onClick={() => go('/assets/borrow')}>
                    <span className="me-2">APP</span>
                    <span className="bi bi-arrow-right"></span>
                  </button>
                </div>
              </div>
              <div
                className="card flex-fill border-0 rounded-3 shadow text-reset"
                style={{ backgroundColor: '#E5F5D0' }}
              >
                <div className="card-body py-4">
                  <h4 className="card-title mb-4 fw-bold">
                    <FormattedMessage id="pages.home.supply.title" />
                  </h4>
                  <p className="card-text mb-3">
                    {renderHTML(formatMessage({ id: 'pages.home.supply.rate' }))}
                    <span className="text-success"> 20.3%</span>
                  </p>
                  <button className="btn btn-dark btn-lg rounded-pill" type="button" style={{ width: 242 }} onClick={() => go('/assets/supply')}>
                    <span className="me-2">APP</span>
                    <span className="bi bi-arrow-right"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
