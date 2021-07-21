// interfaces
import { CompilerSystem, Diagnostic, PluginCtx } from '@stencil/core/internal';

import * as fs from 'fs';
import { SassException } from 'sass';

import { loadDiagnostic } from './diagnostics';

describe('loadDiagnostic function', () => {
    let context: PluginCtx;
    let sassException: SassException;
    let filePath: string;

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

        sassException = {
            name: 'mockError',
            message: 'error',
            formatted: 'mockError',
            line: 2,
            column: 1,
            status: 0,
            file: 'mockFile',
        };

        filePath = 'libs/packages/stencil-sass/src/lib/stencil-sass/mocks/mock-file.scss';
    });

    /** Error cases */
    it('should return "null" in case of "null" context', () => {
        const result = loadDiagnostic(null, sassException, filePath);

        expect(result).toBeNull();
    });

    it('should return "null" in case of "null" exception', () => {
        const result = loadDiagnostic(context, null, filePath);

        expect(result).toBeNull();
    });

    it('should return "null" in case of "null" context and "null" exception', () => {
        const result = loadDiagnostic(null, null, filePath);

        expect(result).toBeNull();
    });

    it('should call console error when trying to open an invalid file and return a diagnostic', () => {
        const mockInvalidPath = 'invalid/path/to/file.scss';

        const consoleErrorSpy = spyOn(console, 'error');

        const expectedLog =
            "StyleSassPlugin loadDiagnostic, Error: ENOENT: no such file or directory, open 'invalid/path/to/file.scss'";

        const expectedDiagnostic = {
            level: 'error',
            type: 'css',
            language: 'scss',
            header: 'sass error',
            code: '0',
            relFilePath: mockInvalidPath,
            absFilePath: mockInvalidPath,
            messageText: 'error',
            lines: [],
            lineNumber: sassException.line,
            columnNumber: sassException.column,
        };

        const result = loadDiagnostic(context, sassException, mockInvalidPath);

        expect(result).toEqual(expectedDiagnostic);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expectedLog);
        expect(context.diagnostics).toEqual([expectedDiagnostic]);
    });

    /** Success cases */
    it('should return the correct diagnostic and push it to the context.diagnostics (with previous and next line)', () => {
        const expectedRelFilePath = `${filePath.length > 80 ? '...' : ''}${filePath
            .replace(context.config.rootDir, '')
            .substr(filePath.length > 80 ? filePath.length - 80 : 0)}`;

        const expectedErrorLine = {
            lineIndex: 1,
            lineNumber: sassException.line,
            text: "@use 'mock2';",
            errorLength: 3,
            errorCharStart: sassException.column,
        };

        const expectedPreviousLine = {
            lineIndex: expectedErrorLine.lineIndex - 1,
            lineNumber: expectedErrorLine.lineNumber - 1,
            text: "@use 'mock1';",
            errorLength: -1,
            errorCharStart: -1,
        };

        const expectedNextLine = {
            lineIndex: expectedErrorLine.lineIndex + 1,
            lineNumber: expectedErrorLine.lineNumber + 1,
            text: "@use 'mock3';",
            errorLength: -1,
            errorCharStart: -1,
        };

        const expectedDiagnostic: Diagnostic = {
            level: 'error',
            type: 'css',
            language: 'scss',
            header: 'sass error',
            code: sassException.status.toString(),
            relFilePath: expectedRelFilePath,
            absFilePath: filePath,
            messageText: sassException.message.split('╷')[0],
            lineNumber: sassException.line,
            columnNumber: sassException.column,
            lines: [expectedPreviousLine, expectedErrorLine, expectedNextLine],
        };

        const result = loadDiagnostic(context, sassException, filePath);

        expect(result).toEqual(expectedDiagnostic);
        expect(context.diagnostics).toEqual([expectedDiagnostic]);
    });

    it('should return the correct diagnostic and push it to the context.diagnostics (with previous line only)', () => {
        sassException.line = 4;

        const expectedRelFilePath = `${filePath.length > 80 ? '...' : ''}${filePath
            .replace(context.config.rootDir, '')
            .substr(filePath.length > 80 ? filePath.length - 80 : 0)}`;

        const expectedErrorLine = {
            lineIndex: sassException.line - 1,
            lineNumber: sassException.line,
            text: '',
            errorLength: 1,
            errorCharStart: 0,
        };

        const expectedPreviousLine = {
            lineIndex: expectedErrorLine.lineIndex - 1,
            lineNumber: expectedErrorLine.lineNumber - 1,
            text: "@use 'mock3';",
            errorLength: -1,
            errorCharStart: -1,
        };

        const expectedDiagnostic: Diagnostic = {
            level: 'error',
            type: 'css',
            language: 'scss',
            header: 'sass error',
            code: sassException.status.toString(),
            relFilePath: expectedRelFilePath,
            absFilePath: filePath,
            messageText: sassException.message.split('╷')[0],
            lineNumber: sassException.line,
            columnNumber: sassException.column,
            lines: [expectedPreviousLine, expectedErrorLine],
        };

        const result = loadDiagnostic(context, sassException, filePath);

        expect(result).toEqual(expectedDiagnostic);
        expect(context.diagnostics).toEqual([expectedDiagnostic]);
    });

    it('should return the correct diagnostic and push it to the context.diagnostics (with next line only)', () => {
        sassException.line = 1;

        const expectedRelFilePath = `${filePath.length > 80 ? '...' : ''}${filePath
            .replace(context.config.rootDir, '')
            .substr(filePath.length > 80 ? filePath.length - 80 : 0)}`;

        const expectedErrorLine = {
            lineIndex: sassException.line - 1,
            lineNumber: sassException.line,
            text: "@use 'mock1';",
            errorLength: 3,
            errorCharStart: sassException.column,
        };

        const expectedNextLine = {
            lineIndex: expectedErrorLine.lineIndex + 1,
            lineNumber: expectedErrorLine.lineNumber + 1,
            text: "@use 'mock2';",
            errorLength: -1,
            errorCharStart: -1,
        };

        const expectedDiagnostic: Diagnostic = {
            level: 'error',
            type: 'css',
            language: 'scss',
            header: 'sass error',
            code: sassException.status.toString(),
            relFilePath: expectedRelFilePath,
            absFilePath: filePath,
            messageText: sassException.message.split('╷')[0],
            lineNumber: sassException.line,
            columnNumber: sassException.column,
            lines: [expectedErrorLine, expectedNextLine],
        };

        const result = loadDiagnostic(context, sassException, filePath);

        expect(result).toEqual(expectedDiagnostic);
        expect(context.diagnostics).toEqual([expectedDiagnostic]);
    });
});
