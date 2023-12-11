import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent {

  email:string = '';

  constructor(private router:Router,private authService:AuthService, private snackBar: MatSnackBar) { }

  sendMail() {
    const email = this.email
    console.log(this.email)
    this.authService.resetPassword(email).subscribe(
      () => {
        localStorage.setItem('resetting password','true')
        localStorage.setItem('email',email)
        this.snackBar.open('Email sent successfully! Please check your Email', 'Dismiss', {
          duration: 30000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'your-custom-class',
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
