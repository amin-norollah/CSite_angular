import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  UrlTree,
  UrlSegment,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let isUserAllowed = true;
    if (this._authService.isAuthenticated()) {
      const userRole = this._authService.role;
      if (Array.isArray(userRole)) {
        let isUserRolesInclude = false;
        for (let i = 0; i < userRole.length; i++) {
          if (
            !route.data['roles'] ||
            route.data['roles'].indexOf(userRole[i]) !== -1
          ) {
            isUserRolesInclude = true;
            break;
          }
        }
        isUserAllowed = isUserRolesInclude;
      } else {
        if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1)
          isUserAllowed = false;
      }
    }

    if (!isUserAllowed) this._router.navigate(['/login']);
    return isUserAllowed;
  }
}
