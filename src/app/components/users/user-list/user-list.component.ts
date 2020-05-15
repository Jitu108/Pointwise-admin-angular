import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { OpenMatSnackBar } from 'src/app/common/mat-items';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public Resources = {
        Header: "Users",
        SearchPlaceholder:"Search",
        AddToolTip: "Add User",
        AddCaption: "User",
        EditCaption: "Edit",
        BlockCaption: "Block",
        BlockMessage: "User blocked.",
        UnblockCaption: "Unblock",
        UnblockMessage: "User unblocked.",
        TableHeaders: {
          SlColumn: "#",
          IdColumn: "Id",
          NameColumn: "Name",
          UserTypeColumn: "User Type",
          UserNameColumn: "User Name",
          RoleColumn: "Roles",
          BlockColumn: "Blocked?",
          ActionColumn: "Action"
        }
      }
    
      public users$: Observable<User[]>;
      public loggedUserId: number;

      displayedColumns: string[] = ['id', 'name', 'userType', 'userName', 'roles', 'isBlocked', 'action'];
      dataSource = new MatTableDataSource<User>();
      selection = new SelectionModel<User>(false);
    
      @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
      @ViewChild(MatSort, {static: true}) sort: MatSort;
    
      constructor(
        private router: Router, 
        private userService: UserService,
        private snackBar: MatSnackBar,
        public authService: AuthService) { }
    
      ngOnInit() {
          this.loggedUserId = this.authService.loggedUser.id;
        this.getUsers();
      }
    
      // Load all Users
      getUsers() {
        this.users$ = this.userService.getUsers();
        this.users$.subscribe(x => {
            debugger;
            this.dataSource.data = x;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
      }
    
      // Add User
      addUser() {
        this.router.navigate(['/users/manage']);
      }
    
      // Edit User
      editUser(id: number) {
        this.router.navigate(['/users/manage'], {queryParams: {id: id}});
      }
    
      // Block User
      blockUser(id: number) {
        this.userService.block(id)
        .subscribe(x => {
            this.getUsers();
            OpenMatSnackBar(this.snackBar, this.Resources.BlockMessage);
        });
      }
    
      // Unblock User
      unblockUser(id: number) {
        this.userService.unblock(id)
        .subscribe(x => {
            this.getUsers();
            OpenMatSnackBar(this.snackBar, this.Resources.UnblockMessage);
        });
      }
    
      searchUser(searchString: string) {
        this.users$ = this.userService.getAllBySearchString(searchString);
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

}
