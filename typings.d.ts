declare module '.png';
declare module 'bootstrap';
declare module 'react-render-html';

declare const web3: {
  currentProvider: Record<string, any>;
} | undefined;

declare type ModalAttrs = {
  hide: () => void;
  show: () => void;
  toggle: () => void;
}
