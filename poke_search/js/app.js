

/* This data function pulls information using the pokiAPI on various pieces of data, such as datas.name which is the pokemon's name,
then this is concatinated into a string to form viable HTML to the page. I added a few buttons to the pokeCard that will
"flip the card over" (I am infact just rotating the div and rotating another div at the same time to make it appear as though 
it is fliping) and reveal more info on the back of the card. The other button brings down a chart showcasing the strength/weakness types of pokemon
so then you can cross examine what the pokemon's str/weaks are that you've got on screen.*/

var data = function displayInfo(datas) {

var infoHTML = "<div class='pokeCard' id='pokeCard' >" + '<img class = "pokeimg" src="' + 
datas.sprites.front_default + '"alt="Pokémon" height="200" width="200">' +
"<strong>Pokémon name:</strong>  " + datas.name + "<br>" + "<strong>Average weight: </strong> " + 
datas.weight/10 + "  kg" +  "<br>" + "<strong>Pokémon type:</strong>  "; for(i = 0; i < datas.types.length; i++){
infoHTML += (i>0 ? ", " : "") + datas.types[i].type.name; }
infoHTML += "<br><strong>This Pokémon appears in:</strong>  "; for(i = 0; i < datas.game_indices.length; i++){
infoHTML += (i>0 ? ", " : "") + datas.game_indices[i].version.name};
infoHTML += "<button id='frontButton' class='frontButton'>Click for this Pokémon's moves! </button>";
infoHTML += "<button id='frontButton2' class='frontButton2'>Click for type weakness/strength chart! </button>";
infoHTML += "</div>";
infoHTML += "<div class='pokeCard2' id='pokeCard2'>"
infoHTML += "<br><strong>Pokémon moves:</strong>  "; for(i = 0; i < datas.moves.length; i++){
infoHTML += (i>0 ? ", " : "") + datas.moves[i].move.name};
infoHTML += "<button id='backButton' class='backButton'>Click to go back.</button>"
infoHTML += "</div>"

$(".container").html(infoHTML);

var frontButton = $("#frontButton");
var frontButton2 = $("#frontButton2");
var backButton = $("#backButton");
var pokeCard = $("#pokeCard");
var pokeCard2 = $("#pokeCard2");
var typeChart = $(".typeChart");
var chartButton =$(".chartButton");


frontButton.click(function(){
	pokeCard.addClass("flipCard1");
	pokeCard2.addClass("flipCard2");
	pokeCard.removeClass("flipCard2");
	pokeCard2.removeClass("flipCard1");
	
});

frontButton2.click(function(){
	typeChart.addClass("showIt");
});


chartButton.click(function(){
	typeChart.removeClass("showIt");
});




backButton.click(function(){
	pokeCard.addClass("flipCard2");
	pokeCard2.addClass("flipCard1");
	pokeCard.removeClass("flipCard1");
	pokeCard2.removeClass("flipCard2");
});


};
/* This bit of code acts as the trigger to when someone types a particular pokemon into the searchfield.
 I used the toLowerCase methord incase they use caps as well. I use concat again to string together the API url plus whatever
 pokemon name the user types in under the var "pokemon". I also used the .fail methord to create an error message. I also used the always methord
 so that when the API request is in action the pokemon ball image spins, letting the user know that there request is currently pending.*/

$("form").submit(function (evt){
evt.preventDefault();
var $searchField = $("#search");
var pokemon = $searchField.val().toLowerCase();
var pokeAPI = "http://pokeapi.co/api/v2/pokemon/" + pokemon 


$.getJSON(pokeAPI,data).fail(function(jqXHR){
	$(".container").html("<div class='error'> Sorry! " 
	+ jqXHR.statusText 
	+ " error." 
	+ "<img class = 'pikka' src='pikka.jpg' 'alt='pokemon' height='200' width='200'>" 
	+ "</div>");
	}).always(function(){
	$("#ranButton").removeClass("spinner");}	
		
	);
	
var pokebutton = $("#ranButton");
pokebutton.addClass("spinner");
	
var container = $("#pokecontainer");
container.addClass("animationtime");
});


var randomButton = $(".butty");
randomButton.click(function(){
	
	
var pokebutton = $("#ranButton");
pokebutton.addClass("spinner");

/*This again is a trigger, but this time it's for the random search. instead I create a random number with the math.floor/math.random methord
 between 1-721 (that's how many pokemon are in the database...yes I did have to manually check that...it was fun.) and again the spinner is applied 
 while the request is in motion. */

var pokeAPI2 = "http://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 721 + 1);
	
$.getJSON(pokeAPI2,data).always(function(){
	$("#ranButton").removeClass("spinner");}	
		
	);;

var container = $("#pokecontainer");
container.addClass("animationtime");
});


var statButton = $("#statButton");
var pokeCard = $("#pokeCard");
var pokeCard2 = $("#pokeCard2");

statButton.click(function(){
	$("#pokecontainer").addClass("flipCard1");
	pokeCard2.addClass("flipCard2");
});



