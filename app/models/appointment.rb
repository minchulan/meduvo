class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient 

  validates :name, :category, :description, :date, :location, presence: true
  validates :description, length: {in: 5...100}

  default_scope { order(date: :asc) }
end