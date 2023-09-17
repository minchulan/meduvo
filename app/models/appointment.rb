class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient 

  validates :name, :category, :description, :date, :location, presence: true
  validates :description, length: {in: 5...100}

  # default_scope { order(date: :asc) } # Default ordering by date in ascending order
end

#With this default scope, every time you query the Appointment model, the records will be fetched in ascending order based on the date attribute. 

# def user_email 
#   self.user.email
# end  

# Custom method inside appointment serializer, add in the attribute :user_email 

# Line 14: appointment must have user associated with it due to the associations set up in the models. 