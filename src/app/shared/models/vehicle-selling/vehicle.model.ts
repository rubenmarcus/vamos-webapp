import { Base } from '@clicca-webapp/shared/models/base.model';
import { Bus, Harvester, Sprayer, TractorAgricultural, TractorUnit, Truck, Component, Model, Brand } from '@clicca-webapp/shared/models/vehicle-selling/index';
import { Relational, EnumFunction } from '@clicca-webapp/shared/decorators/index';

export class Vehicle extends Base {

  public id: string;
  public year: number;
  public plate: string;
  public tech_guide: any;
  public chassis: string;
  public year_model: number;
  public type: string;
  public favorites: number;

  private _kind: Component;
  private _color: Component;
  private _wheel_drive: Component;
  private _model: Model;
  private _brand: Brand;

  private _tyre_condition: string;
  private _condition: string;
  private _fuel: string;

  constructor(params?: any) { super(params); }

  @Relational()
  @Reflect.metadata('design:type', Component)
  get kind() { return this._kind; }
  set kind(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Component)
  get color() { return this._color; }
  set color(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Component)
  get wheel_drive() { return this._wheel_drive; }
  set wheel_drive(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Model)
  get model() { return this._model; }
  set model(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Brand)
  get brand() { return this._brand; }
  set brand(value: any) { }

  @EnumFunction({
    'good': 'Boa',
    'regular': 'Regular',
    'bad': 'Ruim'
  })
  public get tyre_condition() { return this._tyre_condition; }
  public set tyre_condition(value: string) { this._tyre_condition = value; }

  @EnumFunction({
    'newer': 'Novo',
    'used': 'Usado'
  })
  public get condition() { return this._tyre_condition; }
  public set condition(value: string) { this._condition = value; }

  @EnumFunction({
    'ethanol': 'Alcool',
    'diesel': 'Diesel',
    'gasoline': 'Gasolina'
  })
  public get fuel(): string { return this._tyre_condition; }
  public set fuel(value: string) { this._fuel = value; }

  public static available(value: any): any {
    if (value === 'Bus') { return Bus; }
    if (value === 'Harvester') { return Harvester; }
    if (value === 'Sprayer') { return Sprayer; }
    if (value === 'TractorAgricultural') { return TractorAgricultural; }
    if (value === 'TractorUnit') { return TractorUnit; }
    if (value === 'Truck') { return Truck; }
  }

  public static getType(type: string): any {
    const current = type.split('::')[1] as string;
    return this.available(current);
  }

  public translatedClassName(): string {
    const available = {
      'Bus': 'Ônibus',
      'Harvester': 'Colheitadeira',
      'Sprayer': 'Pulverizador',
      'TractorAgricultural': 'Trator',
      'TractorUnit': 'Cavalo',
      'Truck': 'Caminhão'
    };

    return available[this.constructor.name];
  }

}
