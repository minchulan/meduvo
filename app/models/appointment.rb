class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient 
  # belongs_to :patient, inverse_of: :appointments 

  validates :name, :category, :description, :date, :location, presence: true

end
