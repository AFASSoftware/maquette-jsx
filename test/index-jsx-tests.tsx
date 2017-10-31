import { enableGlobalJsx } from '../src';
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
    enableGlobalJsx();
    (global as any).jsx = window.jsx;

    let vnode = <a href="#">Click me</a>;

    expect(vnode).to.deep.equal({
      children: undefined,
      domNode: null,
      properties: {
        href: '#'
      },
      text: 'Click me',
      vnodeSelector: 'a'
    });
  });

  it('creates fully functional VNodes from all valid types of JSX', () => {
    enableGlobalJsx();
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

  it('mimics Reacts && behavior', () => {
    enableGlobalJsx();
    (global as any).jsx = window.jsx;
    let unreadMessages = [];
    let vnode = <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
      <h2>
        You have {unreadMessages.length} unread messages.
      </h2>
      }
    </div>;
    expect(vnode.children).to.have.length(1);
  });

  it('mimics Reacts ? behavior', () => {
    enableGlobalJsx();
    (global as any).jsx = window.jsx;
    let loading = false;
    let title = 'title1';
    let vnode = <div>
      {
        loading
        ? <span>Loading...</span>
        : [
          (title
              ? <div key='0'>{ title }</div>
              : null
          ),
          <div key='1'>body</div>
        ]
      }
    </div>;
    expect(vnode.children).to.have.length(2);
  });

  it('creates a minimal number of nodes', () => {
    enableGlobalJsx();
    (global as any).jsx = window.jsx;
    let vnode = <p>Text</p>;
    expect(vnode.children).to.be.undefined;
    expect(vnode.text).to.equal('Text');
  });

});
