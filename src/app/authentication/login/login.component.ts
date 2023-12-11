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

  constructor(private router:Router,private authService:AuthService) { }

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
