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
var petId;
var likedPets = [];

database.ref().on('value', function(snapshot) {


  //add an if statement to determine pet with most likes
  console.log("There are " + likes + " likes");
})

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

      $("#love").click(function() {

        if (count < results.length) {
          // console.log(results[count]);
          displayPet();
          likePet();
        } else {
          count = 0;
        }
      });


      $("#pass").click(function() {
        if (count < results.length) {
          console.log(results[count]);
          displayPet();
        } else {
          count = 0;
        }
      });

      $("#show-matches").click(function() {
        if (likedPets.length === 0) {
          $(".your-pets").css('display', 'flex');
          $("#found-pets").text("you didn't like any pets, try another search");
        } else {
          addPetToMatches();
        }
      });

      $("#info").click(function() {
        let petInfo = $("<div>");
        petInfo.attr('class', 'column');
        petInfo.attr('id', 'pet-info');

        let petAge = $("<p>");
        petAge.attr('class', 'subtitle');
        petAge.text("Age: " + results[count].age.$t);

        let petGender = $("<p>");
        petGender.attr('class', 'subtitle');
        petGender.text("Gender: " + results[count].sex.$t);

        let petDescription = $("<p>");
        petDescription.text(results[count].description.$t);

        // petInfo.append(petName);
        petInfo.append(petGender);
        petInfo.append(petAge);
        petInfo.append(petDescription);

        $("#card-pets").append(petInfo);

        $("#info").css('display', 'none');
        $("#close-info").css('display', 'flex');
      });

      $("#close-info").click(function() {
        console.log("closed");
        $("#pet-info").remove();
        $("#close-info").css('display', 'none');
        $("#info").css('display', 'flex');
      });



      function displayPet() {

        let petImage = $("<img>");
        // petImage.attr({height: '100%', width: 'auto' });

        petImage.attr("src", results[count].media.photos.photo[2].$t);

        $("#card-pets").html(petImage);

        // $("#card-pets").attr('style', 'background-image: url(' + results[count].media.photos.photo[2].$t + ')');
        $(".modal-card-title").text(results[count].name.$t);
        // let petSparkle = $("<div>");
        // petSparkle.attr('class', 'pet-sparkle');

        $("img").sparkle({

            "color": ["#ff0080","#ff0080","#FFF"] ,
            count: 70 ,
            overlap: 0,
            speed: 1,
            minSize: 4,
            maxSize: 7,
            direction: "both"

        });

        $("#close-info").css('display', 'none');
        $("#info").css('display', 'flex');
        // increases counter to next pet
        count++;
      }

      function addPetToMatches() {
        $("#found-pets").html('');
        $(".your-pets").css('display', 'flex');
        //pet matches
        for (var i = 0; i < likedPets.length; i++) {

          let petDiv = $("<div>");
          petDiv.attr('class', 'column is-one-quarter');
          let imageURL = $("<img>");
          imageURL.attr({
            width: '350px',
            height: '300px'
          });
          petId = likedPets[i].id.$t;
          imageURL.attr("src", likedPets[i].media.photos.photo[2].$t);
          //var age = results[i].age;
          //var p = $("<p>").text
          petDiv.append(imageURL);

          $("#found-pets").prepend(petDiv);

          $("img").sparkle({

              "color": ["#ff0080","#ff0080","#FFF"] ,
              count: 70 ,
              overlap: 0,
              speed: 1,
              minSize: 4,
              maxSize: 7,
              direction: "both"

          });

        }
      }

      // this will add the pet to the database and increase the like count
      function likePet() {

        // add pet to array
        likedPets.push(results[count]);
        console.log(likedPets);

        let petId = results[count].id.$t;
        //add the pet id to the database to identify them uniqely
        database.ref('pets/' + petId).on('value', function(snapshot) {
          var likes = snapshot.numChildren();

          //add an if statement to determine pet with most likes
          console.log("There are " + likes + " likes");
        })

        //get the number of likes for every heart click
          database.ref('pets/' + petId).push({
            liked: "heart"
          })
      }

      displayPet();

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
