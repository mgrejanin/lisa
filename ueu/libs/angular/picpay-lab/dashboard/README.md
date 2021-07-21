# Picpay-Lab - Dashboard

A lib Dashboard é responsável pela renderização do escopo principal do projeto do Picpay Lab.
A página Home é responsável pela renderização de todos componentes da tela principal, provendo recursos para estilização de Uma Store, criação de páginas e estilização de componentes. Ela é chamada através da rota `/home`.

## Funcionalidades

### Header (WIP)

### Menu (WIP)

### Device (WIP)

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `pages/home`: É responsável pela renderização do dashboard, ao qual contém os componentes de Header, Menu e Abas Laterais ;
-   `components/`: Pasta que contem os componentes utilizados no dashboard
-   `models/`: Pasta com os interfaces, classes e models utilizados na lib
-   `services/`: Pasta com os serviços compartilháveis dentro da lib

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Dashboard (picpay-lab-dashboard):  
Rode `ng g c components/<nome-do-componente> --project=picpay-lab-dashboard --module=picpay-lab-dashboard --style=scss`

## Executando Testes Unitários

Todos os componentes devem possuir testes unitários.

Rode `nx test picpay-lab-dashboard` para executar os testes unitários.

Ao criar um arquivo de teste unitário, verifique a cobertura de código. Para verificar a cobertura, rode o comando acima e verifique a porcentagem de coverage do arquivo `coverage/libs/angular/picpay-lab/dashboard/index.html` no seu navegador preferido.
