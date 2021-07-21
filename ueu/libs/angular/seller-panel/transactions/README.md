# Painel Lojista - Página Transações

A página transações localizada na rota `/transacoes` carrega uma tabela de transações sendo ela ordenada pela mais recente, a partir de cada transação é possível visualizar a aba de detalhes, onde é carregada algumas informações extras, como: CNPJ e operador. Ainda na aba detalhes é possível cancelar uma transação desde que seu <i>status</i> esteja como <b>Completada</b>, Caso o status seja diferente a opção `Cancelar transação` é removida.

### Todos usuários/perfis conseguem acessar essa rota.

## Funcionalidades

Ao carregar a página, é carregado a aba de `transações` e a aba `Link externo`.
Ao clicar na aba de transaçōes a opção buscar uma transação existem as funcionalidades atualizar a tabela, filtrar e baixar relátorio.

-   Clicando no campo de `Busca`, poderá ser feita uma pesquisa por `Comprador` e `ID`.
-   Clicando em `atualizar`, a tabela de transações é recarregada.
-   Clicando em `filtrar` abrirá uma modal contendo as opções de filtro, e será possível filtrar por <b>Período</b> e <b>Status</b>.
-   Clicando em `Baixar relátorio`, abrirá uma modal contendo as opções de formato do arquivo e intervalo de dias, por último as opções de `Enviar para e-mail cadastrado` ou `Fazer download`.
-   Clicando em uma `transação da tabela`, abrirá uma aba detalhes contendo informações extras da trancação, como `operador` e `CNPJ`.
-   Ainda na aba de detalhes, caso o status da transação esteja como `Completada` será possível cancelar a transação, através do botão `Cancelar transação` que será habilitado.
-   Clicando em `Cancelar transação` da aba de detalhes, abrirá uma modal solicitando o valor à ser cancelado.
-   Ao final da página, há um botão `carregar mais` que irá carregar a próxima demanda de transações.

Clicando em aba de `Link externo`:

-   São carregadas a listagem de transaçōes vindas do link externo via mundipagg (exemplo: https://deeplink.ms.qa.limbo.work/payment?type=store&hash=ek3849SWZmYxQjSa&checkout=true), onde o usuário não precisa de uma conta no PicPay pra efetuar um pagamento.

-   Por enquanto, não existe filtros nem baixar relatório pra essa funcionalidade, apenas a função para cancelar a transação.
    A páginação e cancelamento funcionam da mesma forma das transaçōes vindas do aplicativo.

-   Fluxo de como criar uma transação de link externo:
    [Como testar o link externo](https://picpay.atlassian.net/wiki/spaces/TRAN/pages/883098462/Como+testar+o+Checkout+externo+Mundipagg+Continue+sem+o+app).

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica os <i>dumbs components</i> da página de transações, sendo eles `CancelTransaction`, `TransactionsFilter` (Modais), `DetailsTransactions` (Sidenav), `TableTransactions` (DataTable);
-   `shared/components/modals/download-reports`: Componente utilizado nas página `/transacoes`, com a funcionalidade de baixar relatório, futuramente essa <i>modal</i> será implementada globalmente pois será utilizada pelo `financeDash`.
-   `pages/transactions`: Componente responsável por renderizar toda a página de transação;

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Transactions (seller-panel-transactions):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-transactions --module=seller-panel-transactions --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-transactions` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/transactions/index.html` no seu navegador preferido.
