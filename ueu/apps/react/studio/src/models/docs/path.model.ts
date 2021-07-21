import { Method } from './method.model';

export interface Path {
    [key: string]: Method;
}
