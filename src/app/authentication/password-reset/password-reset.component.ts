import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  hide = true;
  newPassword:string = '';
  confirmNewPassword:string = '';

  constructor(private router:Router,private authService:AuthService) { }

  resetPassword()
  {
    const email = localStorage.getItem("email")
    const resetCode = localStorage.getItem("resetCode")
    console.log(email,resetCode,this.newPassword,this.confirmNewPassword)
    if (email && resetCode) {
      this.authService.changePassword(email, this.confirmNewPassword, this.confirmNewPassword, resetCode).subscribe(
        () => {
          localStorage.clear()
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }


  cancelResetting() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
