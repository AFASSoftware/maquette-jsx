import { VNode, VNodeProperties } from 'maquette';
import { JSXElement } from './jsx-types';

// Still missing: text, omission of properties?, non-flattened children?
export let enableJsx = () => {
  (window as any).jsx = (tagName: string, properties: VNodeProperties | undefined, ...children: (VNode | string)[]): JSXElement => {
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
      }),
      text: undefined,
      domNode: null
    };
  };
};
