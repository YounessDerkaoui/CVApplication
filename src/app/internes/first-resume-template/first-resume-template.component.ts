import {Component, OnInit} from '@angular/core';
import {IFormData, LanguageProficiency} from './first-resume-template'

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
    },
    skillsInfo: [],
    educationInfo: [],
    experienceInfo: [],
    languageInfo:[]
  };
  //todo check the effect of LanguageProficiency.NOT_AT_ALL

  ngOnInit(): void {
  }

  downloadResume() {
  }

}
