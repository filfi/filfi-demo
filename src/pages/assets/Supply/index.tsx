import classNames from 'classnames';
import { useBoolean } from 'ahooks';
import BigNumber from 'bignumber.js';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';

import styles from './styles.less';
import Modal from '@/components/Modal';
import useWallet from '@/hooks/useWallet';
import useNotify from '@/hooks/useNotify';
import EditPane from './components/EditPane';
import { formatAmount } from '@/utils/format';
import { ReactComponent as LineIcon } from '@/assets/icons/line.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/arrow-right.svg';

export default function Supply() {
  const { wallet, setWallet } = useWallet();
  const [pools, setPools] = useModel('pools');

  const [edit, { toggle }] = useBoolean(false);

  const notify = useNotify();
  const { formatMessage } = useIntl();

  const handleWithdraw = () => {
    Modal.alert(formatMessage({ id: 'notify.message.soon' }));
  };

  const handleConfirm = async (val: string) => {
    toggle();

    await notify.show();

    const v = +val;
    const { amount = 0 } = pools ?? {};
    const { balance = 0 } = wallet ?? {};

    setPools((data) => ({
      ...data,
      amount: BigNumber(amount).plus(v).toNumber(),
    }));
    setWallet((data) => ({
      ...data,
      balance: BigNumber(balance).minus(v).toNumber(),
    }));
  };

  return (
    <>
      <div className="container">
        <div className={classNames('card mb-4', styles.card)}>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <div className="d-flex align-items-center mb-4">
                  <LineIcon />
                  <h5 className={classNames('ms-3', styles.title)}>
                    <FormattedMessage id="pages.supply.card.title" />
                  </h5>
                </div>
                <div className={styles.content}>
                  <p className={classNames('mb-2', styles.label)}>
                    <span className="me-1">
                      <FormattedMessage id="pages.supply.card.balance" />
                    </span>
                    <a
                      className="bi bi-exclamation-circle text-gray"
                      href="#"
                    ></a>
                  </p>
                  <p className={styles.cellAmount}>
                    <span className={styles.amount}>
                      {formatAmount(pools?.amount)}
                    </span>
                    <span className={styles.unit}>FIL</span>
                  </p>
                  <div className="row row-cols-3 g-1">
                    <div className="col d-flex flex-column">
                      <p className={classNames('mb-0', styles.label)}>
                        <span className="me-1">
                          <FormattedMessage id="pages.supply.income.today" />
                        </span>
                        <a
                          className="bi bi-exclamation-circle text-gray"
                          href="#"
                        ></a>
                      </p>
                      <p className="mb-0 mt-auto">
                        <span className={styles.decimal}>1.26</span>
                        <span className={styles.unit}>FIL</span>
                      </p>
                    </div>
                    <div className="col d-flex flex-column">
                      <p className={classNames('mb-0', styles.label)}>
                        <span className="me-1">
                          <FormattedMessage id="pages.supply.income.total" />
                        </span>
                        <a
                          className="bi bi-exclamation-circle text-gray"
                          href="#"
                        ></a>
                      </p>
                      <p className="mb-0 mt-auto">
                        <span className={styles.decimal}>56.643</span>
                        <span className={styles.unit}>FIL</span>
                      </p>
                    </div>
                    <div className="col d-flex flex-column">
                      <p className={classNames('mb-0', styles.label)}>
                        <span className="me-1">
                          <FormattedMessage id="pages.supply.income.rate" />
                        </span>
                        <a
                          className="bi bi-exclamation-circle text-gray"
                          href="#"
                        ></a>
                      </p>
                      <p className="mb-0 mt-auto">
                        <span className={styles.decimal}>18.2</span>
                        <span className={styles.unit}>%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="vr px-0 d-none d-lg-block"
                style={{ marginLeft: '-1px' }}
              ></div>
              <div className="col-12 col-lg-5 d-flex flex-column">
                {edit ? (
                  <div className="my-auto ps-3">
                    <EditPane onCancel={toggle} onConfirm={handleConfirm} />
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3 h-100 justify-content-center px-4">
                    <button
                      className="btn btn-primary btn-lg"
                      type="button"
                      onClick={toggle}
                    >
                      <ArrowLeft />
                      <span className="ms-2 align-middle">
                        <FormattedMessage id="actions.button.deposit" /> FIL
                      </span>
                    </button>
                    <button
                      className="btn btn-secondary btn-lg"
                      type="button"
                      disabled={!pools || pools.amount === 0}
                      onClick={handleWithdraw}
                    >
                      <ArrowRight />
                      <span className="ms-2 align-middle">
                        <FormattedMessage id="actions.button.extract" /> FIL
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
