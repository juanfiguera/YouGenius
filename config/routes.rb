GJ::Application.routes.draw do

  resources :playlists

  post "/add_to_playlist", to: "playlists#add_to_playlist"
  get "/next_video", 			to: "playlists#next_video"
  get "/load_lyrics", 		to: "playlists#load_lyrics"

  root "playlists#new"

end
