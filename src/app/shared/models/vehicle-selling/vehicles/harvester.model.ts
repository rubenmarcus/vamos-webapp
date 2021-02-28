import { Vehicle } from '@clicca-webapp/shared/models/vehicle-selling';
import { EnumFunction } from '../../../decorators';

export class Harvester extends Vehicle {

  public usage_hours: number;
  public cabin: boolean;
  public rated_power: number;
  public harvest_speed: number;
  public bulk_tank: number;
  public pipe: number;
  public flow_rate: number;
  public cutting_platform: number;

  private _harvest: string;
  private _wheel_type: string;
  private _transmission: string;
  private _precision_agriculture: string;

  @EnumFunction({
    'cane': 'Cana',
    'cottom': 'Algodão',
    'grains': 'Grãos'
  })
  public get harvest(): string { return this._harvest; }
  public set harvest(value: string) { this._harvest = value; }

  @EnumFunction({
     'tyre': 'Pneus',
     'driving_wheel': 'Esteira'
  })
  public get wheel_type(): string { return this._wheel_type; }
  public set wheel_type(value: string) { this._wheel_type = value; }

  @EnumFunction({
     'hydrostatic': 'Hidrostático',
     'mechanical': 'Mecânico'
  })
  public get transmission(): string { return this._transmission; }
  public set transmission(value: string) { this._transmission = value; }

  @EnumFunction({
     'standard': 'Padrão',
     'optional': 'Opicional'
  })
  public get precision_agriculture(): string { return this._precision_agriculture; }
  public set precision_agriculture(value: string) { this._precision_agriculture = value; }

}
