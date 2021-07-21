# Warnings to fix - 18/02/2021

# apps/angular/seller-panel

**nx serve**  
OK

**nx lint**

```c
warning  'async' is defined but never used in apps/angular/seller-register/src/app/app.component.spec.ts
```

**nx test**  
OK

**nx build DEV MODE**

```c
Build at: 2021-02-18T20:38:20.035Z - Hash: 53497eb3a25181579ff2 - Time: 33199ms

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/tokens/src/lib/models/spacing/spacing.model.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/tokens/src/lib/models/spacing/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/dom.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/responsive.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/packages/event-tracking/src/lib/event-tracking.sdk.ts depends on 'axios'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component.ts depends on 'rxjs/internal/Subject'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/charge/src/lib/pages/charge/charge.component.ts depends on 'file-saver'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/account-dynamic-form/account-dynamic-form.component.ts depends on 'deep-object-diff'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/node_modules/angularx-qrcode/__ivy_ngcc__/fesm2015/angularx-qrcode.js depends on 'qrcode'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

**nx build PROD MODE**

```c
Build at: 2021-02-18T20:46:19.569Z - Hash: e8eafbe71de919bbe9d5 - Time: 63411ms

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component.scss exceeded maximum budget. Budget 6.00 kB was not met by 58 bytes with a total of 6.06 kB.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/tokens/src/lib/models/spacing/spacing.model.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/tokens/src/lib/models/spacing/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/dom.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/responsive.helper.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/stencil/design-system/helpers/src/lib/helpers/index.ts is part of the TypeScript compilation but it's unused.
Add only entry points to the 'files' or 'include' properties in your tsconfig.

Warning: /Users/guilherme.costa/workspace/picpay/libs/packages/event-tracking/src/lib/event-tracking.sdk.ts depends on 'axios'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component.ts depends on 'rxjs/internal/Subject'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/charge/src/lib/pages/charge/charge.component.ts depends on 'file-saver'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/node_modules/angularx-qrcode/__ivy_ngcc__/fesm2015/angularx-qrcode.js depends on 'qrcode'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/account-dynamic-form/account-dynamic-form.component.ts depends on 'deep-object-diff'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

# libs/angular/seller-panel/auth

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/auth/src/lib/auth.service.spec.ts
   75:9   warning  'sellerService' is assigned a value but never used  @typescript-eslint/no-unused-vars
   78:9   warning  'http' is assigned a value but never used           @typescript-eslint/no-unused-vars
  146:13  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars
  176:13  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars
  225:17  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars
  253:17  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars
  285:17  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars
  309:17  warning  'error' is defined but never used                   @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/auth/src/lib/guards/authentication.guard.spec.ts
  33:9  warning  'configService' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/auth/src/lib/guards/session.guard.spec.ts
   3:18  warning  'UrlTree' is defined but never used                 @typescript-eslint/no-unused-vars
  40:9   warning  'configService' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/auth/src/lib/interceptors/http-request.interceptor.spec.ts
   42:9   warning  'notificationService' is assigned a value but never used  @typescript-eslint/no-unused-vars
  101:13  warning  'success' is defined but never used                       @typescript-eslint/no-unused-vars
  102:13  warning  'error' is defined but never used                         @typescript-eslint/no-unused-vars
  116:13  warning  'success' is defined but never used                       @typescript-eslint/no-unused-vars
  117:13  warning  'error' is defined but never used                         @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/auth/src/lib/mocks/auth.service.mock.ts
  38:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 17 problems (0 errors, 17 warnings)
