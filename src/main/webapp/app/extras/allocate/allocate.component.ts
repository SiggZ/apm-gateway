import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ResponseWrapper } from '../../shared';
import { Team, TeamService } from '../../entities/team';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../sprint-team';
import { Person, PersonService } from '../../entities/person';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html',
    styleUrls: [
        './allocate.scss'
    ]
})
export class AllocateComponent implements OnInit, OnDestroy {
    eventSubscriber: Subscription;
    selectedSprint: Iteration;
    selectedTeams: Array<Team>;
    people: Array<Person>;
    teams: Array<Team>;
    iterations: Array<Iteration>;
    sprintControl: FormControl;
    teamSelectionControl: FormControl;
    assignPeopleToTeamVisible = true;
    sprintTeams:  Array<SprintTeam>;
    constructor(
        private teamService: TeamService,
        private iterationService: IterationService,
        private sprintTeamService: SprintTeamService,
        private personService: PersonService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {};

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => {this.updateScreen()})
    };

    ngOnInit(): void {
        this.initializeTeams();
        this.initializeIterations();
        this.registerChangeInTeams();
        this.sprintControl = new FormControl();
        this.sprintControl.valueChanges.subscribe((event: any) => {
            this.initializeTeamsForSprint();
        });
        this.teamSelectionControl = new FormControl();
        this.teamSelectionControl.valueChanges.subscribe((event: any) => {
        });
    };

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
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

    initializeTeamsForSprint() {
        this.initializeTeams();
        this.selectedTeams = new Array<any>();
        if (this.selectedSprint != null) {
            this.sprintTeamsForSprint(this.selectedSprint);
        }

    };

    addPeopleToSprintTeam(sprteam: SprintTeam) {
        this.personService.query().subscribe(
            (res: ResponseWrapper) => {
                this.people = res.json;
                sprteam.sprintTeamPersons = new Array<Person>();
                for (var i = 0; i < 5; i++) {
                    sprteam.sprintTeamPersons.push(this.people[i]);
                }

            },
                    (res: ResponseWrapper) => this.onError(res.json)
        );

    };

    sprintTeamsForSprint(sprint: Iteration): void {
        if (sprint != null && sprint !== undefined) {

            this.sprintTeamService.getBySprint(sprint.id).subscribe(
                (res: ResponseWrapper) => {
                    this.sprintTeams = res.json;
                    this.selectedTeams = this.sprintTeams.map((x) => x.team);
                    this.updateScreen();
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    };
    reloadOnlySprintTeamsForSprint(sprint: Iteration): void {
        if (sprint != null && sprint !== undefined) {

            this.sprintTeamService.getBySprint(sprint.id).subscribe(
                (res: ResponseWrapper) => {
                    this.sprintTeams = res.json;
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    };

    getTeamsForSprint(): void {
        this.sprintTeamsForSprint(this.selectedSprint);
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

    private updateScreen() {
        const selectedTeamsIds = this.selectedTeams.map((x) =>  x.id);
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teams = res.json;
                this.selectedTeams = new Array<Team>();
                for (var ateam of this.teams) {
                    if (selectedTeamsIds.indexOf(ateam.id) > -1) {
                        this.selectedTeams.push(ateam);
                    }
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    // create SprintTeam entities for the selected teams in the sprint
    createSprintTeams() {
        if (this.selectedSprint != null && this.selectedSprint !== undefined) {
        this.sprintTeamService.getBySprint(this.selectedSprint.id).subscribe(
            (res: ResponseWrapper) => {
                this.sprintTeams = res.json;
                const teamsInSprintIds = this.sprintTeams.map((x) =>  x.team.id);
                const selectedTeamsIds = this.selectedTeams.map((x) =>  x.id);
                var toCreate = new Array<Team>();
                var toDelete = new Array<SprintTeam>();
                var toUpdate = new Array<Team>();

                for (var selTeam of this.selectedTeams) {
                    if (teamsInSprintIds.indexOf(selTeam.id) > -1) {
                        console.log('Selected exists' + selTeam.name );
                        toUpdate.push(selTeam);
                    } else {
                        console.log('Selected will be created ' + selTeam.name);
                        toCreate.push(selTeam);
                    }
                }
                for (var sprTeam of this.sprintTeams) {
                    if (selectedTeamsIds.indexOf(sprTeam.team.id) > -1) {
                        console.log('Do nothing' + sprTeam.team.name );
                    } else {
                        console.log('Selected will be created ' + sprTeam.team.name);
                        toDelete.push(sprTeam);
                    }
                }

                toCreate.forEach((team) => {
                    console.log('Create SprintTeam entity for team ' + team.name);
                    var sprintTeam: SprintTeam = {
                        sprint: {
                            id: this.selectedSprint.id
                        },
                        team: {
                            id: team.id
                        }
                    };
                    sprintTeam.sprintTeamPersons = new Array<any>();

                    this.sprintTeamService.create(sprintTeam).subscribe(
                        (response: SprintTeam) => console.log('Successfully created SprintTeam for ' + response.team.name),
                        (error: any) => console.log('Failed to create SprintTeam: ' + error) // TODO: handle errors?
                    );
                });
                toUpdate.forEach((team) => {
                    console.log('Update SprintTeam entity for team ' + team.name);
                });
                toDelete.forEach((spteam) => {
                    console.log('Delete SprintTeam entity for team ' + spteam.team.name);
                    this.sprintTeamService.delete(spteam.id).subscribe(
                        (response: Response) => console.log('Successfully deleted SprintTeam'),
                        (error: any) => console.log('Failed to delete SprintTeam: ' + error) // TODO: handle errors?
                    );
                });
                this.jhiAlertService.success(this.selectedSprint.name + ' has been saved successfully.');

            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        }
    };
}
