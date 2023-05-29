import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { JwtResponce } from '../models/JwtResponce';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  submitted: any;
  value:string;
  constructor(private authService: AuthService){}
  ngOnInit() {
    this.authService.logout();
  }

  login() {

    this.authService.loginForm(this.model).subscribe(
      (response: JwtResponce) => {
        this.authService.setUser(response);
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}
