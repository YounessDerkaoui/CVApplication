import {Component, OnInit} from '@angular/core';
import {IFormData} from "../internes/first-resume-template/first-resume-template";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userId!: string;
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

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUserDetails(this.userId).subscribe({
        next: (data)=>{
          this.formData = data;
          console.log(data)
        },
        error: (err)=>{
          console.log(err);
        }
      });
    });
  }

  uploadData() {
    console.log(this.formData)
    this.userService.uploadUserDetails(this.formData).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }
}
