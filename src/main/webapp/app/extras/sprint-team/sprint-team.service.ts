import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SprintTeam } from './sprint-team.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {Iteration} from "../../entities/iteration";
import {Team} from "../../entities/team";

@Injectable()
export class SprintTeamService {

    private resourceUrl = '/iterationservice/api/sprint-teams';

    constructor(private http: Http) { }

    createSprintTeams(sprint: Iteration, teams: Team[]) {
        teams.forEach(team => {
            console.log('Create SprintTeam entity for team ' + team.name);
            const sprintTeam: any = {
                team: {
                  id: team.id
                },
                sprint: {
                    id: sprint.id
                }
            };
            console.log(sprintTeam);
            this.create(sprintTeam);
        });
    }

    create(sprintTeam: SprintTeam): Observable<SprintTeam> {
        const copy = this.convert(sprintTeam);
        console.log(copy);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    // update(team: Team): Observable<Team> {
    //     const copy = this.convert(team);
    //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return this.convertItemFromServer(jsonResponse);
    //     });
    // }

    // find(id: string): Observable<Team> {
    //     return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return this.convertItemFromServer(jsonResponse);
    //     });
    // }

    // query(req?: any): Observable<ResponseWrapper> {
    //     const options = createRequestOption(req);
    //     return this.http.get(this.resourceUrl, options)
    //         .map((res: Response) => this.convertResponse(res));
    // }

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
