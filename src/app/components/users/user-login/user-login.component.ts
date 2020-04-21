import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    public userId: number;
    public user$: Observable<User>;

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

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // Submit
  onLoginClick(form) {
      debugger;
    if(form.valid) {
        console.log(form);
        this.service.login(new UserLogin(form.value.userName, form.value.password))
        .subscribe(res => {
            debugger;
            console.log(res);
            this.router.navigate(['/sources']);
        });
    }
  }
  
  // Cancel
  onCancelClick() {
  }

}
