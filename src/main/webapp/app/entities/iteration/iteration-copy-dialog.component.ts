import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { IterationPopupService } from './iteration-popup.service';
import { IterationService } from './iteration.service';
import {IterationDialogComponent} from './iteration-dialog.component';
import {SprintTeam, SprintTeamService } from '../../extras/sprint-team';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-iteration-copy-dialog',
    templateUrl: './iteration-copy-dialog.component.html'
})
export class IterationCopyDialogComponent implements OnInit {

    iteration: Iteration;
    isSaving: boolean;
    startDp: any;
    endDp: any;
    sprintTeams: Array<SprintTeam>;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private iterationService: IterationService,
        private sprintTeamService: SprintTeamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sprintTeamService.getBySprint(this.iteration.id).subscribe(
            (res: ResponseWrapper) => {
                this.sprintTeams = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.iteration.id = undefined;
        this.subscribeToSaveResponse(
                this.iterationService.create(this.iteration));

    }

    private subscribeToSaveResponse(result: Observable<Iteration>) {
        result.subscribe((res: Iteration) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Iteration) {
        for (var sprteam of this.sprintTeams) {
                sprteam.id = undefined;
                sprteam.sprint = result;
                this.sprintTeamService.create(sprteam).subscribe(
                    (response: SprintTeam) => console.log('Successfully created SprintTeam for ' + response.team.name),
                    (error: any) => console.log('Failed to create SprintTeam: ' + error) // TODO: handle errors?
                );
        }

        this.eventManager.broadcast({ name: 'iterationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-iteration-popup',
    template: ''
})
export class IterationCopyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterationPopupService: IterationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
             if ( params['id'] ) {
                this.iterationPopupService
                    .open(IterationCopyDialogComponent as Component, params['id']);
            } else {
                this.iterationPopupService
                    .open(IterationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
