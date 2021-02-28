import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class UserService {

  userProfilePic = new EventEmitter<any>();
  userName = new EventEmitter<any>();
  private field_username;
  private field_userpicture;

  constructor() {
  }
  getUserPicture() {
   this.field_userpicture = this.userProfilePic;
   console.log(this.userProfilePic);
  }
  getUserName() {
    return this.field_username;
  }
  setUserPicture(picture) {
    this.field_userpicture = picture;
    console.log('Foto' , this.field_userpicture);
    this.userProfilePic.emit(picture);
  }
  setUserName(name) {
    this.field_username = name;
    this.userName.emit(name);
  }
}