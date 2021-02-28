import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-block-freights',
  templateUrl: './block-freights.component.html',
  styleUrls: ['./block-freights.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockFreightsComponent implements OnInit {

  @Input() freight;
  @Output() refreshFavList = new EventEmitter();

  public session: boolean = new SessionChecker().isSessionStarted;
  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  constructor (
    private freightsService: FreightsService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  saveFavorite() {
    if (this.session) {
      const object = { 'favorite': { 'user_id': User.fromCache().id } };
      this.subscriptions.push(
        this.freightsService.save(this.freight.id, object).subscribe(res => {
          this.freight.favorited = true;
          this.freight.favorite_id = res.id;
        })
      );
    } else {this.router.navigate(['/login']); }
  }

  deleteFavorite() {
    this.subscriptions.push(
      this.freightsService.delete(this.freight.id, this.freight.favorite_id ).subscribe(res => {
        this.freight.favorited = false;
        this.refreshFavList.emit(true);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
