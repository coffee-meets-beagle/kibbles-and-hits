var userFilters = ["dog", "cat", "small animal", "bird", "lizard"];

// A function to create checkboxes for the user to select which type of pet(s) they're looking for

var apiKey = "cd7a4a3fe5a066ee334eed36dd999dca";
var queryUrl = "http://api.petfinder.com/pet.getRandom";
var possiblePet;
console.log("Hello, is it me you're looking for?");

function ajaxCall() {
$.ajax({
    url: queryUrl,
    method: "GET",
    dataType: "jsonp",
    jsonp: "callback",
    data: {
        key: apiKey,
        animal: 'cat',
        output: 'basic',
        format: 'json'
    },
    success: function(response) {
        console.log(response);
        console.log("Is this working?");
        var results = response.petfinder.pet.media.photos;
        console.log(results);

        //Loops through every result
        for (var i = 0; i < results.length; i++) {

            var petDiv = $("<div>");
            petDiv.addClass("box");
            var imageURL = $("<img>");
            
            imageURL.attr(results[i]);
            console.log(results[i]);
            petDiv.append(imageURL);
            $("#output").prepend(petDiv);

            console.log (queryURL);
            }
        }
    }); 
}
// A click event to use ajax to return ten pets that meet the criteria
$( "#button" ).click(function() {
    possiblePet = $("#data-pet").val().trim();
    console.log(possiblePet);
    ajaxCall();
    
    });

//"&api_key=W4PSu7bY"
//"https://api.rescuegroups.org/http/"
//9e688b61b50439d4ab91fb4d3031fa6c
//
        