# Painel Lojista - Página de Remessa de Créditos

A página remessa do lote de pagamentos, localizada na rota `/remessa-de-credito`, que tem como objetivo criar ordens de pagamento via Painel Lojista. Portanto, na página inicial haverá um link com redirecionamento para a página de Remessa de Créditos, que contém um formulário no formato step by step, onde o usuário vai colocar as informações pertinentes e criar uma ordem de pagamento.

### Somente usuários/perfis com integrations_b2p ativo conseguem acessar essa rota.

## Funcionalidades

Ao clicar no botão de `Criar nova remessa` na página inicial do Painel Lojista, é carregado um formulário com os requisitos de subir um **.csv**, colocar uma data limite de pagamento, informar se o valor é sacável ou não, opcionalmente adotar um nome para essa remessa e assim confirmar o pagamento.

-   No primeiro step, ao clicar em `Selecionar arquivo` é possível carregar somente arquivos no formato **.csv**, seguindo o modelo de que uma coluna há apenas CPFs (somente números) e a outra com o valor a ser pago (usando ponto para casas decimais). Também é possivel remover o arquivo e selecionar outro.

-   Quando um arquivo .csv for carregado, o botão `Próximo`, para ir para o próximo step é habilitado.

-   No segundo step, é possível selecionar a data final do pagamento da remessa. O mínimo é de 15 dias após a data atual e o máximo de 30 dias;

-   Há a opção de escolher se o valor pode ser sacado ou não pelo recebedor do pagamento;

-   Para organização das remessas enviadas, é opcional colocar um nome identificador para ela;

-   Ao selecionar a data final e confirmar se o valor é sacável ou não, o botão `Realizar o pagamento` é habilitado;

-   Clicando em `Realizar pagamento` ele é direcionado à um modal de confirmação do pagamento. Nele, consta as informações preenchidas no formulário. Clicando em `Confirmar e pagar` as informações são processadas e validadas, e, se não ocorrer nenhum problema de conexão ou validação, o usuário é redirecionado para a tela de sucesso na criação da remessa do pagamento com um link para voltar à página inicial;
-   O usuário é capaz de ver o andamento da sua remessa na aba de Extrato.

-   Se acaso o usuário já estiver com algum envio de remessa em progresso, não será possível o envio de uma nova, e com isso, ao clicar no botão no modal `Confirmar e pagar` ele será redirecionado para a tela que informa que ele já possui uma remessa em andamento.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica o formulário step by step, sendo ele o `BatchShipment` e o modal de confirmação do pagamento `ConfirmPayment`;
-   `pages/shipment`: Componente responsável por renderizar toda a página de Remessa de Créditos;

# Comandos auxiliares

Para criar um componente diretamente dentro da lib Shipment (seller-panel-shipment):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-shipment --module=seller-panel-shipment --style=scss`

## Rodando testes unitários

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-shipment` para executar os testes unitátios.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/shipment/index.html` no seu navegador preferido.
