
// Show the modal
$("#showModal").click(function() {
  $(".modal").addClass("is-active");
});

$("#show-matches").click(function() {
   $(".modal").removeClass("is-active");
});

$(".modal-close").click(function() {
   $(".info-modal").removeClass("is-active");
   $("#write-info").html("");
});

// Smooth Scrolling
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready(function() {

    $("img").sparkle({

        "color": ["#ff0080","#ff0080","#FFF"] ,
        count: 70 ,
        overlap: 0,
        speed: 1,
        minSize: 4,
        maxSize: 7,
        direction: "both"

    });

    $(".pet-sparkle").sparkle({

        color: ["#2eafea","#e56604"],
        speed: 0.4

    });

    // $("button").last().sparkle({
    //     "color": "rainbow" ,
    //     "minSize": 2 ,
    //     "maxSize": 5 ,
    //     "overlap": 20 ,
    //     "direction": "down" ,
    //     "speed": 1,
    //     "fadeSpeed":3000
    // });

    // $("button").first().sparkle({
    //     "minSize": 2 ,
    //     "maxSize": 10 ,
    //     "overlap": 20 ,
    //     "direction": "up" ,
    //     "speed": 0.4
    // });

});
