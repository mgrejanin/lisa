import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ModalComponent } from '@picpay/ops-dash/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { VariablesQuery } from '../../data-access/variables/variables.query';
import { VariablesService } from '../../data-access/variables/variables.service';

import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';

import { VariablesCreateComponent } from '../../components/variables-create/variables-create.component';
import { VariablesDeleteComponent } from '../../components/variables-delete/variables-delete.component';

@Component({
    selector: 'ops-dash-variables-home',
    templateUrl: './variables.component.html',
    styleUrls: ['./variables.component.scss'],
})
export class VariablesHomeComponent implements OnInit {
    variables$: Observable<MatTableDataSource<Variable | Service>>;
    totalItems$: Observable<number>;
    isLoadingListVariables$: Observable<boolean>;
    displayedColumns: string[] = ['key', 'icon'];
    itemsPerPage = 100;
    searchForm: FormGroup;
    @ViewChild('drawer') drawer: MatSidenav;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private variableService: VariablesService,
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private variablesQuery: VariablesQuery,
    ) {
        this.searchForm = this.formBuilder.group({
            searchString: ['', [Validators.minLength(3)]],
            filterOption: ['name'],
        });

        this.totalItems$ = this.variablesQuery.totalItems$;
        this.isLoadingListVariables$ = this.variablesQuery.isLoadingListVariables$;

        this.variables$ = this.variablesQuery.variables$.pipe(
            subscribeUntil(this),
            map((variables: Variable[]) => {
                const matTable = new MatTableDataSource(variables);
                if (
                    this.searchForm.get('searchString').value &&
                    this.searchForm.get('filterOption').value === 'service'
                ) {
                    matTable.paginator = this.paginator;
                }
                return matTable;
            }),
        );
    }

    ngOnInit(): void {
        this.variablesQuery.pageIndex$.pipe(subscribeUntil(this)).subscribe((pageIndex: number) => {
            if (this.paginator) {
                this.paginator.pageIndex = pageIndex;
            }
        });

        this.getVariables();
        this.startUpdateSubscription();
        this.closeSidenavSubscription();
    }

    // atualiza a listagem da home após o cadastro ou exclusão da variável de ambiente
    startUpdateSubscription(): void {
        this.variableService.onVariablesUpdate
            .pipe(
                tap(() => {
                    this.getVariables();
                }),
            )
            .subscribe();
    }

    closeSidenavSubscription(): void {
        this.variableService.onSidenavClose
            .pipe(
                tap(() => {
                    if (this.searchForm.get('filterOption').value === 'name') {
                        this.getVariables();
                        return;
                    }

                    if (this.searchForm.get('filterOption').value === 'service') {
                        this.getServiceSearch();
                        return;
                    }
                }),
            )
            .subscribe(() => this.drawerClose());
    }

    getVariables(): void {
        this.variableService.getVariables(this.itemsPerPage, this.searchForm.get('searchString').value);
    }

    getServiceSearch(): void {
        this.variableService.getServiceSearch(this.searchForm.get('searchString').value);
    }

    applyFilter(filterOptionChanged: boolean) {
        if (this.searchForm.invalid) {
            return;
        }

        if (filterOptionChanged && this.searchForm.get('searchString').value === '') {
            return;
        }

        if (this.searchForm.get('searchString').value === '' || this.searchForm.get('filterOption').value === 'name') {
            this.variableService.setPageIndex(0);
            this.getVariables();
            return;
        }

        this.getServiceSearch();
        this.variableService.setPageIndex(0);
    }

    getPageItems(pageIndex: number): void {
        this.variableService.setPageIndex(pageIndex);
        if (this.searchForm.get('searchString').value && this.searchForm.get('filterOption').value === 'service') {
            return;
        }
        this.getVariables();
    }

    openDialog() {
        const config: MatDialogConfig = {
            panelClass: 'o-modal',
            data: {
                title: 'Criar variável',
                component: VariablesCreateComponent,
            },
        };

        this.dialog.open(ModalComponent, config);
    }

    async drawerClose() {
        await this.drawer.close();
    }

    async selectedItems(paramKey: string) {
        this.variableService.setActiveVariableKey(paramKey);
        await this.drawer.open();
    }

    deleteDialog(key: string) {
        const config: MatDialogConfig = {
            panelClass: 'o-modal',
            data: {
                key,
            },
        };

        this.dialog.open(VariablesDeleteComponent, config);
    }
}
