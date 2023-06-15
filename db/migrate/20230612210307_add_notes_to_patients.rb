class AddNotesToPatients < ActiveRecord::Migration[6.1]
  def change
    add_column :patients, :notes, :text 
  end
end
