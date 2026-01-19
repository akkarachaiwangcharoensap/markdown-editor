import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        postcss({
            extract: true,
            minimize: true,
            modules: false,
            inject: false,
            extensions: ['.css']
        }),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist'
        })
    ],
    external: [
        'react', 
        'react-dom', 
        'react/jsx-runtime',
        'katex/dist/katex.min.css'
    ]
};