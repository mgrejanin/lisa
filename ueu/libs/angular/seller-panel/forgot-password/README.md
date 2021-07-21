# Painel Lojista - Página Esqueci a Senha

A página esqueci a senha localizada na rota `/esqueci-a-senha` carrega um formulário de preenchimento para recuperação do acesso através do CPF/CNPJ e e-mail cadastrados.
Também é dada a opção de voltar para a página de login `/login` ou fazer um cadastro novo, que atualmente abre uma nova aba com o painel lojista.

### Todos usuários não logados conseguem acessar essa rota.

## Funcionalidades

Ao carregar a página, é carregado o formulário `Esqueceu sua senha?`.
Ao preencher os campos `CPF/CNPJ cadastrado` e `E-mail cadastrado` o usuário pode clicar no botão `Enviar email`.

-   Clicando em `Enviar email` será enviado um código de recuperação de acesso por e-mail, com um link de direcionamento para a rota de
    `Nova Senha` `/esqueci-a-senha/nova-senha`.
-   Clicando em `Voltar para login` o usuário será direcionado de volta para a rota `/login`.
-   Clicando em `Faça seu cadastro`, abrirá uma nova aba no navegador direcionando para a área de cadastro do antigo `Painel Lojista`.
-   Na rota `/esqueci-a-senha/nova-senha` o usuário preenche os campos com o `Código de Recuperação` e a `Nova senha`, depois pode clicar
    no botão `Salvar nova senha`.
-   Após salvar a nova senha surge um `snackbar` de confirmação.
-   O usuário é redirecionado automaticamente para a rota `/login`.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: É onde fica os <i>dumbs components</i> da página de transações, sendo eles `FormForgotPassword` e `GenerateNewPassword`;
-   `pages/forgot-password`: Componente responsável por renderizar toda a página de forgot-password;

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Forgot-Password (seller-panel-forgot-password):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-forgot-password --module=seller-panel-forgot-password --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-forgot-password` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/forgot-password/index.html` no seu navegador preferido.
