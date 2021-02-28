import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { BrandsService } from '@clicca-webapp/shared/services/vehicle-selling/brands-service/brands.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ModelsService } from '@clicca-webapp/shared/services/vehicle-selling/models-service/models.service';
import { FormGroup } from '@angular/forms';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-left-menu-vehicle-select',
  templateUrl: './vehicle-select.component.html'
})
export class VehicleSelectComponent implements OnInit {

  @Input() type;
  @Input() typeFilter: FormGroup;

  private subscriptions: Subscription[] = [];
  private enum = {
    maquinas: 'implement',
    onibus: 'bus',
    tratores: 'tractor_agricultural',
    conjuto: 'truck',
    cavalo: 'tractor_unit',
    carroceria: 'truck_body',
    caminhoes: 'truck',
  };

  public implementsTypes = [
    {
      name: 'Enfarfadeira',
      type: 'baler',
    },
    {
      name: 'Distribuidor',
      type: 'distributor',
    },
    {
      name: 'Perfuradora',
      type: 'driller',
    },
    {
      name: 'Forrageira',
      type: 'forage',
    },
    {
      name: 'Ensiladeira',
      type: 'forageHarvester',
    },
    {
      name: 'Vagão Forrageiro',
      type: 'forageWagon',
    },
    {
      name: 'Grade Niveladora',
      type: 'graderGrade ',
    },
    {
      name: 'Extratora de Grãos',
      type: 'grainExtractor',
    },
    {
      name: 'Embutidora de Grão',
      type: 'grainStuffer',
    },
    {
      name: 'Colheitadeira',
      type: 'harvester',
    },
    {
      name: 'Vagão Misturador',
      type: 'mixerWagon',
    },
    {
      name: 'Plaina',
      type: 'planer',
    },
    {
      name: 'Arado',
      type: 'plow',
    },
    {
      name: 'Ancinho',
      type: 'rake',
    },
    {
      name: 'Semeadora',
      type: 'seedDrill',
    },
    {
      name: 'Pulverizadora',
      type: 'sprayer',
    },
    {
      name: 'Aparador',
      type: 'trimmer',
    },
    {
      name: 'Carroceria',
      type: 'truckBody',
    },
    {
      name: 'Bomba de Água',
      type: 'waterPump',
    },
    {
      name: 'Guincho',
      type: 'winch',
    },
  ].sort(Helpers.dynamicSort("name"));
  public brands;
  public models;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentsService: ComponentsService,
    private brandsService: BrandsService,
    private modelsService: ModelsService
  ) { }

  ngOnInit() {
    this.type = this.type;
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    const url = this.router.url.split('/').pop();
    this.type = this.enum[url];
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.type = this.enum[params.name];
        this.getBrand(this.enum[params.name]);
      })
    );
  }

  getBrand(kind){
    this.subscriptions.push(
      this.brandsService.byKind(kind).subscribe(res => {
        this.brands = res;
      })
    );
  }

  getModel(id){
    this.typeFilter.get('model_id').disable();
    this.subscriptions.push(
      this.modelsService.index(id).subscribe(res => {
        this.models = res.objects;
        this.typeFilter.get('model_id').enable();
      })
    );
  }

  changeOption(event){
    if(event.target.value === "" ){
      this.typeFilter.get('model_id').setValue("");
      this.typeFilter.get('model_id').disable();
    }else{
      this.getModel(event.target.value);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
