function FollowToggle($el) {
  // debugger;
  this.$el = $el;
  this.userId = parseInt($el.data("user-id"));
  this.followStatus = $el.data("follow-status");
  this.render();
  this.registerEvent();
  // console.log("it works!");
}

FollowToggle.prototype.registerEvent = function () {
  this.$el.on("click", this.handleClick.bind(this));
};


FollowToggle.prototype.render = function () {
  if (this.isFollowing()) {
    this.$el.html("Unfollow");
  } else {
    this.$el.html("Follow");
  }
  this.$el.prop('disabled', false);

};

FollowToggle.prototype.isFollowing = function () {
  if (this.followStatus === "followed") {
    return true;
  } else {
    return false;
  }
};

FollowToggle.prototype.toggleState = function () {
  if (this.isFollowing()) {
    this.followStatus = "unfollowed";
  } else {
    this.followStatus = "followed";
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  this.$el.prop('disabled', true);

  $.ajax({
    url: "/users/" + this.userId + "/follow",
    method: this.isFollowing() ? "DELETE" : "POST",
    dataType: "json",
    success: function() {
      this.toggleState();
      this.render();
    }.bind(this)
  });
};






module.exports = FollowToggle;
