import { ChildProcess, spawn } from 'child_process';

export interface PicpayWebPackHookOptions {
    onBuildStart?: string;
    onBuildEnd?: string;
}

export class PicpayWebPackHooks {
    private options: PicpayWebPackHookOptions;

    constructor(options: PicpayWebPackHookOptions) {
        this.options = options;
    }

    private puts(error: string): void {
        if (error) {
            throw error;
        }
    }

    private serializeScript(script: string): { command: string; args: string[] } {
        const [command, ...args] = script.split(' ');
        return { command, args };
    }

    private handleScript(script: string): ChildProcess {
        const { command, args } = this.serializeScript(script);
        const proc = spawn(command, args, { stdio: 'inherit' });
        proc.on('close', this.puts);
        return proc;
    }

    protected apply(compiler): void {
        if (this.options.onBuildStart) {
            compiler.hooks.beforeRun.tapAsync('PipcayWebpackBeforeRun', (compilation, callback: () => void) => {
                console.log('Executing pre-build scripts');
                this.handleScript(this.options.onBuildStart).addListener('exit', () => {
                    compilation;
                    callback();
                });
            });
        }

        if (this.options.onBuildEnd) {
            compiler.hooks.afterEmit.tapAsync('PipcayWebpackAfterEmit', (compilation, callback: () => void) => {
                console.log('Executing post-build scripts');
                this.handleScript(this.options.onBuildEnd).addListener('exit', () => {
                    compilation;
                    callback();
                });
            });
        }
    }
}
