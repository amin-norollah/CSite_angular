// The only way that we can use password grand type in our
// authentication is to manage connection by our self.
// for this reason I could not use popular libraries like
// oidc-client-ts, unfortunately.
// However, one can easily change this service with oidc-client-ts based
// service to use all its feature.

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { GenericService } from '../generic.service';
import { ControlDialogComponent } from '../dialog/controlDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private _user: any | null;
  isAuth: boolean = false;

  constructor(
    private genericService: GenericService<any>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // log in and log out processes
  LoginByPassword(username: string, password: string): Promise<boolean> {
    // create promise in order to follow it
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = new URLSearchParams();
      body.set('grant_type', 'password');
      body.set('username', username);
      body.set('password', password);
      body.set('scopes', environment.clientScope);
      body.set('grant_type', 'password');
      body.set('client_id', environment.clientId);

      this.genericService
        .LoginCall(environment.idpAuthority + '/connect/token', body)
        .subscribe({
          next: (data: any) => {
            var token = data.access_token;
            var decoded: any = jwt_decode(token);

            this._user = decoded;
            this.isAuth = true;
            localStorage.setItem('auth', 'true');
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('userId', decoded.sub);
            localStorage.setItem('username', username);
            localStorage.setItem('firstName', decoded.name);
            localStorage.setItem('familyName', decoded.family_name);
            localStorage.setItem('role', decoded.role);

            resolve(true);
          },
          error: (error: any) => {
            console.log(error);
            this.dialog.open(ControlDialogComponent, {
              data: {
                title: `${error.statusCode}`,
                message: error.message,
              },
            });

            localStorage.setItem('auth', 'false');

            reject(false);
          },
        });
    });
  }

  async Logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // check if user was authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  get token(): string {
    return localStorage.getItem('accessToken') || '';
  }

  get username(): string {
    return localStorage.getItem('username') || '';
  }

  get name(): string {
    return localStorage.getItem('firstName') || '';
  }

  get family_name(): string {
    return localStorage.getItem('familyName') || '';
  }

  get role(): string {
    return localStorage.getItem('role') || '';
  }

  get userId(): string {
    return localStorage.getItem('userId') || '';
  }

  get user(): any {
    return this._user;
  }
}
