import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'
import pkg from '../package.json'

export default {
  input: 'index.js',
  output: {
    name: 'ajax',
    format: 'iife',
    sourcemap: true,
    file: './dist/ajax.js',
    plugins: [terser()]
  },

  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    serve({ port: pkg.port + 1, contentBase: ['dist', 'public', 'test'] }),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
  ]
}
