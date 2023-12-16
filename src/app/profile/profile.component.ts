import { Component } from '@angular/core';
import {IFormData} from "../internes/first-resume-template/first-resume-template";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

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
    const userId = localStorage.getItem('id')!;
    this.userService.getUserDetails(userId).subscribe({
      next: (data) => {
        this.formData = data;
        console.log(data);
        console.log(121212);

        // Check if the user has a picture
        if (data.basicInfo.picture) {
          // Retrieve and display the image
          this.loadImage(userId);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadImage(userId: string): void {
    this.userService.getImage(userId).subscribe(
      (data: any) => {
        console.log(data);
        console.log(12121333332);
        // Create a Blob from the binary data received
        const blob = new Blob([data], { type: 'image/png' });
        console.log(blob);
        // Create a data URL from the Blob
        const urlCreator = window.URL || window.webkitURL;
        console.log(urlCreator.createObjectURL(blob));
        this.formData.basicInfo.picture = urlCreator.createObjectURL(blob);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }
}
