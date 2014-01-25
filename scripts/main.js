var container = null;
var game = null;

function startGameAnimation(){
	container.find(".leftShow").animate({left: "-50%"}, 1200, function(){

	});
	container.find(".rightShow").animate({width: "0%"}, 1200, function(){

	});

	container.find(".startButton").animate({opacity: 0}, 800, function(){

	});
};

function startGame(){
	farmer.gold = 100;
	game.find(".mainView").css("background-image", "url(images/farms/"+farmer.farm+".jpg)");

	var divItems = game.find(".upgrades .items");
	var item = divItems.find(".item");

	var foodItems = divItems.find(".food");
	$.each(items.food, function(index, value){
		var obj = item.clone();
		obj.qtip({content: {text: value.cost + "$. " + value.description, title: value.name}});
		obj.find("img").attr("src", "images/items/food/"+index+".png");
		foodItems.append(obj);
	});

	item.hide();

	game.find("#gold").html(farmer.gold);
};

$(document).ready(function(){
	container = $(".container");
	game = container.find(".game");

	startGame();
	container.find(".startButton").click(function(){
		startGameAnimation();
	});
});