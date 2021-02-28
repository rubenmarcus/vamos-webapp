import { Base } from '@clicca-webapp/shared/models/base.model';
// import { BrandsSelectHelper } from '@clicca-webapp/shared/helpers/index';

export class Brand extends Base {
  public id: string;
  public name: string;
  public kind: string;
  public status: string;
  public models_size: number;
  public created_at: Date;
  public updated_at: Date;


  translatedKind(): string {
    return 'asdasd';
    // return BrandsSelectHelper.translate(this.kind);
  }

}
