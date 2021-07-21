import { Pipe, PipeTransform } from '@angular/core';

import { CpfPipe } from '../cpf/cpf.pipe';

@Pipe({
    name: 'cpfCnpj',
})
export class CpfCnpjPipe implements PipeTransform {
    constructor(private cpfPipe: CpfPipe) {}

    transform(value: string): string {
        if (!value) {
            return '';
        }

        const rawValue = value.replace(/\D/g, '');

        if (rawValue.length <= 11) {
            return this.formatCPF(rawValue);
        }

        return this.formatCNPJ(rawValue);
    }

    private formatCPF(value: string): string {
        return this.cpfPipe.transform(value);
    }

    private formatCNPJ(value: string): string {
        let formattedValue = value.replace(/^(\d{2})(\d)/, '$1.$2');
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, '.$1/$2');
        formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2');
        return formattedValue;
    }
}
