import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {combineLatest, forkJoin, map, Observable} from "rxjs";
import {IFormData} from "../internes/first-resume-template/first-resume-template";
import {environment} from "../../environments/environment";

const INTERN_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=intern';
const EXTERN_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=extern';
const TOTAL_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=all';
const INTERN_PROFILES_COUNT_API = environment.baseUrl + '/users/count?type=intern_profiles';
const LAST_MODIFIED_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=modified';
const EXTERN_USERS_API = environment.baseUrl + '/users?type=extern';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getTotalResumesCount(): Observable<any> {
    return this.http.get<any>(TOTAL_RESUMES_COUNT_API);
  }

  getInternResumesCount(): Observable<any> {
    return this.http.get<any>(INTERN_RESUMES_COUNT_API);
  }

  getExternResumesCount(): Observable<any> {
    return this.http.get<any>(EXTERN_RESUMES_COUNT_API);
  }

  getInternProfilesCount(): Observable<any> {
    return this.http.get<any>(INTERN_PROFILES_COUNT_API);
  }

  getLastModifiedResumesCount(): Observable<any> {
    return this.http.get<any>(LAST_MODIFIED_RESUMES_COUNT_API);
  }

  getDashboardInfo(): Observable<any> {
    return combineLatest([
      this.getTotalResumesCount(),
      this.getInternResumesCount(),
      this.getExternResumesCount(),
      this.getInternProfilesCount(),
      this.getLastModifiedResumesCount()
    ]).pipe(
      map(([totalResumes, internResumes, externResumes, internProfiles, lastModifiedResumes]) => {
        return {
          totalResumes,
          internResumes,
          externResumes,
          internProfiles,
          lastModifiedResumes
        };
      })
    );
  }

  getExternalUsers(){
    return this.http.get<any>(EXTERN_USERS_API);
  }

  getUserDetails(id: number): Observable<any> {
    console.log(environment.baseUrl + "users/" + id)
    return this.http.get(environment.baseUrl + "users/" + id);
  }

  uploadUserDetails(userDetails: IFormData): Observable<any> {
    const url = 'http://127.0.0.1:5000/api/v1/users/1';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, userDetails, httpOptions);
  }
}
