export class HelpersOffer {

  constructor() { }

  static offerFromCache(){
    return JSON.parse(sessionStorage.getItem('offerSelected')) || {};
  }

  static isUpdate():boolean{
    const obj = HelpersOffer.offerFromCache();
    return obj.hasOwnProperty("offer_id") ? true : false;
    // return HelpersOffer.offerFromCache().offer_id ? true : false;
  }

  static isVehicle():boolean {
    return HelpersOffer.offerFromCache().kind === 'vehicular';
  }

  static isImplement():boolean {
    return HelpersOffer.offerFromCache().kind === 'implemental';
  }

  static isBoth():boolean {
    return HelpersOffer.offerFromCache().kind === 'both';
  }

  static isUpdateBoth():boolean {
    return HelpersOffer.isUpdate() && HelpersOffer.isBoth();
  }

  static isUpdateVehicle():boolean {
    return HelpersOffer.isUpdate() && HelpersOffer.isVehicle();
  }

  static isUpdateImplement():boolean {
    return HelpersOffer.isUpdate() && HelpersOffer.isImplement();
  }
  static isFirstAccess():boolean {
    return HelpersOffer.offerFromCache().firstAccess ? true : false;
  }

  static save(offer){
    let object = { kind: offer._kind, type: 'tractorsAndImplements', offer_id : offer.id };
    if(offer._kind === 'implemental'){
      object.type = offer.implement.type.split('::').pop().firstLetterLowercase();
    }else if(offer._kind === 'vehicular' && offer.vehicle.type === 'Vehicles::Harvester'){
      object.type = 'harvesterVehicle';
    }else if(offer._kind === 'vehicular' && offer.vehicle.type === 'Vehicles::Sprayer'){
      object.type = 'sprayerVehicle';
    }else if(offer._kind === 'vehicular'){
      object.type = offer.vehicle.type.split('::').pop().firstLetterLowercase();
    }
    const newOffer = Object.assign(HelpersOffer.offerFromCache(), object)
    sessionStorage.setItem('offerSelected', JSON.stringify( newOffer ));
  }

  static delete(){
    sessionStorage.removeItem('offerSelected');
  }

}
