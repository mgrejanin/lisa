import { sass } from './sass';
import { CompilerSystem, Diagnostic, Plugin, PluginCtx, PluginTransformResults } from '@stencil/core/internal';
import * as fs from 'fs';

jest.mock('sass');
import * as sassPackage from 'sass';

jest.mock('../diagnostics/diagnostics');
import * as diagnostics from '../diagnostics/diagnostics';

describe('Sass function', () => {
    it('Should return plugin properly without any config', () => {
        const result = sass();

        expect(result.name).toBe('sass');
        expect(result.pluginType).toBe('css');
        expect(result.transform instanceof Function).toBe(true);
    });

    describe('Transform function', () => {
        let plugin: Plugin;
        let context: PluginCtx;

        beforeEach(() => {
            plugin = sass();

            context = {
                config: {
                    rootDir: '/Users/picpay-front-end/libs/packages/stencil-sass/src/lib/stencil-sass/mocks',
                    srcDir: '/Users/picpay-front-end/libs/packages/stencil-sass/src/lib/stencil-sass/mocks',
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
        });

        it('Should return null if the source text isnt string', () => {
            const result = plugin.transform(null, 'mock-file.scss', context);

            expect(result).toBeNull();
        });

        it('Should return null if the file isnt .sass ou .scss', () => {
            const result = plugin.transform('', 'mock-file.ts', context);

            expect(result).toBeNull();
        });

        it('Should return a promise with default id and code if the sourceText is empty', (done: jest.DoneCallback) => {
            const fileName = 'mock-file';
            const result = plugin.transform('', `${fileName}.scss`, context) as Promise<PluginTransformResults>;

            expect(result instanceof Promise).toBe(true);

            result.then(value => {
                expect(value.id).toBe(`${fileName}.css`);
                expect(value.code).toBe('');
                done();
            });
        });

        it('should return a promise  (render doesnt return error)', (done: jest.DoneCallback) => {
            const mockCssBufferValue = 'mockString';

            const renderSpy = jest.spyOn(sassPackage, 'render').mockImplementation((opts, callBack) => {
                const error = null;
                const sassResult: sassPackage.Result = { css: Buffer.from(mockCssBufferValue), stats: null };

                return callBack(error, sassResult);
            });

            const contextSpy = jest.spyOn(context.fs, 'writeFile');
            const loadDiagnosticSpy = jest.spyOn(diagnostics, 'loadDiagnostic');

            const fileName = 'mock-file';

            const resultPromise = plugin.transform(
                'mockSourceText',
                `${fileName}.scss`,
                context,
            ) as Promise<PluginTransformResults>;

            expect(resultPromise instanceof Promise).toBe(true);
            expect(renderSpy).toHaveBeenCalled();
            expect(loadDiagnosticSpy).not.toHaveBeenCalled();

            resultPromise.then(result => {
                expect(result.code).toBe(mockCssBufferValue);
                expect(result.id).toEqual(`${fileName}.css`);
                expect(contextSpy).toHaveBeenCalledWith(result.id, result.code, { inMemoryOnly: true });

                done();
            });
        });

        it('should return a promise  (render returns error / error has message)', (done: jest.DoneCallback) => {
            const mockError: sassPackage.SassException = {
                name: 'mockError',
                message: 'mockErrorMessage',
                formatted: 'mockError',
                line: 2,
                column: 1,
                status: 0,
                file: 'mock-file.scss',
            };

            const sassResult: sassPackage.Result = { css: null, stats: null };

            const renderSpy = jest.spyOn(sassPackage, 'render').mockImplementation((opts, callBack) => {
                return callBack(mockError, sassResult);
            });

            const loadDiagnosticSpy = jest.spyOn(diagnostics, 'loadDiagnostic');

            const fileName = 'mock-file';

            const resultPromise = plugin.transform(
                'mockSourceText',
                `${fileName}.scss`,
                context,
            ) as Promise<PluginTransformResults>;

            expect(resultPromise instanceof Promise).toBe(true);
            expect(renderSpy).toHaveBeenCalled();
            expect(loadDiagnosticSpy).toHaveBeenCalled();

            resultPromise.then(result => {
                expect(loadDiagnosticSpy).toHaveBeenCalledWith(context, mockError, `${fileName}.scss`);
                expect(result.code).toEqual(`/**  sass error: ${mockError.message}  **/`);
                expect(result.id).toEqual(`${fileName}.css`);

                done();
            });
        });

        it('should return a promise  (render returns error / error does not have message)', (done: jest.DoneCallback) => {
            const mockError: sassPackage.SassException = {
                name: 'mockError',
                message: null,
                formatted: 'mockError',
                line: 2,
                column: 1,
                status: 0,
                file: 'mock-file.scss',
            };

            const sassResult: sassPackage.Result = { css: null, stats: null };

            const renderSpy = jest.spyOn(sassPackage, 'render').mockImplementation((opts, callBack) => {
                return callBack(mockError, sassResult);
            });

            const loadDiagnosticSpy = jest.spyOn(diagnostics, 'loadDiagnostic');

            const fileName = 'mock-file';

            const resultPromise = plugin.transform(
                'mockSourceText',
                `${fileName}.scss`,
                context,
            ) as Promise<PluginTransformResults>;

            expect(resultPromise instanceof Promise).toBe(true);
            expect(renderSpy).toHaveBeenCalled();
            expect(loadDiagnosticSpy).toHaveBeenCalled();

            resultPromise.then(result => {
                expect(loadDiagnosticSpy).toHaveBeenCalledWith(context, mockError, `${fileName}.scss`);
                expect(result.code).toEqual(`/**  sass error  **/`);
                expect(result.id).toEqual(`${fileName}.css`);

                done();
            });
        });

        it('should return a promise  (error on the render / error has message)', (done: jest.DoneCallback) => {
            const mockError = { message: 'mockErrorMessage' };

            const expectedDiagnostic: Diagnostic = {
                level: 'error',
                type: 'css',
                language: 'scss',
                header: 'sass error',
                relFilePath: null,
                absFilePath: null,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                messageText: mockError as any,
                lines: [],
            };

            const renderSpy = jest.spyOn(sassPackage, 'render').mockImplementation(() => {
                throw mockError;
            });

            const fileName = 'mock-file';

            const resultPromise = plugin.transform(
                'mockSourceText',
                `${fileName}.scss`,
                context,
            ) as Promise<PluginTransformResults>;

            expect(renderSpy).toHaveBeenCalled();

            resultPromise.then(result => {
                expect(result.code).toBe(`/**  sass error: ${mockError.message}  **/`);
                expect(result.id).toEqual(`${fileName}.css`);
                expect(context.diagnostics.length).toBe(1);
                expect(context.diagnostics[0]).toEqual(expectedDiagnostic);

                done();
            });
        });

        it('should return a promise  (error on the render / error does not have message)', (done: jest.DoneCallback) => {
            const mockError = {};

            const expectedDiagnostic: Diagnostic = {
                level: 'error',
                type: 'css',
                language: 'scss',
                header: 'sass error',
                relFilePath: null,
                absFilePath: null,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                messageText: mockError as any,
                lines: [],
            };

            const renderSpy = jest.spyOn(sassPackage, 'render').mockImplementation(() => {
                throw mockError;
            });

            const fileName = 'mock-file';

            const resultPromise = plugin.transform(
                'mockSourceText',
                `${fileName}.scss`,
                context,
            ) as Promise<PluginTransformResults>;

            expect(renderSpy).toHaveBeenCalled();

            resultPromise.then(result => {
                expect(result.code).toBe(`/**  sass error  **/`);
                expect(result.id).toEqual(`${fileName}.css`);
                expect(context.diagnostics.length).toBe(1);
                expect(context.diagnostics[0]).toEqual(expectedDiagnostic);

                done();
            });
        });
    });
});
