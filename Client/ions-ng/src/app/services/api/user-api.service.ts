import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, Constants } from '../../models';
import { HttpService } from '../api/http.service';

@Injectable()
export class UserApiService {
    constructor(
        private http: HttpService<any>,
    ) { }

    public updateUser(user: User): Observable<any> {
        return this.http.post('/users', user).pipe(
            map((result: any) => {
                if (result.status === Constants.Api.ServerResponseStatus.SUCCESS) {
                    if (result.data) {
                        return result.data;
                    }
                    return null;
                }
                return null;
            }), catchError(err => Observable.throw(err)));
    }
}
