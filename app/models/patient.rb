class Patient < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments

    validates :first_name, presence: true 
    validates :last_name, presence: true 
    validates :gender, presence: true 
    validates :dob, presence: true 
    validates :phone, presence: true 
    validates :email, presence: true
    validates :allergies, presence: true 

    def full_name
        "#{first_name} #{last_name}"
    end 
end 

# By using the full_name method, you can conveniently display the full name attribute without modifying the existing first_name and last_name attributes.