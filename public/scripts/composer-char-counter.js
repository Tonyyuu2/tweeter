$(document).ready(function() {
  const newTweets = $("#tweet-text");
  newTweets.on("input", function() { //event handler for input
    const characterCount = $(this).val().length;
    const outputLength = 140 - characterCount;
    const counterSelector = $(this).parent().find(".counter").text(outputLength);//.text = replacing the text within the tag
    
    if (outputLength < 0) {
      counterSelector.css({color: "#FF0000"});
    }
    if (outputLength >= 0) {
      counterSelector.css({color: "#000000"});
    }
  });
});

