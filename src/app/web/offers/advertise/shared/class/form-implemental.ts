import { NgModule } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HelpersOffer } from "@clicca-webapp/web/offers/advertise/shared/class/helpers-offer";
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@NgModule()
export class FormImplemental {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  implement(offer){
    let object = null;
    const session = HelpersOffer.offerFromCache();
    if(session.type === 'agros'){
      object = this.formBuilder.group(this.objectImplement(offer));
    }else if(session.kind === 'implemental' && session.type !== 'agros'){
      object = this.formBuilder.group(Object.assign(this.objectImplement(offer), this[session.type](offer)));
    }else if(session.kind === 'both' || session.type === 'truckBody'){
      object = this.formBuilder.group(Object.assign(this.objectImplement(offer), this.truckBody(offer)));
    }
    return object;
  }

  objectImplement(offer) {
    const implement = offer.implement;
    return {
      brand_id: [{value: implement ? implement.brand.id : '', disabled: HelpersOffer.isUpdate()}, [Validators.required]],
      model_id: [{value: implement ? implement.model.id : '', disabled: true}, [Validators.required]],
      year: [implement ? implement.year : ''],
      year_model: [implement ? implement.year_model : ''],
      weight: [implement ? implement.weight : null],
      wheel: [implement ? implement.wheel : null],
      tdp: [implement ? implement.tdp : null],
      condition: [implement ? this.setValueOriginal(implement._condition) : 'newer', []],
      chassis: [implement ? implement.chassis : ''],
      plate: [{value: implement ? implement.plate : '', disabled: HelpersOffer.isUpdate()}],
      axes: [implement ? implement.axes : null],
      tech_guide: [''],
      type: [{value: this.setType(), disabled: implement ? true : false }, [Validators.required]],
      state: [implement ? this.setState(implement.state) : '', [noEmoji]],
      city: [implement ? implement.city : '' , [noEmoji]],
    };
  }

  setState(value) {
    return value && value !== 'N/A' ? value : '';
  }

  setValueOriginal(value) {
    return value ? value : '';
  }

  setType(): string {
    const type = HelpersOffer.offerFromCache().type;
    switch(type) {
      case 'tractorsAndImplements': {
        return 'truckBody';
      }
      case 'agros': {
        return '';
      }
      default: {
        return HelpersOffer.offerFromCache().type;
      }
   }
  }

  baler(offer) {
    const implement = offer.implement;
    return {
      rotation: [implement ? implement.rotation : null],
      piston_speed: [implement ? implement.piston_speed : null],
      folding_width: [implement ? implement.folding_width : null],
      average_yield: [implement ? implement.average_yield : null],
      wire_resevoir: [implement ? implement.wire_resevoir : null],
      bale_height: [implement ? implement.bale_height : null],
      bale_width: [implement ? implement.bale_width : null],
      bale_length: [implement ? implement.bale_length : null],
    }
  }

  distributor(offer) {
    const implement = offer.implement;
    return {
      width_distribution: [implement ? implement.width_distribution : null],
      capacity: [implement ? implement.capacity : null],
      length: [implement ? implement.length : null],
      width: [implement ? implement.width : null],
      height: [implement ? implement.Cmd : null],
      flow_rate: [implement ? implement.flow_rate : null],
    }
  }

  driller(offer) {
    const implement = offer.implement;
    return {
      drill_diameter: [implement ? implement.drill_diameter : null],
      torque_drilling: [implement ? implement.torque_drilling : null],
      rotation_drilling: [implement ? implement.rotation_drilling : null],
      discharge_rotation: [implement ? implement.discharge_rotation : null],
      depth_drilling: [implement ? implement.depth_drilling : null],
    }
  }

  forage(offer) {
    const implement = offer.implement;
    return {
      average_production: [implement ? implement.average_production : null],
      chopping_sizes: [implement ? implement.chopping_sizes : null],
      rotation_tdp: [implement ? implement.rotation_tdp : null],
      rotors: [implement ? implement.rotors : null],
      knives: [implement ? implement.knives : null],
      pickup_rollers: [implement ? implement.pickup_rollers : null],
    }
  }

  forageHarvester(offer) {
    const implement = offer.implement;
    return {
      knives: [implement ? implement.knives : null],
      average_yield: [implement ? implement.average_yield : null],
      chopping_sizes: [implement ? implement.chopping_sizes : null],
      motor_power: [implement ? implement.motor_power : null],
    }
  }

  forageWagon(offer) {
    const implement = offer.implement;
    return {
      back_discharge_time: [implement ? implement.back_discharge_time : null],
      front_discharge_cap: [implement ? implement.front_discharge_cap : null],
      storage: [implement ? implement.storage : null],
      total_height: [implement ? implement.total_height : null],
      height_discharge_spout: [implement ? implement.height_discharge_spout : null],
      overall_width: [implement ? implement.overall_width : null],
      transport_width: [implement ? implement.transport_width : null],
      overall_length: [implement ? implement.overall_length : null],
      transport_length: [implement ? implement.transport_length : null],
    }
  }

  graderGrade(offer) {
    const implement = offer.implement;
    return {
      discs: [implement ? implement.discs : null],
      diameter_discs: [implement ? implement.diameter_discs : null],
      working_depth: [implement ? implement.working_depth : null],
      working_width: [implement ? implement.working_width : null],
      bearing: [implement ? implement.bearing : ''],
    }
  }

