import { Variable } from './variable.model';

export class VariablesGet {
    constructor(public content: Variable[], public totalElements: number) {}
}
