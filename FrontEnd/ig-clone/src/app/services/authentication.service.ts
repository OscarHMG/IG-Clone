import {environment} from '../../environments/environment'

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Token } from '../models/token';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        
    }

    public get currentUserValue(): string {
        let token = JSON.parse(localStorage.getItem('currentUser')!);
        return token;
    }

    getProfileInformation(){
        return this.http.get<User>(`${environment.baseUrl}api/users/get_profile_info/`);
    }

    login(username:string, password:string) {

        let body = {
            username : username,
            password : password
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }),
            observe: "events"
        }


        return this.http.post<Token>(`${environment.baseUrl}auth/`, body)
        .pipe(
            map(tokenResponse => {

                    localStorage.setItem('currentUser', JSON.stringify(tokenResponse.token));
                    return tokenResponse.token;
                }
            )
        )

    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }



}