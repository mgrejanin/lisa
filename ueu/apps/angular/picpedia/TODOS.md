# Warnings to fix - 18/02/2021

## apps/angular/picpedia

**nx serve**  
OK

**nx lint**  
OK

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
```

**nx build PROD MODE**

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
```

<br/>

## libs/angular/picpedia/features

<br/>

**nx lint**

```c
/mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/angular/picpedia/features/src/lib/models/dashboard.model.ts
18:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/angular/picpedia/features/src/lib/models/metric-detail.model.ts
7:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
40:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
42:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
44:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
48:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/angular/picpedia/features/src/lib/models/model-detail.model.ts
55:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
58:23  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
61:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
63:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
65:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
66:17  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
67:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
69:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/angular/picpedia/features/src/lib/models/requests.model.ts
1:36  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/mnt/c/Users/PC Performance/Desktop/picpay-frontend/libs/angular/picpedia/features/src/lib/models/user.model.ts
20:24  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
```

**nx test**

OK
