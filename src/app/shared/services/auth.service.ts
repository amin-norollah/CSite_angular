import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userManager: UserManager;
  private _user: User | any;
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();
  public get isLoggedin(): boolean {
    return this.checkUser(this._user);
  }
  //tokens
  private _tokenChangedSubject = new Subject<boolean>();
  public tokenChanged = this._tokenChangedSubject.asObservable();

  constructor() {
    const settings = {
      authority: environment.idpAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}/signin-callback`,
      silent_redirect_uri: `${environment.clientRoot}/silent-callback`,
      post_logout_redirect_uri: `${environment.clientRoot}/signout-callback`,
      response_type: 'code', //password in our real project
      scope: environment.clientScope,
    };
    this.userManager = new UserManager(settings);
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // getting user data if exist
  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // getting the main role of user
  public getRole() {
    return this.getDecodedToken(this._user.access_token)?.role;
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // getting specific claim from token
  public getClaim(claimPropertyName: string): string {
    const decoded_token = this.getDecodedToken(this._user.access_token);
    if (!decoded_token) return '';

    if (decoded_token.hasOwnProperty(claimPropertyName))
      return decoded_token[claimPropertyName];
    else return '';
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // log in and log out processes
  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // check if user was authenticated
  public isAuthenticated = (): Promise<boolean> => {
    return this.getUser().then((user: any) => {
      if (this._user !== user) {
        this._loginChangedSubject.next(this.checkUser(user));
      }

      this._user = user;

      return this.checkUser(user);
    });
  };

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // using refresh token to renew access and id tokens
  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent().then((user) => {
      this._user = user;
      this._tokenChangedSubject.next(true);
      return user;
    });
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // check if user data is valid
  private checkUser = (user: User): boolean => {
    return !!user && !user.expired;
  };

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // decoding the token and extract its data
  public getDecodedToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // check if the token is valid and not expired
  public getTokenValidity(token_expiry: Number): boolean {
    return Math.floor(new Date().getTime() / 1000) < token_expiry;
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  public getAccessToken(): string {
    if (!this._user) return '';
    return 'Bearer ' + this._user?.access_token;
  }

  public getIdToken(): string {
    if (!this._user) return '';
    return 'Bearer ' + this._user?.id_token;
  }

  public getRefreshToken(): string {
    return this._user?.refresh_token;
  }

  public getUserId(): string {
    if (!this._user) return '';
    return this.getDecodedToken(this._user.access_token)?.sub;
  }
}
