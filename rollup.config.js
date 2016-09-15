import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

export default {
    entry: "src/portal.js",
    exports: "named",
    moduleName: "portal",
    format: "umd",
    plugins: [
        nodeResolve(),
        json(),
        babel(),
        uglify()
    ],
    dest: "build/portal.min.js",
    sourceMap: "build/portal.min.js.map"
};
