
var Africa08 : number = 1028;
var Africa18 : number = 1235.5;

//-------------------------------------------------------------------------------------

var Asia08 : number = 12954.7;
var Asia18 : number = 16274.1;

//-------------------------------------------------------------------------------------

var Australia08 : number = 1993;
var Australia18 : number = 2100.5;


//-------------------------------------------------------------------------------------

var Europe08 : number = 4965.7;
var Europe18 : number = 4209.3;


//-------------------------------------------------------------------------------------

var NorthAmerica08 : number = 6600.4;
var NorthAmerica18 : number = 6035.6;

//-------------------------------------------------------------------------------------

var SouthAmerica08 : number = 1132.6;
var SouthAmerica18 : number = 1261.5;

//-------------------------------------------------------------------------------------

var Gesamt : number = Africa18 + SouthAmerica18 + Europe18 + NorthAmerica18 + Asia18 + Australia18;


//-------------------------------------------------------------------------------------


function data(region: string, country08 : number, country18 : number) {
    var emissionRelative : number = (country08 / Gesamt * 100);
    var emissionAbsolute = country18;
    var growthPercent : number = (100 - (country08 / country18 * 100));
    var growthAbsolute : number = (country18 - country08);

    document.querySelector("#titleRegion").innerHTML = "Carbon Dioxide Emissions in " + region;
    document.querySelector("#textRegion").innerHTML = region;
    document.querySelector("#absolute").innerHTML = `${emissionAbsolute.toFixed(2)}`; // "" + emissionAbsolute (im Endeffekt das gleiche, jedoch deutlich schöner)
    document.querySelector("#relative").innerHTML = `${emissionRelative.toFixed(2)}%`;
    document.querySelector("#growth").innerHTML = `${growthPercent.toFixed(2)}%`;
    document.querySelector("#growthAbsolute").innerHTML = `${growthAbsolute.toFixed(2)}`;

    document.querySelector("#chart").setAttribute("style", "width:" + emissionRelative*3 + "px");
}




document.querySelector(".africa").addEventListener("click", function(){
    data("Africa", Africa08, Africa18);
});
document.querySelector(".asia").addEventListener("click", function(){
    data("Asia", Asia08, Asia18);
});
document.querySelector(".australia").addEventListener("click", function(){
    data("Australia", Australia08, Australia18);
});
document.querySelector(".europe").addEventListener("click", function(){
    data("Europe", Europe08, Europe18);
});
document.querySelector(".northamerica").addEventListener("click", function(){
    data("North America", NorthAmerica08, NorthAmerica18);
});
document.querySelector(".southamerica").addEventListener("click", function(){
    data("South America", SouthAmerica08, SouthAmerica18);
});





