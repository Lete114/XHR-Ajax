import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: [
    { file: './dist/ajax.cjs.js', format: 'cjs', exports: 'default' },
    { file: './dist/ajax.esm.js', format: 'esm' },
    {
      name: 'ajax',
      format: 'iife',
      file: './dist/ajax.js'
    },
    {
      name: 'ajax',
      format: 'iife',
      sourcemap: true,
      file: './dist/ajax.min.js',
      plugins: [terser()]
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
  ]
}
