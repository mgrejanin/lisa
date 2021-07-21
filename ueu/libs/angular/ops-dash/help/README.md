# Página de ajuda

Página para auxiliar na utilização do painel Ops-dash.

## Funcionalidades

-   Textos explicativos sobre introdução e conceitos sobre variável de ambiente e serviço associado.
-   Textos e imagens de ajuda para auxiliar o usuário na busca de variáveis de ambiente ou serviços associados.
-   Textos e imagens de ajuda para auxiliar o usuário na criação de uma variável de ambiente, na atualização das informações dessa variável de ambiente, para fazer um rollback e exclusão dessa variável.
-   Textos e imagens de ajuda para auxiliar o usuário na associação do serviço a uma variável de ambiente e informar um alias para esse serviço.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `pages/help`: É responsável pela renderização principal;

## Comandos auxiliares

Para criar um componente diretamente dentro da lib help (ops-dash-help):  
Rode `ng g c components/<nome-do-componente> --project=ops-dash-help --module=ops-dash-help --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test ops-dash-help` para executar os testes unitários.

Para consultar a cobertura de código é necessário rodar o comando acima e em seguida abrir o arquivo `coverage/libs/angular/ops-dash/help/index.html` no seu navegador preferido.
