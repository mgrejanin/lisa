Feature: Primeiro Acesso

    Background: Acessar o site do
        Given acesso o site

    Scenario Outline: Realizar primeiro acesso com dados inválidos
        Given acesso a pagina de login
        When clico no botão realizar primeiro acesso
        And informo usuário <user> incorreto
        And informo senha <senha> incorreta
        When clico no botão de próximo
        Then devo visualizar mensagem de erro

        Examples:
            | user  | senha    |
            | teste | teste123 |