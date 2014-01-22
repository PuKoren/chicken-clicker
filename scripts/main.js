function startGame(){
	$(".container .leftShow").animate({width: "0%"}, 1200, function(){

	});
	$(".container .rightShow").animate({width: "0%"}, 1200, function(){

	});

	$(".container .action").animate({opacity: 0}, 800, function(){

	});
};

$(document).ready(function(){
	$(".action").click(function(){
		startGame();
	});
});