/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const renderTweets = (data) => {
  
    for (const userData of data) {
      const $eachTweet = createTweetElement(userData);
      $('#tweets-container').prepend($eachTweet); 
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML; //changes the <> symbols to something else 
  };

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

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetTextVal = $("#tweet-text").val();
    
    if (tweetTextVal === "" || tweetTextVal === null) {
      return $(".validation").text("Let your voice be heard!").slideDown();
    }
    if (tweetTextVal.length > 140) {
      return $(".validation").text("Tweet too long, try again!").slideDown();
    }
    $(".validation").hide();
    const data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
      $("#tweet-text").parent().find(".counter").text(140);
    });
  });

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    }).then((data) => {
      $("#tweets-container").empty();
      renderTweets(data);
    })
  };
  loadTweets();

});

