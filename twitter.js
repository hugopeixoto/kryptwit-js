
var passwords = {
  "KryptwitJS": "zomgpwd"
};

var should_decrypt = function (tweet) {
  if (tweet.text.indexOf(";-) ") !== 0) {
    return false;
  }

  if (passwords[tweet.source] === undefined) {
    return false;
  }

  return true;
}

var decrypt = function (tweet) {
  return status_update_decrypt(tweet.text, tweet.source, passwords[tweet.source]);
}

var getTweets = function () {
  return $.map($('div.tweet'), function (element) {
    element = $(element);
    return {
      source: element.data('screen-name'),
      text: element.children('p.js-tweet-text').text(),
      element: element
    };
  });
}

var replaceTweet = function (tweet, text) {
  $(tweet.element).children('p.js-tweet-text').text(text);
}

window.addEventListener('load', function () {
  $(getTweets()).each(function (i, tweet) {
    if (should_decrypt(tweet)) {
      replaceTweet(tweet, decrypt(tweet));
    }
  });
});
