import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Team } from '../../entities/team/team.model';
import { TeamService } from '../../entities/team/team.service';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit, OnInit {
@ViewChild('jqxListBox') myListBox: jqxListBoxComponent;
@ViewChild('selectionLog') selectionLog: ElementRef;
    currentAccount: any;
    teams: Team[];
    source: string[];

    dataAdapter: string = new jqx.dataAdapter(this.source);

    constructor(
        private teamService: TeamService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal
    ) {
    }

    displaySelectedItems() {
        //  this.selectedTeams = this.myListBox.getSelectedItems();
        console.log('SelectedItems clicked');
    }

    loadAll() {
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teams = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTeams();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    ngAfterViewInit() {
        this.myListBox.selectIndex(2);
        this.myListBox.selectIndex(5);
        this.myListBox.selectIndex(7);
    }

}
