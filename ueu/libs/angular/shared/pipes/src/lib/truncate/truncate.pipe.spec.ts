import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should truncate text based on the default value', () => {
        const text = 'mockTextWithMoreThan25Characters';

        const truncatedText = pipe.transform(text);

        expect(truncatedText).toBe('mockTextWithMoreThan25Cha...');
    });

    it('should truncate text based on the character limit', () => {
        const text = 'mockText';

        const truncatedText = pipe.transform(text, 4);

        expect(truncatedText).toBe('mock...');
    });

    it('should not truncate text if the limit is bigger than the text length', () => {
        const text = 'mockText';

        const truncatedText = pipe.transform(text, 100);

        expect(truncatedText).toBe(text);
    });

    it('should truncate text based on completeWords parameter and limit ', () => {
        const text = 'mock text';

        const truncatedText = pipe.transform(text, 7, true);

        expect(truncatedText).toBe('mock...');
    });

    it('should not truncate text if the limit is bigger than the text length (with completeWords param)', () => {
        const text = 'mock text';

        const truncatedText = pipe.transform(text, 100, true);

        expect(truncatedText).toBe(text);
    });

    it('should truncate text and insert ellipsis passed by parameter', () => {
        const text = 'mock text';

        const truncatedText = pipe.transform(text, 7, true, 'mockEllipsis');

        expect(truncatedText).toBe('mockmockEllipsis');
    });
});
