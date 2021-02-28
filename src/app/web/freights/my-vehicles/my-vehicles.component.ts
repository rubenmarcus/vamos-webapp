import { Component, OnInit } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss']
})
export class MyVehiclesComponent implements OnInit {

  public myVehicles = [];

  constructor() { }

  ngOnInit() {
  }

}
