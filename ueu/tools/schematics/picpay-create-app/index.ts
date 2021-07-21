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
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getProjectConfig } from '@nrwl/workspace';
import { dasherize } from '@nrwl/workspace/src/utils/strings';
import { Schema } from './schema';

export default function (schema: Schema): Rule {
    const dasherizedAppName = dasherize(schema.appName);
    return chain([
        // 1 - Executa o comando default pra criar um app
        externalSchematic('@nrwl/angular', 'application', {
            name: schema.appName,
            prefix: dasherizedAppName,
            style: 'scss',
            routing: true,
        }),
        // 2 - Remove os arquivos que serão substituídos
        (tree: Tree) => {
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.module.ts`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.component.scss`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.component.html`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.component.spec.ts`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/main.ts`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/styles.scss`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/index.html`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.ts`);
            tree.delete(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.prod.ts`);
            return tree;
        },
        // 3 - Preenche os arquivos conforme os inputs do dev na execuação do comando, e os move para a pasta de destino
        (tree: Tree, context: SchematicContext) =>
            chain([
                mergeWith(
                    apply(url('./templates/project-config'), [
                        template({ ...schema, ...strings }),
                        move(getProjectConfig(tree, dasherizedAppName).root),
                    ]),
                ),
                mergeWith(
                    apply(url('./templates/project-config-e2e'), [
                        template({ ...schema, ...strings }),
                        move(getProjectConfig(tree, `${dasherizedAppName}-e2e`).root),
                    ]),
                ),
                mergeWith(
                    apply(url('./templates/src'), [
                        template({ ...schema, ...strings }),
                        move(getProjectConfig(tree, dasherizedAppName).sourceRoot),
                    ]),
                ),
                mergeWith(
                    apply(url('./templates/app'), [
                        template({ ...schema, ...strings }),
                        move(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app`),
                    ]),
                ),
                mergeWith(
                    apply(url('./templates/environments'), [
                        template({ ...schema, ...strings }),
                        move(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments`),
                    ]),
                ),
                schema.isDashboard
                    ? mergeWith(
                          apply(url('./templates/layout-config'), [
                              template({ ...schema, ...strings }),
                              move(`${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app`),
                          ]),
                      )
                    : () => {},
            ])(tree, context),
        // 4 - Renomeia os arquivos de txt pra ts
        (tree: Tree) => {
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).root}/project.config.txt`,
                `${getProjectConfig(tree, dasherizedAppName).root}/project.config.json`,
            );
            tree.rename(
                `${getProjectConfig(tree, `${dasherizedAppName}-e2e`).root}/project.config.txt`,
                `${getProjectConfig(tree, `${dasherizedAppName}-e2e`).root}/project.config.json`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.module.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.module.ts`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.component.spec.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.component.spec.ts`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.routing.module.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.routing.module.ts`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/main.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/main.ts`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/index.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/index.html`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.ts`,
            );
            tree.rename(
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.prod.txt`,
                `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/environments/environment.prod.ts`,
            );
            if (schema.isDashboard) {
                tree.rename(
                    `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.layout.config.txt`,
                    `${getProjectConfig(tree, dasherizedAppName).sourceRoot}/app/app.layout.config.ts`,
                );
            }
            return tree;
        },
        // 5 - yarn install
        (tree: Tree, context: SchematicContext) => {
            context.addTask(new NodePackageInstallTask());
            return tree;
        },
    ]);
}
