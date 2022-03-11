import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: {
    name: 'ajax',
    file: './dist/ajax.min.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    terser(),
    resolve(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
  ]
}
