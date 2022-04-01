/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  //function that loops through the database which is an array of objects, callbacks the createTweetElement function then pushes the newly generated data into the database.
  const renderTweets = (data) => {

    for (const userData of data) {
      const $eachTweet = createTweetElement(userData);
      $('#tweets-container').prepend($eachTweet);
    }
  };
  //escape sequence that changes the <> symbols to something else.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //function that creates a new article tag of tweet data given the user input data
  const createTweetElement = (tweetData) => {
    const $tweet = $(`<article name="tweet" class="tweet">
  <header>
    <span class="icon-format"><img src="${escape(tweetData.user.avatars)}" alt="avatar-icon" height="52px" width="52px">
      <span>${escape(tweetData.user.name)}</span>
    </span>
    <span class="userHandle">${escape(tweetData.user.handle)}</span>
  </header>

  <section class="tweet-container">${escape(tweetData.content.text)}</section>
    <footer>
      <span>${escape(timeago.format(tweetData.created_at))}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };
  //submit event listener that is triggered with user interaction
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetTextVal = $("#tweet-text").val();
    //conditional checks to trigger error message
    if (tweetTextVal === "" || tweetTextVal === null) {
      return $(".validation").text("⚠️Let your voice be heard!⚠️").slideDown();
    }
    if (tweetTextVal.length > 140) {
      return $(".validation").text("⚠️Tweet too long, try again!⚠️").slideDown();
    }
    $(".validation").hide();//hides the error if conditionals return false.
    const data = $(this).serialize();
    //makes ajax POST request to the /tweets route then invokes loadTweets with the data
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    }).then(() => {
      loadTweets();
      //after loadTweets is invoked clear textarea
      $("#tweet-text").val("");
      //resets the counter back to 140 after post request is made
      $("#tweet-text").parent().find(".counter").text(140);
    });
  });
  //function that makes an ajax GET request to /tweets that invokes renderTweets and returns the database of tweets
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    }).then((data) => {
      $("#tweets-container").empty();
      renderTweets(data);
    });
  };
  loadTweets();
});

