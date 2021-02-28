import { Component, OnInit } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-freights',
  templateUrl: './freights.component.html',
  styleUrls: ['./freights.component.scss']
})
export class FreightsComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {

  }

  showFilters() {

    const aside = document.getElementById('freights-filters');
    if (aside.classList.contains('show__desktop')) {

      aside.classList.remove('show__desktop');

    } else {aside.classList.add('show__desktop'); }

  }

}
