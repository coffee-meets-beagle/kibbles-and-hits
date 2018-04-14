var userFilters = ["dog", "cat", "small animal", "bird", "lizard"];

// A function to create checkboxes for the user to select which type of pet(s) they're looking for

var apiKey = "cd7a4a3fe5a066ee334eed36dd999dca";
var queryUrl = "http://api.petfinder.com/pet.find";
var possiblePet;
var userLocation;
console.log("Hello, is it me you're looking for?");

function ajaxCall() {
$.ajax({
    url: queryUrl,
    method: "GET",
    dataType: "jsonp",
    jsonp: "callback",
    data: {
        key: apiKey,
        animal: possiblePet,
        output: 'basic',
        format: 'json',
        count: 10,
        location: userLocation
    },
    success:function(response) {
        console.log(response);
        console.log("Is this working?");
        var results = response.petfinder.pets.pet;
        //Loops through every result
        for (var i = 0; i < results.length; i++) {

            var petDiv = $("<div>");
            petDiv.addClass("box");
            var imageURL = $("<img>");
            
            imageURL.attr("src", results[i].media.photos.photo[2].$t);
            petDiv.append(imageURL);
            $("#output").prepend(petDiv);

            console.log (results[i]);
        
            }
    
        }
        
    })
}
// A click event to use ajax to return ten pets that meet the criteria
$( "#button" ).click(function() {
    possiblePet = $("#data-pet").val().trim();
    userLocation = $("#zipcode").val().trim();
    console.log(possiblePet);
    ajaxCall();
    
    });

//"&api_key=W4PSu7bY"
//"https://api.rescuegroups.org/http/"
//9e688b61b50439d4ab91fb4d3031fa6c
//
        