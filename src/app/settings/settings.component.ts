import {Component, OnInit} from '@angular/core';
import {identity} from "rxjs";
import {UserService} from "../services/user.service";
import {positions} from "../../shared/job-titles";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  selectedFile: File | null = null;
  isUsernameReadonly = true;
  isEmailReadonly = true;
  isCurrentPositionReadonly = true;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  profilePicture: string = "";
  oldProfilePicture: string = "";
  username: string = "";
  oldUsername: string = "";
  email: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  oldEmail: string = "";
  currentPosition: string = "";
  oldCurrentPosition: string = "";
  usernameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")!
    this.oldUsername = localStorage.getItem("username")!
    this.email = localStorage.getItem("email")!
    this.oldEmail = localStorage.getItem("email")!
    this.userService.getUserCurrentPosition(localStorage.getItem("id")!).subscribe(
      (data) => {
        this.currentPosition = data.currentPosition;
        this.oldCurrentPosition = data.currentPosition;
      },
      (error) => {
        this.usernameError = true;
        console.log(error)
      }
    );
    // @ts-ignore
    this.userService.getProfilePicture().subscribe((imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        this.profilePicture = reader.result;
        this.oldProfilePicture = this.profilePicture;
        console.log(this.profilePicture)
      };
      reader.readAsDataURL(imageBlob);
    });
  }

  toggleInput(input: string) {
    if (input === "username") {
      this.isUsernameReadonly = !this.isUsernameReadonly;
    }else if (input == "email") {
      this.isEmailReadonly = !this.isEmailReadonly;
    }else if (input === "currentPosition") {
      this.isCurrentPositionReadonly = !this.isCurrentPositionReadonly;
    }else if (input === "oldPassword") {
      this.hideOldPassword = !this.hideOldPassword;
    }else if (input === "newPassword") {
      this.hideNewPassword = !this.hideNewPassword;
    }
  }

  isFormModified(): boolean {
    if (this.username != this.oldUsername ||
      this.email != this.oldEmail ||
      this.currentPosition != this.oldCurrentPosition ||
      this.profilePicture != this.oldProfilePicture ||
      (this.oldPassword != "" && this.newPassword != "")) {
      return true;
    }
    return false;
  }

  changeData() {
    if (this.selectedFile && (this.profilePicture != this.oldProfilePicture)) {
      console.log(98888)
      this.userService.changeProfilePicture(this.selectedFile).subscribe(
        (response) => {
          this.userService.getProfilePicture().subscribe((imageBlob: Blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // @ts-ignore
              this.profilePicture = reader.result;
              this.oldProfilePicture = this.profilePicture
              console.log(this.profilePicture)
            };
            reader.readAsDataURL(imageBlob);
          });
        },
        (error) => {
          console.error(error);
          // Handle error, e.g., show an error message
        }
      );
    }
    if (this.username != this.oldUsername) {
      this.userService.changeUsername(this.username).subscribe(
        () => {
          this.oldUsername = this.username;
          localStorage.setItem("username",this.username);
          this.usernameError = false;
        },
        (error) => {
          this.usernameError = true;
          console.log(error)
        }
      );
    }
    if (this.email != this.oldEmail) {
      this.userService.changeEmail(this.email).subscribe(
        () => {
          this.oldEmail = this.email;
          localStorage.setItem("email",this.email);
          this.emailError = false;
        },
        (error) => {
          this.emailError = true;
          console.log(error)
        }
      );
    }
    if (this.currentPosition != this.oldCurrentPosition) {
      this.userService.changeCurrentPosition(this.currentPosition).subscribe(
        () => {
          this.oldCurrentPosition = this.currentPosition;
        },
        (error) => {
          console.log(error)
        }
      );
    }
    if (this.oldPassword != "" && this.newPassword != "") {
      this.userService.changePassword(this.oldPassword,this.newPassword).subscribe(
        () => {
          this.oldPassword = ""
          this.newPassword = ""
          this.passwordError = false;
        },
        (error) => {
          this.passwordError = true;
          this.oldPassword = ""
          this.newPassword = ""
          console.log(error)
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // 'e.target.result' contains the base64-encoded image
        this.profilePicture = e.target.result;
      };
      // Read the file as a data URL, triggering the onload event above
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onInputChange() {
    this.passwordError = false;
    this.usernameError = false;
    this.emailError = false;
  }

  protected readonly positions = positions;
}
