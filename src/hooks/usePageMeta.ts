import { createElement, useRef } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { createRoot } from 'react-dom/client';

export type PageMetaProps = {
  bodyClasses?: string;
  bodyStyle?: React.CSSProperties;
  htmlClasses?: string;
  htmlStyle?: React.CSSProperties;
};

async function compileStyle(style: React.CSSProperties) {
  return new Promise<string>((resolve) => {
    const div = document.createElement('div');
    div.style.display = 'none';
    const root = createRoot(div);

    document.body.append(div);

    const onRef = (ref: HTMLDivElement | null) => {
      if (ref) {
        setTimeout(() => {
          root.unmount();
          div.remove();
        }, 0);

        resolve(ref.style.cssText);
      }
    };

    const vnode = createElement('div', { style, ref: onRef });
    root.render(vnode);
  });
}

export default function usePageMeta({ bodyClasses, bodyStyle }: PageMetaProps) {
  const cssText = useRef(document.body.style.cssText);

  const onMount = async () => {
    if (bodyClasses) {
      document.body.classList.add(bodyClasses);
    }

    if (bodyStyle) {
      const _cssText = await compileStyle(bodyStyle);
      document.body.style.cssText = `${cssText.current};${_cssText}`;
    }
  };

  const onUnmount = () => {
    if (bodyClasses) {
      document.body.classList.remove(bodyClasses);
    }

    document.body.style.cssText = cssText.current;
  };

  useMount(onMount);
  useUnmount(onUnmount);
}
