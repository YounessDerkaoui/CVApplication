import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {combineLatest, forkJoin, map, Observable} from "rxjs";
import {IFormData} from "../internes/first-resume-template/first-resume-template";
import {environment} from "../../environments/environment";
import {positions} from "../../shared/job-titles";
import {skills} from "../../shared/skills";

const INTERN_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=intern';
const EXTERN_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=extern';
const TOTAL_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=all';
const INTERN_PROFILES_COUNT_API = environment.baseUrl + '/users/count?type=intern_profiles';
const LAST_MODIFIED_RESUMES_COUNT_API = environment.baseUrl + '/users/count?type=modified';
const EXTERN_USERS_API = environment.baseUrl + '/users?type=extern';
const INTERN_USERS_API = environment.baseUrl + '/users?type=intern';
const UPDATE_USER_API = environment.baseUrl + '/users';
const CHART_DATA_API = environment.baseUrl + '/users/chart';



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

  getDataForChart(educationFormation: any,positions: any,skills: any): Observable<any> {
    return this.http.post<any>(CHART_DATA_API,{educationFormation, positions, skills});
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

  changeUsername(username: string){
    const id = localStorage.getItem("id")!
    return this.http.post<any>(UPDATE_USER_API, {id, username});
  }

  changeProfilePicture(file: File): Observable<any>{
    const id = localStorage.getItem("id")!
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(environment.baseUrl + "/users/" + id + "/picture", formData);
  }

  getProfilePicture(): Observable<Blob>{
    const id = localStorage.getItem("id")!
    return this.http.get(environment.baseUrl + "/users/" + id + "/picture", { responseType: 'blob' });
  }

  changeEmail(email: string){
    const id = localStorage.getItem("id")!
    return this.http.post<any>(UPDATE_USER_API, {id, email});
  }

  changeCurrentPosition(currentPosition: string){
    const id = localStorage.getItem("id")!
    return this.http.post<any>(UPDATE_USER_API, {id, currentPosition});
  }

  changePassword(oldPassword: string, newPassword: string){
    const id = localStorage.getItem("id")!
    return this.http.post<any>(UPDATE_USER_API, {id, oldPassword,newPassword});
  }

  getExternalUsers(){
    return this.http.get<any>(EXTERN_USERS_API);
  }

  getInternalUsers(){
    return this.http.get<any>(INTERN_USERS_API);
  }

  getInternalUsersBasedOnPosition(selectedPosts: any){
    return this.http.post<any>(environment.baseUrl + "/users/occupations",{selectedPosts});
  }

  getUsersBasedOnIds(ids: any){
    console.log(ids)
    // @ts-ignore
    return this.http.post<any>(environment.baseUrl + "/users/excel-data",{ids}, { responseType: 'arraybuffer' });
  }

  getInternalUsersBasedOnSkills(skills: any){
    return this.http.post<any>(environment.baseUrl + "/users/skills",{skills});
  }

  getInternalUsersBasedOnEducation(degreeTitle: any){
    return this.http.post<any>(environment.baseUrl + "/users/degree-title",{degreeTitle});
  }

  getInternalUsersBasedOnProjectName(projectName: any){
    return this.http.post<any>(environment.baseUrl + "/users/project-name",{projectName});
  }

  getUserDetails(id: string): Observable<any> {
    console.log(environment.baseUrl + "/users/" + id)
    return this.http.get(environment.baseUrl + "/users/" + id);
  }

  getUserCurrentPosition(id: string): Observable<any> {
    console.log(environment.baseUrl + "/users/" + id)
    return this.http.get(environment.baseUrl + "/users/" + id + "/current-position");
  }

  setUserCurrentPosition(id: string): Observable<any> {
    console.log(environment.baseUrl + "/users/" + id)
    return this.http.get(environment.baseUrl + "/users/" + id + "/currentPosition");
  }

  getImage(id: string) {
    return this.http.get(environment.baseUrl + "/get-image/" + id, { responseType: 'blob' });
  }

  uploadUserDetails(userDetails: IFormData): Observable<any> {
    const id = localStorage.getItem("id")!;
    const url = 'http://127.0.0.1:5000/api/v1/users/'+ id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, userDetails, httpOptions);
  }
}
