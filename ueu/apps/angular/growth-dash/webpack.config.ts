import * as path from 'path';

import { sassFunctions } from '../../../libs/packages/sass-functions/src';

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, '../../../node_modules'),
                                    path.resolve(__dirname, './../../../libs/stencil/design-system/src/styles'),
                                    path.resolve(__dirname, '../../../libs/ui/styles/src/lib'),
                                ],
                                functions: {
                                    'theme($value)': sassFunctions.theme,
                                    'parseColor($value)': sassFunctions.parseColor,
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
};
