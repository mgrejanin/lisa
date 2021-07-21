Feature: B2P Extract Download

    Background: Acessar o site do seller-panel
        Given Minha autenticação B2P

    Scenario: Deve abrir a modal de download de extrato B2P
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        Then deve abrir a modal de download de extrato

    Scenario: Validação de erros no campo projetos da modal
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And clico no campo de projetos e saio do campo
        And procuro por um projeto que não existe
        Then digito algum projeto inexistente e clico fora do campo

    Scenario: Validação de warning de projeto em progresso na modal
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro por um projeto com remessa em andamento e clico nele
        Then a mensagem de remessa em andamento aparece na modal
        When procuro por um projeto no qual não esteja em progresso e clico nele
        Then a mensagem de remessa em andamento não aparece na modal

    Scenario: Validação de botões dos calendários
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And não informo nenhum projeto no campo
        Then quando informo um projeto os botões são habilitados

    Scenario: Validação dos valores do calendário inicio
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro pelo primero projeto
        Then e a data final do calendario inicial deve ser a data de hoje - 1

    Scenario: Validação dos valores do calendário fim
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro pelo primero projeto
        And a data final do calendário final deve ser a data de hoje - 1
        Then a data inicial do calendário final deve ser a data de criação do projeto

    Scenario: Validação dos valores default do calendário ao selecionar um projeto
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro pelo primero projeto
        Then a data inicial deve ser a data de criação do projeto
        And procuro pelo segundo projeto
        Then a data inicial deve ser a data de uma semana atrás

    Scenario: Validação para seguir o próximo step da modal
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro pelo primero projeto
        And seleciono uma data no calendário de inicio
        And seleciono uma data no calendário de fim
        Then consigo avançar para o próximo step

    Scenario: Concluir o donwload do extrato
        Given Que estou na página de Extrato
        When clico no botão de baixar relatório
        And procuro pelo primero projeto
        And seleciono uma data no calendário de inicio
        And seleciono uma data no calendário de fim
        Then consigo avançar para o próximo step
        And informo minha senha incorreta
        Then a modal não fecha e permaneço nela
        And informo minha senha correta
        Then o download do extrato é efetuado