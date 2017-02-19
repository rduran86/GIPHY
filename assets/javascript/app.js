// ====================== Poppulate buttons dinamycally ===================================    

$("document").ready(function() {

    var topics = ["C++", "semiconductors", "Python", "IoT", "embedded systems", "Traveling"]

    for (var i = 0; i < topics.length; i++) {

        // Step 3: uncomment the for loop above and the closing curly bracket below.
        console.log(topics[i]);
        // ============= put step 3 in between these dashes ======================
        // Make a div with jQuery and store it in a variable named animalDiv.
        var topicsButton = $("<div>").addClass("btn btn-info").text(topics[i]).css("margin", "10px");
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        $("#buttons").append(topicsButton);
        // ==================================
    }

    $("#submit").on('click', function() {
        console.log("submit");
        console.log($("#text").val())
        var newTopicButton = $("<div>").addClass("btn btn-info").text($("#text").val()).css("margin", "10px");
        console.log(newTopicButton);
        $("#buttons").append(newTopicButton);
    });


    // //==================================================================================================
    $(".btn").on("click", function() {
        event.preventDefault();
        var topic = $(this).text();
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            topic + "&l&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {



            // =============== put step 2 in between these dashes ==================
            var results = response.data
                // ====================================================================

            for (var i = 0; i < results.length; i++) {

                // Make a div with jQuery and store it in a variable named animalDiv.
                var topicDiv = $("<div>").css("display", "inline-block");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // Set the inner text of the paragraph to the rating   of the image in results[i].
                p.text("Rated: " + results[i].rating);
                // Make an image tag with jQuery and store it in a variable named animalImage.
                topicImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.

                topicImage.attr("src", results[i].images.fixed_height_small_still.url);
                // console.log(topicImage.attr("src"));
                topicImage.attr("data-state", "still");
                topicImage.attr("data-anmiate", results[i].images.fixed_height_small.url);
                console.log(topicImage.attr("data-anmiate"));
                topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                topicImage.addClass("gif");
                // console.log(topicImage);
                topicDiv.append(topicImage);
                // Append the p variable to the animalDiv variable.
                topicDiv.append(p);
                // Append the animalImage variable to the animalDiv variable.

                console.log(topicDiv);
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                $("#giphs-appear-here").prepend(topicDiv);
                // ===================================================================
            }

            //Change the state of the gifs on click
            $(".gif").on('click', function() {

                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "anmiate");
                } else {
                    $(this).attr("src", $(this).data("still"))
                    console.log($(this).attr("src"));
                    $(this).attr("data-state", "still");
                    console.log($(this).attr("data-state"));
                }



            });

        });


    });
});
