import { Base } from '@clicca-webapp/shared/models/base.model';
import { Baler, Distributor, Driller, ForageHarvester, ForageWagon,
  Forage, GraderGrade, GrainExtractor, GrainStuffer, HarvesterImplement, MixerWagon,
  Planer, Plow, Rake, SeedDrill, SprayerImplement, Trimmer, TruckBody,
  WaterPump, Winch, Model, Brand, Component } from '@clicca-webapp/shared/models/vehicle-selling';

import { Relational, EnumFunction } from '@clicca-webapp/shared/decorators/index';

export class Implement extends Base {

  public year: number;
  public year_model: number;
  public weight: number;
  public wheel: number;
  public tdp: number;
  public tech_guide: string;
  public type: string;
  public chassis: string;
  public axes: string;

  private _condition: string;
  private _tyre_condition: string;
  private _brand: Brand;
  private _model: Model;
  private _body_type: Component;

  constructor(params?: any) { super(params); }

  @Relational()
  @Reflect.metadata('design:type', Component)
  get body_type() { return this._body_type; }
  set body_type(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Model)
  get model() { return this._model; }
  set model(value: any) { }

  @Relational()
  @Reflect.metadata('design:type', Brand)
  get brand() { return this._brand; }
  set brand(value: any) { }

  @EnumFunction({
    'newer': 'Novo',
    'used': 'Usado'
  })
  get condition() { return this._condition; }
  set condition(value: any) { }

  @EnumFunction({
    'newer': 'Novo',
    'used': 'Usado'
  })
  get tyre_condition() { return this._tyre_condition; }
  set type_condition(value: string) { this._tyre_condition = value; }

  public static available(value: any): any {
    if (value === 'Baler') { return Baler; }
    if (value === 'Distributor') { return Distributor; }
    if (value === 'Driller') { return Driller; }
    if (value === 'ForageHarvester') { return ForageHarvester; }
    if (value === 'ForageWagon') { return ForageWagon; }
    if (value === 'Forage') { return Forage; }
    if (value === 'GraderGrade') { return GraderGrade; }
    if (value === 'GrainExtractor') { return GrainExtractor; }
    if (value === 'GrainStuffer') { return GrainStuffer; }
    if (value === 'Harvester') { return HarvesterImplement; }
    if (value === 'MixerWagon') { return MixerWagon; }
    if (value === 'Planer') { return Planer; }
    if (value === 'Plow') { return Plow; }
    if (value === 'Rake') { return Rake; }
    if (value === 'SeedDrill') { return SeedDrill; }
    if (value === 'Sprayer') { return SprayerImplement; }
    if (value === 'Trimmer') { return Trimmer; }
    if (value === 'TruckBody') { return TruckBody; }
    if (value === 'WaterPump') { return WaterPump; }
    if (value === 'Winch') { return Winch; }
  }

  public static getType(type: string): any {
    const current = type.split('::')[1] as string;
    return this.available(current);
  }

  public translatedClassName(): string {
    const available = {
      'Baler': 'Enfarfadeira',
      'Distributor': 'Distribuidor',
      'Driller': 'Perfurador',
      'ForageHarvester': 'Ensiladeira',
      'ForageWagon': 'Vagão Forrageiro',
      'Forage': 'Forrageiro',
      'GraderGrade': 'Grade Níveladora',
      'GrainExtractor': 'Extratora de Grãos',
      'GrainStuffer': 'Embutidora de Grão',
      'HarvesterImplement': 'Colheitadeira',
      'MixerWagon': 'Vagão Misturador',
      'Planer': 'Plaina Agrícola',
      'Plow': 'Arado',
      'Rake': 'Ancinho',
      'SeedDrill': 'Semeadora',
      'SprayerImplement': 'Pulverizador',
      'Trimmer': 'Roçadeira',
      'TruckBody': 'Carroceria',
      'WaterPump': 'Bomba de Água',
      'Winch': 'Guincho'
    };

    return available[this.constructor.name];
  }

}
