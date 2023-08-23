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
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments

  has_secure_password
  # password=
  # password_confirmation=
  # authenticate 
  validates :email, presence: true
  
end

#has_secure_password is a macro that gives us 3 important instance methods. It comes from ActiveRecord and can only be used with a gem called BCrypt.
