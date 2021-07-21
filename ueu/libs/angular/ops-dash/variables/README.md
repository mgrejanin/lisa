# Painel Ops-dash - Página de variáveis de ambiente

Página com a lista de variáveis de ambiente.

## Funcionalidades

Ao carregar a página, é carregado a lista de variáveis de ambiente.

-   Possui a busca com opções de filtro por nome de variável de ambiente ou por serviço.
-   Clicando no botão `criar variável` abre um modal para cadastrar uma variável de ambiente.
-   Clicando no icone `lixeira` abre um modal onde é necessário informar o nome da variável de ambiente, para habilitar o botão excluir.
-   Clicando em um item da lista de variáveis de ambiente, abre uma aba lateral com as informações da variável de ambiente, com a possibilidade de alterar as informações.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica os <i>dumbs components</i> da página de variáveis de ambiente, sendo eles `VariablesCreate`, `VariablesDelete` (Modais), `VariablesUpdateComponent` (Sidenav);
-   `pages/variables`: É responsável pela renderização principal;

## Comandos auxiliares

Para criar um componente diretamente dentro da lib variables (ops-dash-variables):  
Rode `ng g c components/<nome-do-componente> --project=ops-dash-variables --module=ops-dash-variables --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test ops-dash-variables` para executar os testes unitários.

Para consultar a cobertura de código é necessário rodar o comando acima e em seguida abrir o arquivo `coverage/libs/angular/ops-dash/variables/index.html` no seu navegador preferido.
