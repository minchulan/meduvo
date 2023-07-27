# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean
#  email           :string
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  has_many :appointments, dependent: :destroy
  has_many :patients, through: :appointments

  validates :email, presence: true, uniqueness: { case_sensitive: false }

  validates :password, presence: true, length: { minimum: 6 }



end



# -----------------------------

  # validates :email, presence: true, uniqueness: { case_sensitive: false },
  #                   format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
  #                             message: "must be a valid email address" }

  # validates :username, presence: true, uniqueness: { case_sensitive: false },
  #                      format: { with: /\A[a-zA-Z0-9_]+\z/,
  #                                message: "can only contain letters, numbers, and underscores" },
  #                      length: { minimum: 3, maximum: 25 }

  # validates :password, length: { in: 6..25 },
  #                      format: { with: /\A(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}\z/,
  #                                message: "must be at least 6 characters long and include both letters and numbers" }


# The uniqueness validation for email and username now includes case_sensitive: false to make the uniqueness checks case-insensitive.
# Custom error messages have been added to provide more specific feedback to users. For example, the email validation now has a custom message that indicates the requirement for a valid email address.
# A validation for password complexity has been added using a regular expression pattern. The pattern requires at least 6 characters and includes both letters and numbers.


# has_secure_password already validates for presence of password. 

# has_secure_password is a macro (class method) that gives us 3 other methods (instance methods): 
# 1. password=  [writer method]
# 2. password_confirmation=  [writer method]
# 3. authenticate   [reader method]

# bcrypt uses a random salt combined with the password and applies a hashing algorithm multiple times. The result is a unique and irreversible hash, which is a secure representation of the password. The salt ensures uniqueness, and the multiple iterations of the hashing algorithm make it difficult for attackers to crack the password quickly.

# By incorporating salt and multiple iterations in the hashing process, bcrypt adds an extra layer of security to protect passwords from being easily guessed or reverse-engineered.

# has_secure_password is a built-in method provided by the Ruby on Rails framework, specifically the Active Model component. It is commonly used for implementing password authentication and encryption in Rails applications.

# When you include has_secure_password in your model, it adds several features to assist with password-related functionality:

# Password Encryption: The method automatically adds a virtual attribute called password to your model. When you assign a value to password, it automatically encrypts and stores the hashed version of the password using bcrypt.

# Password Confirmation: It also adds a virtual attribute called password_confirmation for password confirmation purposes. When you create or update a record, it validates that password and password_confirmation match.

# Password Validation: It adds a validation that checks the presence of a password. By default, it ensures that the password is at least 6 characters long. However, you can customize these validations as per your requirements.

# Authentication Methods: has_secure_password also adds methods to authenticate the user based on the provided password. For example, you can use authenticate to compare the provided password with the stored encrypted password.

# By using has_secure_password, you can handle password-related functionality easily and securely in your Rails application without having to write complex encryption and validation code manually. It simplifies the process of managing passwords and provides a secure way to store and authenticate user passwords using bcrypt encryption.





# User
# keep it concise
# ChatGPT
# has_secure_password is a built-in Rails method that provides password encryption, validation, and authentication functionality for user models. It simplifies the process of handling passwords securely in a Rails application.






