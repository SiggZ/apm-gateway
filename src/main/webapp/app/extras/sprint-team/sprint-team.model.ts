import { BaseEntity } from '../../shared';
import { Iteration } from '../../entities/iteration';
import { Team } from '../../entities/team';
import {Person} from '../../entities/person/person.model';

export class SprintTeam implements BaseEntity {
    constructor(
        public id?: string,
        public sprint?: Iteration,
        public team?: Team,
        public persons?: any[]
    ) {
    }
}
