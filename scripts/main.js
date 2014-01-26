var container = null;
var game = null;
var stats = null;
var turn = 0;

function startGameAnimation(cb){
	container.find(".leftShow").animate({left: "-50%"}, 1200, function(){
		cb();
	});
	container.find(".rightShow").animate({width: "0%"}, 1200, function(){

	});

	container.find(".startButton").fadeOut(800, function(){

	});
};

function spendGold(amount){
	farmer.gold -= amount;
	stats.find("#gold").html(farmer.gold);
};

function changeKarma(amount){
	farmer.karma += amount;
};

function changeGross(){
	stats.find("#gross").html((farmer.saleprice * farmer.chickenout).toFixed(2));
};

function changeProductionCost(amount){
	farmer.prodcost += amount;
	changeGross();
	stats.find("#prodcost").html(farmer.prodcost);
};

function changeChickenOutput(amount){
	farmer.chickenout += amount;
	stats.find("#chickenout").html(farmer.chickenout);
	changeGross();
};

function changeSalePrice(newPrice){
	farmer.saleprice = newPrice;
	farmer.gross = farmer.saleprice - farmer.prodcost;
	stats.find("#saleprice").html(farmer.saleprice);
	changeGross();
};

var spent = false;
function buyItem(elem, item){
	if(farmer.gold < 0)
		return;
	if(spent)
		return;

	spendGold(item.cost);
	changeKarma(item.karma);
	changeProductionCost(item.prodcost);
	changeChickenOutput(item.chickenout);
	game.find(".item").not(elem).removeClass("enabled").addClass("disabled");
	spent = true;
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
			obj.click(function(){
				buyItem($(this), value);
			});
			obj.attr("cost", value.cost);
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

function createModal(){
	if(actions[turn] == undefined){
		return false;
	}

	$.modal("<div><h1 id='title'></h1><div id='content'></div><a id='0'></a><a id='1'></a></div>", {
		onOpen: function(dialog){
			dialog.overlay.fadeIn('fast', function () {

			});
			dialog.container.fadeIn('slow', function () {
				
			});
			dialog.data.fadeIn('slow');
		},
		onShow: function(dialog){
			$("#title", dialog.data).html(actions[turn].title);
			$("#content", dialog.data).html(actions[turn].message);
			$("#0", dialog.data).html(actions[turn].actions[0].message);
			if(actions[turn].actions[1] != undefined){
				$("#1", dialog.data).html(actions[turn].actions[1].message);
			}else{
				$("#1", dialog.data).addClass("hidden");
			}
			$("a", dialog.data).click(function () {
				$.modal.close();
				return false;
			});
		},
		onClose: function(dialog){
			dialog.container.fadeOut('slow', function () {
			});
			dialog.overlay.fadeOut('slow', function () {
				$.modal.close(); // must call this!
			});
		},
		close: false,
		escClose: false
	});
};

function endTurn(){
	createModal();
	stats.find("#avgsaleprice").html(farmer.avgsaleprice);
	spent = false;
	game.find(".item").each(function(index, value){
		if($(value).attr("cost") < farmer.gold)
			$(this).removeClass("disabled").addClass("enabled");
		else
			$(this).removeClass("enabled").addClass("disabled");
	});
	turn++;
};
var init = false;
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
		if(init)
			return;
		startGameAnimation(function(){
			endTurn();
			$(".endturn").click(function(){
				endTurn();
			});
		});
		init = true;
	});

	startGame();
});