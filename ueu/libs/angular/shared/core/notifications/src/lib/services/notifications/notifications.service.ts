import {
    Injectable,
    Renderer2,
    RendererFactory2,
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    EmbeddedViewRef,
    ComponentRef,
    OnDestroy,
    Type,
} from '@angular/core';

// angular material
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

// components
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { SnackbarTypes } from '../../models';

@Injectable({ providedIn: 'root' })
export class NotificationsService implements OnDestroy {
    private renderer2: Renderer2;

    /**
     *  ## Avoid using this unless absolutely necessary.
     */
    readonly snackbar: ComponentRef<ApolloSnackbar>;

    constructor(
        private dialog: MatDialog,
        private rendererFactory: RendererFactory2,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef,
    ) {
        this.renderer2 = this.rendererFactory.createRenderer(null, null);

        /** Creating a snackbar component and adding it to the DOM */
        this.snackbar = this.appendComponentToBody(ApolloSnackbar, 'pp-root-notifications');
    }

    ngOnDestroy(): void {
        /** Removing the snackbar component from the DOM and destroying it */
        this.appRef.detachView(this.snackbar.hostView);
        this.snackbar.destroy();
    }

    private appendComponentToBody<T>(component: Type<T>, id: string): ComponentRef<T> {
        /* creates the component */
        const componentRef = this.resolver.resolveComponentFactory(component).create(this.injector);

        /* Adds the element to the tree for change detection */
        this.appRef.attachView(componentRef.hostView);

        /* Adds the element to the DOM */
        const DOMElement = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
        DOMElement.id = id;
        this.renderer2.appendChild(document.body, DOMElement);

        return componentRef;
    }

    /**
     *
     * @param title The title you want to be displayed on the confirmation dialog.
     * @param message The message you want to be displayed on the confirmation dialog.
     * @returns Dialog instance reference so you can subscribe to the afterClosed event.
     *
     * @example <caption>Opening a confirmation dialog and subscribing to the afterClosed event </caption>
     *
     * ```
     *          const modalRef = this.modalsService.openConfirmationModal(
     *               'Remove element',
     *               'Are you really sure you want to remove this element?',
     *           );
     *
     *           modalRef
     *               .afterClosed()
     *               .pipe(take(1))
     *               .subscribe(async reason => {
     *                   if (reason && reason.confirm) {
     *                       // add remove element logic here.
     *                   }
     *               });
     * ```
     *
     */
    openConfirmationModal(title: string, message: string): MatDialogRef<ConfirmationModalComponent> {
        const config: MatDialogConfig = {
            panelClass: 'o-modal',
            data: {
                title,
                message,
            },
        };

        const dialog = this.dialog.open(ConfirmationModalComponent, config);

        return dialog;
    }

    /**
     *  Opens a notification snackbar.
     *
     *  @param message The message you want to be displayed on the snackbar.
     *  @param type The type of snackbar you want to be displayed. Default is 'done'.
     *  @param showDismissButton Use this to include a dismiss button. Default is 'false'.
     *  @param emphasis Activates the emphasis mode of the snackbar. Default is 'false'.
     */
    openSnackbar(
        message: string,
        type: SnackbarTypes = SnackbarTypes.DONE,
        showDismissButton: boolean = false,
        emphasis: boolean = false,
    ): void {
        this.snackbar.instance.emphasis = emphasis;
        this.snackbar.instance.showDismissButton = showDismissButton;
        this.snackbar.instance.type = type;
        this.snackbar.instance.setLabel(message);
        this.snackbar.instance.open();
    }
}
