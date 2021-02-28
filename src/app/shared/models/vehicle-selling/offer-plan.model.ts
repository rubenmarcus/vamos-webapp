import { Base } from '@clicca-webapp/shared/models/base.model';
import { EnumFunction } from '@clicca-webapp/shared/decorators/index';

export class OfferPlan extends Base {

  public id: string;
  public name: string;
  public details: string;
  public value: number;
  public offers: number;
  public photos: number;
  // public pagseguro_code: string;
  public trial: number;
  public video: boolean;
  public cancel_request: boolean;
  public color_start: string;
  public color_end: string;

  public _kind: number;
  public _period: number;
  public _status: number;

  public created_at: Date;
  public updated_at: Date;

  @EnumFunction({
    'default': 'Padrão',
    'custom': 'Customizado'
  })
  get kind() { return this._kind; }
  set kind(value: any) { }

  @EnumFunction({
    'active': 'Ativo',
    'archive': 'Arquivado'
  })
  get status() { return this._status; }
  set status(value: any) { }

  @EnumFunction({
    'monthly': 'Mensal'
  })
  get period() { return this._period; }
  set period(value: any) { }

}
