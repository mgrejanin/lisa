import { usePlugin } from './use-plugin';

describe('usePlugin function', () => {
    it('should return false for a non-sass file', () => {
        const result = usePlugin('whatever.jpg');

        expect(result).toBe(false);
    });

    it('should return true for a sass file', () => {
        const result = usePlugin('whatever.sass');

        expect(result).toBe(true);
    });

    it('should return true for a scss file', () => {
        const result = usePlugin('whatever.scss');

        expect(result).toBe(true);
    });
});
