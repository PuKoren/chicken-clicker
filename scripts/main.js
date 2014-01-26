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

function refreshSkills(){
	game.find(".item").each(function(index, value){
		if($(value).attr("cost") < farmer.gold)
			$(this).removeClass("disabled").addClass("enabled");
		else
			$(this).removeClass("enabled").addClass("disabled");
	});
};

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};

function changeGold(amount){
	farmer.gold += amount;
	stats.find("#gold").html(addCommas(farmer.gold.toFixed(2)));
};

function changeKarma(amount){
	farmer.karma += amount;
	if(farmer.karma >= 0){
		farmer.farm = 0;
	}else if(farmer.karma > -100){
		farmer.farm = 1;
	}else{
		farmer.farm = 2;
	}
	game.find(".mainView").css("background-image", "url(images/farms/"+farmer.farm+".jpg)");
};

function changeGross(){
	var gross = stats.find("#gross");
	var amount = ((farmer.saleprice - farmer.prodcost) * farmer.chickenout).toFixed(2);
	gross.html(addCommas(amount));
	if(amount < 0){
		gross.removeClass("positive").addClass("negative");
	}else if(amount > 0){
		gross.removeClass("negative").addClass("positive");
	}else{
		gross.removeClass("negative").removeClass("positive");
	}
};

function changeProductionCost(amount){
	farmer.prodcost += amount;
	changeGross();
	stats.find("#prodcost").html(farmer.prodcost.toFixed(2));
};

function changeChickenOutput(amount){
	farmer.chickenout += amount;
	stats.find("#chickenout").html(farmer.chickenout);
	changeGross();
};

function changeSalePrice(newPrice){
	farmer.saleprice = newPrice;
	farmer.gross = farmer.saleprice - farmer.prodcost;
	stats.find("#saleprice").html(parseFloat(farmer.saleprice).toFixed(2));
	changeGross();
};

var spent = false;
function buyItem(elem, item){
	if(farmer.gold < 0)
		return;
	if(spent)
		return;

	changeGold(-item.cost);
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
			obj.qtip({content: { text: 
				"Cost: " + addCommas(value.cost) + "$<br/>" + 
				"Production cost effect: " + ((value.prodcost > 0)?"+"+value.prodcost:value.prodcost) + "$<br/>" + 
				"Chicken output effect: " + ((value.chickenout > 0)?"+"+value.chickenout:value.chickenout) + "<br/><br/>" + 
				value.description, title: value.name},
				style: {
					classes: 'qtip-light'
				},
				position: {
			        my: 'center left',  // Position my top left...
			        at: 'center right', // at the bottom right of...
			        
			    }
			});
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

	$.modal("<div><h1><span id='title'></span></h1><div id='content'></div><div class='buttons'><div class='confirm'><a id='0'><span class='message'></span><span class='message2'></span></a></div><div class='cancel'><a id='1'><span class='message'></span><span class='message2'></a></div></div></div>", {
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
			$("#0>.message", dialog.data).html(actions[turn].actions[0].message);
			if(actions[turn].actions[0].message2 != undefined){
				$("#0").addClass("composed");
				$("#0>.message2", dialog.data).html(actions[turn].actions[0].message2);
			}
			if(actions[turn].actions[1] != undefined){
				$("#1>.message", dialog.data).html(actions[turn].actions[1].message);
				if(actions[turn].actions[1].message2 != undefined){
					$("#1").addClass("composed");
					$("#1>.message2", dialog.data).html(actions[turn].actions[1].message2);
				}
			}else{
				$(".cancel", dialog.data).addClass("hidden");
			}
			var tmpTurn = turn;
			$("a", dialog.data).click(function () {
				changeGold(actions[tmpTurn].actions[$(this).attr("id")].gold);
				changeProductionCost(actions[tmpTurn].actions[$(this).attr("id")].prodcost);
				refreshSkills();
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

var monthSales = 0;
var monthRevenues = 0;
var chickenLoss = 0;

function computeSales(){
	var chickenout = farmer.chickenout * (farmer.avgsaleprice/farmer.saleprice);
	if(chickenout < farmer.chickenout){
		chickenout -= farmer.chickenout * 0.1;
		chickenLoss += farmer.chickenout - chickenout;
	}else{
		chickenout = farmer.chickenout;
	}
	var amount = farmer.saleprice*chickenout;
	amount -=  farmer.prodcost*chickenout;
	changeGold(amount);
};

function endTurn(){
	createModal();
	stats.find("#avgsaleprice").html(farmer.avgsaleprice);
	spent = false;
	refreshSkills();
	computeSales();
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