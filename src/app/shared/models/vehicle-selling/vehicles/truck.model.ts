import { HeavyVehicle, Component } from '@clicca-webapp/shared/models/vehicle-selling';
import { Relational } from '@clicca-webapp/shared/decorators/index';

export class Truck extends HeavyVehicle {
  public has_truck_body: boolean;

  private _body_type: Component;

  @Relational()
  @Reflect.metadata('design:type', Component)
  get body_type() { return this._body_type; }
  set body_type(value: any) { this._body_type = new Component(value); }

}

