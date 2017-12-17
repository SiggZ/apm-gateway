import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit {
    @ViewChild('jqxListBox') myListBox: jqxListBoxComponent;
    @ViewChild('selectionLog') selectionLog: ElementRef;
    teams: Team[] = new Array();
    source: string[]= new Array();
    dataAdapter: string;
    constructor(
        private teamService: TeamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal

    ) {
        console.log("Constructor called");

    }


    initializeTeams() {
        console.log("Initialize Teams called");
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teams = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.dataAdapter = new jqx.dataAdapter(this.teams);
    }

    ngAfterViewInit() {
    }

    ngOnInit(){
        console.log('Initiated called');
        this.initializeTeams();
        /*        this.source = new Array(); */


        console.log('Results returned'  + this.teams);

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
