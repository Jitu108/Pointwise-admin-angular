import { AuthService } from './../../services/auth.service';
import { EntityType, AccessType } from './../../common/enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    user: User;
    public isArticleSelectable: boolean = false;
    public isSourceSelectable: boolean = false;
    public isCategorySelectable: boolean = false;
    public isTagSelectable: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.userSub = this.authService.loggedInUser$.subscribe(x => {
          this.user = x;
          //console.log(x);
          this.isArticleSelectable = this.authService.hasRight(EntityType.Article, AccessType.Select);
          this.isSourceSelectable = this.authService.hasRight(EntityType.Source, AccessType.Select);
          this.isCategorySelectable = this.authService.hasRight(EntityType.Category, AccessType.Select);
          this.isTagSelectable = this.authService.hasRight(EntityType.Tag, AccessType.Select);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}

  logout() {
      this.user = null;
  }
}
