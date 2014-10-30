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

function addToPlaylist(){

  var search = $("#search").val()
  
  $.ajax({
    type: "GET",
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
	
	$(".btn").bind('click', function() {
		addToPlaylist();
	});
	
})


