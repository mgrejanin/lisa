# shared-default-screens

### sobre o default-error-screen

Esse componente utiliza o Apollo Feedback Page do nosso design system para gerar error pages com parâmetros passados pelo data no routing.

### como utilizar o default-error-screen no seu projeto

exemplo de como importar e utilizar o componente no routing de seu projeto.

`import { DefaultErrorScreenComponent } from '@picpay/angular/shared/default-screens'`

```
{
	path: '401',
	component: DefaultErrorScreenComponent,
	data: NotAuthorizedScreenConfig
}
```

exemplo de config para passar como data pro componente:

```
NotAuthorizedScreenConfig: DefaultErrorScreenConfig = {
	title: 'Opa, você está sem acesso',
	subtitle: 'Solicite o acesso via Zendesk.',
	figure: true,
	buttons: [
		{
			variant: 'unelevated',
			href: 'https://picpay.zendesk.com',
			text: 'Solicitar acesso',
		},
		{
			variant: 'link',
			routerLink: [''],
			text: 'Voltar',
		},
	],
};
```

Se tiver dúvida sobre os parâmetros que a config aceita, você pode dar um mouse over na tipagem com a interface DefaultErrorScreenConfig que ela irá mostrar os parâmetros que o componente aceita e o que cada um faz! Lembrando também que são todos opcionais, pode montar sua feedback page como preferir!
