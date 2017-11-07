/*
  Author: Matthew Dobie
  Author URL: mattdobie.com
  Description: Script for Wikipedia Viewer
  Notes: Search bar design heavily inspired by Vlad Georgescu
         at http://icanbecreative.com/article/css3-animated-search-box/
*/


// Called when search or close icon is pressed
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
      search($(".search-input").val());
    }
  }

// Search function called by searchToggle
function search(input) {
    $(".header").hide();
    $(".random").hide();
    $("#results").empty();
    $(".search-box").animate({top: "-50px"}, 300);

    // Get Wikipedia JSON data
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
      
      var articleCount = 0;
      $("#results").append("<a href='' class='previous' style='opacity: 0'>&laquo;</a>");
      $(".previous").animate({opacity: 1}, 300);

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


// Main function
$(document).ready(function() {
  
  // Search when space key is pressed
  $(".search-box").keyup(function(e){
    var key = e.keyCode || e.which;
    if (key === 13) {
      searchToggle(".search-icon", event);
    }
  });

});