```

**nx test**
OK

# libs/angular/seller-panel/bank-accounts

**nx lint**

```c

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/account-dynamic-form/account-dynamic-form.component.spec.ts
   19:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries
  124:9  warning  'sellerService' is assigned a value but never used                                                                                                                            @typescript-eslint/no-unused-vars
  125:9  warning  'basksService' is assigned a value but never used                                                                                                                             @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/account-dynamic-form/account-dynamic-form.component.ts
  124:47  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  197:37  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  197:55  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/accounts-list/accounts-list.component.spec.ts
   10:1   warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries
  100:9   warning  'accountsQuery' is assigned a value but never used                                                                                                                            @typescript-eslint/no-unused-vars
  339:24  warning  'result' is defined but never used                                                                                                                                            @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/accounts-list/accounts-list.component.ts
  8:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/auto-withdrawal/auto-withdrawal.component.spec.ts
   5:10  warning  'MatSlideToggleChange' is defined but never used  @typescript-eslint/no-unused-vars
  54:9   warning  'matDialog' is assigned a value but never used    @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/auto-withdrawal/auto-withdrawal.component.ts
   5:1   warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries
  51:37  warning  'price' is defined but never used                                                                                                                                             @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/banks-list/banks-list.component.spec.ts
  13:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/modal-warning/modal-warning.component.spec.ts
  5:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/components/modal-warning/modal-warning.component.ts
  1:36  warning  'OnInit' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/containers/account-stepper/account-stepper.component.spec.ts
  19:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries
  89:9  warning  'accountsQuery' is assigned a value but never used                                                                                                                            @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/models/bank.model.ts
  1:10  warning  'AccountType' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/pages/bank-withdrawals/bank-withdrawals.component.spec.ts
  20:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/seller-panel-bank-accounts.module.ts
  6:1  warning  Circular dependency between "seller-panel-bank-accounts" and "seller-panel-shared" detected: seller-panel-bank-accounts -> seller-panel-shared -> seller-panel-bank-accounts  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/state/accounts/accounts.service.spec.ts
  12:5  warning  'SellerQueryMock' is defined but never used       @typescript-eslint/no-unused-vars
  87:9  warning  'http' is assigned a value but never used         @typescript-eslint/no-unused-vars
  90:9  warning  'sellerQuery' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/state/auto-withdrawal/auto-withdrawal.service.spec.ts
  106:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/bank-accounts/src/lib/state/auto-withdrawal/auto-withdrawal.service.ts
  54:18  warning  '_data' is defined but never used  @typescript-eslint/no-unused-vars

```

**nx test**

```c
console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at AccountStepperComponent.onConfirmAccount (src/lib/containers/account-stepper/account-stepper.component.ts:110:23)
      at src/lib/containers/account-stepper/account-stepper.component.spec.ts:217:19
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:386:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (../../../../node_modules/zone.js/dist/proxy.js:117:43)
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:385:36)
      at Zone.Object.<anonymous>.Zone.run (../../../../node_modules/zone.js/dist/zone.js:143:47)
```

# libs/angular/seller-panel/charge

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/charge/src/lib/pages/charge/charge.component.ts
  141:37  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 1 problem (0 errors, 1 warning)
```

**nx test**

```c
    console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at ChargeComponent.getChargeUrl (src/lib/pages/charge/charge.component.ts:200:23)
      at ChargeComponent.ngOnInit (src/lib/pages/charge/charge.component.ts:83:14)
      at checkAndUpdateDirectiveInline (../../../../../packages/core/src/view/provider.ts:217:15)
      at checkAndUpdateNodeInline (../../../../../packages/core/src/view/view.ts:442:14)
      at checkAndUpdateNode (../../../../../packages/core/src/view/view.ts:402:12)
      at debugCheckAndUpdateNode (../../../../../packages/core/src/view/services.ts:435:44)
      at debugCheckDirectivesFn (../../../../../packages/core/src/view/services.ts:396:7)
```

# libs/angular/seller-panel/extract

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/extract/src/lib/components/modals/request-withdrawal/request-withdrawal.component.spec.ts
  124:9  warning  'matDialog' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/extract/src/lib/pages/extract-container/extract-container.component.spec.ts
   9:10  warning  'throwError' is defined but never used  @typescript-eslint/no-unused-vars
  69:47  warning  'response' is defined but never used    @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/extract/src/lib/pages/extract/extract.component.spec.ts
  71:9  warning  'authService' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/extract/src/lib/pages/future-releases/future-releases.component.spec.ts
  67:13  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

✖ 5 problems (0 errors, 5 warnings)
```

**nx test**

```c
    console.warn
      You need to initialize the library before calling page method

      115 |     page(event: string, payload: {}): Observable<any> | any {
      116 |         if (!this.eventTrackingOptions) {
    > 117 |             console.warn('You need to initialize the library before calling page method');
          |                     ^
      118 |
      119 |             return;
      120 |         }

      at EventTrackingClass.page (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:117:21)
      at ExtractContainerComponent.openDownloadReports (src/lib/containers/extract-container/extract-container.component.ts:151:23)
      at src/lib/pages/extract-container/extract-container.component.spec.ts:117:19
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:386:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (../../../../node_modules/zone.js/dist/proxy.js:117:43)
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:385:36)
      at Zone.Object.<anonymous>.Zone.run (../../../../node_modules/zone.js/dist/zone.js:143:47)
```

# libs/angular/seller-panel/forgot-password

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/forgot-password/src/lib/components/request-password/request-password.component.ts
  39:27  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 1 problem (0 errors, 1 warning)
```

**nx test**

