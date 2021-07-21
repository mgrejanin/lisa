import { normalizePath } from './normalize-path';

describe('normalizePath function', () => {
    it('Should throw error if an invalid parameter is used', () => {
        expect(() => normalizePath(null)).toThrow('invalid path to normalize');
    });

    it('should return a valid path without alterations', () => {
        const mockPath = 'path/to/something.scss';

        const result = normalizePath(mockPath);

        expect(result).toBe(mockPath);
    });

    it('should remove the spaces of a valid path', () => {
        const mockPath = 'path/to/something.scss  ';

        const expectedPath = mockPath.trim();

        const result = normalizePath(mockPath);

        expect(result).toBe(expectedPath);
    });

    it('should swap "\\" for "/"', () => {
        const mockPath = 'path\\to\\something.scss';

        const expectedPath = 'path/to/something.scss';

        const result = normalizePath(mockPath);

        expect(result).toBe(expectedPath);
    });

    it('should remove the slash at the end of the path', () => {
        const mockPath = 'path/to/something.scss/';

        const expectedPath = 'path/to/something.scss';

        const result = normalizePath(mockPath);

        expect(result).toBe(expectedPath);
    });
});
