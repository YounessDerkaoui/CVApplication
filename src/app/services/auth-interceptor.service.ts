import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {catchError, mergeMap, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService,private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/.*\/api\/auth\/.*/.test(req.url)) {
      return this.authService.getAccessToken().pipe(
        mergeMap((accessToken: string) => {
          const reqAuth = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
          return next.handle(reqAuth);
        }),
        catchError((err) => {
          console.error(err);
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
