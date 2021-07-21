## SCHEMATICS - CRIAÇÃO DE LIB

Este schematic visa automatizar o processo de criação de lib dentro do monorepo.

## Executando o schematic

Para executar o schematics, no terminal, digite o seguinte comando:

```sh
npx nx workspace-schematic picpay-create-lib
```

Em seguida, serão feitas 3 perguntas:

-   **Qual o nome da lib?** -> Digite o nome da lib usando camelCase. Exemplo: sellerPanel, featureFlag, opsDash.

-   **Em qual diretório a lib deve ser criada?** -> Digite o diretório onde a lib deve ser criada. Exemplo: Se a lib for ser usada por somente uma aplicação, você deve informar o nome da aplicação, como por exemplo seller-panel, feature-flag, picpay-lab etc... Na maioria dos casos onde uma lib será usada por mais de uma aplicação, essa lib ficará na pasta shared. Mas pra esse caso, sempre verifique com a squad de plataforma pois existem casos e casos.

-   **Qual o prefixo da lib?** -> Se a lib for ser usada por mais de uma aplicação, você pode apenas teclar enter para usar o valor default (picpay). Se a lib for específica de um app, use o prefixo do app, como por exemplo seller-panel, feature-flag, picpay-lab etc...

**Para as perguntas abaixo, caso a resposta seja sim, apenas tecle `Enter` para responder. Caso a resposta seja não, tecle `N` e depois `Enter`**

-   **A lib será publicada?** -> Irá adicionar as configurações necessárias para que sua lib possa ser publicada.

-   **Deseja adicionar gerenciamento de estado na lib?** -> Irá criar uma pasta data-access no root da lib com uma Entity Store do Akita.

Após responder as perguntas, o schematics irá executar alguns comandos, conforme descrito a seguir:

1. Executa o comando para a criação da lib em si (`ng generate @nrwl/angular:library`).
2. Se você optour por adicionar gerencimaneto de estado na lib, o comando para criação de uma Entity store do Akita será exectuado.
3. Irá adicionar o `project.config.json` devidamente preenchido no root da lib.
4. Executa o `yarn install`.

A execução do schematics estará concluída quando aparecer a seguinte mensagem no terminal.

```sh
✔ Packages installed successfully.
```

## Templates

A intenção desta seção é listar e explicar os templates que são usados no lugar dos arquivos originais.

-   #### project.config.json

    -   A explicação de como esse arquivo funciona está [nesta documentação](https://github.com/PicPay/picpay-frontend/wiki/Cria%C3%A7%C3%A3o-de-novos-projetos). Na execução do schematics, todo o processo documentado é feito automáticamente.
