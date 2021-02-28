import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, Router , NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({ preserveWhitespaces: false,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
 encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit{

  constructor(
    public router: Router,
  ) {  }

  ngOnInit() {
  }
  
}
