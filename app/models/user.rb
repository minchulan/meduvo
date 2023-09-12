class User < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments

  has_secure_password

  validates :email, presence: true, uniqueness: { message: "This email address is already in use." }
  validates :password, length: { minimum: 4, message: "must be greater than 4 characters" }, if: -> { new_record? || !password.nil? }
end


# using has_secure_password. When you use has_secure_password, it automatically adds a validation that requires the password attribute to be present, even if it's allowed to be nil.

#The validates :password line now includes a condition using a lambda (->) that checks if it's a new record or if the password is not nil. This ensures that the password length validation is only applied when a new record is being created or when the password is not nil. This way, the custom error message for the password length will be used instead of the default "Password can't be blank" message. Now able to see custom error message 

