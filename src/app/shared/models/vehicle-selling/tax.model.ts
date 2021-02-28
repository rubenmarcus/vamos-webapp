import { Base } from '@clicca-webapp/shared/models/base.model';

export class Tax extends Base {
  public id: string;
  public tax_value: number;
  public parcels: Array<any>;
}
