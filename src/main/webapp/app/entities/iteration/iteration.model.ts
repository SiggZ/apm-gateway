import { BaseEntity } from '../../shared';

export class Iteration implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public start?: Date,
        public end?: Date,
    ) {
    }
}
