import { BaseEntity } from './../../shared';

export class Team implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
