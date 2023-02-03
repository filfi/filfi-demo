import { Form, Input } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';

import styles from './styles.less';
import { formatAmount } from '@/utils/format';

export type EditPaneProps = {
  onCancel?: () => void;
  onConfirm?: (amount: string) => void;
};

type Values = {
  amount: string;
};

const EditPane: React.FC<EditPaneProps> = ({ onCancel, onConfirm }) => {
  const { formatMessage } = useIntl();
  const [wallet] = useModel('wallet');
  const [form] = Form.useForm<Values>();

  const handleAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const amount = formatAmount(wallet?.balance);
    form.setFieldValue('amount', amount.replace(/,/g, ''));
  };

  const handleSubmit = async (vals: Values) => {
    onConfirm?.(vals.amount);
  };

  return (
    <div className={classNames('card', styles.card)}>
      <div className="card-body">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: formatMessage({ id: 'pages.supply.form.placeholder.amount' }) }]}
          >
            <Input type="number" placeholder="0" addonAfter={
              <span className={styles.unit}>FIL</span>
            } />
          </Form.Item>

          <p className="d-flex align-items-center justify-content-between my-4 text-gray">
            <span><FormattedMessage id="pages.supply.form.label.max" /> {formatAmount(wallet?.balance)} FIL</span>
            <a className="ms-2 text-gray-dark fs-bold" href="#" onClick={handleAll}>
              <FormattedMessage id="actions.input.all" />
            </a>
          </p>

          <div className="d-flex gap-3">
            <button className="btn btn-light flex-fill" type="button" onClick={onCancel}>
              <FormattedMessage id="actions.button.cancel" />
            </button>
            <button className="btn btn-primary flex-fill" type="submit">
              <FormattedMessage id="pages.supply.form.actions.confirm" />
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPane;
