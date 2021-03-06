// ====================== Poppulate buttons dinamycally ==========================================    

$("document").ready(function() {

    var topics = ["travel", "dining", "cycling", "IoT", "computer science", "science", "technology", "hack"]


    function printButtons(topics) {
        for (var i = 0; i < topics.length; i++) {
            console.log(topics[i]);
            // Make a div with jQuery and store it in a variable named topicsButton
            var topicsButton = $("<div>").addClass("btn btn-default").text(topics[i]).css("margin", "10px");
            // append the animalDiv variable to the element with an id of gifs-appear-here.
            $("#buttons").append(topicsButton);
            // ==================================
        }
    }

    // call the printButtons function with the original array
    printButtons(topics);

    //if submit button is clicked then the text of the form will become a new button
    $("#submit").on('click', function() {
        //clear the previous buttons not to clutter the button area.
        $("#buttons").empty();
        // get the value on the input field and assign it to newTopic variable
        var newTopic = $("#text").val();
        // add the new topic vatiable to the topics array
        topics.push(newTopic);
        // append an h3 element to the buttons id since it was cleared before. 
        $("#buttons").append("<h3 class = 'text-center'> Topics click a button to display related giphs </h3>");
        // call the printButtons function to update the buttons
        printButtons(topics);
        // clear the text on the input field 
        $("#text").val(" ");

    });

    //=============================================== clear giphs ==================================
    $("#clear").on('click', function() {

        $(".raiting").remove();
        $(".gif").remove();

    });

    //=========================== Search for the images on the GIPHY API ===============================
    $("#buttons").on("click", ".btn", function() {
        event.preventDefault();
        var topic = $(this).text();
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            topic + "&l&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {



            // ============================ When response is received populate giphs ============================
            var results = response.data
                // ==================================================================================================

            for (var i = 0; i < results.length; i++) {

                // Make a div with jQuery and store it in a variable named animalDiv.
                var topicDiv = $("<div>").css("display", "inline-block");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // Set the inner text of the paragraph to the rating   of the image in results[i].
                p.text("Rated: " + results[i].rating).addClass("text-center raiting");
                // Make an image tag with jQuery and store it in a variable named topiclImage.
                topicImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height_small_still.url.
                topicImage.attr("src", results[i].images.fixed_height_small_still.url);
                // Add data-state, data-animate, data-still to the img 
                topicImage.attr("data-state", "animate");
                topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
                topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //Add class gif to the img 
                topicImage.addClass("gif");
                //Append the imag to the topicDiv
                topicDiv.append(topicImage);
                // Append the p variable to the topicDiv variable.
                topicDiv.append(p);
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                $("#giphs-appear-here").prepend(topicDiv);
            }

            // ============================= Change the state of the gifs on click ===========================
            $(".gif").on('click', function() {

                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    //set the src to the value contained in data-animate
                    $(this).attr("src", $(this).attr("data-animate"));
                    //set the data-state to animate
                    $(this).attr("data-state", "anmiate");
                } else {
                    //set the src to the value contained in data-still
                    $(this).attr("src", $(this).data("still"))
                        //set the data-state to animate
                    $(this).attr("data-state", "still");

                }

            });

        });


    });

});
