/* eslint-disable @typescript-eslint/no-var-requires */

const { addBabelPresets, override } = require('customize-cra');

module.exports = override(addBabelPresets('@emotion/babel-preset-css-prop'));