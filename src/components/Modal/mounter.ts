import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

export default class Mounter {
  private dom: HTMLDivElement;
  private root: Root;

  constructor() {
    this.dom = document.createElement('div');
    this.root = createRoot(this.dom);
  }

  mount(node: React.ReactElement) {
    document.body.append(this.dom);

    this.root.render(node);
  }

  unmount() {
    this.root.unmount();

    document.body.removeChild(this.dom);
  }
}
