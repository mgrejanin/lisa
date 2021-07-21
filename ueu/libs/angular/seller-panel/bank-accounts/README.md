# Painel Lojista - Página Saques Bancários

A página de saques bancários localizada na rota `/configuracoes/saques-bancarios` é responsável pela gerencia de todas as contas bancárias cadastradas pelo usuário.

# Funcionalidades

Nela é possível fazer todo o gerenciamento de contas e saque automático\*

## Gestão de contas bancárias

A página contempla a `listagem de contas bancárias cadastradas`, nela é possível:

-   `tornar uma conta principal`: qual conta será escolhida em um saque automático e manual;
-   `editar conta`: ação que abre uma aba lateral esquerda ou fullscreen no mobile contendo todas as informações da conta selecionada para edição;
-   `remover conta`: ação que remove uma conta cadastrada;

Abaixo da lista de contas temos o botão de `Adicionar nova conta`, onde abrirá uma aba lateral esquerda ou fullscreen no mobile contento todo o passo a passo de criação de conta bancária:

-   `1 - Requisitos necessários`: Nesse passo é exibido todos os requisitos necessários para cadastrar uma conta bancária com diferentes contextos - `PJ & PF`;
-   `2 - Listagem de bancos`: Listagem de todos os bancos disponíveis para cadastrar a conta;
-   `3 - Formulário de conta`: Contém todos os campos necessários de acordo com o banco selecionado e tipo de usuário (PJ ou PF) para criação da conta e a opção de definir como conta principal de recebimento;
-   `4 - Confirmação das informações cadastradas`: Nesse passo é exibido todas as informações inseridas pelo usuário antes de realizar o pedido de cadastro;
-   `5 - Feedback`: O último passo exibe o retorno do backend: `sucesso ou erro`.

## Saque automático

Também temos a seção de `habilitar/desabilitar o saque automático`, mas essa funcionalidade só está disponível para usuários que possuem a flag `hasSellerAccount: true` na resposta do <i>endpoint</i> `/v2/withdrawals/informations/` consumido no componente `AutoWithdrawalComponent` implementado na página <i>saques bancários</i>.

# Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `components`: Está reunido todos os dumbs components usados na listagem de contas e bancos. Também está alocado todos os componentes usados no passo a passo de criação/edição de conta bancária, além do `cdk-portal` que é responsável por renderizar o `account-stepper` dentro da aba lateral esquerda, para gerenciamento das contas.
-   `containers`: O componente `account-stepper` é caracterizado como um container por ele ser o centralizador de todos os steps com o componente `mat-horizontal-stepper`. Ele também é responsável por gerenciar todo o fluxo do passo a passo;
-   `models`: Está localizado todas as interfaces usadas na página;
-   `pages`: Responsável por renderizar a página através do componente `bank-withdrawals`;
-   `state`: Escopo da biblioteca usado para implementar todo o gerenciamento de estados em Akita das contas bancárias que estão sendo listadas, editadas e criadas. Todos os componentes auxiliares se comunicam com os serviços integrados com a store `banks`, `accounts`, `stepper` e `auto-withdrawal`.

**É importante ressaltar que todos os dados do contexto devem ser fluidos por suas respectivas `stores` citadas acima.**

 <br>

# Comandos auxiliares

Para criar um componente diretamente dentro da lib Cobrar (seller-panel-bank-accounts):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-bank-accounts --module=seller-panel-bank-accounts --style=scss`

## Rodando testes unitários

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-bank-accounts` para executar os testes unitátios.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/bank-accounts/index.html` no seu navegador preferido.
