import { Base } from '@clicca-webapp/shared/models/base.model';

export class Person extends Base {

  public first_name: string;
  public last_name: string;
  public cpf: string;
  public cnh: any;

  public _birth_date: any;

  constructor(params?: any) {
    super(params);
  }

  public fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  public set birth_date(value: any) {
    const date = new Date(value);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    this._birth_date = `${day}/${month}/${year}`;
  }
  public get birth_date() { return this._birth_date; }

}
