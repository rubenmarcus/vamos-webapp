import { Base } from '@clicca-webapp/shared/models/base.model';

export class Company extends Base {

  public fantasy_name: string;
  public company_name: string;
  public cnpj: string;
  public website: string;
  public cnh: number;
  public responsible: string;
  public role: string;

  public fullName(): string {
    return this.company_name;
  }

}
