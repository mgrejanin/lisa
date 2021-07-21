# Painel Lojista - Página Integrações

A página de integrações está localizada na rota `/integrações` é responsável fornecer todos os tokens de integração entre o cliente **ecommerce** e o picpay.

### É importante ressaltar que essa página é exclusiva para usuários do tipo `ECOMMERCE`.

# Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `components`: Agrega todos os componentes auxiliares como: modal de gerar novos tokens e o componente que renderiza o conteúdo de cada tab - **API pública** e **Clientes VTEX**;
-   `pages`: Responsável por renderizar a página através do componente `integrations.component`;

# Comandos auxiliares

Para criar um componente diretamente dentro da lib Integrations (seller-panel-integrations):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-integrations --module=seller-panel-integrations --style=scss`

## Rodando testes unitários

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-integrations` para executar os testes unitátios.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/integrations/index.html` no seu navegador preferido.
