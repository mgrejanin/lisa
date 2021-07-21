# Painel Lojista - Página Configurações

A página de de configurações está localizada na rota `/configuracoes` é responsável por alocar a página de dados cadastrados, alterar senha, meu plano (user tipo ecommerce) e saques bancários.

Atenção: Todas as páginas desse módulo necessitam de autenticação manual com a senha do admin;

### A página tem como rotas filhas:

-   **Meus Dados**:

    -   Responsável por exibir e editar algumas informações cadastradas pelo administrador através das seções:
        -   **Dados da sua empresa**: Os dados da sua empresa não podem ser alterados pelo Painel Lojista. Caso precise de alguma alteração, mande uma mensagem para o nosso suporte e entraremos em contato com você;
        -   **Dados para contato**: Precisamos dos seus dados de contato para entrarmos em contato caso seja necessário;
        -   **Dados do seu negócio**: É assim que as pessoas verão o nome e as informações da sua loja no aplicativo.

-   **Alterar senha**: Responsável pela troca de senha fornecendo a senha atual e a nova com campo de confirmação;

-   **Meu Plano**: Tela exclusiva para usuários tipo **ECOMMERCE** que lista os planos disponíveis com seus respectivos dias de recebimento e taxa;

-   **Saques Bancários**: Página responsável por gerenciar todas as contas bancárias e saque automático para Empresários individuais. Para mais informações dessa página, consulte: [saques bancários](/libs/seller-panel/bank-accounts/README.md)

# Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `components`: Está reunido todos os componentes das rotas filhas de meus dados, alterar senha e meu plano. A página de saques bancários por se tratar de um contexto mais complexo, possui uma biblioteca própria que é carregada somente quando o usuário acessa manualmente - lazy load;
-   `guards`: A página possui dois tipos de guardas. O primeiro é de solicitar a senha para acessar a mesma e o segundo é para alertar o usuário caso ele queira sair sem salvar dados alterados na página Meus Dados;
-   `pages`: Responsável por renderizar a página através do componente `settings.component`;

# Comandos auxiliares

Para criar um componente diretamente dentro da lib Settings (seller-panel-settings):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-settings --module=seller-panel-settings --style=scss`

## Rodando testes unitários

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-settings` para executar os testes unitátios.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/settings/index.html` no seu navegador preferido.
