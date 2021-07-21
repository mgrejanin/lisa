# Warnings to fix - 18/02/2021

## apps/angular/dev-portal

**nx serve**  
OK

**nx lint**

```c
/mnt/c/Users/PC Performance/Desktop/picpay-frontend/apps/angular/dev-portal/src/app/app.module.ts
23:1  warning  Imports of lazy-loaded libraries are forbidden  @nrwl/nx/enforce-module-boundaries

/mnt/c/Users/PC Performance/Desktop/picpay-frontend/apps/angular/dev-portal/src/app/interceptors/dev-portal.interceptor.ts
9:37  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
9:94  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
```

**nx test**  
OK

**nx build DEV MODE**

```c
Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/tokens/src/lib/models/spacing/spacing.model.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/tokens/src/lib/models/spacing/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/dom.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/responsive.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: dev-portal/shared/src/lib/dev-portal-shared.module.ts depends on 'highlight.js'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/packages/event-tracking/src/lib/event-tracking.sdk.ts depends on 'axios'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: dev-portal/docs/src/lib/pages/api-reference/api-reference.component.ts depends on 'swagger-ui'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

**nx build PROD MODE**

```c
Warning: dev-portal/docs/src/lib/pages/api-reference/api-reference.component.scss exceeded maximum budget. Budget 6.00 kB was not met by 275 bytes with a total of 6.27 kB.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/tokens/src/lib/models/spacing/spacing.model.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/tokens/src/lib/models/spacing/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/dom.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/responsive.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/stencil/design-system/helpers/src/lib/helpers/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: dev-portal/shared/src/lib/dev-portal-shared.module.ts depends on 'highlight.js'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/packages/event-tracking/src/lib/event-tracking.sdk.ts depends on 'axios'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: dev-portal/docs/src/lib/pages/api-reference/api-reference.component.ts depends on 'swagger-ui'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

<br/>

## libs/angular/dev-portal/docs

<br/>

**nx lint**

```c
dev-portal/docs/src/lib/components/swagger-scroll/swagger-scroll.component.spec.ts
21:10  warning  'getMenuItemsBySlug' is defined but never used      @typescript-eslint/no-unused-vars
88:9   warning  'configService' is assigned a value but never used  @typescript-eslint/no-unused-vars
89:9   warning  'http' is assigned a value but never used           @typescript-eslint/no-unused-vars
90:9   warning  'httpMock' is assigned a value but never used       @typescript-eslint/no-unused-vars

dev-portal/docs/src/lib/components/swagger-scroll/swagger-scroll.component.ts
161:17  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

dev-portal/docs/src/lib/dev-portal-docs.module.ts
7:10  warning  'EventTracking' is defined but never used  @typescript-eslint/no-unused-vars

dev-portal/docs/src/lib/pages/api-reference/api-reference.component.spec.ts
135:9  warning  'configService' is assigned a value but never used  @typescript-eslint/no-unused-vars
137:9  warning  'productsStore' is assigned a value but never used  @typescript-eslint/no-unused-vars
139:9  warning  'http' is assigned a value but never used           @typescript-eslint/no-unused-vars
140:9  warning  'httpMock' is assigned a value but never used       @typescript-eslint/no-unused-vars

dev-portal/docs/src/lib/pages/api-reference/api-reference.component.ts
71:19  warning  'ui' is assigned a value but never used  @typescript-eslint/no-unused-vars

dev-portal/docs/src/lib/pages/products/assinaturas/assinaturas.component.spec.ts
10:1  warning  Libraries cannot be imported by a relative or absolute path, and must begin with a npm scope  @nrwl/nx/enforce-module-boundaries

dev-portal/docs/src/lib/pages/products/b2p/b2p.component.spec.ts
10:1  warning  Libraries cannot be imported by a relative or absolute path, and must begin with a npm scope  @nrwl/nx/enforce-module-boundaries

dev-portal/docs/src/lib/pages/products/e-commerce/e-commerce.component.spec.ts
10:1  warning  Libraries cannot be imported by a relative or absolute path, and must begin with a npm scope  @nrwl/nx/enforce-module-boundaries

dev-portal/docs/src/lib/pages/products/plataforma-aberta/plataforma-aberta.component.spec.ts
8:1   warning  Libraries cannot be imported by a relative or absolute path, and must begin with a npm scope  @nrwl/nx/enforce-module-boundaries
18:22  warning  Unexpected any. Specify a different type                                                      @typescript-eslint/no-explicit-any

dev-portal/docs/src/lib/pages/products/plataforma-aberta/plataforma-aberta.component.ts
11:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
```

**nx test**

OK

<br/>

## libs/angular/dev-portal/home

<br/>

**nx lint**

```c
dev-portal/home/src/lib/pages/landing/landing.component.spec.ts
149:9  warning  'productsQuery' is assigned a value but never used  @typescript-eslint/no-unused-vars
```
