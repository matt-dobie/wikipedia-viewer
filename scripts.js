function searchToggle(obj, evt) {
    var container = $(obj).closest(".search-box");
    var keyword = $(".search-input").val();

    if (!container.hasClass("active")) {
      container.addClass("active");
      evt.preventDefault();
    }
    else if (container.hasClass("active") && $(obj).closest(".input-holder").length == 0) {
      container.removeClass("active");
      container.find(".search-input").val("");
    }
    else if (container.hasClass("active") && keyword !== "") {
      console.log("searched!");
      search($(".search-input").val());
    }
  }

function search(input) {
    $(".header").hide();
    $(".random").hide();
    $("#results").empty();
    $(".search-box").css("top", "-100px");

    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
      
      console.log(data);
      var articleCount = 0;
      

      if (data[1].length === 0) {
        $("#results").append("<div class='no-match'><h3>No Match</h3><p>There were no results. Try searching for something else!</p></div>");
      }
      else if (data[1].length <= 10) {
        articleCount = data[1].length;
      }
      else {
        articleCount = 10;
      }

      for (var i = 0; i < articleCount; i++) {
        $("#results").append("<a href='" + data[3][i] + "' class='article article-" + i + "' target='_blank'></a>");
        $(".article-" + i).append("<h3>" + data[1][i] + "</h3>");
        $(".article-" + i).append("<p>" + data[2][i] + "</p>");
      }

    });
  }


$(document).ready(function() {

$(".search-box").keyup(function(e){
    var key = e.keyCode || e.which;
    if(key === 13){
      search($(".search-input").val());
    }
  });

});

/*
$(document).ready(function(){
  
  
  
  $("input").keyup(function(e){
    var key = e.keyCode || e.which;
    if(key === 13){
      $("#top-bar-input").autocomplete("close");
      search($("#top-bar-input").val());
    }
  });
  function search(input){
    $("#wikipedia-results").empty();
    $("#wikipedia-init").hide();
    $(".container").removeClass("moz-container-fix");
    $("#row-init").removeClass("moz-row-fix");
    $("#wikipedia-top-bar").show();
    $("#top-bar-input").focus();
    if (input.length > 0){
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data){
        if(data[1].length == 0){
          $("#wikipedia-results").append("<div class='no-match'><p>There were no results matching the query.</p><p>The page <strong>\"" + $("#top-bar-input").val() + "\"</strong> does not exist. You can <a href='https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation' target='_blank' rel='noopener noreferrer'>ask for it to be created.</a></p><ul><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul></div>");
        }
        for(var i = 0; i < data[1].length; i++){
          $("#wikipedia-results").append("<div class='card card-" + i + "'></div>");
          $(".card-"+i).append("<div class='card-content card-content-" + i + "'></div>");
          $(".card-content-"+i).append("<h4>" + data[1][i] + "</h4>");
          $(".card-content-"+i).append("<p>" + data[2][i] + "</p>");
          if(data[2][i].length == 0){
            $(".card-content-"+i).append("<p><i>No description available.</i></p>");
          }
          $(".card-"+i).append("<div class='card-link card-link-" + i + "'></div>");
          $(".card-link-"+i).append("<a href='" + data[3][i] + "' target='_blank' rel='noopener noreferrer'>read more</a>");
          $(".card-link-"+i).append("<a href='https://en.wikipedia.org/w/index.php?title=" + encodeURI(data[1][i]) + "&action=edit' target='_blank' rel='noopener noreferrer'>edit source</a>");
        }
      });
      $("#wikipedia-results").show();
      $("#top-bar-input").focus();
      $("#top-bar-input")[0].setSelectionRange($("#top-bar-input").val().length, $("#top-bar-input").val().length);
    }
  }
});
*/