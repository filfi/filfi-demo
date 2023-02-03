import classNames from 'classnames';
import { Form, Input } from 'antd';
import { useBoolean } from 'ahooks';
import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';

import styles from './changepane.less';
import { formatAmount, formatRate } from '@/utils/format';
import { ReactComponent as IconSwitch } from '@/assets/icons/switch.svg';

export type ChangePaneProps = {
  onCancel?: () => void;
  onConfirm?: (amount: string) => void;
};

type Values = {
  amount: string;
};

const ChangePane: React.FC<ChangePaneProps> = ({ onCancel, onConfirm }) => {
  const [borrow] = useModel('borrow');
  const [collateral] = useModel('collateral');
  const [isRate, { toggle }] = useBoolean(true);

  const { formatMessage } = useIntl();
  const [form] = Form.useForm<Values>();
  const value = Form.useWatch('amount', form);

  const limit = useMemo(() => {
    if (borrow) {
      return borrow.amount;
    }

    return 0.01;
  }, [borrow?.amount]);
  const amount = useMemo(() => {
    if (collateral && collateral.balance > 0 && isRate) {
      const v = +value;

      if (!Number.isNaN(v)) {
        return v / 100 * collateral.balance;
      }
    }

    return 0;
  }, [collateral?.balance, isRate, value]);
  const percent = useMemo(() => {
    if (collateral && collateral.balance > 0 && !isRate) {
      const v = +value;

      if (!Number.isNaN(v)) {
        return Math.min(v / collateral.balance, 1);
      }
    }

    return 0;
  }, [collateral?.balance, isRate, value]);

  const handleToggle = () => {
    toggle();

    form.resetFields();
  };

  const handleMax = useCallback(() => {
    let max = 0;

    if (collateral && collateral.balance > 0) {
      if (isRate) {
        max = 100;
      } else {
        max = collateral.balance;
      }
    }

    form.setFieldValue('amount', max);
  }, [collateral?.balance, isRate]);

  const handleMin = useCallback(() => {
    let min = 0;

    if (collateral && collateral.balance > 0) {
      const minAmount = Math.min(limit, collateral && collateral.balance);
      if (isRate) {
        min = formatRate(minAmount / collateral.balance);
      } else {
        min = minAmount;
      }
    }

    form.setFieldValue('amount', min);
  }, [collateral?.balance, isRate]);

  const handleSubmit = useCallback(async (vals: Values) => {
    onConfirm?.(isRate ? `${amount}` : vals.amount);
  }, [amount, isRate]);

  return (
    <div className={classNames('card', styles.card)}>
      <div className="card-body">
        <h4 className="card-title">
          {isRate ? (
            <FormattedMessage id="pages.collateral.form.label.rate" />
          ) : (
            <FormattedMessage id="pages.collateral.form.label.amount" />
          )}
        </h4>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: formatMessage({ id: isRate ? 'pages.collateral.form.label.rate' : 'pages.collateral.form.label.amount' }),
              },
            ]}
          >
            <Input
              type="number"
              placeholder={isRate ? '0 %' : '0 FIL'}
              addonAfter={
                <>
                  <button className="btn btn-min" type="button" onClick={handleMin}>
                    <FormattedMessage id="actions.button.min" />
                  </button>
                  <button className="btn btn-min" type="button" onClick={handleMax}>
                    <FormattedMessage id="actions.button.max" />
                  </button>
                </>
              }
            />
          </Form.Item>

          <p className="d-flex align-items-center my-3 text-gray">
            <button className="btn btn-switch me-2" type="button" onClick={handleToggle}>
              <IconSwitch />
            </button>

            {isRate ? (
              <span><FormattedMessage id="pages.collateral.form.label.locked" /> {formatAmount(amount)} FIL</span>
            ) : (
              <span><FormattedMessage id="pages.collateral.form.label.locked" /> {formatRate(percent)} %</span>
            )}
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

export default ChangePane;
