# rollup-plugin-lessimporter

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://software.edu.gr"><img src="https://avatars2.githubusercontent.com/u/5780482?v=4" width="100px;" alt="Hi.Billgo"/><br /><sub><b>Hi.Billgo</b></sub></a><br /><a href="https://github.com/billgo/rollup-plugin-lessimporter/commits?author=billgo" title="Documentation">📖</a> <a href="https://github.com/billgo/rollup-plugin-lessimporter/commits?author=billgo" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

BSD-3-Clause © OVH SAS and Billgo
