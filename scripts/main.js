var container = null;
var game = null;
var stats = null;

function startGameAnimation(){
	container.find(".leftShow").animate({left: "-50%"}, 1200, function(){

	});
	container.find(".rightShow").animate({width: "0%"}, 1200, function(){

	});

	container.find(".startButton").animate({opacity: 0}, 800, function(){

	});
};


function fillItems(item, category){
	var divItems = game.find(".upgrades .items");
	var item = divItems.find(".item");
	
	$.each(items, function(id, val){
		var targetDiv = divItems.find("."+id);
		$.each(val, function(index, value){
			var obj = item.clone();
			obj.qtip({content: {text: 
				"Cost: " + value.cost + "$<br/>" + 
				"Production cost effect: " + ((value.prodcost > 0)?"+"+value.prodcost:value.prodcost) + "$<br/>" + 
				"Chicken output effect: " + ((value.chickenout > 0)?"+"+value.chickenout:value.chickenout) + "<br/><br/>" + 
				value.description, title: value.name}});
			obj.find("img").attr("src", "images/items/"+id+"/"+index+".png");
			targetDiv.append(obj);
		});
	});

	item.hide();
};

function startGame(){
	game.find(".mainView").css("background-image", "url(images/farms/"+farmer.farm+".jpg)");

	fillItems();
	changeSalePrice(farmer.saleprice);

	stats.find("#gold").html(farmer.gold);
	stats.find("#chickenout").html(farmer.chickenout);
};

function changeSalePrice(newPrice){
	farmer.saleprice = newPrice;
	farmer.gross = farmer.saleprice - farmer.prodcost;
	stats.find("#saleprice").html(farmer.saleprice);
	stats.find("#gross").html(farmer.gross.toFixed(2) * farmer.chickenout);

};

$(document).ready(function(){
	container = $(".container");
	game = container.find(".game");
	stats = game.find(".stats");

	game.find("#salesprice").noUiSlider({range: [0,30], start: farmer.saleprice, handles: 1, connect: 'lower',
		slide: function(){
			changeSalePrice($(this).val());
		}
	});

	container.find(".startButton").click(function(){
		startGameAnimation();
	});

	startGame();
});