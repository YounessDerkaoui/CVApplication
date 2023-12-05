import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, mergeMap, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';

const LOGIN_API = environment.baseUrl + '/auth/login';
const INFO_API = environment.baseUrl + '/auth/info';
const REFRESH_API = environment.baseUrl + '/auth/refresh';

class LoginResponse {
  accessToken?: string;
  refreshToken?: string;
}

class RefreshResponse {
  accessToken?: string;
}

class UserInfo {
  username?: string;
  enabled?: boolean;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt: JwtHelperService = new JwtHelperService();
  private authStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());


  constructor(private http:HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`authentication error: ${error.error.message}`);
    } else {
      console.error(`bad auth response: ${error.status}: ${error.statusText} ${JSON.stringify(error.error)}`);
    }
    return throwError('Login attempt failed');
  }

  subscribe(next: (status: boolean) => void) {
    this.authStatus.subscribe(next);
  }
  authenticate(username: string, password: string) {
    return this.http.post<LoginResponse>(LOGIN_API, { username, password })
      .pipe(
        mergeMap(response => {
          // store JWTs
          localStorage.setItem('accessToken', <string>response.accessToken);
          localStorage.setItem('refreshToken', <string>response.refreshToken);

          // now get user info
          const opts = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken')  // tslint:disable-line:object-literal-key-quotes
            })
          };
          return this.http.get<UserInfo>(INFO_API, opts).pipe(
            map(userInfo => {
              localStorage.setItem('username', <string>userInfo.username);
              localStorage.setItem('enabled', String(userInfo.enabled));
              localStorage.setItem('isAdmin', String(userInfo.isAdmin));
              this.authStatus.next(true);
            })
          );
        }),
        catchError(this.errorHandler)
      );
  }

  deauthenticate() {
    localStorage.clear();
    this.authStatus.next(false);
  }

  // Get access token, automatically refresh if necessary
  getAccessToken(): Observable<string> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!this.jwt.isTokenExpired(accessToken)) {
      // @ts-ignore
      return new BehaviorSubject(accessToken);
    } else if (!this.jwt.isTokenExpired(refreshToken)) {
      console.log('refreshing access token');
      const opts = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + refreshToken
        })
      };
      // @ts-ignore
      return this.http.post<RefreshResponse>(REFRESH_API, {}, opts).pipe(
        map(response => {
          localStorage.setItem('accessToken', <string>response.accessToken);
          console.log('authentication refresh successful');
          return response.accessToken;
        })
      );
    } else {
      return throwError('refresh token is expired');
    }
  }

  // User is logged in
  isAuthenticated(): boolean {
    return localStorage.getItem('username') !== null &&
      localStorage.getItem('enabled') === 'true' &&
      !this.jwt.isTokenExpired(localStorage.getItem('refreshToken'));
  }

  // User is an administrator
  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  // get username
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

}
