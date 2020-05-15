import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserLogin } from 'src/app/models/user-login';
import { AuthUser } from 'src/app/models/auth-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    public user$: Observable<AuthUser>;
    public isLoading: boolean = false;
    public error: {hasError: boolean, message: string} = {hasError: false, message:""};

    @ViewChild('nameInput', {read: ElementRef}) private nameInput: ElementRef;

  public Resources = {
    Header: "Login",
    UserNameCaption: "Username",
    UserNamePlaceholder: "Username",
    PasswordCaption: "Password",
    PasswordPlaceholder: "Password",
    LoginCaption: "Login",
    CancelCaption: "Cancel",
    Validation: {
      UsernameRequiredMessage: "Username is required.",
      PasswordRequiredMessage: "Password is required."
    }
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.error.hasError = false;
  }

  // Submit
  onLoginClick(form) {
    if(form.valid) {
        this.isLoading = true;
        this.error.hasError = false;
        this.authService.login(new UserLogin(form.value.userName, form.value.password))
        .subscribe(res => {
            this.isLoading = false;
            this.router.navigate(['/articles']);
        }, error => {
            this.error = {hasError: true, message: error.message};
            this.isLoading = false;
        });
    }
  }
  
  // Cancel
  onCancelClick() {
      debugger;
    this.error = {hasError: false, message: ""};
  }

}
