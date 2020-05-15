import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUser } from 'src/app/models/auth-user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EntityType, AccessType } from 'src/app/common/enum';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    authUser: AuthUser;
    public isArticleSelectable: boolean = false;
    public isSourceSelectable: boolean = false;
    public isCategorySelectable: boolean = false;
    public isTagSelectable: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.userSub = this.authService.loggedInUser$.subscribe(x => {
          this.authUser = x;
          if(this.authUser !== null) {
            this.isArticleSelectable = this.authService.hasRight(EntityType.Article, AccessType.Select);
            this.isSourceSelectable = this.authService.hasRight(EntityType.Source, AccessType.Select);
            this.isCategorySelectable = this.authService.hasRight(EntityType.Category, AccessType.Select);
            this.isTagSelectable = this.authService.hasRight(EntityType.Tag, AccessType.Select);
          }
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}

  logout() {
      //this.user = null;
      this.authService.logout();
  }
}
