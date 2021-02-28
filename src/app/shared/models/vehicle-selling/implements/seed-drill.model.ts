import { Implement } from '../implement.model';
import { EnumFunction } from '../../../decorators';

export class SeedDrill extends Implement {

  public deposit_capacity: number;
  public fertilize_tank: number;
  public rows: number;
  public line_space: number;
  public overall_width: number;
  public header_width: number;
  public depth: number;

  private _system: string;
  private _flow_type: string;

  @EnumFunction({
    'drag': 'Arrasto',
    'articulated': 'Articulado',
    'hydraulic': 'Hidraulico'
  })
  public get system() {return this._system; }
  public set system(value: string) {}

  @EnumFunction({
    'continuous': 'Contínuo',
    'precision': 'Precisão'
  })
  public get flow_type() { return this._flow_type; }
  public set flow_type(value: string) {}
}
