import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/app/models/loginform';
import { PageTitle } from 'src/app/models/pagetitle';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formStyle = "standard";
  formColor = "accent";
  pageTitle: PageTitle;
  loginFormModel: LoginForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.pageTitle = new PageTitle();
    this.pageTitle.title = "Login";
    this.pageTitle.subTitle = "Material admin";
    this.loginFormModel = new LoginForm();
    this.loginFormModel.email = "";
    this.loginFormModel.password = "";
  }

  onSubmit(): void {
    this.authService.SignIn(this.loginFormModel.email, this.loginFormModel.password);
  }

}
