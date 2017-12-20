import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../entities/team/team.service';
import {Team} from '../../entities/team/team.model';
import {JhiAlertService } from 'ng-jhipster';
import {ResponseWrapper } from '../../shared';
import {FormGroup, FormControl} from '@angular/forms';

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
        private jhiAlertService: JhiAlertService
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

