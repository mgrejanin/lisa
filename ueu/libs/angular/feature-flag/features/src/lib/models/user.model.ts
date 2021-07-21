export class User {
    constructor(
        public id: string,
        public name: string,
        public fullname: string,
        public email: string,
        public knownSince: string,
        public picture?: string,
    ) {}
}
