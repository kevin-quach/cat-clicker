import { Component } from '@angular/core';

/* Providers */
import { Resource } from '../../providers/resource/resource.provider';

@Component({
  selector:    'friskybits',
  templateUrl: 'friskybits.component.html'
})

export class FriskyBits {

	friskybits: any;

  constructor(public resource: Resource) {

  	/* Declare Friskybit's default values */
  	resource.init({
  		name: 'Friskybits',
  		max:  1000,
  		inc:  2
  	});

    this.friskybits = resource.get();

    console.log(this.friskybits);
  }

  public count(num) {
  	this.friskybits.cur += num;
  }


}
