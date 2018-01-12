import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';

import { ResponseWrapper } from '../../shared';
import { Team, TeamService } from '../../entities/team';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../sprint-team'

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements OnInit, OnDestroy {
    eventSubscriber: Subscription;
    selectedSprint: Iteration;
    selectedTeams: Array<Team>;
    teams: Array<Team>;
    iterations: Array<Iteration>;
    sprintControl: FormControl;
    teamSelectionControl: FormControl;

    constructor(
        private teamService: TeamService,
        private iterationService: IterationService,
        private sprintTeamService: SprintTeamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {};

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => {this.handleTeamModification()})
    };

    ngOnInit(): void {
        this.initializeTeams();
        this.initializeIterations();
        this.registerChangeInTeams();
        this.sprintControl = new FormControl();
        this.sprintControl.valueChanges.subscribe((event: any) => {
            console.log('Sprint Selection made');
            this.initializeTeamsForSprint();
        });
        this.teamSelectionControl = new FormControl();
        this.teamSelectionControl.valueChanges.subscribe((event: any) => {
            console.log('Team Selection made');
        });
    };

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    };

    initializeTeamsForSprint() {
        console.log('Change that later');
        this.initializeTeams();
        this.selectedTeams = new Array<Team>();
    };

    initializeTeams(): void {
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => this.onInitTeamsSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    onInitTeamsSuccess(teams: Array<Team>): void {
        this.teams = teams;
    };

    initializeIterations(): void {
        this.iterationService.query().subscribe(
            (res: ResponseWrapper) => this.onInitIterationsSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    onInitIterationsSuccess(iterations: Array<Iteration>): void {
        this.iterations = iterations;
    };

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };

    clearSelectedTeams(): void {
        this.selectedTeams = new Array<any>();
    };

    private handleTeamModification() {
        const selectedTeamsIds = this.selectedTeams.map((x) =>  x.id);
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teams = res.json;
                this.selectedTeams = new Array<Team>();
                for (var ateam of this.teams) {
                    if (selectedTeamsIds.indexOf(ateam.id) > -1) {
                        console.log(ateam.name);
                        this.selectedTeams.push(ateam);
                    }
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    // create SprintTeam entities for the selected teams in the sprint
    createSprintTeams() {
        this.selectedTeams.forEach((team) => {
            console.log('Create SprintTeam entity for team ' + team.name);
            const sprintTeam: SprintTeam = {
                sprint: {
                    id: this.selectedSprint.id
                },
                team: {
                    id: team.id
                }
            };
            this.sprintTeamService.create(sprintTeam).subscribe(
                (response: SprintTeam) => console.log('Successfully created SprintTeam for ' + response.team.name),
                (error: any) => console.log('Failed to create SprintTeam: ' + error) // TODO: handle errors?
            );
        });
        this.jhiAlertService.success(this.selectedSprint.name + ' has been saved successfully.');
    }
}
