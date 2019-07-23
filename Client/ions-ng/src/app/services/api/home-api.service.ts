import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Home, Constants } from '../../models';
import { HttpService } from '../api/http.service';

@Injectable()
export class HomeApiService {
    constructor(
        private http: HttpService<any>,
    ) { }

    public updateHome(home: Home): Observable<any> {
        return this.http.post('/homes', home).pipe(
            map((result: any) => {
                if (result.status == Constants.Api.ServerResponseStatus.SUCCESS) {
                    if (result.data) {
                        return result.data;
                    }
                    return null;
                }
                return null;
            }), catchError(err => Observable.throw(err)));
    }
}
