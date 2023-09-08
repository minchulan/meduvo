class User < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments

  has_secure_password

  validates :email, presence: true
  validates :password, length: { minimum: 4 }, allow_nil: true
  
end

#has_secure_password is a macro that gives us 3 important instance methods. It comes from ActiveRecord and can only be used with a gem called BCrypt.
