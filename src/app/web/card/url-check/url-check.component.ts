import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'card-url-check',
  templateUrl: './url-check.component.html',
  styleUrls: ['./url-check.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UrlCheckComponent implements OnInit {


  public userInfo = this.route.snapshot.data.user;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.userInfo);
  }



}
