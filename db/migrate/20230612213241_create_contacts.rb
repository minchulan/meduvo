class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.date :dob
      t.string :email
      t.string :phone
      t.text :address
      t.text :notes

      t.timestamps
    end
  end
end
