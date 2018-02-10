import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public surname?: string,
        public location?: string,
        public grade?: string,
        public projectAvailability?: number,
        public sprintAvailability?: number,
        public ahcr?: number,
    ) {
    }
}
