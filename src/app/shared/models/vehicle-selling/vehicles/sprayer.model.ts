import { Vehicle } from '@clicca-webapp/shared/models/vehicle-selling';
import { EnumFunction } from '../../../decorators';

export class Sprayer extends Vehicle {

  public usage_hours: number;
  public tank_capacity: number;
  public range_application: number;
  public flow_rate: number;
  public command: number;
  public rated_power: number;
  public wheels: number;

  private _tire_type: string;

  @EnumFunction({
    'wheel': 'Pneus',
    'driving_wheel': 'Esteira'
  })
  public get tyre_type(): string { return this._tire_type; }
  public set tyre_type(value: string) { this._tire_type = value; }

}
