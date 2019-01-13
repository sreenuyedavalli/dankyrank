'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'json',
  'web.jsx',
  'jsx',
];

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('static/bundles'),
  appPublic: resolveApp('static'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('app'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
