// interfaces
import { User } from './user.model';

export class FeatureAuditing {
    constructor(
        public id: string,
        public message: string,
        public createdAt: string,
        public version: number,
        public time: string,
        public user: User,
    ) {}
}
