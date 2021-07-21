export class FFConfig {
    isProd: boolean;
    interval: number;

    constructor(isProd: boolean, interval: number) {
        this.isProd = isProd;
        this.interval = interval;
    }
}
