import { Base } from '@clicca-webapp/shared/models/base.model';
import { Relational, RelationalList, RelationalAbstract, EnumFunction } from '@clicca-webapp/shared/decorators/index';
import { Vehicle, Implement, Advertiser, Component } from '@clicca-webapp/shared/models/vehicle-selling/index';

export class Offer extends Base {

  public id: string;
  public user_id: string;
  public user_name: string;
  public title: string;
  public trade: boolean;
  public aggregate: boolean;
  public description: string;
  public value: number;
  public video_url: string;
  public viewers: number;
  public buyers: number;
  public images: Array<any>;
  public favorited: boolean;

  public created_at: Date;
  public updated_at: Date;

  public cityState: String;

  private _advertiser: Advertiser;
  private _vehicle: Vehicle;
  private _implement: Implement;
  private _optionals: Array<Component>;

  private _kind: string;
  private _status: string;

  @EnumFunction({
    'vehicular': 'Veículo',
    'implemental': 'Implemento',
    'both': 'Conjunto'
  })
  get kind() { return this._kind; }
  set kind(value: any) { }

  @EnumFunction({
    'published': 'Publicado',
    'draft': 'Rascunho',
    'incomplete': 'Incompleto',
    'archive': 'Arquivado',
    'sold': 'Vendido',
    'banned': 'Banido'
  })
  get status() { return this._status; }
  set status(value: any) { }

  public isStatus(value: string): boolean {
    return this._status === value;
  }

  @Relational()
  @Reflect.metadata('design:type', Advertiser)
  get advertiser() { return this._advertiser; }

  @RelationalList()
  @Reflect.metadata('design:type', Component)
  get optionals() { return this._optionals; }

  @RelationalAbstract()
  @Reflect.metadata('design:type', Vehicle)
  get vehicle() { return this._vehicle; }

  @RelationalAbstract()
  @Reflect.metadata('design:type', Implement)
  get implement() { return this._implement; }

  public getKind(): string {
    return this._kind;
  }

  public isVehicular(): boolean { return this._kind === 'vehicular'; }
  public isImplemental(): boolean { return this._kind === 'implemental'; }
  public isBoth(): boolean { return this._kind === 'both'; }

  public getIndexTitle(): string {
    if (this.isVehicular()) {
      return `${this.vehicle.brand.name} | ${this.vehicle.model.name}`;
    } else if (this.isImplemental()) {
      if (this.implement.type.match(/TruckBody/)) {
        return `${this.implement.brand.name} | ${this.implement.body_type.name}`;
      } else {
        return this.implement.brand.name;
      }
    } else {
      let title = `${this.vehicle.brand.name} | ${this.vehicle.model.name}`;
      if (this.implement.body_type) { title = `${title} | ${this.implement.body_type.name}`; }
      return title;
    }
  }

}
