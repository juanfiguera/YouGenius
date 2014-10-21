class PagesController < ApplicationController
  
  def home
  	@song = RapGenius::Song.find(176872)
  end

end
