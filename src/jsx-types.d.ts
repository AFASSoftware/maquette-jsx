import { VNode, VNodeProperties } from 'maquette';

export type JSXElement = VNode;

declare global {
  function jsx(): VNode;
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: VNodeProperties;
    }

    type Element = JSXElement;
  }
}
