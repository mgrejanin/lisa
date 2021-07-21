Feature: Login

    Background: Acessar o site do
        Given acesso o site

    Scenario Outline: Realizar login com dados inválidos
        Given acesso a pagina de login
        And informo usuário <user> incorreto
        And informo senha <senha> incorreta
        And informo 2FA <auth> incorreto
        When clico no botão de realizar login
        Then devo visualizar mensagem de erro

        Examples:
            | user  | senha    | auth   |
            | teste | teste123 | 123456 |
