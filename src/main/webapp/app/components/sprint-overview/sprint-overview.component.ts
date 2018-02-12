import {Component, Input, OnInit} from '@angular/core';
import {JhiAlertService} from 'ng-jhipster';
import {Iteration} from '../../entities/iteration';
import {SprintTeam, SprintTeamService} from '../../extras/sprint-team';
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

    sprintTeams: Array<SprintTeam>;

    constructor(
        private sprintTeamService: SprintTeamService,
        private jhiAlertService: JhiAlertService,
    ) {};

    ngOnInit(): void {
        this.initializeSprintTeams(this.displayedSprint);
    };

    initializeSprintTeams(sprint: Iteration): void {
        if (sprint != null && sprint !== undefined) {
            this.sprintTeamService.getBySprint(sprint.id).subscribe(
                (res: ResponseWrapper) => {
                    this.sprintTeams = res.json;
                },
            (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };

    onClick() {
        console.log('Sprint View Component Click');
    }
}
