import { Base } from '@clicca-webapp/shared/models/base.model';

export class Model extends Base {
  public id: string;
  public name: string;
  public status: string;
  public brand_id: string;
  public created_at: Date;
  public updated_at: Date;

  STATUS = {
    active: 'Ativo',
    archive: 'Arquivado'
  };

  public isActive(): boolean {
    return this.status === 'active';
  }

  public getStatus(): string {
    return this.STATUS[this.status];
  }

}
