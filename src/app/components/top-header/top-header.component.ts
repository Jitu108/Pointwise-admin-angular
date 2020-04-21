import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

    user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
      this.userService.loggedInUser$.subscribe(x => {
          this.user = x;
      })
  }

  logout() {
      this.user = null;
  }

}
