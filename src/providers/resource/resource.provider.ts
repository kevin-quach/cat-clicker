import { Injectable } from '@angular/core';

@Injectable()

export class Resource {

	data: any;

  constructor() {

  	/* Default Values */
  	this.data = {
  		name: "placeholder",  // Name of resource
  		start: 0,             // How much this resource starts off with
  		max: 100,             // What the current max is
      inc: 1,               // Increment value
  		cur: 0,           // What the current resource is
  		upgrades: [],         // Upgrades for this resource
  	}
  }

  /* Assign Default Values */
  public init(obj) {
    this.data.name  = (obj.name  !== undefined) ? obj.name  : this.data.name;
    this.data.start = (obj.start !== undefined) ? obj.start : this.data.start;
    this.data.inc   = (obj.inc   !== undefined) ? obj.inc   : this.data.inc;
    this.data.cur   = (obj.cur   !== undefined) ? obj.cur   : this.data.cur;
    this.data.max   = (obj.max   !== undefined) ? obj.max   : this.data.max;
  }

  /* Update data */
  public count(num) {
    this.data.cur += num;
  }

  /* Return Resource Object*/
  public get() {
    return this.data;
  }

}
