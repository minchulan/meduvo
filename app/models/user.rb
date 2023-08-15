class User < ApplicationRecord
  has_secure_password

  has_many :appointments
  has_many :patients, through: :appointments

  validates :email, presence: true, uniqueness: true 
  validates :password, presence: true 
end