function TweetCompose(el) {
  this.$el = $(el);
  this.$content = this.$el.find('textarea');
  this.$mention = this.$el.find('select');
  this.$charsLeftLabel = this.$el.find('.chars-left');
  this.$feed = $('#feed');

  this.registerEvent();


}




TweetCompose.prototype.registerEvent = function () {
  this.$content.on("input", this.handleInput.bind(this));
  this.$el.on("submit", this.handleSubmit.bind(this));
};

TweetCompose.prototype.clearInput = function () {
  // body...
  this.$content.val("");
  this.$mention.val(0);

};

TweetCompose.prototype.handleInput = function (e) {
  var content = e.target.value;
  var charsLeft = 140 - content.length;
  this.$charsLeftLabel.text(charsLeft + " characters remaining.");
};


TweetCompose.prototype.handleSubmit = function (e) {
  e.preventDefault();
  this.$el.find(":input").prop('disabled', true);

  $.ajax({
    url: "/tweets",
    method: "POST",
    data: {
      "tweet[content]": this.$content.val(),
      "tweet[mentioned_user_ids][]": this.$mention.val(),
    },
    dataType: "json",
    success: function(message) {
      console.log(message);
      this.handleSuccess(message);
    }.bind(this)
  });
};



TweetCompose.prototype.handleSuccess = function (message) {

    this.clearInput();
    this.$el.find(":input").prop('disabled', false);
    var $tweet = $('<li>');
    $tweet.append(message.content + "--");
    var $userLink = $('<a/>')
      .attr('href', '/users/' + message.user_id)
      .text(message.user.username);
    $tweet.append($userLink)
      .append("--" + message.created_at);

    var $mentions = $('<ul>');
    message.mentions.forEach( function(mention) {
      var $mentionedUser = $('<li>');
      var $mentionedUserLink = $('<a/>')
        .attr('href', '/users/' + mention.user_id)
        .text(mention.user.username);
      $mentionedUser.append($mentionedUserLink);
      $mentions.append($mentionedUser);
    });

    if ($mentions.children().length > 0) {
      $tweet.append($mentions);
    }

    this.$feed.prepend($tweet);




    // this.$feed.prepend()

};





module.exports = TweetCompose;
