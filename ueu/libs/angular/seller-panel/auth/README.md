# Painel Lojista - Lib Auth

## Funcionalidades

Esta <i>lib</i> tem como funcionalidade manter a integridade dos dados dos usuários, validando dados de autenticação, validando `tokens` das rotas acessadas e tempo de sessão de cada `token`.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/guards`: É onde fica os <i>guardas de rotas</i> da aplicação, sendo eles `SellerPanelAuthGuard`, `SellerPanelSessionGuard`, responsáveis por validar a autenticidade e a sessão do usuário.
-   `/interceptors`: Interceptor utilizado na aplicação para validar as requisições e se os tokens são válidos ou não.
-   `/mocks`: É onde criamos os modelos de respostas `FAKE` dos serviços para utilizarmos nos testes unitários.
-   `/model`: É onde criamos as tipagens da <i>lib</i>, seguir os padrões de nomenclatura ao criar um novo model.
-   `services`: O serviço `authService` é responsável pelas seguintes funcionalidades: `isLogged`, `login`, `refreshToken`, `logout`, `updatePassword`, `requestNewPassword`, `changeLostPassword`, `verifyPassword`, `setLocalStorage`, `getLocalStorage`.

## Comandos auxiliares

Para criar um serviço diretamente dentro da lib Auth (seller-panel-auth):  
Rode `ng g s <nome-do-serviço> --project=seller-panel-auth --module=seller-panel-auth`

## Running unit tests

Todos os serviços, guardas de rotas e interceptores devem possuir testes unitários.

Rode `nx test seller-panel-auth` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/auth/index.html` no seu navegador preferido.
