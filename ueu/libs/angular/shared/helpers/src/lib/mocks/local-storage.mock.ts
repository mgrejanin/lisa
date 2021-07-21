/**
 * @description - Simulate Window LocalStorage to be used in tests
 */
export class LocalStorageMock {
    store = {};

    get length() {
        return Object.keys(this.store).length;
    }

    setItem(key, value) {
        this.store[key] = value || '';
    }

    getItem(key) {
        return key in this.store ? this.store[key] : null;
    }

    removeItem(key) {
        delete this.store[key];
    }

    key(i) {
        const keys = Object.keys(this.store);
        return keys[i] || null;
    }

    clear() {
        this.store = {};
    }
}
