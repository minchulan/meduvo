class User < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments

  has_secure_password

  validates :email, :password, presence: true
end