import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFormData} from "../internes/first-resume-template/first-resume-template";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(id: number): Observable<any> {
    console.log(environment.baseUrl + "users/" + id)
    return this.http.get(environment.baseUrl + "users/" + id);
  }

  uploadUserDetails(userDetails: IFormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(environment.baseUrl, userDetails, httpOptions);
  }
}
