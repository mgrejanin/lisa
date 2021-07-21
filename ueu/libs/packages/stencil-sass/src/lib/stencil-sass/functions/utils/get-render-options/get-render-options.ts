/* eslint-disable no-control-regex */
import * as path from 'path';
import { PluginOptions } from '../../../declarations';
import { PluginCtx } from '@stencil/core/internal';
import { normalizePath } from '..';

export function getRenderOptions(
    opts: PluginOptions,
    sourceText: string,
    fileName: string,
    context: PluginCtx,
): PluginOptions {
    // create a copy of the original sass config so we don't change it
    const renderOpts = Object.assign({}, opts);

    // always set "data" from the source text
    renderOpts.data = sourceText;

    renderOpts.includePaths = Array.isArray(opts.includePaths) ? opts.includePaths.slice() : [];

    // add the directory of the source file to includePaths
    renderOpts.includePaths.push(path.dirname(fileName));

    renderOpts.includePaths = renderOpts.includePaths.map(includePath => {
        if (path.isAbsolute(includePath)) {
            return includePath;
        }

        // if it's a relative path then resolve it with the project's root directory
        return path.resolve(context.config.rootDir, includePath);
    });

    const injectGlobalPaths = Array.isArray(opts.injectGlobalPaths) ? opts.injectGlobalPaths.slice() : [];

    if (injectGlobalPaths.length > 0) {
        // automatically inject each of these paths into the source text
        const injectText = injectGlobalPaths
            .map(injectGlobalPath => {
                if (!path.isAbsolute(injectGlobalPath)) {
                    // convert any relative paths to absolute paths relative to the project root
                    injectGlobalPath = normalizePath(path.join(context.config.rootDir, injectGlobalPath));
                }

                const importTerminator = renderOpts.indentedSyntax ? '\n' : ';';

                return `@import '${injectGlobalPath}'${importTerminator}`;
            })
            .join('');

        renderOpts.data = injectText + renderOpts.data;
    }

    // remove non-standard sass option
    delete renderOpts.injectGlobalPaths;

    // the "file" config option is not valid here
    delete renderOpts.file;

    return renderOpts;
}
