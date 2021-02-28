import { Vehicle } from '@clicca-webapp/shared/models/vehicle-selling';
import { EnumFunction } from '../../../decorators';

export class TractorAgricultural extends Vehicle {

  public usage_hours: number;
  public lift_capacity: number;
  public cabin: boolean;
  public rated_power: number;
  public city: string;
  public state: string;
  public max_torque: number;
  public cylinders: number;
  // public tire_type: string;

  private _tire_type: string;

  @EnumFunction({
    'driving_wheel': 'Esteira',
    'tyre': 'Pneus'
  })
  public get tire_type() { return this._tire_type; }
  public set tire_type(value: string) { this._tire_type = value; }

}
