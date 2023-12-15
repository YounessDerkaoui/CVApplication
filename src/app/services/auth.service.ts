import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, mergeMap, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from "@angular/router";

const LOGIN_API = environment.baseUrl + '/auth/login';
const INFO_API = environment.baseUrl + '/auth/info';
const REFRESH_API = environment.baseUrl + '/auth/refresh';
const RESET_PASSWORD_API = environment.baseUrl + '/auth/reset-password';
const VERIFY_RESET_CODE_API = environment.baseUrl + '/auth/verify-reset-code';
const CHANGE_PASSWORD_API = environment.baseUrl + '/auth/change-password';

class LoginResponse {
  accessToken?: string;
  refreshToken?: string;
}

class RefreshResponse {
  accessToken?: string;
}

class UserInfo {
  id?: string;
  username?: string;
  currentPosition?: string;
  email?: string;
  enabled?: boolean;
  roles?: Role[];
}

class Role {
  id?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt: JwtHelperService = new JwtHelperService();
  private authStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());


  constructor(private http:HttpClient,private route: Router) { }

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
              localStorage.setItem('id', <string>userInfo.id);
              localStorage.setItem('username', <string>userInfo.username);
              localStorage.setItem('email', <string>userInfo.email);
              localStorage.setItem('currentPosition', <string>userInfo.currentPosition);
              localStorage.setItem('enabled', String(userInfo.enabled));
              const rolesString = userInfo.roles?.map(role => role.name).join(',');
              if (typeof rolesString === "string") {
                localStorage.setItem('roles', rolesString);
              }
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
    this.route.navigate(['/login']);
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

  resetPassword(email: string) {
    return this.http.post<LoginResponse>(RESET_PASSWORD_API, {email});
  }

  verifyResetCode(email: string, reset_code: string) {
    return this.http.post<LoginResponse>(VERIFY_RESET_CODE_API, {email, reset_code});
  }

  changePassword(email: string, newPassword: string, confirmNewPassword: string, resetCode: string) {
    return this.http.post<LoginResponse>(CHANGE_PASSWORD_API, {email, newPassword, confirmNewPassword, resetCode});
  }

}
