import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [UserListComponent, UserProfileComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
