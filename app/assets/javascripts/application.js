// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// Spinner props 
var search_opts = {
  lines: 15, // The number of lines to draw
  length: 1, // The length of each line
  width: 2, // The line thickness
  radius: 8, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 77, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var search_target = document.getElementById('search_spinner');

var playlist_opts = {
  lines: 17, // The number of lines to draw
  length: 7, // The length of each line
  width: 2, // The line thickness
  radius: 11, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 77, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var playlist_target = document.getElementById('playlist_spinner');

var lyrics_opts = {
  lines: 17, // The number of lines to draw
  length: 9, // The length of each line
  width: 2, // The line thickness
  radius: 18, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 77, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var lyrics_target = document.getElementById('lyrics_spinner');

function addToPlaylist(){

  var search = $("#search").val()
  
  $.ajax({
    type: "POST",
    url: "/add_to_playlist",
    dataType : 'script',
    data: {
      search: search
    },
    success: function(search) {
      return false;
    },
    error: function(search) {
      return false;
    }
  });

  $("input[type=text], textarea").val("");

}

function nextVideo(){

  var jsonData;

  $.ajax({
      url: 'next_video.json',
      dataType:'json',
      success: function(response) {
          jsonData = response;
          loadNextVideo(response);
      },
      error: function(error) {
          console.log(error.toSource());
          return false;
      }
  })
}

// TODO: make nextVideo & loadLyrics an efficient high octane single ajax call
function loadLyrics(){
  $("#lyrics").hide();
  var jsonData;

  $.ajax({
    type: "GET",
    url: "/load_lyrics.js",
    dataType : 'script',
    success: function() {
      return false;
    },
    error: function() {
      return false;
    }
  });
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '0UjsXo9l6I8',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {

  if (event.data == YT.PlayerState.ENDED) {
    nextVideo();
    loadLyrics();
  }
}

function loadNextVideo(response){
  player.loadVideoByUrl({mediaContentUrl:response.video_url, startSeconds:0}); 
}

function stopVideo() {
  player.stopVideo();
}

$(document).ready(function(){

  // TODO: get spinners working	
  // var search_spinner   = new Spinner(search_opts).spin(search_target);
  // var playlist_spinner = new Spinner(playlist_opts).spin(playlist_target);
  // var lyrics_spinner   = new Spinner(lyrics_opts).spin(lyrics_target);

	$(".btn").bind('click', function() {
		addToPlaylist();
	});
	
})


