/* tslint:disable no-shadowed-variable no-namespace */
import { VNode, VNodeChild, VNodeProperties } from 'maquette';

declare global {
  function jsx(tagName: string, properties: VNodeProperties | null, ...children: (VNode | string)[]): VNode;
}

export declare namespace jsx {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: VNodeProperties;
    }
    type Element = VNode;
  }
}

let toTextVNode = (data: any): VNode => {
  return {
    vnodeSelector: '',
    properties: undefined,
    children: undefined,
    text: data.toString(),
    domNode: null
  };
};

let appendChildren = (insertions: any[], main: VNode[]) => {
  for (let i = 0, length = insertions.length; i < length; i++) {
    let item = insertions[i];
    if (Array.isArray(item)) {
      appendChildren(item, main);
    } else {
      if (item !== null && item !== undefined && item !== false) {
        if (!item.hasOwnProperty('vnodeSelector')) {
          item = toTextVNode(item);
        }
        main.push(item);
      }
    }
  }
};

export let jsx = (tagName: string, properties: VNodeProperties | null, ...childNodes: VNodeChild[]): VNode => {
  if (childNodes.length === 1 && typeof childNodes[0] === 'string') {
    return {
      vnodeSelector: tagName,
      properties: properties || undefined,
      children: undefined,
      text: childNodes[0],
      domNode: null
    };
  }
  let children: VNode[] = [];
  appendChildren(childNodes, children);
  return {
    vnodeSelector: tagName,
    properties: properties || undefined,
    children: children,
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
