import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { IterationComponent } from './iteration.component';
import { IterationDetailComponent } from './iteration-detail.component';
import { IterationPopupComponent } from './iteration-dialog.component';
import { IterationDeletePopupComponent } from './iteration-delete-dialog.component';
import {IterationCopyPopupComponent} from './iteration-copy-dialog.component';

export const iterationRoute: Routes = [
    {
        path: 'iteration',
        component: IterationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'iteration/:id',
        component: IterationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iterationPopupRoute: Routes = [
    {
        path: 'iteration-new',
        component: IterationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iteration/:id/edit',
        component: IterationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iteration/:id/copy',
        component: IterationCopyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iteration/:id/delete',
        component: IterationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
