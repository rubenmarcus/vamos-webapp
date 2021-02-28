import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Subscription } from 'rxjs/Rx';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { UserService } from '@clicca-webapp/shared/services/profile-service/user.service';


@Component({ preserveWhitespaces: false,
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,


})
export class UserHeaderComponent implements OnInit {
  public user = User.fromCache();

  personData;
  profilePicture;

  private subscriptions: Subscription[] = [];

  constructor(
    private profileService: ProfileService) { }

  ngOnInit() {
    this.profilePicture = this.user.picture_profile;
  }
}
