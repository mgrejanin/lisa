import { CompilerSystem, PluginCtx } from '@stencil/core/internal';
import { PluginOptions } from '../../../declarations';
import { getRenderOptions } from './get-render-options';

import * as fs from 'fs';

describe('getRender function', () => {
    let context: PluginCtx;
    let opts: PluginOptions;
    let sourceText: string;
    let fileName: string;

    beforeEach(() => {
        context = {
            config: {
                rootDir: '/Users/picpay-front-end/',
                srcDir: '/Users/picpay-front-end/',
            },
            cache: null,
            sys: {} as CompilerSystem,
            fs: {
                readFileSync(filePath: string) {
                    return fs.readFileSync(filePath, 'utf8');
                },
                writeFile() {
                    return Promise.resolve();
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
            diagnostics: [],
        };

        opts = { data: 'startingValue', includePaths: [] };

        sourceText = 'mockSourceText';

        fileName = 'mockFileName';
    });

    it('Should add sourceText as data and context.config.rootDir in the included paths', () => {
        const expectedResult = {
            ...opts,
            data: sourceText,
            includePaths: ['/Users/picpay-front-end'],
        };

        const result = getRenderOptions(opts, sourceText, fileName, context);

        expect(result).toEqual(expectedResult);
    });

    it('Should add root to included paths and concat root into existing ones (if relative) )', () => {
        opts.includePaths = ['my/path/', '/Users/picpay-front-end/my/path2'];

        const expectedResult = {
            ...opts,
            data: sourceText,
            includePaths: [
                '/Users/picpay-front-end/my/path',
                '/Users/picpay-front-end/my/path2',
                '/Users/picpay-front-end',
            ],
        };

        const result = getRenderOptions(opts, sourceText, fileName, context);

        expect(result).toEqual(expectedResult);
    });

    it('should concat injectGlobalPaths options in the renderOpts.data', () => {
        const globalPaths = ['mock/path', 'mock/path2'];

        const injectGlobalPathData = globalPaths.map(path => `@import '${context.config.rootDir}${path}'`).join(';');

        const expectedResult = {
            ...opts,
            data: `${injectGlobalPathData};${sourceText}`,
            includePaths: ['/Users/picpay-front-end'],
        };

        opts.injectGlobalPaths = globalPaths;

        const result = getRenderOptions(opts, sourceText, fileName, context);

        expect(result).toEqual(expectedResult);
    });

    it('should remove file options', () => {
        const expectedResult = {
            ...opts,
            data: sourceText,
            includePaths: ['/Users/picpay-front-end'],
        };

        opts.file = null;

        const result = getRenderOptions(opts, sourceText, fileName, context);

        expect(result).toEqual(expectedResult);
    });

    it('should remove injectGlobalPaths options', () => {
        const expectedResult = {
            ...opts,
            data: sourceText,
            includePaths: ['/Users/picpay-front-end'],
        };

        opts.injectGlobalPaths = [];

        const result = getRenderOptions(opts, sourceText, fileName, context);

        expect(result).toEqual(expectedResult);
    });
});
