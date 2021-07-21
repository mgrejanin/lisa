import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// pipes
import { CpfCnpjPipe } from './cpf-cnpj/cpf-cnpj.pipe';
import { CpfPipe } from './cpf/cpf.pipe';
import { ParsePipe } from './parse/parse.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';

const resources = [TruncatePipe, CpfPipe, CpfCnpjPipe, ParsePipe];

@NgModule({
    imports: [CommonModule],
    declarations: resources,
    providers: resources,
    exports: resources,
})
export class SharedPipesModule {}
