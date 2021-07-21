import { CpfCnpjPipe } from './cpf-cnpj.pipe';
import { CpfPipe } from '../cpf/cpf.pipe';

describe('CpfCnpjPipe', () => {
    let pipe: CpfCnpjPipe;

    beforeEach(() => {
        pipe = new CpfCnpjPipe(new CpfPipe());
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty value', () => {
        let cnpjMock = '';

        cnpjMock = pipe.transform(cnpjMock);

        expect(cnpjMock).toEqual('');
    });

    it('should format to CNPJ', () => {
        let cnpjMock = '00913443000173';

        cnpjMock = pipe.transform(cnpjMock);

        expect(cnpjMock).toEqual('00.913.443/0001-73');
    });

    it('should format to CPF', () => {
        let cpfMock = '40090750071';

        cpfMock = pipe.transform(cpfMock);

        expect(cpfMock).toEqual('400.907.500-71');
    });
});
