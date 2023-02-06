import renderHTML from 'react-render-html';
import { FormattedMessage, history, useIntl } from '@umijs/max';

import bg from './imgs/bg.png';
import useWallet from '@/hooks/useWallet';
import usePageMeta from '@/hooks/usePageMeta';
import { ReactComponent as Filecoin } from './imgs/filecoin.svg';

export default function Welcome() {
  const { formatMessage } = useIntl();
  const { wallet, connect } = useWallet();

  usePageMeta({
    bodyStyle: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 34px',
      backgroundImage: `url(${bg})`,
    },
  });

  const go = async (path: string) => {
    if (!wallet) {
      await connect();
    }

    history.push(path);
  };

  return (
    <div className="container text-center">
      <div className="display-2 d-flex align-items-center justify-content-center">
        <Filecoin />
        <h2 className="d-inline display-2 fw-bold align-middle">
          <FormattedMessage id="pages.home.hero.title" />
        </h2>
      </div>

      <h4 className="mb-4">
        <FormattedMessage id="pages.home.hero.desc" />
      </h4>

      <div className="row row-cols-1 row-cols-md-2 g-3 g-lg-4 py-4">
        <div className="col text-center">
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
              <p className="mb-0 d-grid">
                <button
                  className="btn btn-dark btn-lg rounded-pill"
                  type="button"
                  onClick={() => go('/assets/borrow')}
                >
                  <span className="me-2">APP</span>
                  <span className="bi bi-arrow-right"></span>
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="col text-center">
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
              <p className="mb-0 d-grid">
                <button
                  className="btn btn-dark btn-lg rounded-pill"
                  type="button"
                  onClick={() => go('/assets/supply')}
                >
                  <span className="me-2">APP</span>
                  <span className="bi bi-arrow-right"></span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
