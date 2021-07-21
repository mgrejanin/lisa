import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpf',
})
export class CpfPipe implements PipeTransform {
    transform(value: string): string {
        let str = value;
        str = str.replace(/\D/g, '');
        str = str.replace(/^(\d{3})(\d)/, '$1.$2');
        str = str.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        str = str.replace(/\.(\d{3})(\d)/, '.$1-$2');
        return str;
    }
}
