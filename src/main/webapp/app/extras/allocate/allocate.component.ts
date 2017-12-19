import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {FormGroup, FormControl, FormBuilder, Validators, Form} from '@angular/forms';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements OnInit {
    model : Team[];
    showSelectons: Team[];
    teams: Team[];
    iterationChoiceFormGroup: FormGroup;

    constructor(
        private teamService: TeamService,
        private jhiAlertService: JhiAlertService,
        private formBuilder: FormBuilder

    ) {
        console.log("Constructor called");

    }

    loadAll() {
        this.teamService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teams = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnInit(){
        this.loadAll();

        this.iterationChoiceFormGroup = new FormGroup({ dropdownModel: new FormControl() });


        this.iterationChoiceFormGroup.controls['dropdownModel'].valueChanges
            .subscribe((selectedOptions) => {
                console.log("Selection made");
                console.log("Selected " + selectedOptions);
                this.showSelectons = selectedOptions;
            });
    }



}

