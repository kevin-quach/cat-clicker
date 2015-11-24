/* ============================================
GATHER RESOURCES
============================================ */
var GatherResources  = function(target) {

  //HTML JQuery Selector
  this.target          = $(target);

  //Full Game Data (will reduce this to just the resource object in the future)
  this.data            = $.extend({}, gameDefaults);

  //The targeted resource
  this.resource        = this.getResource(this.target);

  //Is the resource user active or not
  this.active          = false;

  //Target ID
  this.id              = this.resource.id;

  //Let's go!
  this.init();
}

GatherResources.prototype = {

  //Initialize Game Increments
  init: function() {
    var self = this;
    window.setInterval(function() { self.increment(); }, 1000); //1 tick = 1 second
  },

  //Toggle User Assisted Resource Gathering
  toggle: function(bool) {
    if(!bool) this.active = false;
    else this.active = true;
    this.increment();
  },

  //Increment Resources per tick
  increment: function() {
    this.resource.cur += this.resource.getRate(this.active);
    this.update(this.resource);
  },

  //Update the resource labels with the newest values
  update: function() {
    this.target.find(".resource-rate").text(this.resource.getRate(this.active).toFixed(2) + "/sec");
    this.target.find(".resource-capacity").text(Math.floor(this.resource.cur) + "/" + this.resource.getLimit());
    this.target.find(".resource-bar").css("width", (this.resource.cur / this.resource.getLimit())*100 + "%")
    this.target.find(".resource-time").html(this.calculateTime(this.resource.getRate(this.active),this.resource.cur,this.resource.getLimit()));
  },

  //Get the targeted resource from the default values
  getResource: function(target) {
    for(var i = 0; i < this.data.resources.length; i++) {
      if(target.attr("data-resource") == this.data.resources[i].name) return this.data.resources[i];
    }
    return false;
  },

  //Calculate the time till resource is full
  calculateTime: function(rate,cur,max) {
  	if (rate == 0) return "Infinity";
  	var diff     = (max - cur) / rate,
  			days     = Math.floor(diff/86400),
  			hours    = Math.floor((diff % 86400) / 3600),
  			minutes  = Math.floor(((diff % 86400) % 3600) / 60),
  			seconds  = Math.floor(((diff % 86400) % 3600) % 60),
  			time     = [days,hours,minutes,seconds],
  			measures = ["Days", "Hours", "Mins", "Secs"],
  			duration = "";
		for(var i = 0; i < time.length; i++) {
  		if(time[i] == 0) continue;
  		else duration += "<strong>" + time[i] + "</strong> " + measures[i] + " ";
  	}
  	return duration;
  }

};


/* ============================================
RESOURCES
============================================ */
var Resource = function(obj) {
  this.id    = obj.id;
  this.name  = obj.name;
  this.cur   = obj.cur;
  this.rate  = obj.rate;
  this.limit = obj.limit;
  this.step  = obj.step;
}
Resource.prototype = {
  getRate: function(bool) {
    if(bool) return this.rate + (gameDefaults.user.rate*this.step);
    return this.rate;
  },
  getLimit: function() {
    return this.limit;
  }
}


/* ============================================
ZONES
============================================ */
var Zone = function(obj) {
  this.id    = obj.id;
  this.name  = obj.name;
  this.min   = obj.min;
  this.max   = obj.max;
  this.breed = obj.breed;
}
Zone.prototype = {
  getCats: function() {
    return this.breed;
  }
}



/* ============================================
GAME DEFAULTS
============================================ */
var gameDefaults = {
	user: {
		rate: 1,
	},
  resources: [
    new Resource({id: "food", name: "Frisky Bits", cur: 0, limit: 600, rate: 0, step: 2}),
    new Resource({id: "fish", name: "Fresh Fish", cur: 0, limit: 450, rate: 0, step: 1.5}),
    new Resource({id: "herb", name: "Catnip", cur: 0, limit: 300, rate: 0, step: 1}),
	],
  locations: [
    new Zone({id: "yard", name: "Back Yard", min: 0, max: 4, breed: []}),
    new Zone({id: "alley", name: "Street Alley", min: 4, max: 8, breed: []}),
  ],
  cats: []
}






  var resources = [
    new gatherResources($("#food")),
    new gatherResources($("#fish")),
    new gatherResources($("#herb"))
  ];


  $(".resource-btn").on("click", function() {
    if($(this).hasClass("toggled")) return false;
    $(this).addClass("toggled");
    $(this).text("Gathering");
    $(this).parent().parent(".panel").siblings().find(".resource-btn").removeClass("toggled");
    $(this).parent().parent(".panel").siblings().find(".resource-btn").text("Gather");
    for(var i = 0; i < resources.length; i++) {
      if($(this).parent().parent(".panel").attr("id") == resources[i].id) {
        resources[i].toggle(true);
        continue;
      }
      resources[i].toggle(false);
    }
  });



