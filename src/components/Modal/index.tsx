import classNames from 'classnames';
import { useIntl } from '@umijs/max';
import { Modal as BSModal } from 'bootstrap';
import { useEventListener, useMount } from 'ahooks';
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import * as U from './utils';
import styles from './styles.less';
import { ReactComponent as IconHelp } from './imgs/help.svg';
import { ReactComponent as IconInfo } from './imgs/info.svg';
import { ReactComponent as IconLock } from './imgs/lock.svg';
import { ReactComponent as IconWarn } from './imgs/warn.svg';
import { mountPortal, unmountPortal } from '@/helpers/app';

export type ModalProps = {
  icon?: 'help' | 'info' | 'lock' | 'warn' | React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  fade?: boolean;
  centered?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  bodyClassName?: classNames.Argument;
  dialogClassName?: classNames.Argument;
  onHide?: () => void;
  onShow?: () => void;
  onShown?: () => void;
  onHidden?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
};
export type ModalAction = 'cancel' | 'confirm';
export type AlertProps = Omit<
  ModalProps,
  'cancelText' | 'showCancel' | 'showConfirm' | 'onCancel'
>;
export type ConfirmProps = Omit<ModalProps, 'showCancel' | 'showConfirm'>;
export type AlertOptions = Omit<AlertProps, 'children'> & {
  content?: React.ReactNode;
};
export type ConfirmOptions = Omit<ConfirmProps, 'children'> & {
  content?: React.ReactNode;
};
export type ModalStatic = React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<ModalAttrs>
> & {
  Alert: React.ForwardRefExoticComponent<
    AlertProps & React.RefAttributes<ModalAttrs>
  >;
  Confirm: React.ForwardRefExoticComponent<
    ConfirmProps & React.RefAttributes<ModalAttrs>
  >;
  alert: (msgOrOpts: string | AlertOptions) => ModalAttrs['hide'];
  confirm: (msgOrOpts: string | ConfirmOptions) => ModalAttrs['hide'];
};

function getModal(el: HTMLElement | React.RefObject<HTMLElement>) {
  const _el =
    (el as React.RefObject<HTMLElement>).current ?? (el as HTMLElement);
  if (_el) {
    let modal = BSModal.getInstance(_el);

    if (!modal) {
      modal = new BSModal(_el);
    }

    return modal;
  }
}

const ModalRender: React.ForwardRefRenderFunction<ModalAttrs, ModalProps> = (
  {
    size,
    title,
    children,
    bodyClassName,
    dialogClassName,
    cancelText,
    confirmText,
    showCancel,
    fade = true,
    icon = 'info',
    centered = true,
    showConfirm = true,
    onHide,
    onShow,
    onShown,
    onHidden,
    onCancel,
    onConfirm,
  },
  ref?: React.Ref<ModalAttrs> | null,
) => {
  const el = useRef<HTMLDivElement>(null);

  const { formatMessage } = useIntl();

  const [action, setAction] = useState<ModalAction>();

  const handleHide = () => getModal(el)?.hide();
  const handleShow = () => getModal(el)?.show();
  const handleToggle = () => getModal(el)?.toggle();
  const handleCancel = useCallback(() => {
    handleHide();

    setAction('cancel');
  }, []);
  const handleConfirm = useCallback(() => {
    handleHide();

    setAction('confirm');
  }, []);
  const handleHidden = useCallback(() => {
    if (action === 'cancel') {
      onCancel?.();
    } else if (action === 'confirm') {
      onConfirm?.();
    }

    onHidden?.();
  }, [action, onCancel, onConfirm, onHidden]);

  const _onHide = useCallback(() => onHide?.(), [onHide]);
  const _onHidden = useCallback(() => handleHidden?.(), [handleHidden]);
  const _onShow = useCallback(() => onShow?.(), [onShow]);
  const _onShown = useCallback(
    () => (setAction(undefined), onShown?.()),
    [onShown],
  );

  useImperativeHandle(
    ref,
    () => ({
      hide: handleHide,
      show: handleShow,
      toggle: handleToggle,
    }),
    [],
  );

  useEventListener('hide.bs.modal', _onHide, { target: el });
  useEventListener('hidden.bs.modal', _onHidden, { target: el });
  useEventListener('show.bs.modal', _onShow, { target: el });
  useEventListener('shown.bs.modal', _onShown, { target: el });

  const renderIcon = () => {
    switch (icon) {
      case 'help':
        return <IconHelp />;
      case 'info':
        return <IconInfo />;
      case 'lock':
        return <IconLock />;
      case 'warn':
        return <IconWarn />;
      default:
        return icon ?? <IconInfo />;
    }
  };

  const renderBtns = () => {
    const btns: React.ReactNode[] = [];

    if (showConfirm) {
      btns.push(
        <button
          key="confirm"
          className="btn btn-lg btn-primary"
          type="button"
          onClick={handleConfirm}
        >
          {confirmText ?? formatMessage({ id: 'actions.button.confirm' })}
        </button>,
      );
    }

    if (showCancel) {
      btns.push(
        <button
          key="cancel"
          className="btn btn-lg btn-light"
          type="button"
          onClick={handleCancel}
        >
          {cancelText ?? formatMessage({ id: 'actions.button.cancel' })}
        </button>,
      );
    }

    return btns;
  };

  return (
    <div
      ref={el}
      className={classNames('modal', styles.modal, { fade })}
      aria-hidden="true"
      aria-labelledby="modal"
      tabIndex={-1}
    >
      <div
        className={classNames(
          'modal-dialog',
          {
            'modal-sm': size === 'sm',
            'modal-lg': size === 'lg',
            'modal-xl': size === 'xl',
            'modal-dialog-centered': centered,
          },
          dialogClassName,
        )}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon">{renderIcon()}</div>

            {U.isDef(title) &&
              (U.isStr(title) ? (
                <h1 className="modal-title text-center">{title}</h1>
              ) : (
                title
              ))}
          </div>
          <div className={classNames('modal-body', bodyClassName)}>
            {children}
          </div>
          <div className="modal-footer">{renderBtns()}</div>
        </div>
      </div>
    </div>
  );
};

