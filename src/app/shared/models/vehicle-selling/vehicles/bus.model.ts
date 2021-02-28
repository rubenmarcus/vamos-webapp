import { Vehicle } from '@clicca-webapp/shared/models/vehicle-selling';
import { EnumFunction } from '../../../decorators';

export class Bus extends Vehicle {

  public mileage: number;
  public body_type_brand: string;
  public doors: number;
  public placements: number;
  public city: string;
  public state: string;

  private _subtype: string;
  private _division: string;

  @EnumFunction({
    'bus': 'Ônibus',
    'microbus': 'Micro-Ônibus',
    'van': 'Vans & Furgões'
  })
  public get subtype() { return this._subtype; }
  public set subtype(value: string) { this._subtype = value; }

  @EnumFunction({
    'highway': 'Rodoviário',
    'urban': 'Urbano'
  })
  public get division() { return this._division; }
  public set division(value: string) { this._division = value; }

}
