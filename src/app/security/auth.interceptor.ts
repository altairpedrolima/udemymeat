import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    // constructor(private loginService: LoginService) { }

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        */

        const loginService = this.injector.get(LoginService);

        if (loginService.isLoggedIn()) {

            const authRequest = request.clone(
                { setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } }
            );  // clone porque request é imutável
            return next.handle(authRequest);

        } else {
            return next.handle(request);
        }

    }
}