class User < ApplicationRecord
  has_many :appointments
  has_many :patients, :through => :appointments

  has_secure_password

  validates :email, presence: true, uniqueness: { message: " address is already in use." }
  validates :password, length: { minimum: 4, message: "must be greater than 4 characters" }, if: -> { new_record? || !password.nil? }
end

