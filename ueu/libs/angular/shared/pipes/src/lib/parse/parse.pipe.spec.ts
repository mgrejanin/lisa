import { ParsePipe } from './parse.pipe';

const mock = {
    mock: true,
    mock2: 'mock',
    mock3: [],
    mock4: ['mock', 'mock', 'mock'],
    mock5: {
        mock: {
            mock: 'mock',
        },
        mock2: {
            mock: 'mock',
            mock2: 'mock',
        },
        mock3: {
            mock: 'mock',
            mock2: 'mock',
            mock3: {
                mock: 'mock',
                mock2: 'mock',
            },
        },
    },
};

describe('ParsePipe', () => {
    it('create an instance', () => {
        const pipe = new ParsePipe();
        expect(pipe).toBeTruthy();
    });

    it('should return an object', () => {
        const pipe = new ParsePipe();

        const stringifiedMock = JSON.stringify(mock);

        const pipedMock = pipe.transform(stringifiedMock);

        expect(pipedMock).toEqual(mock);
    });
});
