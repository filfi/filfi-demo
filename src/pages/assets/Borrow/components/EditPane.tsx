import { useMemo } from 'react';
import classNames from 'classnames';
import { Form, Input } from 'antd';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';

import styles from './editpane.less';
import { formatAmount } from '@/utils/format';
import BigNumber from 'bignumber.js';

export type EditPaneProps = {
  onCancel?: () => void;
  onConfirm?: (amount: string) => void;
};

type Values = {
  amount: string;
};

const EditPane: React.FC<EditPaneProps> = ({ onCancel, onConfirm }) => {
  const [borrow] = useModel('borrow');
  const [collateral] = useModel('collateral');

  const { formatMessage } = useIntl();
  const [form] = Form.useForm<Values>();

  const balance = useMemo(() => {
    if (borrow && collateral) {
      return Math.max(BigNumber(collateral.amount).minus(borrow.amount).toNumber(), 0);
    }

    return collateral?.amount ?? 0;
  }, [collateral, borrow]);

  const handleAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const amount = formatAmount(balance);
    form.setFieldValue('amount', amount.replace(/,/g, ''));
  };

  const handleSubmit = async (vals: Values) => {
    onConfirm?.(vals.amount);
  };

  return (
    <div className={classNames('card', styles.card)}>
      <div className="card-body">
        <h5 className="card-title">
          <FormattedMessage id="pages.borrow.form.label.amount" />
        </h5>

        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: formatMessage({ id: 'pages.borrow.form.label.amount' }) }]}
          >
            <Input type="number" placeholder="0" addonAfter={
              <span className={styles.unit}>FIL</span>
            } />
          </Form.Item>

          <p className="d-flex align-items-center justify-content-between my-4 text-gray">
            <span><FormattedMessage id="pages.borrow.form.label.balance" /> {formatAmount(balance)} FIL</span>
            <a className="ms-2 text-gray-dark fs-bold" href="#" onClick={handleAll}>
              <FormattedMessage id="actions.input.all" />
            </a>
          </p>

          <div className="d-flex gap-3">
            <button className="btn btn-light flex-fill" type="button" onClick={onCancel}>
              <FormattedMessage id="actions.button.cancel" />
            </button>
            <button className="btn btn-primary flex-fill" type="submit">
              <FormattedMessage id="actions.button.confirm" />
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPane;
