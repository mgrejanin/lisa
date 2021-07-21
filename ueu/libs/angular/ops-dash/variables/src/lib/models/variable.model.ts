import { VariableType } from './variables-type.model';

export class Variable {
    constructor(
        public key: string,
        public value: string,
        public type: VariableType,
        public userId: string,
        public version: number,
        public created_at: string,
    ) {}
}
