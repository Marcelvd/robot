const url = "http://192.168.0.120:3000/";

$(document).ready(function(){
    $(":button").css("background-color", "red");
    $("#up").click(function(){
		$.post(url + "forward")});  
	$("#down").click(function(){
		$.post(url + "reverse")});  		
	$("#destroy").click(function(){
		$.post(url + "destroy")});  		
});

