import { Base } from '@clicca-webapp/shared/models/base.model';
import { EnumFunction } from '../../decorators';

export class Advertiser extends Base {
  public id: string;
  public name: string;
  public about: string;
  // public profile: string;
  public operating_hours: string;
  public phone: string;
  public user_id: string;
  public photo_url: string;
  public thumb_url: string;
  public created_at: Date;
  public updated_at: Date;

  private _status: string;
  private _profile: string;

  @EnumFunction({
    'active': 'Ativo',
    'archived': 'Arquivado'
  })
  public get status(): string { return this._status; }

  @EnumFunction({
    'person': 'Particular',
    'company': 'Concessionária'
  })
  public get profile(): string { return this._profile; }

  public isStatus(value: string): boolean {
    return this._status === value;
  }

}