```c
    console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at RequestPasswordComponent.onRequestPassword (src/lib/components/request-password/request-password.component.ts:61:23)
      at src/lib/components/request-password/request-password.component.spec.ts:80:19
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:386:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (../../../../node_modules/zone.js/dist/proxy.js:117:43)
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:385:36)
      at Zone.Object.<anonymous>.Zone.run (../../../../node_modules/zone.js/dist/zone.js:143:47)
```

# libs/angular/seller-panel/helpers

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/helpers/src/lib/api/generic.api.ts
  7:1  warning  Circular dependency between "seller-panel-helpers" and "seller-panel-services" detected: seller-panel-helpers -> seller-panel-services -> seller-panel-helpers  @nrwl/nx/enforce-module-boundaries

✖ 1 problem (0 errors, 1 warning)
```

**nx test**

```c
OK
```

# libs/angular/seller-panel/home

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/home/src/lib/pages/home/home.component.spec.ts
  35:10  warning  'of' is defined but never used                       @typescript-eslint/no-unused-vars
  95:9   warning  'matDialog' is assigned a value but never used       @typescript-eslint/no-unused-vars
  96:9   warning  'currencyPipe' is assigned a value but never used    @typescript-eslint/no-unused-vars
  98:9   warning  'accountService' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 4 problems (0 errors, 4 warnings)
```

**nx test**

```c
  console.warn
    You need to initialize the library before calling page method

      115 |     page(event: string, payload: {}): Observable<any> | any {
      116 |         if (!this.eventTrackingOptions) {
    > 117 |             console.warn('You need to initialize the library before calling page method');
          |                     ^
      118 |
      119 |             return;
      120 |         }

      at EventTrackingClass.page (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:117:21)
      at HomeComponent.onTrackingPage (src/lib/pages/home/home.component.ts:82:23)
      at HomeComponent.ngOnInit (src/lib/pages/home/home.component.ts:64:14)
      at checkAndUpdateDirectiveInline (../../../../../packages/core/src/view/provider.ts:217:15)
      at checkAndUpdateNodeInline (../../../../../packages/core/src/view/view.ts:442:14)
      at checkAndUpdateNode (../../../../../packages/core/src/view/view.ts:402:12)
      at debugCheckAndUpdateNode (../../../../../packages/core/src/view/services.ts:435:44)
```

# libs/angular/seller-panel/integrations

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/integrations/src/lib/components/inputs-apis/inputs-apis.component.ts
   1:28  warning  'OnInit' is defined but never used        @typescript-eslint/no-unused-vars
  11:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 2 problems (0 errors, 2 warnings)
```

**nx test**

```c
OK
```

# libs/angular/seller-panel/login

**nx lint**

```c

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/login/src/lib/login/login.component.spec.ts
  13:1  warning  Circular dependency between "seller-panel-login" and "seller-panel-auth" detected: seller-panel-login -> seller-panel-auth -> seller-panel-login                           @nrwl/nx/enforce-module-boundaries
  15:1  warning  Circular dependency between "seller-panel-login" and "seller-panel-shared" detected: seller-panel-login -> seller-panel-shared -> seller-panel-auth -> seller-panel-login  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/login/src/lib/login/login.component.ts
   9:1   warning  Circular dependency between "seller-panel-login" and "seller-panel-auth" detected: seller-panel-login -> seller-panel-auth -> seller-panel-login  @nrwl/nx/enforce-module-boundaries
  24:21  warning  Unexpected any. Specify a different type                                                                                                          @typescript-eslint/no-explicit-any
  47:85  warning  Unexpected any. Specify a different type                                                                                                          @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/login/src/lib/seller-panel-login.module.ts
  5:1  warning  Circular dependency between "seller-panel-login" and "seller-panel-auth" detected: seller-panel-login -> seller-panel-auth -> seller-panel-login                           @nrwl/nx/enforce-module-boundaries
  6:1  warning  Circular dependency between "seller-panel-login" and "seller-panel-shared" detected: seller-panel-login -> seller-panel-shared -> seller-panel-auth -> seller-panel-login  @nrwl/nx/enforce-module-boundaries

✖ 7 problems (0 errors, 7 warnings)
```

**nx test**

```c
console.warn
    You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at LoginComponent.handleSignUpTrack (src/lib/login/login.component.ts:113:23)
      at LoginComponent.<anonymous> (src/lib/login/login.component.ts:94:26)
      at ../../../../node_modules/tslib/tslib.js:117:75
      at new ZoneAwarePromise (../../../../node_modules/zone.js/dist/zone.js:913:33)
      at Object.__awaiter (../../../../node_modules/tslib/tslib.js:113:16)
