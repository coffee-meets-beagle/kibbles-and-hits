var config = {
  apiKey: "AIzaSyB1vBuIN0-Syw7AmOeu_3uRuaLscBjSIUo",
  authDomain: "adorable-pets-80a67.firebaseapp.com",
  databaseURL: "https://adorable-pets-80a67.firebaseio.com",
  projectId: "adorable-pets-80a67",
  storageBucket: "adorable-pets-80a67.appspot.com",
  messagingSenderId: "806861871684"
};
firebase.initializeApp(config);
var database = firebase.database();
var likes = 0;
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
    success: function(response) {
      // console.log(response);

      var results = response.petfinder.pets.pet;

      var count = 0;

      $("#next").click(function() {

        if (count < results.length) {
          // console.log(results[count]);
          displayPet();
          // currentPet.innerHTML = results[count];
        }
        else {
          count = 0;
          // currentPet.innerHTML = results[count]
        }

      });

      function displayPet() {
        // create div for pet image
        let petCard = $("<div>");
        petCard.attr('class', 'column');
        petCard.attr('id', 'pet-card');
        petCard.attr('style', 'background-image: url(' + results[count].media.photos.photo[2].$t + ')');

        $("#card-pets").html(petCard);

        //like images
        let likeimg = $("<img>");
        likeimg.attr('src', 'heart.png');
        likeimg.addClass("likeit");
        likeimg.attr({
          width: '30px',
          height: '30px'
        });
        petCard.append(likeimg);

        // increases counter to next pet
        count++;
      }

      displayPet();
      //Loops through every result to add photos to the page
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        let petDiv = $("<div>");
        petDiv.attr('class', 'column is-one-quarter');
        // petDiv.addClass("box");
        let imageURL = $("<img>");
        imageURL.attr({
          width: '350px',
          height: '300px'
        });
        let petId = results[i].id.$t;
        console.log(petId);
        imageURL.attr("src", results[i].media.photos.photo[2].$t);
        //var age = results[i].age;
        //var p = $("<p>").text
        petDiv.append(imageURL);
        //the like image for every pet
        // let likeimg = $("<img>");
        // likeimg.attr('src', 'heart.png');
        // likeimg.addClass("likeit");
        // likeimg.attr({
        //   width: '30px',
        //   height: '30px'
        // });
        // petDiv.prepend(likeimg);
        // petDiv.append(likeimg);
        $("#found-pets").prepend(petDiv);
        //add the pet id to the database to identify them uniqely
        database.ref('pets/' + petId).on('value', function(snapshot) {
          var likes = snapshot.numChildren();

          //add an if statement to determine pet with most likes
          console.log("There are " + likes + " likes");
        })

        //get the number of likes for every heart click

        likeimg.on('click', function() {
          console.log("i cute");
          database.ref('pets/' + petId).push({
            liked: "heart"
          })

        })
      }

    }

  })
}
// A click event to use ajax to return ten pets that meet the criteria
$("#find-pets").click(function() {
  possiblePet = $("#data-pet").val().trim();
  userLocation = $("#zipcode").val().trim();
  // console.log(possiblePet);
  // console.log(userLocation);
  ajaxCall();
  $(".modal").addClass("is-active");

});




//"&api_key=W4PSu7bY"
//"https://api.rescuegroups.org/http/"
//9e688b61b50439d4ab91fb4d3031fa6c
//
