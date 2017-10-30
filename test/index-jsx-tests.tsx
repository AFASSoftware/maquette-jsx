import { enableJsx } from '../src';
import Global = NodeJS.Global;
import { expect } from './test-utilities';
import { dom } from 'maquette';
require('jsdom-global/register');

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

  it('creates fully functional VNodes from all valid types of JSX', () => {
    enableJsx();
    (global as any).jsx = window.jsx;
    let vnode = <div>
      <p>
        text
        more text
      </p>
      <br />
      <input class="hello world" />
      <div class="hello world"></div>
      <a href="#">Click me</a>
      <div classes={{special: true}} styles={{height: '100px'}}>
        goodbye <br /> <i>cruel</i>
        w<b>orl</b>d
      </div>
    </div>;

    let projection = dom.create(vnode);
    expect(projection.domNode.outerHTML).to.equal(`
    <div>
      <p>text more text</p>
      <br>
      <input class="hello world">
      <div class="hello world"></div>
      <a href="#">Click me</a>
      <div class="special" style="height: 100px;">
        goodbye <br> <i>cruel</i>
        w<b>orl</b>d
      </div>
    </div>
    `.replace(/\s*\n\s*/g, ''));
  });
});
