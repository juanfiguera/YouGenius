class Playlist < ActiveRecord::Base

	serialize :songs, Array

	# TODO: make next_song & current_song an efficient high octane single method

	#used for video
	def next_song
		self.songs.shift 
	end

	# used for lyrics
	def current_song
		nxt = self.songs.shift 
		self.save 
		nxt
	end
end
