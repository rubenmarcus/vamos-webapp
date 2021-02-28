import { NgModule } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HelpersOffer } from "@clicca-webapp/web/offers/advertise/shared/class/helpers-offer";
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@NgModule()
export class FormBuilderVehicleModule {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  getVehicle(offer){
    let object = null;
    const session = HelpersOffer.offerFromCache();
    if(session.kind === 'vehicular' && session.firstAccess){
      object = this.formBuilder.group(this.vehicle(offer));
    }else if(session.kind === 'vehicular'){
      object = this.formBuilder.group(Object.assign(this.vehicle(offer), this[session.type](offer)));
    }else if(session.kind === 'both'){
      object = this.formBuilder.group(Object.assign(this.vehicle(offer), this.tractorUnit(offer)));
    }
    return object;
  }

  vehicle(offer) {
    const vehicle = offer.vehicle;
    return {
      kind_id: [vehicle && vehicle.kind.id ? vehicle.kind.id : ''],
      color_id: [vehicle && vehicle.color.id ? vehicle.color.id : ''],
      wheel_drive_id: [vehicle && vehicle.wheel_drive.id ? vehicle.wheel_drive.id : ''],

      condition: [vehicle ? this.setValueOriginal(vehicle._condition) : '', []],

      brand_id: [{value: vehicle ? vehicle.brand.id : '', disabled: HelpersOffer.isUpdate()}, [Validators.required]],
      model_id: [{value: vehicle && vehicle.model.id ? vehicle.model.id : '', disabled: true}, [Validators.required]],
      last_revision: [vehicle ? vehicle.last_revision : ''],
      year: [vehicle ? vehicle.year : '0'],
      year_model: [vehicle ? vehicle.year_model : ''],
      chassis: [vehicle ? vehicle.chassis : ''],

      city: [vehicle ? vehicle.city : '', [noEmoji]],
      state: [vehicle ? this.setState(vehicle.state) : '', []],

      plate: [{ value: vehicle && vehicle.plate ? vehicle.plate : '', disabled: this.isPlate(vehicle) }, []],
      tech_guide: [''],
      tyre_condition: [vehicle ? this.setValueOriginal(vehicle._tyre_condition) : ''],
      fuel: [vehicle ? this.setValueOriginal(vehicle._fuel) : ''],

      type: [vehicle ? vehicle.type : ''],
      subtype: [vehicle ? vehicle.subtype : ''],
      typeImplement: [{ value: HelpersOffer.offerFromCache().type, disabled: vehicle ? true : false }, []],
      body_type_id: [vehicle && vehicle.body_type ? vehicle.body_type.id : ''],
    }
  }

  setState(value) {
    return value && value !== 'N/A' ? value : '';
  }

  setValueOriginal(value) {
    return value ? value : '';
  }

  isPlate(vehicle): boolean {
    return vehicle && vehicle.plate
  }

  truck(offer) {
    const vehicle = offer.vehicle;
    return {
      mileage: [vehicle ? vehicle.mileage : null, []],
      doors: [vehicle ? vehicle.doors : null, []],
      body_type_id: [vehicle && vehicle.body_type.id ? vehicle.body_type.id : '', []],
      has_truck_body: [vehicle ? vehicle.has_truck_body : '', []],
    }
  }

  bus(offer) {
    const vehicle = offer.vehicle;
    return {
      mileage: [vehicle ? vehicle.mileage : null, []],
      body_type_brand: [vehicle ? vehicle.body_type_brand : '', []],
      doors: [vehicle ? vehicle.doors : null, []],
      placements: [vehicle ? vehicle.placements : null, []],
      subtype: [vehicle ? vehicle.subtype : '', []],
      division: [vehicle ? vehicle.division : '', []],
    }
  }

  tractorUnit(offer) {
    const vehicle = offer.vehicle;
    return {
      mileage: [vehicle ? vehicle.mileage : null, []],
      doors: [vehicle ? vehicle.doors : null, []],
    };
  }

  tractorAgricultural(offer) {
    const vehicle = offer.vehicle;
    return {
      usage_hours: [vehicle ? vehicle.usage_hours : null, [Validators.required]],
      lift_capacity: [vehicle ? vehicle.lift_capacity : null, [Validators.required]],
      cabin: [vehicle ? vehicle.cabin : '', [Validators.required]],
      rated_power: [vehicle ? vehicle.rated_power : null, [Validators.required]],
      max_torque: [vehicle ? vehicle.max_torque : null, [Validators.required]],
      cylinders: [vehicle ? vehicle.cylinders : null, [Validators.required]],
      tire_type: [vehicle ? this.setValueOriginal(vehicle._tire_type) : '', [Validators.required]],
    };
  }

  harvesterVehicle(offer) {
    const vehicle = offer.vehicle;
    return {
      usage_hours: [vehicle ? vehicle.usage_hours : null, []],
      rated_power: [vehicle ? vehicle.rated_power : null, []],
      harvest_speed: [vehicle ? vehicle.harvest_speed : null, []],
      bulk_tank: [vehicle ? vehicle.bulk_tank : null, []],
      pipe: [vehicle ? vehicle.pipe : null, []],
      flow_rate: [vehicle ? vehicle.flow_rate : null, []],
      cutting_platform: [vehicle ? vehicle.cutting_platform : null, []],
      cabin: [vehicle ? vehicle.cabin : '', []],
      harvest: [vehicle ? this.setValueOriginal(vehicle._harvest) : '', []],
      wheel_type: [vehicle ? this.setValueOriginal(vehicle._wheel_type) : '', []],
      transmission: [vehicle ? this.setValueOriginal(vehicle._transmission) : '', []],
      precision_agriculture: [vehicle ? this.setValueOriginal(vehicle._precision_agriculture) : '', []],
    };
  }

  sprayerVehicle(offer) {
    const vehicle = offer.vehicle;
    return {
      usage_hours: [vehicle ? vehicle.usage_hours : null, []],
      tank_capacity: [vehicle ? vehicle.tank_capacity : null],
      range_application: [vehicle ? vehicle.range_application : null],
      flow_rate: [vehicle ? vehicle.flow_rate : null],
      command: [vehicle ? vehicle.command : null],
      rated_power: [vehicle ? vehicle.rated_power : null, []],
      tire_type: [vehicle ? vehicle.tire_type : '', []],
      wheels: [vehicle ? vehicle.wheels : null],
    };
  }

}
