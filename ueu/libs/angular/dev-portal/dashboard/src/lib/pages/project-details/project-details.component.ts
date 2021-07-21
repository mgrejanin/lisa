import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    AuthQuery,
    ContactFormComponent,
    initials,
    Product,
    ProductsQuery,
    Project,
    ProjectsQuery,
    ProjectsService,
    User,
} from '@picpay/dev-portal/shared';

import { NotificationsService } from '@picpay/angular/shared/core/notifications';
import { EventTracking } from '@picpay/event-tracking';
import { PicpayKeycloakProfile } from '@picpay/keycloak';
import { Observable } from 'rxjs';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
@Component({
    selector: 'dev-portal-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
    products$: Observable<Product[]>;
    projects$: Observable<Project[]>;
    error$: Observable<unknown>;
    loading$: Observable<boolean>;
    activatedProject$: Observable<Project>;
    activatedProject: Project;
    user$: Observable<PicpayKeycloakProfile<User>>;
    createdProject: boolean;

    constructor(
        private authQuery: AuthQuery,
        private query: ProjectsQuery,
        private queryProducts: ProductsQuery,
        private notifications: NotificationsService,
        private service: ProjectsService,
        private dialog: MatDialog,
    ) {
        this.activatedProject$ = this.query.activatedProject$;
        this.projects$ = this.query.projects$;
        this.activatedProject = this.query.getActive();
        this.products$ = this.queryProducts.products$;
        this.user$ = this.authQuery.user$;
        this.error$ = this.query.selectError();
        this.loading$ = this.query.selectLoading();
        this.createdProject = false;
    }

    getInitials(str: string): string {
        if (str) {
            return initials(str);
        }
    }

    deleteProject(project: Project): void {
        const modalRef = this.notifications.openConfirmationModal(
            'Excluir projeto',
            `Você tem certeza que deseja deletar esse projeto? Não 
                será possível desfazer a mudança.`,
        );

        modalRef
            .afterClosed()
            .pipe(subscribeUntil(this))
            .subscribe(reason => {
                if (reason && reason.confirm) {
                    this.service.deleteProject(project);
                }
            });
    }

    favoriteProject(id: Project['id'], favorite: Project['favorite']): void {
        this.service.favoriteProject(id, (favorite = !favorite));
    }

    setAvatar(newAvatar: Blob, project: Project): void {
        const newProject: Project = {
            ...project,
            image: newAvatar,
        };
        this.service.editProject(newProject).pipe(subscribeUntil(this)).subscribe();
    }

    openDialog(product: Product): void {
        const slug = product.slug.toLocaleUpperCase();
        EventTracking.track(`Button Clicked`, {
            button_name: `BOTAO_CONTATO_${slug}`,
            page_name: `STUDIO_PICPAY_${slug}`,
            context: `${slug}`,
        });
        this.user$.pipe(subscribeUntil(this)).subscribe(user => {
            this.dialog.open(ContactFormComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                panelClass: 'modal-control',
                data: {
                    user,
                    slug: product.slug,
                    doc: 'internal',
                },
            });
        });
    }
}
