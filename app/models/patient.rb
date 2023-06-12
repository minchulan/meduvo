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
end 