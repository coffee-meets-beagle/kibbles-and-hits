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
        location: userLocation,
    },
    success:function(response) {
        console.log(response);
        console.log("Is this working?");
        var results = response.petfinder.pets.pet;

        //Loops through every result to add photos to the page
        for (var i = 0; i < results.length; i++) {

            var petDiv = $("<div>");
            petDiv.addClass("box");
            var imageURL = $("<img>");
            var name = results[i].name.$t;
            var age = results[i].age.$t;
            var email = results[i].contact.email.$t;
            var phone = results[i].contact.phone.$t;
            console.log(name, age);
            var p = $("<p>");
            p.text("Name: " + name);
            var p2 = $("<p>");
            p2.text("Age: " + age);
            var p3 = $("<p>");
            p3.text("Contact info: " + email + ", " + phone);

            imageURL.attr("src", results[i].media.photos.photo[2].$t);

            petDiv.append(imageURL);
            petDiv.append(p);
            petDiv.append(p2);
            petDiv.append(p3);
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
