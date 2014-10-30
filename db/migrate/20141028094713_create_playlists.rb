class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.text :songs

      t.timestamps
    end
  end
end
