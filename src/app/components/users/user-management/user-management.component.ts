import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isNumeric } from 'src/app/common/util';
import { Observable } from 'rxjs';
import { User, IAccess } from 'src/app/models/user';
import { StaticDataService } from 'src/app/services/static-data.service';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

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
    public isLoggedInUser: boolean = false;

    public Resources = {
        Header: "User",
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
        CancelCaption: "Cancel",
        Validation: {
          FirstNameRequiredMessage: "First name is required."
        }
      }

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private authService: AuthService,
        private staticDataService: StaticDataService,
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

        this.activatedRoute.queryParams.subscribe(
            (params: Params) => {
            if(isNumeric(params['id']))
            {
                this.userId = parseInt(params['id']);
            }
    
            //Edit
            if(this.userId !== undefined){
                this.getUserDetailById(this.userId);
    
                this.mode = "Edit";
            } else { // Add
                //this.mode = "Add";
                this.router.navigate(['/users']);
            }
            });
    }

    getUserDetailById(id: number) {
        this.userDetail$ = this.userService.getById(id);
        this.userDetail$.subscribe(user => {
            this.objUserDetail = user;
            this.isLoggedInUser = this.authService.loggedUser.id === user.id;
            if(user.userType == "Admin") {
                this.isAdmin = true;
            }
            this.isBlocked = user.isBlocked;
            this.isDeleted = user.isDeleted;
        }, error => {
            this.router.navigate(['/users']);
        })
      }

      onEntityAccessChange(entity, access, event){
          if(event.checked){
              this.objUserDetail.roles.push({entityType: entity, accessType: access});
          }
          else {
              debugger;
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

    // Submit
    onUserSubmit(form) {
        if(form.valid) {
            this.userService.save(this.objUserDetail.id, this.objUserDetail)
        .subscribe(x=> {
            this.router.navigate(['/users']);
        });
        }
    }

    onCancelClick()
    {
        this.router.navigate(['/users']);
    }
}
