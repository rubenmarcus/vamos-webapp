import { Component, OnInit , Input } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'img-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() imgs: any[];

  clickedItem = 0;
  returnClass = true;

  xPos = 0;
  yPos = 0;

  private margin = 92;

  constructor() { }

  ngOnInit() {
    this.imgs = this.removeEmptyImages(this.imgs);
  }

  SelectMenu(menu, $index) {
    this.clickedItem = $index;
    if (this.returnClass) {
        return 'active';
     } else {
        return '';
     }
  }

  removeEmptyImages(obj) {
    return obj.filter((element, index) => {
      if(element.thumb_url && element.image_url) {
        return element;
      }
    });
  }

  next() {
    const resto = this.clickedItem % 4;
    if ( (this.imgs.length > 4) && (( this.imgs.length - 4 ) > this.clickedItem) ) {
      this.clickedItem++;
      this.xPos = (this.margin * this.clickedItem) * -1;
      this.yPos = (this.margin * this.clickedItem) * -1;
    } else if ( (this.imgs.length > 4) && (this.clickedItem < (this.imgs.length - 1)) ) {
      this.clickedItem++;
      const multiple = ( this.imgs.length - 4 );
      this.xPos = (this.margin * multiple) * -1;
      this.yPos = (this.margin * multiple) * -1;
    } else if ( (this.imgs.length > 4) && (this.clickedItem < (this.imgs.length - 1)) ) {
      this.clickedItem++;
    }
  }

  calc(value) {
    return this.margin * value;
  }

  prev() {
    if ( this.yPos < 0 ) {
      this.yPos = this.yPos + 92;
      this.xPos = this.xPos + 92;
      this.clickedItem--;
    } else if ( this.clickedItem > 0 ) {
      this.clickedItem--;
    }
  }

}
