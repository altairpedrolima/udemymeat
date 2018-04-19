import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {
    }

    checkAuthentication(path: string): boolean {
        const logedIn = this.loginService.isLoggedIn();
        if (!logedIn) {
            this.loginService.handleLogin(`/${path}`);
        }
        return logedIn;
    }

    canLoad(route: Route): boolean {
        console.log('canLoad');
        return this.checkAuthentication(route.path);
    }

    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('canActivate');
        return this.checkAuthentication(activateRoute.routeConfig.path);
    }
}