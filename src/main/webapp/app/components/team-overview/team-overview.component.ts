import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Team, TeamService } from '../../entities/team';
import { Person, PersonService } from '../../entities/person';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../../extras/sprint-team'

@Component({
    selector: 'jhi-team-overview',
    templateUrl: './team-overview.component.html',
    styleUrls: [
        './team-overview.scss'
    ]
})

export class TeamOverviewComponent implements OnInit {
    @Input() sprintTeam: SprintTeam;
    people: Array<Person>;

    constructor(
        private jhiAlertService: JhiAlertService,
    ) {};

    ngOnInit(): void {
    };
}
