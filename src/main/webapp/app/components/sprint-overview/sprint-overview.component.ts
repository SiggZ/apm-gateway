import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Team, TeamService } from '../../entities/team';
import { Person, PersonService } from '../../entities/person';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../../extras/sprint-team';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-sprint-overview',
    templateUrl: './sprint-overview.component.html',
    styleUrls: [
        './sprint-overview.scss'
    ]
})

export class SprintOverviewComponent implements OnInit {
    @Input() displayedSprint: Iteration;

    eventSubscriber: Subscription;
    sprintTeams: Array<SprintTeam>;
    constructor(
        private sprintTeamService: SprintTeamService,
        private jhiAlertService: JhiAlertService,
    ) {};
    ngOnInit(): void {
        this.initializeSprintTeams(this.displayedSprint);
    };
    initializeSprintTeams(sprint: Iteration): void {
        this.sprintTeamService.getBySprint(sprint).subscribe(
            (res: ResponseWrapper) => {
                this.sprintTeams = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };
    onClick() {
        console.log('Sprint View Component Click');
    }
}
