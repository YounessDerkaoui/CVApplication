import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {

  hide = true;
  forgottenPassword = false;
  passwordReset = false;
  username:string = '';
  password:string = '';

  constructor(private router:Router,private authService:AuthService) { }

  switchDiv()
  {
    this.forgottenPassword = !this.forgottenPassword
  }

  resetPassword()
  {
    this.passwordReset = true;
  }

  authenticate() {
    const username = this.username
    const password = this.password
    console.log(this.username,this.password)
    this.authService.authenticate(username, password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
