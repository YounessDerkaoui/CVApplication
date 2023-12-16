import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  hidePassword = true;
  hideConfirmPassword = true;
  newPassword:string = '';
  confirmNewPassword:string = '';
  error: boolean = false;

  constructor(private router:Router,private authService:AuthService) { }

  resetPassword()
  {
    const email = localStorage.getItem("email")
    const resetCode = localStorage.getItem("resetCode")
    console.log(email,resetCode,this.newPassword,this.confirmNewPassword)
    if (email && resetCode) {
      this.authService.changePassword(email, this.newPassword, this.confirmNewPassword, resetCode).subscribe(
        (data) => {
          this.error = false;
          localStorage.clear()
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = true;
          console.log(error)
        }
      );
    }
  }

  onInputChange() {
    this.error = false;
  }

  cancelResetting() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  toggleInput(label: string) {
    if (label === "password") {
      this.hidePassword = !this.hidePassword;
    }else if (label == "confirmPassword") {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
}
