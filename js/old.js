$(document).ready(function() {
	loadGame();
	startProgressBars();

	window.setInterval(function(){
		saveGame();
	}, 1000); 
});

var cookies  = 0;
var upgrades = [
	{
		name: "yarnBall",
		num: 0,
		value: 1,
		cost: 10,
		timer: 2000,
		numSelector: "#yarnBallNum",
		costSelector: "#yarnBallCost",
		progressSelector: "#yarnBallProgress"
	}
];

$(".resource-btn").click(function() {
	var resource = $(this).attr("data-resource");
	if($(this).hasClass("toggled")) {
		$(this).text("Gather");
		$(this).removeClass("toggled");
	}
	else {
		$(this).text("Gathering");
		$(this).addClass("toggled");
	}
});


function cookieClick(num) {
	cookies = cookies + num;
	$("#catCounter").text(cookies);
}

function buyUpgrade(upgrade){
	var obj = findUpgrade(upgrade);
	var upgrade = obj.data;
	var pos = obj.pos;
    if(cookies >= upgrade.cost) {                                   //checks that the player can afford the cursor
        upgrades[pos].num++;    
        upgrades[pos].cost = Math.floor(10 * Math.pow(1.1, upgrade.num));                                        //increases number of cursors
    	cookies -= upgrade.cost; 
    	//Update     
    	$("#catCounter").text(cookies);                 
        $(upgrades[pos].numSelector).text(upgrades[pos].num); 
        $(upgrades[pos].costSelector).text(upgrades[pos].cost); 
    }
}


function startProgressBars() {
	for(var i = 0; i < upgrades.length; i++) {
		if (upgrades[i].num > 0) {
			animateProgressBar(upgrades[i]);
		}
	}
}

function animateProgressBar(obj) {
	console.log(obj.timer);
	window.setInterval(function() {		
		$(obj.progressSelector).animate({
			'width': "100%",
		}, obj.timer, 'linear', function() {
			cookieClick(obj.num * obj.value);
			$(obj.progressSelector).css("width", "0");
			animateProgressBar(obj);
		});
		
	}, obj.timer);
	
	
	
}
function findUpgrade(str) {
	var obj = {
		pos: 0,
		data: {}
	}
	for (var i = 0; i < upgrades.length; i++) {
		if (str == upgrades[i].name) {
			obj.pos = i;
			obj.data = upgrades[i];
		}
	}
	return obj;
}

function saveGame() {
	var gameData = {
		cookies: cookies,
		upgrades: upgrades,
	}
	localStorage.setItem("save", JSON.stringify(gameData));
}

function loadGame() {
	console.log("Game Loaded");
	
	var savegame = JSON.parse(localStorage.getItem("save"));
	console.info("UPGRADES", savegame);
	cookies = savegame.cookies;
	$("#catCounter").text(cookies);
	for(var i = 0; i < savegame.upgrades.length; i++) {
		upgrades[i].num   = savegame.upgrades[i].num;
		upgrades[i].value = savegame.upgrades[i].value;
		upgrades[i].cost  = savegame.upgrades[i].cost;
		$(upgrades[i].numSelector).text(upgrades[i].num); 
        $(upgrades[i].costSelector).text(upgrades[i].cost); 
	}
}


 