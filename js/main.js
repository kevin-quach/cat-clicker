
$(document).ready(function() {
  var resources = [
    new generateResources($("#food")),
    new generateResources($("#fish")),
    new generateResources($("#herb"))
  ];


	$(".resource-btn").on("click", function() {
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






});

 


 /* ============================================
RESOURCES
============================================ */
var generateResources  = function(target) {
  this.target          = $(target);
  this.data            = $.extend({}, gameDefaults);
  this.resource        = this.resource(this.target);
  this.active          = false;
  this.id              = this.resource.id;
  this.init();
}

//API extension to the buildPieGraph function
generateResources.prototype = {
  init: function() {
    var self = this;
    window.setInterval(function() { self.increment(); }, 1000);  
  },
  toggle: function(bool) {
    if(!bool) {
      this.active = false;
    } else {
      this.active = true;
    }
    this.increment();
  },
  increment: function() {
    this.resource.cur += this.resource.getRate(this.active);
    console.log(this.resource.cur);
    this.update(this.resource);
  },
  build: function() {

  },
  resource: function(target) {
    var res = target.attr("data-resource");
    for(var i = 0; i < this.data.resources.length; i++) {
      if(res == this.data.resources[i].name) {
        return this.data.resources[i];
      }
    }
    return false;
  },
  update: function() {
    var time = this.calculateTime(this.resource.getRate(this.active),this.resource.cur,this.resource.getLimit());
    var target = this.target;
    target.find(".resource-title").text(this.resource.name);
    target.find(".resource-rate").text(this.resource.getRate(this.active).toFixed(2) + "/sec");
    target.find(".resource-capacity").text(Math.floor(this.resource.cur) + "/" + this.resource.getLimit());
    target.find(".resource-bar").css("width", (this.resource.cur / this.resource.getLimit())*100)
    target.find(".resource-time").html(time);
  },
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



//Default settings
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

console.info(gameDefaults.resources[2].getLimit());