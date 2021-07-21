import { CpfPipe } from './cpf.pipe';

describe('CpfPipe', () => {
    let pipe: CpfPipe;

    beforeEach(() => {
        pipe = new CpfPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format cpf number', () => {
        let cpfMock = '00011122233';

        cpfMock = pipe.transform(cpfMock);

        expect(cpfMock).toEqual('000.111.222-33');
    });
});
