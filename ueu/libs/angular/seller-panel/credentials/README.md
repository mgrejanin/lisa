# Painel Lojista - Integração Remessa / Credenciais

A página de integração de remessa, localizada na rota `/credenciais` permite ao usuário B2P que gerencie suas credenciais para configuração de suas integrações de API.
Na página o usuário pode criar uma nova `clientID` e `Client Secret` com base no nome e url do projeto. Uma vez que o usuário já tenha credenciais, pode gerenciá-las desativando ou gerando um novo `Client Secret`, além de ter acesso a documentações por meio de FAQ.

### Apenas usuários/perfis com permissão B2P conseguem acessar essa rota.

## Funcionalidades

No primeiro acesso o usuário e recebido por uma página de onboarding, onde será orientado à uma nova página para criar um nome de projeto e adicionar uma url para o mesmo. Uma vez tudo definido, o usuário terá o botão `Criar credencial` habilitado, ela o direciona para uma tela de gerenciamento das chaves e com a `clientID` e a `Client Secret` já criadas.

-   Clicando em desativar credencial, uma modal é acionada para confirmação da ação
    -   Quando as credenciais estiverem desativadas, estarão esmaecidas e um botão chamadado `Reativar credencial` substituio o de desativar
-   Clicando no ícone de clipboard à direita em cada campo, é possível copiar para a área de tarefa a credencial
-   Clicando em `gerar um novo secret`, uma modal é acionada para confirmação da ação e caso a confirmação seja positiva uma nova `Secret key` será gerada e atualizada no campo

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `/components`: Componentes da página de credenciais, sendo eles `disable-credential`, `generate-credential`, `update-secret`
-   `pages/credentials`: Componente responsável por renderizar todos os <i>smart components</i> da página de credenciais

## Running unit tests

Rode `nx test seller-panel-credentials` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/credentials/index.html` no seu navegador preferido.
