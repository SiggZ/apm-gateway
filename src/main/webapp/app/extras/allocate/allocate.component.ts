import {AfterViewInit, Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import {IterationService} from '../../entities/iteration/iteration.service';
import {Iteration} from '../../entities/iteration/iteration.model';

import {JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('teamListBox') teamListBox: jqxListBoxComponent;
    eventSubscriber: Subscription;
    selectedTeams: Array<any>;
    teams: Array<Team>;
    iterations: Array<Iteration>;
    dataSource: any = {
        datatype: 'array',
        datafields: [
            { name: 'id' },
            { name: 'name' },
        ],
        localdata: this.teams
    };
    dataAdapter = new jqx.dataAdapter(this.dataSource);
    options: any = {
        source: this.dataAdapter,
        displayMember: 'name',
        valueMember: 'id',
        multiple: true,
        width: 200,
        height: 250
    };

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
    };
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
    ngAfterViewInit(): void {
        this.teamListBox.createComponent(this.options);
        this.teamListBox.onChange.subscribe(
            (event: Event) => this.onListBoxChange(this, event)
        )
    };

    initializeTeams(): void {
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => this.onInitTeamsSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    onInitTeamsSuccess(teams: Array<Team>): void {
        this.teams = teams;
        this.dataSource.localdata = this.teams;
        this.dataAdapter = new jqx.dataAdapter(this.dataSource);
        this.teamListBox.source(this.dataAdapter);
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

    displaySelectedTeams(): void {
        this.selectedTeams = this.teamListBox.getSelectedItems();
    };
    clearSelectedTeams(): void {
        this.selectedTeams = new Array<any>();
    };

    onListBoxChange(context: AllocateComponent, event: any): void {
        context.displaySelectedTeams();
    };

}
