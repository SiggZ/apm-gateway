import {Component, Input, OnInit} from '@angular/core';
import {JhiAlertService} from 'ng-jhipster';
import {PersonService} from '../../entities/person';
import {SprintTeam, SprintTeamService} from '../../extras/sprint-team'
import {ActivatedRoute, Router} from '@angular/router';
import {UserModalService} from '../../admin';

@Component({
    selector: 'jhi-team-overview',
    templateUrl: './team-overview.component.html',
    styleUrls: [
        './team-overview.scss'
    ]
})

export class TeamOverviewComponent implements OnInit {
    @Input() sprintTeam: SprintTeam;
    capacity: string;
    routeSub: any;
    peopleOverviewVisible = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private sprintTeamService: SprintTeamService,
        private route: ActivatedRoute,
        private userModalService: UserModalService,
        private router: Router
    ) {};

    ngOnInit(): void {
        this.getCapacityForSprintTeam(this.sprintTeam.id);
    };

    private getCapacityForSprintTeam(sprintTeamId: string): void {
        this.sprintTeamService.getCapacityForSprintTeam(sprintTeamId).subscribe(
            (capacity: number) =>  this.capacity = capacity.toString(),
            () => this.capacity = 'N/A'
        );
    }

    onClick() {
        if (this.peopleOverviewVisible === false) {
            this.peopleOverviewVisible = true;
        } else {
            this.peopleOverviewVisible = false;
        }
    }
}
