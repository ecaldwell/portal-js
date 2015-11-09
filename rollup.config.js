import babel from 'rollup-plugin-babel';
import npm from 'rollup-plugin-npm';

export default {
  entry: 'src/index.js',
  dest: 'build/portal.js',
  plugins: [
    babel(),
    npm({
      jsnext: true,
      main: true
    })
  ],
  format: 'amd'
};
