import {AfterViewInit, Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import {IterationService} from '../../entities/iteration/iteration.service';
import {Iteration} from '../../entities/iteration/iteration.model';
import {FormGroup, FormControl} from '@angular/forms';

import {JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit, OnInit, OnDestroy {
    eventSubscriber: Subscription;
    selectedSprint: Iteration;
    selectedTeams: Array<any>;
    teams: Array<Team>;
    iterations: Array<Iteration>;
    sprintFormGroup: FormGroup;

    constructor(
        private teamService: TeamService,
        private iterationService: IterationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {};

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => {this.initializeTeams(); this.clearSelectedTeams()})
    };
    ngOnInit(): void {
        this.initializeTeams();
        this.initializeIterations();
        this.registerChangeInTeams();

        this.sprintFormGroup = new FormGroup({ sprintDropdownControl: new FormControl() });
    };
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
    ngAfterViewInit(): void {
    /*    this.teamListBox.createComponent(this.options);
        this.teamListBox.onChange.subscribe(
            (event: Event) => this.onListBoxChange(this, event)
        )*/
    };

    initializeTeams(): void {
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => this.onInitTeamsSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    onInitTeamsSuccess(teams: Array<Team>): void {
        this.teams = teams;
       /* this.dataSource.localdata = this.teams;
        this.dataAdapter = new jqx.dataAdapter(this.dataSource);
        this.teamListBox.source(this.dataAdapter);*/
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
  /*  displaySelectedTeams(): void {
        this.selectedTeams = this.teamListBox.getSelectedItems();
    };*/


 /*   onListBoxChange(context: AllocateComponent, event: any): void {
        context.displaySelectedTeams();
    };*/

}
