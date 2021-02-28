import { Base } from '@clicca-webapp/shared/models/base.model';
import { Company, Person, Collaborator, Admin } from '@clicca-webapp/shared/models/authenticator/index';

export abstract class System extends Base {

  public first_name: string;
  public last_name: string;
  public cpf: string;
  public created_at: any;
  public updated_at: any;

  private _full_name: string;
  public get full_name(): string { return this._full_name; }
  public set full_name(value: string) { this._full_name = value; }

  public static available(value: any): any {
    if (value === 'Admin') { return Admin; }
    if (value === 'Collaborator') { return Collaborator; }
    if (value === 'Company') { return Company; }
    if (value === 'Person') { return Person; }
  }

  public static getType(type: string): any {
    return this.available(type);
  }

  public translatedClassName(): string {
    const available = {
      'Admin': 'Administrador',
      'Collaborator': 'Colaborador',
      'Company': 'Pessoa Jurídica',
      'Person': 'Pessoa Física'
    };
    return available[this.constructor.name];
  }

  public fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }




}