  grainExtractor(offer) {
    const implement = offer.implement;
    return {
      average_production: [implement ? implement.average_production : null],
      rotation: [implement ? implement.rotation : null],
      thread_width: [implement ? implement.thread_width : null],
      bag: [implement ? implement.bag : null],
      discharge_height: [implement ? implement.discharge_height : null],
      working_length: [implement ? implement.working_length : null],
      working_height: [implement ? implement.working_height : null],
      working_width: [implement ? implement.working_width : null],
      transport_length: [implement ? implement.transport_length : null],
      transport_height: [implement ? implement.transport_height : null],
      transport_width: [implement ? implement.transport_width : null],
    }
  }

  grainStuffer(offer) {
    const implement = offer.implement;
    return {
      continuous_flow: [implement ? implement.continuous_flow : null],
      working_speed: [implement ? implement.working_speed : null],
      working_length: [implement ? implement.working_length : null],
      working_width: [implement ? implement.working_width : null],
      working_height: [implement ? implement.working_height : null],
      transport_width: [implement ? implement.transport_width : null],
      height_without_moega: [implement ? implement.height_without_moega : null],
      bag: [implement ? implement.bag : null],
    }
  }

  harvester(offer) {
    const implement = offer.implement;
    return {
      usage_hours: [implement ? implement.usage_hours : null],
      rated_power: [implement ? implement.rated_power : null],
      harvest_speed: [implement ? implement.harvest_speed : null],
      bulk_tank: [implement ? implement.bulk_tank : null],
      pipe: [implement ? implement.pipe : null],
      flow_rate: [implement ? implement.flow_rate : null],
      cutting_platform: [implement ? implement.cutting_platform : null],
      tyre_condition: [implement ? this.setValueOriginal(implement._tyre_condition) : ''],
      cabin: [implement ? implement.cabin : ''],
      harvest: [implement ? implement.harvest : ''],
      wheel_type: [implement ? implement.wheel_type : ''],
      transmission: [implement ? implement.transmission : ''],
      precision_agriculture: [implement ? implement.precision_agriculture : ''],
    }
  }

  mixerWagon(offer) {
    const implement = offer.implement;
    return {
      storage: [implement ? implement.storage : null],
      width: [implement ? implement.width : null],
      length: [implement ? implement.length : null],
      height: [implement ? implement.height : null],
    }
  }

  planer(offer) {
    const implement = offer.implement;
    return {
      length: [implement ? implement.length : null],
      cutting_width: [implement ? implement.cutting_width : null],
    }
  }

  plow(offer) {
    const implement = offer.implement;
    return {
      rods: [implement ? implement.rods : null],
      discs: [implement ? implement.discs : null],
      disc_diameter: [implement ? implement.disc_diameter : null],
      bearing: [implement ? implement.bearing : ''],
      working_width: [implement ? implement.working_width : null],
      working_depth: [implement ? implement.working_depth : null],
    }
  }

  rake(offer) {
    const implement = offer.implement;
    return {
      working_width: [implement ? implement.working_width : null],
      line_width: [implement ? implement.line_width : null],
      transport_width: [implement ? implement.transport_width : null],
      max_capacity: [implement ? implement.max_capacity : null],
    }
  }

  seedDrill(offer) {
    const implement = offer.implement;
    return {
      deposit_capacity: [implement ? implement.deposit_capacity : null],
      fertilize_tank: [implement ? implement.fertilize_tank : null],
      rows: [implement ? implement.rows : null],
      line_space: [implement ? implement.line_space : null],
      overall_width: [implement ? implement.overall_width : null],
      header_width: [implement ? implement.header_width : null],
      depth: [implement ? implement.depth : null],
      system: [implement ? implement.system : ''],
      flow_type: [implement ? implement.flow_type : ''],
    }
  }

  sprayer(offer) {
    const implement = offer.implement;
    return {
      tank_capacity: [implement ? implement.tank_capacity : null],
      application_range: [implement ? implement.application_range : null],
      flow_rate: [implement ? implement.flow_rate : null],
      command: [implement ? implement.command : null],
    }
  }

  trimmer(offer) {
    const implement = offer.implement;
    return {
      knives: [implement ? implement.knives : null],
      knife_rotation: [implement ? implement.knife_rotation : null],
      cutting_width: [implement ? implement.cutting_width : null],
      cutting_height: [implement ? implement.cutting_height : null],
      width_transport: [implement ? implement.width_transport : null],
    }
  }

  truckBody(offer) {
    const implement = offer.implement;
    return {
      body_type_id: [implement ? implement.body_type.id : '', [Validators.required]],
      state: [implement ? this.setState(implement.state) : ''],
      city: [implement ? implement.city : ''],
      axes: [implement ? implement.axes : null],
      plate: [{value: implement ? implement.plate : '', disabled: HelpersOffer.isUpdate()}],
      tyre_condition: [implement ? this.setValueOriginal(implement._tyre_condition) : ''],
    }
  }

  waterPump(offer) {
    const implement = offer.implement;
    return {
      flow: [implement ? implement.flow : null],
      rotation: [implement ? implement.rotation : null],
      suction: [implement ? implement.suction : null],
      recalque: [implement ? implement.recalque : null],
    }
  }

  winch(offer) {
    const implement = offer.implement;
    return {
      lift_capacity: [implement ? implement.lift_capacity : null],
      shaft_distance: [implement ? implement.shaft_distance : null],
      tower_height: [implement ? implement.tower_height : null],
      overall_width: [implement ? implement.overall_width : null],
      min_lift: [implement ? implement.min_lift : null],
      max_lift: [implement ? implement.max_lift : null],
      angle: [implement ? implement.angle : null],
    }
  }

}
