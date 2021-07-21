# Painel Lojista - Página Inicial

A página inicial localizada na rota `/inicio` mostra informações de saldo atual, saldo futuro e transações de forma resumida, permitindo também começar um novo saque.

### Todos usuários/perfis conseguem acessar essa rota.

## Funcionalidades

Ao carregar a página, é carregado a tabela resumida de ultimas transações, saldo atual e saldo de lançamentos futuros.

-   Ao final da página, há um botão `ver mais` que redireciona para a rota `/transacoes`, aonde é possivel acompanhar com mais detalhes as transações.
-   Clicando no saldo, o usuário é redirecionado para a rota de `/extrato`, aonde é possivel acompanhar com mais detalhes os débitos e lançametos.
-   Clicando em `Novo saque` permite que o usuário selecione sua conta e o valor que gostaria de sacar. O botão será desabilitado caso a propriedade `available_for_withdrawal` obtida na resposta do <i>endpoint</i> `/v2/withdrawals/informations/` seja `<= 0` ou quando a propriedade `checkingBankAccount` for `false`.
-   Clicando em lançamentos futuros, o usuário é redirecionado para a rota de `/lancamentos-futuros`, aonde é possivel acompanhar com mais detalhes os próximos lançamentos.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica os <i>dumbs components</i> da página inicial, sendo eles `Accounts`, `Modals` (Modais), `NewWithdraw`, `AccountError`, `ResumeFutureReleases` e `ResumeBalanceAvaliable`;
-   `pages/home`: É responsável pela renderização principal;

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Home (seller-panel-home):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-home --module=seller-panel-home --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-home` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/home/index.html` no seu navegador preferido.
