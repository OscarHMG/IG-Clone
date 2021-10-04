import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = this.authenticationService.currentUserValue;
        
        if (token) {
            console.log('INTERCEPTOR TOKEN', token);
            request = request.clone({
                setHeaders: { 
                    Authorization: `Token ${token}`,
                    
                },
                withCredentials: true,
            });
        }

        console.log(request);
        return next.handle(request);
    }
}