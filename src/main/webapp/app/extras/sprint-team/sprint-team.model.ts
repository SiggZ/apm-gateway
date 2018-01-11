import { BaseEntity } from '../../shared';
import {Iteration} from "../../entities/iteration";
import {Team} from "../../entities/team";

export class SprintTeam implements BaseEntity {
    constructor(
        public id?: string,
        public sprint?: Iteration,
        public team?: Team
    ) {
    }
}
