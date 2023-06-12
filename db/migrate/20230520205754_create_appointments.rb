class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.integer :user_id
      t.integer :patient_id
      t.string :type
      t.string :name
      t.string :location
      t.text :description

      t.timestamps
    end
  end
end
