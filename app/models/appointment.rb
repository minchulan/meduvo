class Appointment < ApplicationRecord
  belongs_to :patient 
  belongs_to :user

  validates :name, :category, :description, :date, :location, presence: true
end
