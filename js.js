var userFilters = ["dog", "cat", "small animal", "bird", "lizard"];

// A function to create checkboxes for the user to select which type of pet(s) they're looking for

// A click event to use ajax to return ten pets that meet the criteria
$("#btn").on("click", function(){
    var possiblePet = $(this).attr("data-pet");
    var apiKey = "&api_key=W4PSu7bY";
    var queryUrl = "https://api.rescuegroups.org/http/" + possiblePet + apiKey;
    console.log("Hello, is it me you're looking for?");
    $.ajax({
        url: queryUrl,
        method: "GET",
        /*dataType: "xml",
        success: function(xml){
            $(xml).find("dog").each(function(){
             $("#output").append($(this).attr("code") + "<br />");
            });
        }*/
    })
    then(function(response) {
        console.log("Img: ", response);
        var results = response.data;
        console.log(results);

        //Loops through every result
       /* for (var i = 0; i < results.length; i++) {

        var petDiv = $("<div>");
        petDiv.addClass("box");
        var imageURL = $("<img>");
        
        imageURL.attr(response[i].image);
        petDiv.append(imageURL);

        console.log (queryURL);
        };
        */
    });
}) 


//"key=9e688b61b50439d4ab91fb4d3031fa6c&limit=10"
//"http://api.petfinder.com/schemas/0.9/petfinder.xsd?alt=json"