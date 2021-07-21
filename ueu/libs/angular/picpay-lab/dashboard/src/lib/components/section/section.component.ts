import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Section } from '../../models/section.model';

// Components
import { PicPayLabModalUseExampleComponent } from '../../components/modal-use-example/modal-use-example.component';

// Services
import { PicPayLabModalUseExampleService } from '../../services/modal-use-example/modal-use-example.service';
import { PicPayLabSectionService } from '../../services/section/section.service';

@Component({
    selector: 'picpay-lab-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PicPayLabModalUseExampleService],
})
export class PicPayLabSectionComponent {
    items: Section[];

    constructor(
        private dialog: MatDialog,
        private modalUseExampleService: PicPayLabModalUseExampleService,
        private sectionService: PicPayLabSectionService,
    ) {
        this.items = this.sectionService.getSections();
    }

    openDialog(type: string) {
        const useExample = this.modalUseExampleService.getUseExamples(type);
        this.dialog.open(PicPayLabModalUseExampleComponent, {
            width: '640px',
            data: useExample,
        });
    }
}
