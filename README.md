# rollup-plugin-lessimporter

A rollup plugin providing ~ prefix as a way to tell less compiler that it should resolve path using a configured array of module directories.

## How to install

```
yarn add -D rollup-plugin-lessimporter
```

## How to use

```js
import less from 'rollup-plugin-less';
import lessimporter from 'rollup-plugin-lessimporter';
import path from 'path';

export default {
  input: './src/index.js',
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    lessimporter({
      paths: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, '../../node_modules')],
    }),
    less(),
  ],
};
```

## License

BSD-3-Clause © OVH SAS
