import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, IAccess } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { StaticDataService } from 'src/app/services/static-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenMatSnackBar } from 'src/app/common/mat-items';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    public userId: number;
    public mode: string;
    public userDetail$: Observable<User>;
    public objUserDetail: User;
    public isAdmin: boolean = false;
    public isBlocked: boolean = false;
    public isDeleted: boolean = false;

    public entities: string[] = [];
    public accesses: string[] = [];
    public userAccesses: {entity: string, accesses: IAccess[]}[] = [];

    public Resources = {
        Header: "Profile Info",
        NamePanelCaption: "Name",
        AdminPanelCaption: "Admin Right",
        RolePanelCaption: "Privileges",

        FirstNameCaption: "First Name",
        FirstNamePlaceholder: "First Name",
        MiddleNameCaption: "Middle Name",
        MiddleNamePlaceholder: "Middle Name",
        LastNameCaption: "Last Name",
        LastNamePlaceholder: "Last Name",
        UserNameCaption: "Username",
        UserNamePlaceholder: "Username",
        PasswordCaption: "Password",
        PasswordPlaceholder: "Password",
        EmailCaption: "Email",
        EmailPlaceholder: "Email",
        PhoneCaption: "Phone Number",
        PhonePlaceholder: "Phone",

        IsAdminCaption: "Admin",
        IsAdminPlaceholder: "Is Admin?",
        IsBlockedCaption: "Is Blocked?",
        IsBlockedPlaceholder: "Is Blocked?",
        IsDeletedCaption: "Is Deleted?",
        IsDeletedPlaceholder: "Is Deleted?",

        SaveCaption: "Save",
        SaveMessage: "Profile saved successfully.",
        CancelCaption: "Cancel",
        Validation: {
          FirstNameRequiredMessage: "First name is required.",
          PasswordRequiredMessage: "Password is required."
        }
      }

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private staticDataService: StaticDataService,
        private snackBar: MatSnackBar,
        private router: Router
      ) { }

    ngOnInit() {
        this.staticDataService.entities().subscribe(entities => {
            this.entities = entities;
            this.staticDataService.accesstypes().subscribe(accesses => {
                this.accesses = accesses;
                this.userDetail$.subscribe(z => {

                    for(var entity of entities) {
                        var accessList: IAccess[] = [];

                        for(var access of accesses) {
                            var hasAccess = false;

                            for(var k of z.roles){
                                if(entity == k.entityType && access == k.accessType) {
                                    hasAccess = true;
                                }
                            }
                            var userAccess = {access: access, name: entity + access, hasAccess: hasAccess};
                            accessList.push(userAccess);
                        }
                        var ua = {entity: entity, accesses: accessList};
                        this.userAccesses.push(ua);
                    }
                    console.log(this.userAccesses);
                })
            });
        });

        this.getUserDetail();
    }

    getUserDetail() {
        this.userDetail$ = this.userService.getById(this.authService.loggedUser.id);
        this.userDetail$.subscribe(user => {
            this.objUserDetail = user;
            if(user.userType == "Admin") {
                this.isAdmin = true;
            }
            this.isBlocked = user.isBlocked;
            this.isDeleted = user.isDeleted;
        })
      }

      onEntityAccessChange(entity, access, event){
          if(event.checked){
              this.objUserDetail.roles.push({entityType: entity, accessType: access});
          }
          else {
              this.objUserDetail.roles = this.objUserDetail.roles
                                            .filter(x => {return !(x.entityType === entity && x.accessType === access)});
          }
      }

      onIsAdminChange(event){
          if(event.checked){
              this.objUserDetail.userType = "Admin";
          }
          else {
            this.objUserDetail.userType = "Author";
          }

      }

      onIsBlockedChange(event) {
        if(event.checked){
            this.objUserDetail.isBlocked = true;
        }
        else {
          this.objUserDetail.isBlocked = false;
        }
      }

      onIsDeletedChange(event) {
        if(event.checked){
            this.objUserDetail.isDeleted = true;
        }
        else {
          this.objUserDetail.isDeleted = false;
        }
      }

      onFirstNameChange(event) {
        this.objUserDetail.firstName = event.target.value;
      }

      onMiddleNameChange(event) {
        this.objUserDetail.middleName = event.target.value;
      }

      onLastNameChange(event) {
        this.objUserDetail.lastName = event.target.value;
      }

      onEmailChange(event) {
        this.objUserDetail.emailAddress = event.target.value;
      }

      onPhoneChange(event) {
        this.objUserDetail.phoneNumber = event.target.value;
      }

      onPasswordChange(event) {
        this.objUserDetail.password = event.target.value;
      }

    // Submit
    onUserSubmit(form) {
        if(form.valid) {
            this.userService.save(this.objUserDetail.id, this.objUserDetail)
        .subscribe(x => {
            this.authService.loggedUser.firstName = x.firstName;
            this.authService.loggedUser.middleName = x.middleName;
            this.authService.loggedUser.lastName = x.lastName;

            this.authService.refreshLoggedInUser();
            OpenMatSnackBar(this.snackBar, this.Resources.SaveMessage);
            this.router.navigate(['/']);
        });
        }
    }

    onCancelClick()
    {
        this.router.navigate(['/']);
    }
}
