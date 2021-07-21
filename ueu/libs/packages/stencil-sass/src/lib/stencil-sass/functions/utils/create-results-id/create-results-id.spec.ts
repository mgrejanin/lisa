import { createResultsId } from './create-results-id';

describe('createResultsId function', () => {
    it('should swap file extension to css', () => {
        const fileName = 'mock-name';
        const fileExt = 'mockExt';

        const mockFile = `${fileName}.${fileExt}`;
        const expectedResult = `${fileName}.css`;

        const result = createResultsId(mockFile);

        expect(result).toBe(expectedResult);
    });
});
