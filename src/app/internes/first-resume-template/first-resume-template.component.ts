import {Component, OnInit} from '@angular/core';
import {IFormData, LanguageProficiency} from './first-resume-template'
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-first-resume-template',
  templateUrl: './first-resume-template.component.html',
  styleUrls: ['./resume-template-style.scss','./first-resume-template.component.scss']
})
export class FirstResumeTemplateComponent implements OnInit{

  formData: IFormData = {
    basicInfo: {
      firstName: '',
      lastName: '',
      occupation: '',
      yearsOfExp: 0,
      picture: '',
    },
    contactInfo: {
      email: '',
      linkedin: '',
      github: '',
      address: '',
    },
    skillsInfo: [],
    educationInfo: [],
    experienceInfo: [],
    languageInfo:[]
  };

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserDetails("1").subscribe({
      next: (data)=>{
        this.formData = data;
        console.log(data)
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  downloadResume() {
  }

}
