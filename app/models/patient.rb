class Patient < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments

    validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true

    def full_name
        "#{first_name} #{last_name}"
    end 
end 