function startGame(){
	$(".container .leftShow").animate({width: "0%"}, 1200, function(){
		$(".container .startGame").css("display", "none");
	});
	$(".container .rightShow").animate({width: "0%"}, 1200, function(){
		
	});
};

$(document).ready(function(){
	$(".startGame .action").click(function(){
		startGame();
	});
});