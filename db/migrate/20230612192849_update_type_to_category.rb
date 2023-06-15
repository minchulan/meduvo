class UpdateTypeToCategory < ActiveRecord::Migration[6.1]
  def change
    rename_column :appointments, :type, :category
  end
end
