# maquette-jsx
Use this library to enable JSX in [maquette](https://maquettejs.org).

## Usage
- Install maquette-jsx by running `npm install maquette maquette-jsx`
- When using Typescript: Add the following lines to your `tsconfig.json`:
  - `"jsx": "react"`
  - `"jsxFactory": "jsx"`
- When using babel:  Add the following plugin:
  - `"plugins": [ ["transform-react-jsx", {"pragma": "jsx"}] ]`
- Call maquette-jsx's `enableGlobalJsx` function before calling maquette's `createProjector()`
- Now you can return JSX from your `render` functions

## Example
https://github.com/AFASSoftware/maquette-typescript-jsx-starter
