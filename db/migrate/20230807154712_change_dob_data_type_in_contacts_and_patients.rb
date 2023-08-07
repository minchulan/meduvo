class ChangeDobDataTypeInContactsAndPatients < ActiveRecord::Migration[6.1]
  def change
    change_column :contacts, :dob, :date, using: 'dob::date'
    change_column :patients, :dob, :date, using: 'dob::date'
  end
end
