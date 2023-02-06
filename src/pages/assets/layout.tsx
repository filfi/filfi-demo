import classNames from 'classnames';
import { FormattedMessage, Outlet } from '@umijs/max';

import styles from './layout.less';

export default function AssetLayout() {
  return (
    <>
      <Outlet />

      <div className="container">
        <div className={classNames('card', styles.card)}>
          <div className="card-body">
            <h5 className="card-title mb-4">
              <FormattedMessage id="pages.assets.faq.title" />
            </h5>

            <div className={classNames('accordion', styles.accordion)}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#what-is-a-collateral-node"
                    aria-expanded="true"
                    aria-controls="what-is-a-collateral-node"
                  >
                    <FormattedMessage id="pages.assets.faq.node.title" />
                  </button>
                </h2>
                <div
                  id="what-is-a-collateral-node"
                  className="accordion-collapse collapse"
                  aria-labelledby="What is a collateral node"
                >
                  <div className="accordion-body">
                    <FormattedMessage id="pages.assets.faq.node.desc" />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#what-is-a-clearing-line"
                    aria-expanded="true"
                    aria-controls="what-is-a-clearing-line"
                  >
                    <FormattedMessage id="pages.assets.faq.line.title" />
                  </button>
                </h2>
                <div
                  id="what-is-a-clearing-line"
                  className="accordion-collapse collapse"
                  aria-labelledby="What is a clearing line"
                >
                  <div className="accordion-body">
                    <FormattedMessage id="pages.assets.faq.line.desc" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
