import { Base } from '@clicca-webapp/shared/models/base.model';

export class Address extends Base {

  public line1: string;
  public number: number;
  public complement: string;
  public city: string;
  public state: string;
  public zip: string;
  public district: string;
  public longitude: string;
  public latitude: string;
  public addressible_id: string;
  public addressible_type: string;

}
