import { Component, OnInit } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit {

  myVehicles: any[] = [
    {
      vehicleName: 'Atego 2425',
      truckBody: 'Rodotrem'
    },
    {
      vehicleName: 'VM 260',
      truckBody: 'Toco 3/4'
    },
    {
      vehicleName: 'Atego 2425',
      truckBody: 'Rodotrem'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
