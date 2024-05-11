const path = require('path');

const RWSWebpackWrapper  = require('@rws-framework/client/rws.webpack.config');

const executionDir = process.cwd();

module.exports = RWSWebpackWrapper({
  dev: true,
  hot: false,
  report: false,
  tsConfigPath: executionDir + '/tsconfig.json',
  entry: `${executionDir}/src/index.ts`,
  executionDir: executionDir,
  publicDir:  path.resolve(executionDir, 'public'),
  outputDir:  path.resolve(executionDir, 'build'),
  outputFileName: 'rws.client.js',
  parted: false,
  partedDirUrlPrefix: '/js',
  copyAssets: {
    './public/js/' : [   
      './build',   
      './src/styles/compiled/main.css'
    ]
  }
});