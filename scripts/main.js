function startGame(){
	$(".container .leftShow").animate({left: "-50%"}, 1200, function(){

	});
	$(".container .rightShow").animate({width: "0%"}, 1200, function(){

	});

	$(".container .startButton").animate({opacity: 0}, 800, function(){

	});
};

$(document).ready(function(){
	$(".startButton").click(function(){
		startGame();
	});
});