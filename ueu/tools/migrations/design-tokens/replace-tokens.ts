import { readFile, writeFile } from 'fs';
import { sync as fileSearch } from 'glob';
import { join } from 'path';
import TOKENS_CHANGES from './tokens-changes';

const changes = [...TOKENS_CHANGES];
const verificationFile = './hasNewTokens.json';

const reportData = [];
const filesChanges = [];

/**
 * Método para buscar todos os arquivos de um diretorio.
 * @param src caminho a ser buscado.
 * @returns
 */
function getAllFiles(src: string): string[] {
    return fileSearch(join(src, '/**/*'), { ignore: '**/node_modules' });
}

/**
 * Método responsável por realizar o replace na string informada.
 * @param string a ser atualizada.
 * @param find ocorrência a ser procurada.
 * @param replace nova ocorrência.
 * @returns
 */
function replaceAll(string: string, find: string, replace: string, regex?: any) {
    string = string.replace(regex ?? new RegExp(find, 'g'), replace);
    return string;
}

/**
 * Método responsável por ler e executar alterações nos arquivos.
 * @param files
 * @param changes
 * @returns
 */
async function findAndReplace(file, changes?: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        readFile(file, { encoding: 'utf-8' }, (_, data: string) => {
            if (data) {
                changes.map((c: any) => {
                    if (data.includes(c.old)) {
                        const fileChanges = [];
                        const AllLines: string[] = [...data.split('\n')];

                        AllLines.map((line, index) => {
                            if (line.includes(c.old)) {
                                fileChanges.push({
                                    oldOcurrency: c.old,
                                    newOcurrency: c.new,
                                    line: index + 1,
                                });
                                filesChanges.push(true);
                            }
                        });
                        data = replaceAll(data, c.old, c.new, c.regex);
                        reportData.push({ fileName: file, changes: [...fileChanges] });
                    }
                });

                const result = data;

                if (result) {
                    writeFile(file, result, 'utf8', function (err) {
                        if (err) return console.log(err);
                        resolve(true);
                    });
                }
            }
        });
    });
}

function replaceEntries(files: string[], changes?: { old: string; new: string }[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const allFiles = files;

        allFiles.map(async (file: string, index: number) => {
            await findAndReplace(file, changes);

            if (index === allFiles.length - 1) {
                resolve(true);
            }
        });
    });
}

const files = [...getAllFiles('./apps/*'), ...getAllFiles('./libs/*')];

/**
 * Método para agrupar as alterações por arquivos.
 * @param arr
 * @returns
 */
const groupChanges = arr => {
    const output = arr.reduce((item, cur) => {
        const duplicated = item.reduce((n, item, i) => {
            return item.fileName === cur.fileName ? i : n;
        }, -1);

        if (duplicated >= 0) {
            item[duplicated].changes = [...item[duplicated].changes, ...cur.changes];
        } else {
            const change = {
                fileName: cur.fileName,
                changes: cur.changes,
            };
            item = item.concat([change]);
        }

        return item;
    }, []);

    return output;
};

async function main() {
    readFile(verificationFile, { encoding: 'utf-8' }, async (_, data) => {
        const parsedData = data && JSON.parse(data);

        if (parsedData && parsedData.hasRefreshedTokens) {
            console.table('Atualização dos tokens executada anteriormente.');
            return;
        }

        await replaceEntries(files, changes);

        const content = {
            hasRefreshedTokens: true,
        };

        writeFile(verificationFile, JSON.stringify(content), 'utf8', () => {
            console.table(
                `${filesChanges.length + 1} alterações realizadas em ${groupChanges(reportData).length} arquivos.`,
            );
            writeFile(
                'migration-design-tokens-changes.json',
                JSON.stringify(groupChanges(reportData)),
                'utf8',
                () => null,
            );
        });
    });
}

main();
