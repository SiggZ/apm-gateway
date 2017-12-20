import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import { JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit {
    @ViewChild('teamListBox') teamListBox: jqxListBoxComponent;

    selectedTeams: Array<any>;
    teams: Array<Team>;
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
        private jhiAlertService: JhiAlertService
    ) {};

    ngOnInit(): void {
        this.initializeTeams();
    };

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

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };

    displaySelectedTeams(): void {
        this.selectedTeams = this.teamListBox.getSelectedItems();
    };

    onListBoxChange(context: AllocateComponent, event: any): void {
        context.displaySelectedTeams();
    };

}
