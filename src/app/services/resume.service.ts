import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const UPLOAD_RESUME_API = environment.baseUrl + '/upload-resumes';
const DOWNLOAD_RESUME_API = environment.baseUrl + '/users/download';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) {
  }

  downloadResume(id: number): void {
    this.http.get(environment.baseUrl+`/users/download/${id}`, {
      responseType: 'arraybuffer' as 'json'
    }).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'resume.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  uploadResumes(files: File[]) {
    const formData: FormData = new FormData();

    for (const file of files) {
      formData.append('resumes', file);
    }

    return this.http.post<any>(UPLOAD_RESUME_API, formData);
  }
}
