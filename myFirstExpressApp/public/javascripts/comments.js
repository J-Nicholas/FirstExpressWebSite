let commentArray = [];
let commentCard = "";
let showHideBtnVisible = false;
let commentsHidden = false;
let pageLoaded = false;

$(document).ready(function () {

    $("#postComment").click(function () {

        //validate input boxes
        if (validateInput() == false) {
            return;
        }

        //  show "Hide comments" button
        if (showHideBtnVisible == false) {
            $("#hideComments").slideToggle();
            showHideBtnVisible = true;
        }

        // get values from handle and comment box
        let handle = $("#handle").val();
        let comment = $("#comment").val();
        let postDate = Date.now();

        //put them in array as objects
        commentArray.push({"handle": handle, "comment": comment, "postDate": postDate});

        //reset input boxes
        $("#handle").val("@");
        $("#comment").val("Type your comment");
        $("#comment").addClass("font-weight-light").removeClass("font-weight-normal");
        $("#comment").addClass("font-italic").removeClass("font-normal");

        $("input[type=submit]").attr("disabled", "disabled");
        $("#comment").removeClass("is-invalid");
        $("#handle").removeClass("is-invalid").removeClass("is-valid");

        //clear out previous comments before replacing them + new one
        $("#commentSection").text("");

        // create a card for each comment
        commentCard += "<div class='card test' style='margin-bottom: 15px'>";
        commentCard += "<div class='card-body mybox' style='padding: 10px 15px;'>" +
            "<span class='commentContent'></span></div></div>";
        $("#commentSection").append(commentCard);

        //getting list of span elements which will contain comments
        var list = $('.commentContent');

        for (let i = 0; i < commentArray.length; i++) {
            //creating incremental id for each comment
            list[i].id = "comment" + (i);

            //using generated id to insert comment inside card
            $("#" + list[i].id).append("<span style='color: deepskyblue; '>" + "<b>" + commentArray[i].handle + "</b>" + "</span>" + ":&nbsp&nbsp");
            $("#" + list[i].id).append(commentArray[i].comment + "<br><br>");

            // Calculating how long it has been since comment was posted
            if (Date.now() - commentArray[i].postDate < 1000) {
                $("#" + list[i].id).append("<div class='text-right font-weight-light font-italic' style='margin-bottom: 0px;'>"
                    + "Just now" + "</div>");
            }
            else if (Date.now() - commentArray[i].postDate < 60000) {
                $("#" + list[i].id).append("<div class='text-right font-weight-light font-italic' style='margin-bottom: 0px'>" +
                    Math.floor(((Date.now() - commentArray[i].postDate) / 1000)) + " seconds ago</div>"); //divide by 1000 for seconds
            }
            else if (Date.now() - commentArray[i].postDate < 3600000) // 3600 = 1 hour
            {
                $("#" + list[i].id).append("<div class='text-right font-weight-light font-italic' style='margins-bottom: 0px;'>" +
                    Math.floor(((Date.now() - commentArray[i].postDate) / 60000)) + " minutes ago</div>"); // divide by 60000 for minutes
            }
            else if (Date.now() - commentArray[i].postDate < 86400000) // = 1 day
            {
                $("#" + list[i].id).append("<div class='text-right font-weight-light font-italic' style='margin-bottom: 0px;'>" +
                    Math.floor((((Date.now() - commentArray[i].postDate) / 60000) / 24)) + " hours aago</div>");
            }

        }

    });

    // displays warning when input isn't valid in real-time for username box
    $("#handle").on('input', function () {
        if ($(this).val().trim() == "") {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $("#validityFeedback").html("Handle cannot be empty. Make sure it begins with an '@' symbol");
        }
        else if ($(this).val().trim().substring(0, 1) != "@") {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $("#validityFeedback").html("Input invalid. Make sure it begins with an '@' symbol");
        }
        else if ($(this).val().trim().substring(0, 1) == "@" && $(this).val().length > 3) {
            $(this).removeClass("is-invalid").addClass("is-valid");
        }
        else if ($(this).val().trim().substring(0, 1) == "@" && $(this).val().length < 4) {
            // user name is too short but we won't complain until box loses focus.
            $(this).removeClass("is-valid").removeClass("is-invalid");
        }
        else {
            $("#validityFeedback").html("");
            $(this).removeClass("is-invalid");
        }
        validateInput();
    });

    // displays warning that user name is too short when box loses focus
    $("#handle").blur(function () {
        if ($(this).val().trim().substring(0, 1) == "@" && $(this).val().length < 4) {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $("#validityFeedback").html("User name is too short.");
        }
        validateInput();
    })

    $("#comment").on("input", function () {
        if ($(this).val().length > 0) {
            $(this).removeClass("is-invalid");
        }
        validateInput();
    });

    $("#comment").blur(function () {
        if ($(this).val().trim() == "") {
            $("#commentFeedback").html("Comment can't be empty.");
            $(this).addClass("is-invalid");
        }
        validateInput();

    });
    $("#comment").focus(function () {
        validateInput();
    })
});

// delete placeholder text in comment textbox when clicked on
$(document).ready(function () {
    $("#comment").focus(function () {
        $("#comment").val("");
        //change font weight back to normal and get rid of italics
        $("#comment").addClass("font-weight-normal").removeClass("font-weight-light");
        $("#comment").addClass("font-normal").removeClass("font-italic");
    });
});


// handle show/hide comments button
$(document).ready(function () {
    // hides the hide comment button as soon as page loads. hide it onnly once
    if (pageLoaded == false) {
        $("#hideComments").hide();
        pageLoaded = true;
    }

    $("#hideCommentBtn").click(function () {
        // toggle hidden visiible with an animation
        $(".test").slideToggle();

        //toggle boolean value for next click event
        commentsHidden = !commentsHidden;

        // change text to "show comments" when they are hidden, vice versa
        if (commentsHidden == true) {
            $("#hideCommentBtn").html("Hide Comments");
        }
        else {
            $("#hideCommentBtn").html("Show Comments");
        }
        console.log("Is visible: " + commentsHidden);

    });
});

//validate handle and comment sections before submitting
function validateInput() {

    if ($("#handle").val().trim().substring(0, 1) == "@" && $("#handle").val().length > 3
        && $("#comment").val().length > 0 && $("#comment").val() != "Type your comment") {
        $("input[type=submit]").removeAttr("disabled");     // enables submit button
        return true;
    }
    else
        $("input[type=submit]").attr("disabled", "disabled");   // disables submit button

    return false;

}