```

# libs/angular/seller-panel/services

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/mocks/notifications/notifications.service.mock.ts
   3:64  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   7:64  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  11:70  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/mocks/transactions/transactions.service.mock.ts
   93:23  warning  'id' is defined but never used            @typescript-eslint/no-unused-vars
   93:27  warning  'password' is defined but never used      @typescript-eslint/no-unused-vars
  108:33  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/models/transactions/transaction-filters.model.ts
  1:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/models/transactions/transaction-list.model.ts
  18:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/change-panel/change-panel.service.spec.ts
  29:9  warning  'configService' is assigned a value but never used  @typescript-eslint/no-unused-vars
  32:9  warning  'http' is assigned a value but never used           @typescript-eslint/no-unused-vars
  33:9  warning  'httpMock' is assigned a value but never used       @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/change-panel/change-panel.service.ts
  2:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/change-profile/change-profile.service.spec.ts
  39:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/change-profile/change-profile.service.ts
  6:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/charge/charge.service.spec.ts
  35:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/charge/charge.service.ts
  7:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/ecommerce/ecommerce.service.spec.ts
  32:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/ecommerce/ecommerce.service.ts
  6:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/extract/extract.service.spec.ts
  43:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/extract/extract.service.ts
  7:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/notification/notification.service.ts
   9:64  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  17:64  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  21:70  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/operators/operators.service.ts
  6:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/stores/stores.service.ts
  4:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/transactions/transactions.service.spec.ts
  36:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/transactions/transactions.service.ts
  7:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/resources/withdrawals/withdrawals.service.ts
  4:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/state/seller/seller.service.spec.ts
  71:9  warning  'http' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/services/src/lib/state/seller/seller.service.ts
  7:1  warning  Circular dependency between "seller-panel-services" and "seller-panel-helpers" detected: seller-panel-services -> seller-panel-helpers -> seller-panel-services  @nrwl/nx/enforce-module-boundaries

✖ 30 problems (0 errors, 30 warnings)
```

**nx test**

```c
OK
```

# libs/angular/seller-panel/settings

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/change-password/change-password.component.ts
  41:13  warning  'success' is defined but never used  @typescript-eslint/no-unused-vars
  51:13  warning  'error' is defined but never used    @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/change-plan/change-plan.component.spec.ts
  99:13  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/change-plan/change-plan.component.ts
  64:17  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/my-documents/my-documents.component.spec.ts
  87:9  warning  'notificationService' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/my-documents/my-documents.component.ts
  116:28  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/my-plan/my-plan.component.spec.ts
  129:13  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/components/my-plan/my-plan.component.ts
  73:17  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/guards/password-checker.guard.spec.ts
   1:19  warning  'tick' is defined but never used            @typescript-eslint/no-unused-vars
  29:9   warning  'route' is assigned a value but never used  @typescript-eslint/no-unused-vars
  39:48  warning  'result' is defined but never used          @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/guards/unsaved-changes.guard.spec.ts
   4:10  warning  'RouterTestingModule' is defined but never used    @typescript-eslint/no-unused-vars
  52:9   warning  'currentRoute' is assigned a value but never used  @typescript-eslint/no-unused-vars
  53:9   warning  'currentState' is assigned a value but never used  @typescript-eslint/no-unused-vars
  54:9   warning  'nextState' is assigned a value but never used     @typescript-eslint/no-unused-vars
  67:45  warning  'result' is defined but never used                 @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/settings/src/lib/guards/unsaved-changes.guard.ts
  3:49  warning  'Router' is defined but never used  @typescript-eslint/no-unused-vars

✖ 17 problems (0 errors, 17 warnings)
```

**nx test**

```c
console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at SafeSubscriber.auth.updatePassword.subscribe.changingPassword [as _next] (src/lib/components/change-password/change-password.component.ts:42:31)
      at SafeSubscriber.Object.<anonymous>.SafeSubscriber.__tryOrUnsub (../../../../node_modules/rxjs/src/internal/Subscriber.ts:265:10)
      at SafeSubscriber.Object.<anonymous>.SafeSubscriber.next (../../../../node_modules/rxjs/src/internal/Subscriber.ts:207:14)
      at Subscriber.Object.<anonymous>.Subscriber._next (../../../../node_modules/rxjs/src/internal/Subscriber.ts:139:22)
      at Subscriber.Object.<anonymous>.Subscriber.next (../../../../node_modules/rxjs/src/internal/Subscriber.ts:99:12)
      at CatchSubscriber.Object.<anonymous>.Subscriber._next (../../../../node_modules/rxjs/src/internal/Subscriber.ts:139:22)
      at CatchSubscriber.Object.<anonymous>.Subscriber.next (../../../../node_modules/rxjs/src/internal/Subscriber.ts:99:12)
