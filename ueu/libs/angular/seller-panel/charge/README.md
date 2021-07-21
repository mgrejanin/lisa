# Painel Lojista - Página Cobrar

A página de cobrar localizada na rota `/cobrar` oferece algumas alternativas de efetuar uma cobrança do lojista para seus clientes.

### É importante ressaltar que a página só é visível para os usuários do tipo `BIZ`.

## Funcionalidades

Por padrão assim que a página é carregada, o QR Code já está disponível para leitura, mas também há a possibilidade de gerar um QR Code com o valor da compra já configurado.

É possível compartilhar um `link` para os clientes pagarem onde estiverem, mas se for preciso enviar esse link diretamente para alguma das redes sociais como Whatsapp, Facebook ou Twitter é super prático através de `um` click.

O vendedor pode também imprimir o QR Code da sua loja e colocar onde quiser.

## Estrutura

A biblioteca está estruturada da seguinte maneira:

-   `pages/charge`: É responsável pela renderização principal;
-   `components/charge-value-modal`: Se encarrega por configurar um valor específico para o QR Code.

## Comandos auxiliares

Para criar um componente diretamente dentro da lib Cobrar (seller-panel-charge):  
Rode `ng g c components/<nome-do-componente> --project=seller-panel-charge --module=seller-panel-charge --style=scss`

## Running unit tests

Todos os componentes devem possuir testes unitários.

Rode `nx test seller-panel-charge` para executar os testes unitários.

Para consultar a cobertura de código, não esqueça de rodar o comando acima e em seguida abra o arquivo `coverage/libs/seller-panel/charge/index.html` no seu navegador preferido.
