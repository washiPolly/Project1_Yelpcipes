var apiKey = "AjKdTH6lQ1WvueYOrfQ-d0u3QDV6DBsyRt02B2FgK-JITh5FQzq2qoxSbyb3Dwc9bFuOTEgjh1Rz2hqgWyElIiKYrSxc3XsCRqUxleWVD-RVe2AJ92yWZB5N2UBwXnYx";

//This will search up any restaurants that match the following criteria
$("#button").click(function(event){
    event.preventDefault();
    $("#results").empty()
    var foodCategory = $("#category").val();
    var foodLocation = $("#location").val();
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + foodCategory + "&location=" + foodLocation,
        method: "GET",
        headers: {
            "Authorization": 'bearer ' + apiKey
        }
    }).then(function(response) {
    console.log(response)

    //This will dynamically generate the results
    var businessesLength = (response.businesses.length);
    for (i = 0; i < businessesLength; i++){

        var businessesCard = $('<div class="col m4 l4"></div>');
        var businessesCardDiv = $('<div class="card"></div>');
        var cardImageDiv = $('<div class="card-image waves-effect waves-block waves-light"></div>')
        var cardContentDiv = $('<div class="card-content"></div>')
        $(".card-content").css({
            "height": "120px",
        })
        //This will store the images of the restaurants
        var images = (response.businesses[i].image_url);
        var imageAlt = (response.businesses[i].alias);
        var imgTag = $("<img>")
        imgTag.attr({
            //'class': "activator",
            'src': images,
            'alt': imageAlt,
            'width': "50px",
            'height': "275px",
        });
        $(cardImageDiv).append(imgTag)

        //This will store the names of the restaurants
        var restaurantName = (response.businesses[i].name);
        var restaurantLink = (response.businesses[i].url);
        var aTag = $("<a>").text(restaurantName);
        aTag.attr("href", restaurantLink);
        aTag.attr("target", "_blank")
        $("a").addClass("card-title activator grey-text text-darken-4")
        $(cardContentDiv).append(aTag)
        
        //This will display the images and restaurant names
        $(businessesCard).append(businessesCardDiv);
        $(businessesCardDiv).append(cardImageDiv);
        $(businessesCardDiv).append(cardContentDiv);
        

        $("#results").append(businessesCard);

        //This is for the icon
        var favoritesIconEl = '<i class="heart fa fa-heart-o"></i>'
        $(businessesCardDiv).prepend(favoritesIconEl)
        $(".fa-heart-o").css({
            'position': "relative",
            'left': "85%",
            'color': "red",
            'font-size': "25px",
            'padding': "12px",
        })        
    }
    })
    
})

//Clicking on the icon will favorite the yelp result
$(document).on("click", ".heart.fa", function() {
    $(this).toggleClass("fa-heart fa-heart-o");
})



$(document).ready(function(){
    $(".dropdown-trigger").dropdown();
    });

    //Pressing enter will also trigger the above event
$("#location").keyup(function(e){
    if (e.which == 13){
        $("#button").click();
    }
})

$("#category").keyup(function(e){
    if (e.which == 13){
        $("#button").click();
    }
})