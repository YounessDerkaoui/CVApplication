import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {

  hide = true;
  forgottenPassword = false;
  passwordReset = false;

  constructor(private router:Router)
  {
    
  } 

  switchDiv()
  {
    this.forgottenPassword = !this.forgottenPassword
  }

  resetPassword()
  {
    this.passwordReset = true;
  }

  goToHome()
  {
    this.router.navigateByUrl('/home')
  }
}
