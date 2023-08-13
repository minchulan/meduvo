class RemoveForeignKeyFromPatientsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :patients, :user_id
  end
end
