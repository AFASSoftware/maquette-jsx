import { enableJsx } from '../src';
import Global = NodeJS.Global;
import { expect } from './test-utilities';

describe('maquette-jsx', () => {
  let globalScope: Global & { window?: any } = global;

  let window: any;

  beforeEach(() => {
    window = {};
    globalScope.window = window;
  });

  afterEach(() => {
    delete globalScope.window;
    delete (global as any).jsx;
  });

  it('creates VNodes from JSX code', () => {
    enableJsx();
    (global as any).jsx = window.jsx;

    let vnode = <a href="#">Click me</a>;

    expect(vnode).to.deep.equal({
      children: [
        {
          children: undefined,
          domNode: null,
          properties: undefined,
          text: 'Click me',
          vnodeSelector: '',
        }
      ],
      domNode: null,
      properties: {
        href: '#'
      },
      text: undefined,
      vnodeSelector: 'a'
    });
  });
});
