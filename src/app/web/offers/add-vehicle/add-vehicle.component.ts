import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, Router} from '@angular/router';
@Component({ preserveWhitespaces: false,
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVehicleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
