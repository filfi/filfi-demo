import classNames from 'classnames';
import { useBoolean } from 'ahooks';
import BigNumber from 'bignumber.js';
import { useMemo, useRef } from 'react';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';

import styles from './styles.less';
import * as F from '@/utils/format';
import Modal from '@/components/Modal';
import useNotify from '@/hooks/useNotify';
import useWallet from '@/hooks/useWallet';
import EditPane from './components/EditPane';
import ChangePane from './components/ChangePane';
import { ReactComponent as DebtIcon } from '@/assets/icons/debt.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/arrow-right.svg';

export default function Supply() {
  // refs
  const modal = useRef<ModalAttrs>(null);

  // models
  const [borrow, setBorrow] = useModel('borrow');
  const [collateral, setCollateral] = useModel('collateral');

  // states
  const [edit, { toggle: toggleEdit }] = useBoolean(false);
  const [change, { toggle: toggleChange }] = useBoolean(false);

  // hooks
  const notify = useNotify();
  const { wallet } = useWallet();
  const { formatMessage } = useIntl();

  // computed
  const percent = useMemo(() => {
    if (collateral && collateral.balance > 0) {
      return collateral.amount / collateral.balance;
    }

    return 0;
  }, [collateral]);

  // handle methods
  const handleCollateral = async () => {
    await notify.show();

    setCollateral({
      id: 'f01234567',
      amount: 0,
      balance: wallet?.balance,
      days: 540,
      status: 1,
    });
  };

  const handleAmount = async (value: string) => {
    toggleChange();

    await notify.show();

    const amount = +value;

    setCollateral((vals) => ({ ...vals, amount }));
  };

  const handleBorrow = () => {
    if (!collateral) {
      return Modal.confirm({
        title: formatMessage({ id: 'notify.collateral.empty.title' }),
        content: (
          <>
            <p>
              <FormattedMessage id="notify.collateral.empty.tips.1" />
            </p>
            <p className="mb-0">
              <FormattedMessage id="notify.collateral.empty.tips.2" />
            </p>
          </>
        ),
        cancelText: formatMessage({ id: 'actions.button.cancel' }),
        confirmText: formatMessage({ id: 'notify.collateral.empty.action' }),
        onConfirm: handleCollateral,
      });
    }

    if (collateral.amount === 0) {
      return Modal.confirm({
        title: formatMessage({ id: 'notify.collateral.limit.title' }),
        content: formatMessage({ id: 'notify.collateral.limit.content' }),
        cancelText: formatMessage({ id: 'actions.button.cancel' }),
        confirmText: formatMessage({ id: 'notify.collateral.limit.action' }),
        onConfirm: toggleChange,
      });
    }

    toggleEdit();
  };

  const handlePayback = () => {
    Modal.alert(formatMessage({ id: 'notify.message.soon' }));
  };

  const handleConfirm = async (val: string) => {
    toggleEdit();

    await notify.show();

    const v = +val;
    const { amount = 0 } = borrow ?? {};

    setBorrow((data) => ({
      ...data,
      amount: BigNumber(amount).plus(v).toNumber(),
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
                  <DebtIcon />
                  <h5 className={classNames('ms-3', styles.title)}>
                    <FormattedMessage id="pages.borrow.debts.title" />
                  </h5>
                </div>
                <div className={styles.content}>
                  <p className={classNames('mb-2', styles.label)}>
                    <span className="me-1">
                      <FormattedMessage id="pages.borrow.debts.balance" />
                    </span>
                    <a
                      className="bi bi-exclamation-circle text-gray"
                      href="#"
                    ></a>
                  </p>
                  <p className={styles.cellAmount}>
                    <span className={styles.amount}>
                      {F.formatAmount(borrow?.amount)}
                    </span>
                    <span className={styles.unit}>FIL</span>
                  </p>
                  <div className="row row-cols-3 g-1">
                    <div className="col d-flex flex-column">
                      <p className={classNames('mb-0', styles.label)}>
                        <span className="me-1">
                          <FormattedMessage id="pages.borrow.loan.total" />
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
                          <FormattedMessage id="pages.borrow.loan.remain" />
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
                          <FormattedMessage id="pages.borrow.loan.rate" />
                        </span>
                        <a
                          className="bi bi-exclamation-circle text-gray"
                          href="#"
                        ></a>
                      </p>
                      <p className="mb-0 mt-auto">
                        <span className={styles.decimal}>3.46</span>
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
                    <EditPane onCancel={toggleEdit} onConfirm={handleConfirm} />
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3 h-100 justify-content-center px-4">
                    <button
                      className="btn btn-primary btn-lg"
                      type="button"
                      disabled={!borrow || borrow.amount === 0}
                      onClick={handlePayback}
                    >
                      <ArrowLeft />
                      <span className="ms-2 align-middle">
                        <FormattedMessage id="actions.button.payback" /> FIL
                      </span>
                    </button>
                    <button
                      className="btn btn-secondary btn-lg"
                      type="button"
                      onClick={handleBorrow}
                    >
                      <ArrowRight />
                      <span className="ms-2 align-middle">
                        <FormattedMessage id="actions.button.borrow" />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classNames('card mb-4', styles.card)}>
          <div className="card-body">
            <h5 className="card-title mb-4">
              <FormattedMessage id="pages.collateral.card.title" />
            </h5>

            <div className={classNames('card', styles.subcard)}>
              {collateral ? (
                <>
                  <div className="card-header bg-transparent d-flex align-items-start">
                    <div className="me-auto">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0">{collateral.id}</h5>
                        <span className="ms-2 badge badge-success">
                          <i className="badge-dot"></i>
                          <FormattedMessage id="states.collateral.1" />
                        </span>
                      </div>
                      <p className="mb-0">
                        <FormattedMessage
                          id="pages.collateral.node.period"
                          values={{ days: collateral.days }}
                        />
                      </p>
                    </div>
                    <button className="btn btn-light" type="button">
                      <FormattedMessage id="pages.collateral.actions.release" />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-2 g-3">
                      <div className="col">
                        <p className="mb-2 card-text-lg">
                          <FormattedMessage id="pages.collateral.node.total" />
                        </p>
                        <p className="mb-4 card-text-decimal">
                          <span>{F.formatAmount(collateral.balance)}</span>
                          <span className="ms-2 unit">FIL</span>
                        </p>

                        <p className="mb-2 card-text-lg">
                          <FormattedMessage id="pages.collateral.node.used" />
                        </p>
                        <p className="mb-0 card-text-decimal">
                          <span>{F.formatAmount(collateral.amount)}</span>
                          <span className="ms-2 unit">FIL</span>
                        </p>
                      </div>
                      <div className="col">
                        {change ? (
                          <ChangePane
                            onCancel={toggleChange}
                            onConfirm={handleAmount}
                          />
                        ) : (
                          <div className="h-100 d-flex">
                            <div className="d-flex align-items-center ms-auto mt-auto">
                              <span
                                className={classNames('badge badge-lg', {
                                  'badge-success': percent > 0,
                                })}
                              >
                                <FormattedMessage id="pages.collateral.node.locked" />{' '}
                                {F.formatRate(percent)}%
                              </span>
                              <button
                                className="ms-3 btn btn-light"
                                type="button"
                                onClick={toggleChange}
                              >
                                <FormattedMessage id="pages.collateral.actions.change" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="card-body">
                  <div className="d-flex align-items-start">
                    <div className="me-auto">
                      <h5 className="card-title">
                        <FormattedMessage id="pages.collateral.emoty.title" />
                      </h5>
                      <p className="card-text">
                        <a href="#" className="text-reset">
                          <span className="bi bi-exclamation-circle text-gray"></span>
                          <span className="ms-2">
                            <FormattedMessage id="pages.collateral.emoty.desc" />
                          </span>
                        </a>
                      </p>
                    </div>
                    <button
                      className="btn btn-primary float-right"
                      type="button"
                      onClick={() => modal.current?.show()}
                    >
                      <span className="me-1">
                        <FormattedMessage id="actions.button.collateral" />
                      </span>
                      <span className="bi bi-chevron-right"></span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        ref={modal}
        showCancel
        icon="help"
        title={formatMessage({ id: 'tips.collateral.node.title' })}
        confirmText={formatMessage({ id: 'tips.collateral.node.action' })}
        onConfirm={handleCollateral}
      >
        <ul className="mb-0">
          <li>
            <p>
              <FormattedMessage id="tips.collateral.node.tips.1" />
            </p>
          </li>
          <li>
            <p>
              <FormattedMessage id="tips.collateral.node.tips.2" />
            </p>
          </li>
          <li>
            <p className="mb-0">
              <FormattedMessage id="tips.collateral.node.tips.3" />
            </p>
          </li>
        </ul>
      </Modal>
    </>
  );
}
