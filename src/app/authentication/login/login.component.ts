import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  username:string = '';
  password:string = '';
  error: boolean = false;

  constructor(private router:Router,private authService:AuthService) { }

  authenticate() {
    const username = this.username
    const password = this.password
    console.log(this.username,this.password)
    this.authService.authenticate(username, password).subscribe(
      () => {
        this.error = false;
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error)
        this.error = true;
      }
    );
  }

  openLinkInNewTab(): void {
    const url = 'http://localhost/phpmyadmin/index.php?route=/database/structure&db=resume_app';
    window.open(url, '_blank');
  }

  toggleInput() {
    this.hide = !this.hide;
  }

  onInputChange() {
    this.error = false;
  }
}
