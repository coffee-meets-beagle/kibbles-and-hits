

var apiKey = 'cd7a4a3fe5a066ee334eed36dd999dca'; // assign our key to a variable, easier to read
var url = 'http://api.petfinder.com/pet.getRandom';
var possiblePet;
function ajaxCall() {
  // Within $.ajax{...} is where we fill out our query
  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      key: apiKey,
      animal: possiblePet,
      output: 'basic',
      format: 'json' //<----- this is where the magic is
    },
    // Here is where we handle the response we got back from Petfinder
    success: function( response ) {
      console.log(response); // debugging

    }
  });
}



$( "#button" ).click(function() {
  possiblePet = $("#data-pet").val().trim();
  console.log(possiblePet);
  ajaxCall();
});
