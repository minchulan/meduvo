class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :first_name
      t.string :last_name
      t.string :guardian
      t.string :gender
      t.string :dob
      t.string :address
      t.string :phone
      t.string :email
      t.string :language_preferences
      t.string :allergies
      t.string :viewed_notice_of_privacy_practices

      t.timestamps
    end
  end
end
