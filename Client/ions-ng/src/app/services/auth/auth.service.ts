import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, Constants, FbUser } from '../../models';
import { HttpService } from '../api/http.service';

@Injectable()
export class AuthService {
    private user$ = new ReplaySubject<User>();

    constructor(
        private http: HttpService<any>
    ) {
    }

    public setToken(value: string) {
        localStorage.setItem('token', value);
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public removeToken() {
        localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        //check token here
        return true;
    }

    public signup(user: User): Observable<any> {
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

    public signupWithFB(fbUserData: FbUser): Observable<any> {
        return this.http.post('/users', fbUserData).pipe(
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

    public login(email: string, password: string): Observable<User> {
        this.user$.next(new User());
        return of(new User());
        // return this.http.post('/auth/login', { email: email, password: password })
        //     .pipe(map((result: any) => {
        //         if (result.status === "SUCCESS") {
        //             if (result) {
        //                 this.user$.next(result);                        
        //                 return result;
        //             }
        //             return null;
        //         }
        //         return null;
        //     }), catchError(err => Observable.throw(err)));
    }

    public logout() {
        this.user$.next(null);
    }

    public getUser(): Observable<User> {
        return this.user$.asObservable();
    }
}
