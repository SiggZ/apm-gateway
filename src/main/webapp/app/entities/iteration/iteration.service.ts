import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IterationService {

    private resourceUrl = '/iterationservice/api/iterations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(iteration: Iteration): Observable<Iteration> {
        const copy = this.convert(iteration);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(iteration: Iteration): Observable<Iteration> {
        const copy = this.convert(iteration);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Iteration> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Iteration.
     */
    private convertItemFromServer(json: any): Iteration {
        const entity: Iteration = Object.assign(new Iteration(), json);
        entity.start = this.dateUtils
            .convertDateTimeFromServer(json.start);
        entity.end = this.dateUtils
            .convertDateTimeFromServer(json.end);
        return entity;
    }

    /**
     * Convert a Iteration to a JSON which can be sent to the server.
     */
    private convert(iteration: Iteration): Iteration {
        const copy: Iteration = Object.assign({}, iteration);

        copy.start = this.dateUtils.toDate(iteration.start);

        copy.end = this.dateUtils.toDate(iteration.end);
        return copy;
    }
}