const Modal = React.forwardRef(ModalRender) as ModalStatic;
const AlertRender: React.ForwardRefRenderFunction<ModalAttrs, AlertProps> = (
  props,
  ref?: React.Ref<ModalAttrs> | null,
) => {
  const modal = useRef<ModalAttrs>(null);

  useImperativeHandle(
    ref,
    () => ({
      hide: () => modal.current?.hide(),
      show: () => modal.current?.show(),
      toggle: () => modal.current?.toggle(),
    }),
    [],
  );

  useMount(() => {
    modal.current?.show();
  });

  return <Modal ref={modal} {...props} />;
};
const ConfirmRender: React.ForwardRefRenderFunction<
  ModalAttrs,
  ConfirmProps
> = (props, ref?: React.Ref<ModalAttrs> | null) => {
  const modal = useRef<ModalAttrs>(null);

  useImperativeHandle(
    ref,
    () => ({
      hide: () => modal.current?.hide(),
      show: () => modal.current?.show(),
      toggle: () => modal.current?.toggle(),
    }),
    [],
  );

  useMount(() => {
    modal.current?.show();
  });

  return <Modal ref={modal} {...props} showCancel />;
};
const Alert = React.forwardRef(AlertRender);
const Confirm = React.forwardRef(ConfirmRender);

const alert: ModalStatic['alert'] = (msgOrOpts) => {
  let modal: ModalAttrs | null = null;

  const { content, ...opts } = U.isStr(msgOrOpts)
    ? { content: msgOrOpts }
    : msgOrOpts;
  const props: AlertProps = {
    bodyClassName: 'text-center',
    ...opts,
    children: content,
  };

  const onRef = (ref: ModalAttrs | null) => {
    modal = ref;

    modal?.show();
  };

  const onHidden = () => {
    props.onHidden?.();

    unmountPortal.current?.();
  };

  const node = React.createElement(Alert, { ...props, onHidden, ref: onRef });

  mountPortal.current?.(node);

  return () => modal?.hide();
};
const confirm: ModalStatic['confirm'] = (msgOrOpts) => {
  let modal: ModalAttrs | null = null;

  const { content, ...opts } = U.isStr(msgOrOpts)
    ? { content: msgOrOpts }
    : msgOrOpts;
  const props: ConfirmProps = {
    bodyClassName: 'text-center',
    ...opts,
    children: content,
  };

  const onRef = (ref: ModalAttrs | null) => {
    modal = ref;

    modal?.show();
  };

  const onHidden = () => {
    props.onHidden?.();

    unmountPortal.current?.();
  };

  const node = React.createElement(Confirm, { ...props, onHidden, ref: onRef });

  mountPortal.current?.(node);

  return () => modal?.hide();
};

Modal.Alert = Alert;
Modal.Confirm = Confirm;

Modal.alert = alert;
Modal.confirm = confirm;

export default Modal;
