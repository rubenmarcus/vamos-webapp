import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { } from '@types/googlemaps';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';



@Component({ preserveWhitespaces: false,
  selector: 'card-network-search-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardNetworkSearchComponent implements OnInit {

  public searchForm: FormGroup;
  private emptyField = true;

  @Input() establishments;
  @Input() specialites;
  @Output() clinicID = new EventEmitter;
  @Output() search = new EventEmitter;
  @Output() points = new EventEmitter;
  @Output() listType = new EventEmitter;
  @Output() setMap = new EventEmitter;
  @Output() renew = new EventEmitter;
  isClinics = false;
  isDrugStore = true;
  options;
  type;
  local:boolean = false;
  @ViewChild('placesRef') placesRef : GooglePlaceDirective;
    

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.listType.emit('drugstore');
    // console.log(this.specialites);

    this.local = false;
    this.options = {

      
        componentRestrictions: { country: 'BR' }
       
    }
 
    this.createSearchForm();

  }

 

 
  // ngAfterViewInit(): void { 
  //   this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpp9tS1DyvOctKNwn0TS07LUEiRA9tVz8&libraries=places&callback=initMap');

  //   setTimeout(()=> {
  //     this.initialize();
     
  //     }, 1000);

  // }


     public handleAddressChange(address: Address) {
     // console.log(address.geometry.location.lng());
     // console.log(address.geometry.location.lat());
      // console.log(address.geometry.location.toJSON());


      this.renew.emit('');
      const coords = {

        lat: address.geometry.location.lat(),
        long: address.geometry.location.lng()
      };

      this.setMap.emit(coords);
   //   console.log('Coords', coords);

    }
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      query: ['', [ Validators.required , noEmoji] ],
    });
  }

  typing(event) {
    if(event.target.value.length === 0 && this.emptyField){
      this.emptyField = false;
      this.search.emit(this.searchForm.value);
    }else{
      this.emptyField = true;
    }
  }





//   initialize() {
//     const input = <HTMLInputElement>document.getElementById('searchTextField');
//     const autocomplete = new google.maps.places.Autocomplete(input);
//     google.maps.event.addListener(autocomplete, 'place_changed', function () {
//         const place = autocomplete.getPlace();
//         // document.getElementById('city2').value = place.name;
//        //  document.getElementById('cityLat').value = ;
       

//         console.log(place.geometry.location.lat() , place.geometry.location.lng());
//         //alert("This function is working!");
//         //alert(place.name);
//        // alert(place.address_components[0].long_name);

//     });
// }



  loadType(type) {
    if (type === 'drugstore') {
      this.searchForm.get('query').setValue('');
      this.listType.emit(type);
      // console.log(this.searchForm.value);
      this.search.emit(this.searchForm.value);
      this.points.emit('');
      this.renew.emit('');
      this.isClinics = false;
      this.isDrugStore = true;
    }
    if (type === 'clinics') {
      this.listType.emit(type);
      // console.log(type);
      this.clinicID.emit(this.searchForm.value);
      this.points.emit('');
      this.renew.emit('');
      this.isClinics = true;
      this.isDrugStore = false;
    } else{
      type = 'drugstore';
      this.listType.emit(type);
    }
  }

  selectClinics(clinic) {
    // console.log('bateu aqui' ,  this.searchForm.value);
    this.clinicID.emit(this.searchForm.value);
  }

  submitForm(): void {
    this.search.emit(this.searchForm.value);
  }
}
