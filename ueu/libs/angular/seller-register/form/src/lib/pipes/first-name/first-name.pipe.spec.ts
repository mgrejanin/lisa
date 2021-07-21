import { FirstNamePipe } from './first-name.pipe';

describe('FirstNamePipe', () => {
    let pipe: FirstNamePipe;

    beforeEach(() => {
        pipe = new FirstNamePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should must return the first name', () => {
        let nameMock = 'Cebolácio Júnior Menezes da Silva';

        nameMock = pipe.transform(nameMock);

        expect(nameMock).toEqual('Cebolácio');
    });
});
