import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {createRequestOption, ResponseWrapper} from '../../shared';

import {SprintTeam} from './sprint-team.model';

@Injectable()
export class SprintTeamService {

    private resourceUrl = '/iterationservice/api/sprint-teams';

    constructor(private http: Http) { }

    create(sprintTeam: SprintTeam): Observable<SprintTeam> {
        const copy = this.convert(sprintTeam);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sprintTeam: SprintTeam): Observable<SprintTeam> {
        // TODO: implement - necessary for updating people in a SprintTeam
        return null;
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    getBySprint(sprint?: any): Observable<ResponseWrapper> {
        return this.http.get('/iterationservice/api/sprint-teams-by-sprint/' + sprint.id)
            .map((res: Response) => this.convertResponse(res));
    }

    getCapacityForSprintTeam(sprintTeamId: string): Observable<number> {
        return this.http.get(`${this.resourceUrl}/${sprintTeamId}/capacity`)
            .map((res: Response) => {return JSON.parse(res.json());});
    }

    getVelocityForSprintTeam(sprintTeamId: string): Observable<number> {
        return this.http.get(`${this.resourceUrl}/${sprintTeamId}/velocity`)
            .map((res: Response) => {return JSON.parse(res.json());});
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
     * Convert a returned JSON object to SprintTeam.
     */
    private convertItemFromServer(json: any): SprintTeam {
        const entity: SprintTeam = Object.assign(new SprintTeam(), json);
        return entity;
    }

    /**
     * Convert a SprintTeam to a JSON which can be sent to the server.
     */
    private convert(sprintTeam: SprintTeam): SprintTeam {
        const copy: SprintTeam = Object.assign({}, sprintTeam);
        return copy;
    }
}
