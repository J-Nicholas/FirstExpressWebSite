let isVisible = false;
$(document).ready(function ()
{
    // hides the hide comment button as soon as page loads
    $("#hideComments").hide();

    $("#hideCommentBtn").click(function()
    {
        // toggle hidden visiible with an animation
        $(".test").slideToggle();

        // change text to "show comments" when they are hidden, vice versa
        if (isVisible == true)
        {
            $("#hideCommentBtn").html("Hide Comments");
            console.log("Is visible: " + isVisible);
        }
        else
        {
            $("#hideCommentBtn").html("Show Comments");
            console.log("Is visible: " + isVisible);
        }
        //toggle boolean value for next click event
        isVisible = !isVisible;

    });
});