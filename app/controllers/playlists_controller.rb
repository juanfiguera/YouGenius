class PlaylistsController < ApplicationController

	#TODO: make this less communist #current_user #devise

  def new 
  	@current_playlist = Playlist.new
  	@current_playlist.save
  	@current_playlist
  	@current_song = RapGenius.search_by_title("empire state of mind").first
  end

  def add_to_playlist
  	@current_playlist = Playlist.last 
  	search_results = RapGenius.search_by_title(params[:search])
  	
  	search_results.each do |s|
  		if s.media.first.type == "video"
  			@current_playlist.songs << s
  			@current_playlist.save
  			return @current_playlist
  		end
  	end
  end

  def next_video
  	current_playlist = Playlist.last 
  	if @next_song  = current_playlist.next_song
	  	@video_url  = "http://www.youtube.com/v/#{@next_song.media.first.url.split('=').last}"
  	else
	  	@video_url  = nil
  	end

  	respond_to do |format|
      format.json { render json: {video_url: @video_url} }
      format.js   { @video_url }
    end
  end

  def load_lyrics
  	@current_playlist = Playlist.last 
  	@current_song = @current_playlist.current_song
  end

  private
    def playlist_params
      params.require(:playlist).permit(:songs)
    end
end
