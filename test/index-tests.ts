import { VNode } from "maquette";

import { enableGlobalJsx } from "../src";
import { expect } from "./test-utilities";

import Global = NodeJS.Global;

describe("maquette-jsx", () => {
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

  it("registers a jsx function on the global scope", () => {
    enableGlobalJsx();
    expect(window.jsx).to.be.a("function");
  });

  it("creates VNodes from jsx() calls", () => {
    enableGlobalJsx();
    let vnode = window.jsx("a", { href: "#" }, "Click me");
    let expected: VNode = {
      vnodeSelector: "a",
      children: undefined,
      domNode: null,
      properties: {
        href: "#",
      },
      text: "Click me",
    };
    expect(vnode).to.deep.equal(expected);
  });
});
