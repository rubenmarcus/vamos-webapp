export class Base {

  public id: any;
  public created_at: Date;
  public updated_at: Date;

  constructor(params?: any) {
    if (params) {  this.setParams(params); }
    this.created_at = (this.created_at !== undefined ? new Date(this.created_at) : new Date());
    this.updated_at = (this.updated_at !== undefined ? new Date(this.updated_at) : new Date());
  }

  setParams(params: any): void {
    for (const [key, value] of Object.entries(params)) {
      this[key] = value;
    }
  }

  inspect(): void {
    for (const [key, value] of Object.entries(this)) {
      console.log(key, value);
    }
  }

  className(): string {
    return this.constructor.name;
  }

  isA(klass: string): boolean {
    return this.constructor.name === klass;
  }

}
