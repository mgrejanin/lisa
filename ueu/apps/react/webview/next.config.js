/* eslint-disable @typescript-eslint/no-var-requires */

// const path = require('path');
// const { sassFunctions } = require('@picpay/sass-functions');
// const withSass = require('@zeit/next-sass');
// const withCSS = require('@zeit/next-css');

const withNx = require('@nrwl/next/plugins/with-nx');

module.exports = withNx();
// withCSS(
//     withSass({
//         webpack(config) {
//             config.module.rules.push(
//                 {
//                     test: /\.s[ac]ss$/i,
//                     use: [
//                         {
//                             loader: 'sass-loader',
//                             options: {
//                                 implementation: require('sass'),
//                                 sassOptions: {
//                                     includePaths: [
//                                         path.resolve(__dirname, '../../../node_modules'),
//                                         path.resolve(
//                                             __dirname,
//                                             '../../../libs/stencil/design-system/helpers/src/lib/styles',
//                                         ),
//                                         path.resolve(__dirname, '../../../libs/ui/styles/src/lib'),
//                                     ],
//                                     functions: {
//                                         'theme($value)': sassFunctions.theme,
//                                     },
//                                 },
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     test: /\.(jpe?g|png|gif|svg)$/i,
//                     loader: 'file-loader',
//                 },
//             );

//             return config;
//         },
//     }),
// ),
