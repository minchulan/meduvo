class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient 

  validates_presence_of :name, :category, :description, :date, :location
  validates :description, length: {in: 5...100}

  default_scope { order(date: :asc) } # Default ordering by date in ascending order
end

#With this default scope, every time you query the Appointment model, the records will be fetched in ascending order based on the date attribute. 
