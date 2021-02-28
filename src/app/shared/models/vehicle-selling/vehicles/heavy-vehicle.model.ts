import { Vehicle } from '@clicca-webapp/shared/models/vehicle-selling';

export abstract class HeavyVehicle extends Vehicle {

  public mileage: number;
  public doors: number;
  public city: string;
  public state: string;

}
