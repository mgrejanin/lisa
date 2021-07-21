import { strings } from '@angular-devkit/core';
import {
    apply,
    chain,
    externalSchematic,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url,
} from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import { camelize, dasherize } from '@nrwl/workspace/src/utils/strings';
import { Schema } from './schema';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export default function (schema: Schema): Rule {
    const projectName = `${dasherize(schema.directory)}-${dasherize(schema.libName)}`;
    const dasherizedLibName = dasherize(schema.libName);
    const camelizedLibName = camelize(schema.libName);
    return chain([
        // 1 - Executa o comando default pra criar uma lib
        externalSchematic('@nrwl/angular', 'library', {
            name: camelizedLibName,
            style: 'scss',
            directory: schema.directory,
            prefix: schema.prefix,
            publishable: schema.publishable,
        }),
        () => {
            if (schema.stateManagement) {
                return externalSchematic('@datorama/akita', 'feature', {
                    name: camelizedLibName,
                    project: `${dasherize(schema.directory)}-${dasherizedLibName}`,
                    dirName: 'data-access',
                    spec: true,
                    entityService: 'http',
                });
            }
        },
        // 2 - Preenche os templates conforme os inputs do dev na execuação do comando, e os move para a pasta de destino
        (tree: Tree, context: SchematicContext) =>
            chain([
                mergeWith(
                    apply(url('./templates/root'), [
                        template({ ...schema, ...strings }),
                        move(getProjectConfig(tree, projectName).root),
                    ]),
                ),
            ])(tree, context),
        // 3 - Renomeia os arquivos de txt pra ts
        (tree: Tree) => {
            tree.rename(
                `${getProjectConfig(tree, projectName).root}/project.config.txt`,
                `${getProjectConfig(tree, projectName).root}/project.config.json`,
            );
            return tree;
        },
        // 4 - Npm install
        (tree: Tree, context: SchematicContext) => {
            context.addTask(new NodePackageInstallTask());
            return tree;
        },
    ]);
}
