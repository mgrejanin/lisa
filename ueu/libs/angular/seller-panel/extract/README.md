# Painel Lojista - Extrato / Futuros Lançametos

A página extrato localizada na rota `/extrato` carrega uma tabela das ultimas movimentações financeiras do seller, como estornos, entrada de dinheiro, cobranças de taxas etc.
Quando uma movimentação houve algum tipo de taxa, é mostrada uma arrow na row da movimentação, clicando nela é aberta uma modal informando o valor da taxa.

Como subrota os lançamentos futuros fica localizado na rota `/extrato/lancamentos-futuros`, aonde é carregado uma tabela mostrando os futuros lançamentos/movimentações.

### Todos usuários/perfis conseguem acessar essa rota.

## Funcionalidades

Ao carregar a página, é carregado a tabela de transações, a opção buscar uma transação, as funcionalidades atualizar a tabela, filtrar e baixar relátorio.

-   Clicando no campo de `Baixar relatorio`, poderá fazer o download de um PDF, CSV ou ser enviado por email um relatorio do extrato, seja filtrado por data ou completo
-   Clicando em `Lançamentos Futuros`, o usuário é redirecionado para a rota de `/extrato/lancamentos-futuros`.
-   Clicando em `Carregar mais` carregara mais movimentações do seller, caso haja, caso não haja mais o botão deve ficar escondido

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica os <i>dumbs components</i> da página de transações, sendo eles `TableExtract` (DataTable),`TableFutureReleases` (DataTable) e `ExtractDetails`;
-   `pages/extract`: Componente responsável por renderizar as rotas (router-outlet)
-   `pages/extract-container`: Componente responsável por renderizar toda pagina de extrato
-   `pages/future-releases`: Componente responsável por renderizar toda pagina de lançamentos futuros

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Transactions (seller-panel-extract):

Rode `ng g c components/<nome-do-componente> --project=seller-panel-extract --module=seller-panel-extract --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-extract` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/extract/index.html` no seu navegador preferido.
