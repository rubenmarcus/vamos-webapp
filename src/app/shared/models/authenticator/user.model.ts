import { Base } from '@clicca-webapp/shared/models/base.model';
import { Person, Company, System, Address } from '@clicca-webapp/shared/models/authenticator/index';
import { Relational, RelationalAbstract, EnumFunction } from '@clicca-webapp/shared/decorators/index';
import { stringify } from '@angular/compiler/src/util';
import { InvalidToken } from '@clicca-webapp/shared/class/errors/invalid-token.error';
import { SessionExpired } from '@clicca-webapp/shared/class/errors/session-expired.error';

export class User extends Base {

  public id: string;
  public access_token: string;
  public email: string;
  public password_hash: string;
  public session_token: string;
  public phone: string;
  public type: string;
  public second_phone: string;
  public firebase_token: string;
  public picture_profile: string;
  public profile_type: string;
  public profile_id: string;
  public last_session: Date;
  public session_expires_at: Date;
  public recover_code: string;
  public recover_expires_at: Date;
  public created_at: Date;
  public updated_at: Date;
  public offers_subscription_available: boolean;
  public offers_subscription_expires_at;
  // public offers_subscription_expires_at;

  public profile: Person | Company;

  public address: any;

  private _status: string;
  private _profile: System;
  private _address: Address;

  // @Relational()
  // @Reflect.metadata('dedign:type', Address)
  // get address() { return this._address; }
  // set address(value: any) { this._address = value; }

  // @RelationalAbstract()
  // @Reflect.metadata('design:type', System)
  // get profile() { return this._profile; }
  // set profile(value: any) { this._profile = value; }

  @EnumFunction({
    'active': 'Ativo',
    'archived': 'Arquivado',
    'awaiting': 'Aguardando'
  })
  get status() { return this._status; }
  set status(value: any) { this._status = value; }

  constructor(params?: any) {
    super(params);
    this.session_expires_at = new Date(this.session_expires_at);
    this.recover_expires_at = new Date(this.recover_expires_at);
  }

  static fromCache(): User {
    const parsed = JSON.parse(localStorage.getItem('session')) || JSON.parse(sessionStorage.getItem('session'));
    if (parsed) {
      return new User(parsed);
    } else {
      return null;
    }
  }

  static setCache(object) {
    const newObject = Object.assign(User.fromCache(), object);
    if (User.isSession()) {
      sessionStorage.setItem('session', JSON.stringify(newObject));
    } else {
      localStorage.setItem('session', JSON.stringify(newObject));
    }
  }

  static saveCache(params, loggedIn) {
    const object = {
      access_token: params.access_token,
      id: params.id,
      email: params.email,
      type: params.type,
      status: params.status,
      profile_type: params.profile_type,
      profile_id: params.profile_id,
      phone: params.phone,
      picture_profile: params.picture_profile,
      last_session: params.last_session,
      session_token: params.session_token,
      recover_expires_at: params.recover_expires_at,
      session_expires_at: params.session_expires_at,
      firebase_token: params.firebase_token,
      offers_subscription_available: params.offers_subscription_available,
      offers_subscription_expires_at: params.offers_subscription_expires_at,
      profile: {}
    };

    if( params.profile_type === 'Company') {
      object.profile['company_name'] = params.profile.company_name;
      object.profile['fantasy_name'] = params.profile.fantasy_name;
    } else {
      object.profile['first_name'] = params.profile.first_name;
      object.profile['last_name'] = params.profile.last_name;
      object.profile['cpf'] = params.profile.cpf;
    }
    const user = User.fromCache() || {};
    const newObject = Object.assign(user, object);
    if (User.isSession() || !loggedIn) {
      sessionStorage.setItem('session', JSON.stringify(newObject));
    } else {
      localStorage.setItem('session', JSON.stringify(newObject));
    }
  }

  static isSession(): boolean {
    return sessionStorage.getItem('session') ? true : false;
  }

  static isLogged():boolean {
    return JSON.parse(localStorage.getItem('session')) || JSON.parse(sessionStorage.getItem('session')) ? true : false;
  }

  fullName(): string {
    if (this.isPerson()) {
      return `${this.person().first_name} ${this.person().last_name}`;
    } else {
      return `${this.company().company_name}`;
    }
  }

  private setupProfile(): void {
    if (this.profile) {
      const klass = (this.isPerson() ? Person : Company);
      this.profile = new klass(this.profile);
    }
  }

  isPerson(): boolean {
    return this.profile_type === 'Person';
  }

  person(): Person {
    return this.profile as Person;
  }
  company(): Company {
    return this.profile as Company;
  }

  verifyKey(): void {
    if (this.session_token === '' || this.session_token === null || this.session_token === undefined) {
      throw(new InvalidToken('Sessão do usuário não foi iniciada'));
    }
  }

  checkExpiration(): void {
    if (this.session_expires_at < new Date()) {
      throw(new SessionExpired('Sessão expirada'));
    }
  }
}
