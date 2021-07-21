import Shadow from './shadow';

describe('Shadow token', () => {
    it('Should have light property', () => {
        expect(Shadow.light).toBeDefined();
    });

    it('Should have medium property', () => {
        expect(Shadow.medium).toBeDefined();
    });

    it('Should have strong property', () => {
        expect(Shadow.strong).toBeDefined();
    });
});
