import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserImage } from './user-image.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserImageService {

    private resourceUrl = '/personservice/api/images';

    constructor(private http: Http) { }

    create(userImage: UserImage): Observable<UserImage> {
        const copy = this.convert(userImage);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userImage: UserImage): Observable<UserImage> {
        const copy = this.convert(userImage);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<UserImage> {
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
     * Convert a returned JSON object to UserImage.
     */
    private convertItemFromServer(json: any): UserImage {
        const entity: UserImage = Object.assign(new UserImage(), json);
        return entity;
    }

    /**
     * Convert a UserImage to a JSON which can be sent to the server.
     */
    private convert(userImage: UserImage): UserImage {
        const copy: UserImage = Object.assign({}, userImage);
        return copy;
    }
}
