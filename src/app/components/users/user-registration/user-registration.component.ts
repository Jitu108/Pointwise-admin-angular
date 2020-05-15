import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
    public user$: Observable<User>;

    @ViewChild('nameInput', {read: ElementRef}) private nameInput: ElementRef;

  public Resources = {
    Header: "Register",
    FirstNameCaption: "First Name",
    FirstNamePlaceholder: "First Name",
    MiddleNameCaption: "Middle Name",
    MiddleNamePlaceholder: "Middle Name",
    LastNameCaption: "Last Name",
    LastNamePlaceholder: "Last Name",
    EmailAddressCaption: "Email Address",
    EmailAddressPlaceholder: "Email Address",

    UserNameCaption: "Username",
    UserNamePlaceholder: "Username",
    PasswordCaption: "Password",
    PasswordPlaceholder: "Password",
    RegisterCaption: "Register",
    CancelCaption: "Cancel",
    Validation: {
        FirstNameRequiredMessage: "First name is required.",
        EmailAddressRequiredMessage: "Email is required.",
        UsernameRequiredMessage: "Username is required.",
        PasswordRequiredMessage: "Password is required."
    }
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // Submit
  onRegisterClick(form) {
    if(form.valid) {
        debugger;
        console.log(form);
        this.userService.save(0, 
            new User(
                0, 
                form.value.userName, 
                form.value.password,
                form.value.firstName,
                form.value.middleName,
                form.value.lastName,
                form.value.emailAddress,
                form.value.phoneNumber,
                //0,
                null,
                null,
                false
                ))
                .subscribe(res => {
                    debugger;
                    console.log(res);
                    this.router.navigate(['/login']);
                });
    }
  }
  
  // Cancel
  onCancelClick() {
  }

}
