import pkg from './package.json';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser'; // minify es6
import commonjs from 'rollup-plugin-commonjs';

export default [
    { // yan.min.js
        input:"./src/index.ts",
        output: {
            file: pkg.main,
            format: 'umd',
            name: 'yan',
        },
        plugins: [
            json(),
            commonjs(),
            babel({
                "exclude": 'node_modules/**',
                "presets": [
                    ["@babel/preset-env", {
                        "es2015": {
                            "modules": false
                        }
                    }]
                ],
                "plugins": ["@babel/plugin-external-helpers"]
            }),
            typescript({
                tsconfigDefaults: {
                    "compilerOptions": {
                        "target": "es2015",
                        "module": "es2015",
                    }
                }
            }),
            nodeResolve(),
            terser(),
        ]
    },
    { // yan.es.js
        input: "./src/index.ts",
        output: {
            file: pkg.module,
            format: 'es',
        },
        plugins: [
            json(),
            commonjs(),
            nodeResolve(),
            typescript({
                tsconfigDefaults: {
                    "compilerOptions": {
                        "target": "es2015",
                        "module": "es2015",
                    }
                }
            })
        ]
    }
]