```

# libs/angular/seller-panel/shared

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/change-profile/change-profile.component.spec.ts
  8:1  warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/change-profile/change-profile.component.ts
  3:1  warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/header/header.component.spec.ts
    9:1  warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries
   61:9  warning  'changePanelService' is assigned a value but never used                                                                                                                    @typescript-eslint/no-unused-vars
  139:9  warning  'authService' is assigned a value but never used                                                                                                                           @typescript-eslint/no-unused-vars
  140:9  warning  'changePanelService' is assigned a value but never used                                                                                                                    @typescript-eslint/no-unused-vars
  141:9  warning  'matDialog' is assigned a value but never used                                                                                                                             @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/header/header.component.ts
  6:1  warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/change-image-profile/change-image-profile.component.ts
  16:47  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/confirm/confirm.component.ts
  1:36  warning  'OnInit' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/dynamic/dynamic.component.spec.ts
   6:10  warning  'By' is defined but never used                                                                @typescript-eslint/no-unused-vars
  12:1   warning  Libraries cannot be imported by a relative or absolute path, and must begin with a npm scope  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component.spec.ts
  54:9  warning  'withDrawalsService' is assigned a value but never used   @typescript-eslint/no-unused-vars
  55:9  warning  'notificationService' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component.ts
  70:17  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-crop/modal-crop.component.spec.ts
  6:33  warning  'ImageCropperModule' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/modal-crop/modal-crop.component.ts
  13:22   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  14:16   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  16:107  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  45:22   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  48:58   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/request-password/request-password.component.spec.ts
  9:1  warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/modals/request-password/request-password.component.ts
   6:1   warning  Circular dependency between "seller-panel-shared" and "seller-panel-auth" detected: seller-panel-shared -> seller-panel-auth -> seller-panel-login -> seller-panel-shared  @nrwl/nx/enforce-module-boundaries
  19:47  warning  Unexpected any. Specify a different type                                                                                                                                   @typescript-eslint/no-explicit-any
  34:13  warning  'response' is defined but never used                                                                                                                                       @typescript-eslint/no-unused-vars
  40:13  warning  'error' is defined but never used                                                                                                                                          @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/components/validation-messages/validation-messages.component.ts
  35:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/directives/auto-tab.directive.spec.ts
  39:9  warning  'inputsWithoutAutoTab' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/directives/character-concealer.directive.spec.ts
  4:10  warning  'dir' is defined but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/guards/biz.guard.spec.ts
  22:9  warning  'route' is assigned a value but never used  @typescript-eslint/no-unused-vars

/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/shared/src/lib/guards/ecommerce.guard.spec.ts
  22:9  warning  'route' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 31 problems (0 errors, 31 warnings)
```

**nx test**

```c
    console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at RequestPasswordComponent.onApplyPassword (src/lib/components/modals/request-password/request-password.component.ts:48:23)
      at src/lib/components/modals/request-password/request-password.component.spec.ts:83:19
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:386:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (../../../../node_modules/zone.js/dist/proxy.js:117:43)
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:385:36)
      at Zone.Object.<anonymous>.Zone.run (../../../../node_modules/zone.js/dist/zone.js:143:47)
```

# libs/angular/seller-panel/transactions

**nx lint**

```c
/Users/guilherme.costa/workspace/picpay/libs/angular/seller-panel/transactions/src/lib/components/cancel-transaction/cancel-transaction.component.ts
  44:17  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)
```

**nx test**

```c
    console.warn
      You need to initialize the library before calling track method

      78 |     track(event: string, payload: {}): Observable<any> | any {
      79 |         if (!this.eventTrackingOptions) {
    > 80 |             console.warn('You need to initialize the library before calling track method');
         |                     ^
      81 |             return;
      82 |         }
      83 |

      at EventTrackingClass.track (../../../packages/event-tracking/src/lib/event-tracking.sdk.ts:80:21)
      at TransactionsFilterComponent.onClose (src/lib/components/transactions-filter/transactions-filter.component.ts:192:23)
      at src/lib/components/transactions-filter/transactions-filter.component.spec.ts:171:19
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:386:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (../../../../node_modules/zone.js/dist/proxy.js:117:43)
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../../../node_modules/zone.js/dist/zone.js:385:36)
      at Zone.Object.<anonymous>.Zone.run (../../../../node_modules/zone.js/dist/zone.js:143:47)
```
