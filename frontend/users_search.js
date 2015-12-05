var FollowToggle = require('./follow_toggle');

function UsersSearch(el) {
  this.$el = $(el);
  this.$input = this.$el.find('.search-field');
  this.$usersList = this.$el.find('.users');
  this.registerEvent();
}

UsersSearch.prototype.registerEvent = function () {
  // body...
  this.$el.on('input', this.handleInput.bind(this));
};

UsersSearch.prototype.handleInput = function (e) {
  // body...
  $.ajax({
    url: "/users/search",
    method: "GET",
    dataType: "json",
    data: {query: e.target.value},
    success: function (usersJSON) {
      // console.log(e.target.value);
      console.log(usersJSON);
      window.example_json = usersJSON;
      this.renderResults(usersJSON);
    }.bind(this)
  });
};

UsersSearch.prototype.renderResults = function (usersJSON) {
  this.$usersList.empty();

  usersJSON.forEach(function (user) {
    var $userInfo = $("<li>");
    var $userLink = $('<a/>')
      .attr('href', '/users/' + user.id)
      .text(user.username);
    var $followButton = $("<button>");

    new FollowToggle($followButton, {
      userId: user.id,
      followStatus: user.followed
    });

    $userInfo.append($userLink).append(" ");
    $userInfo.append($followButton);
    this.$usersList.append($userInfo);
  }.bind(this));
};

module.exports = UsersSearch;
