function FollowToggle(el, options) {
  this.$el = $(el);
  this.userId = parseInt(this.$el.data("user-id")) || options.userId;
  this.followStatus = this.$el.data("follow-status")
                    || this.parseStatus(options.followStatus);
  this.render();
  this.registerEvent();
}

  FollowToggle.prototype.parseStatus = function (status) {
    if(status){
      return "followed";
    } else {
      return "unfollowed";
    }
  };

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
