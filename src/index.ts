/* tslint:disable no-shadowed-variable */
import { VNode, VNodeProperties } from 'maquette';

declare global {
  function jsx(tagName: string, properties: VNodeProperties | null, ...children: (VNode | string)[]): VNode;
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: VNodeProperties;
    }
    type Element = VNode;
  }
}

export let jsx = (tagName: string, properties: VNodeProperties | null, ...children: (VNode | string)[]): VNode => {
  return {
    vnodeSelector: tagName,
    properties: properties || undefined,
    children: children.map(child => {
      if (typeof child === 'string') {
        return {
          vnodeSelector: '',
          properties: undefined,
          children: undefined,
          text: child,
          domNode: null
        };
      }
      return child;
    }).filter(child => !!child),
    text: undefined,
    domNode: null
  };
};

/**
 * Call this function before executing any JSX formatted code. This function makes the window.jsx function available.
 */
export let enableGlobalJsx = () => {
  (window as any).jsx = jsx;
};
