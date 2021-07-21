import { VariableType } from './variables-type.model';

export class VariablesUpdate {
    constructor(public value: string, public type: VariableType) {}
}
