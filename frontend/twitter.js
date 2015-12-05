var FollowToggle = require('./follow_toggle');
var UsersSearch = require('./users_search');

$(function(){
  $('button.follow-toggle').each( function(_idx, el) {
    new FollowToggle(el);
  });

  $('nav.users-search').each(function (_idx, el) {
    new UsersSearch(el);
  });
});
